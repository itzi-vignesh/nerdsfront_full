import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, Terminal, Info, ListChecks, HelpCircle, Save, Globe, Play, RefreshCw, ServerCrash } from "lucide-react";
import { useLabs } from '@/data/labsData';
import { useToast } from '@/hooks/use-toast';
import { Lab } from '@/data/labsData';
import { useAuth } from '@/contexts/AuthContext';
import { labsAPI } from '@/api/api';

interface LabInstanceStatus {
  status: 'pending' | 'running' | 'stopped' | 'error';
  url?: string;
  direct_ip_url?: string;
  message?: string;
}

const LabEnvironment: React.FC = () => {
  const { labId } = useParams<{ labId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { labs, loading, error } = useLabs();
  const [currentLab, setCurrentLab] = useState<Lab | null>(null);
  const [labInstance, setLabInstance] = useState<LabInstanceStatus>({ status: 'pending' });
  const [isLaunching, setIsLaunching] = useState(false);
  const [terminal, setTerminal] = useState<string[]>([
    'Welcome to Cyber Nerds Academy Virtual Lab Environment',
    'Type "help" for assistance or launch your lab environment.'
  ]);
  const [command, setCommand] = useState('');
  const [webAppUrl, setWebAppUrl] = useState('');

  useEffect(() => {
    if (labs.length > 0 && labId) {
      const lab = labs.find(lab => lab.id === labId);
      if (lab) {
        setCurrentLab(lab);
      } else {
        toast({
          variant: "destructive",
          title: "Lab Not Found",
          description: "The requested lab could not be found.",
        });
        navigate('/labs');
      }
    }
  }, [labs, labId, navigate, toast]);

  const launchLabEnvironment = async () => {
    if (!currentLab || !user) return;
    
    try {
      setIsLaunching(true);
      setTerminal(prev => [...prev, '$ Launching lab environment...', '$ Creating Docker container...']);
      
      // Call the API to create a lab instance
      const response = await labsAPI.createLabInstance(currentLab.id);
      
      // Check for status in the response and handle container creation status
      if (response.status === 'success') {
        // Container was successfully created or we got a valid URL
        const primaryUrl = response.url || '';
        const fallbackUrl = response.direct_ip_url || '';
        
        setLabInstance({
          status: 'running',
          url: primaryUrl,
          direct_ip_url: fallbackUrl,
          message: response.message
        });
        
        setWebAppUrl(primaryUrl);
        
        setTerminal(prev => [
          ...prev,
          '$ Lab container created successfully!',
          `$ Your lab is accessible at: ${primaryUrl}`,
          fallbackUrl ? `$ Backup direct IP access: ${fallbackUrl}` : '',
          '$ You can now access your lab in the browser tab.'
        ]);
        
        toast({
          title: "Lab Environment Ready",
          description: response.message || `Your lab is now running at ${primaryUrl}`,
        });
        
        // Start checking container status to ensure it's fully ready
        startContainerStatusCheck(response.lab_id || currentLab.id);
      } else {
        throw new Error(response.error || 'Unknown error launching lab');
      }
    } catch (error) {
      console.error('Error launching lab:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      setLabInstance({
        status: 'error',
        message: errorMessage
      });
      
      setTerminal(prev => [
        ...prev,
        '$ Error launching lab environment.',
        `$ ${errorMessage}`,
        '$ Please try again or contact support.'
      ]);
      
      toast({
        variant: "destructive",
        title: "Error Launching Lab",
        description: errorMessage,
      });
    } finally {
      setIsLaunching(false);
    }
  };

  // Add this function to check if the container is ready
  const startContainerStatusCheck = (labId: string) => {
    // Only attempt status checks if we have a lab ID
    if (!labId) return null;
    
    let retryCount = 0;
    const maxRetries = 10;  // Try up to 10 times
    const retryInterval = 6000;  // 6 seconds between checks
    
    setTerminal(prev => [
      ...prev, 
      '$ Checking container status...',
      '$ Waiting for lab to be fully ready...'
    ]);
    
    const checkInterval = setInterval(async () => {
      try {
        retryCount++;
        
        if (retryCount > maxRetries) {
          clearInterval(checkInterval);
          setTerminal(prev => [
            ...prev,
            '$ Max status checks exceeded, container may not be ready.',
            '$ Please try refreshing the page if you encounter connection issues.'
          ]);
          return;
        }
        
        setTerminal(prev => [...prev, `$ Status check attempt ${retryCount}/${maxRetries}...`]);
        
        // Use a simple HEAD request to check if the container is responding
        const url = labInstance.url || '';
        if (!url) {
          clearInterval(checkInterval);
          setTerminal(prev => [...prev, '$ No URL available for status check.']);
          return;
        }
        
        // Add a timestamp to bypass cache
        const checkUrl = `${url}?check=${Date.now()}`;
        const response = await fetch(checkUrl, { 
          method: 'HEAD',
          mode: 'no-cors', // This allows us to check cross-origin URLs
        });
        
        // If we get here, the container is responding
        clearInterval(checkInterval);
        setTerminal(prev => [...prev, '$ Container is ready and accessible!']);
        
        toast({
          title: "Lab Ready",
          description: "Your lab container is now fully operational.",
        });
      } catch (error) {
        console.error('Error checking container status:', error);
        
        // Don't clear the interval yet unless we've reached max retries
        if (retryCount >= maxRetries) {
          clearInterval(checkInterval);
          setTerminal(prev => [
            ...prev, 
            '$ Container may still be starting up.',
            '$ If you cannot access the lab, try the direct IP URL or restart the lab.'
          ]);
        } else {
          setTerminal(prev => [...prev, `$ Container not ready yet, retrying in 6 seconds...`]);
        }
      }
    }, retryInterval);
    
    return checkInterval;
  };

  const stopLab = async () => {
    if (!currentLab || labInstance.status !== 'running') return;
    
    try {
      setTerminal(prev => [...prev, '$ Stopping lab environment...', '$ Removing Docker container...']);
      
      // Call the API to stop the lab instance
      const response = await labsAPI.stopLab(currentLab.id);
      
      if (response.status === 'success') {
        setLabInstance({
          status: 'stopped'
        });
        
        setTerminal(prev => [
          ...prev,
          '$ Lab container successfully stopped and removed!',
          '$ You can launch a new lab instance anytime.'
        ]);
        
        toast({
          title: "Lab Environment Stopped",
          description: "Your lab container has been safely removed.",
        });
      } else {
        throw new Error(response.error || 'Unknown error stopping lab');
      }
    } catch (error) {
      console.error('Error stopping lab:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      toast({
        variant: "destructive",
        title: "Error Stopping Lab",
        description: errorMessage,
      });
      
      setTerminal(prev => [
        ...prev,
        '$ Error stopping lab container.',
        `$ ${errorMessage}`,
        '$ You may need to manually remove the container.'
      ]);
    }
  };
  
  const restartLab = async () => {
    if (!currentLab) return;
    
    try {
      setTerminal(prev => [...prev, '$ Restarting lab environment...', '$ Recreating Docker container...']);
      
      // Call the API to restart the lab instance
      const response = await labsAPI.restartLab(currentLab.id);
      
      if (response.status === 'success' && (response.url || response.direct_ip_url)) {
        // Store both URLs for fallback
        const primaryUrl = response.url || '';
        const fallbackUrl = response.direct_ip_url || '';
        
        setLabInstance({
          status: 'running',
          url: primaryUrl,
          direct_ip_url: fallbackUrl,
          message: response.message
        });
        
        setWebAppUrl(primaryUrl);
        
        setTerminal(prev => [
          ...prev,
          '$ Lab environment restarted successfully!',
          `$ Your lab is accessible at: ${primaryUrl}`,
          fallbackUrl ? `$ Backup direct IP access: ${fallbackUrl}` : '',
          '$ You can now access your lab in the browser tab.'
        ]);
        
        toast({
          title: "Lab Environment Restarted",
          description: `Your lab is now running at ${primaryUrl}`,
        });
        
        // Start checking container status to ensure it's fully ready
        startContainerStatusCheck(response.lab_id || currentLab.id);
      } else {
        throw new Error(response.error || 'Unknown error restarting lab');
      }
    } catch (error) {
      console.error('Error restarting lab:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      toast({
        variant: "destructive",
        title: "Error Restarting Lab",
        description: errorMessage,
      });
      
      setTerminal(prev => [
        ...prev,
        '$ Error restarting lab environment.',
        `$ ${errorMessage}`,
        '$ Please try again or contact support.'
      ]);
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!command.trim()) return;
    
    // Add user command to terminal
    setTerminal(prev => [...prev, `$ ${command}`]);
    
    // Process command (simplified example)
    if (command.toLowerCase() === 'help') {
      setTerminal(prev => [...prev, 
        'Available commands:',
        '  help - Show this help message',
        '  clear - Clear the terminal',
        '  launch - Launch the lab environment',
        '  stop - Stop the lab environment',
        '  restart - Restart the lab environment',
        '  status - Check lab environment status',
        '  exit - Exit the current lab'
      ]);
    } else if (command.toLowerCase() === 'clear') {
      setTerminal([]);
    } else if (command.toLowerCase() === 'launch') {
      if (labInstance.status === 'running') {
        setTerminal(prev => [...prev, 'Lab environment is already running.']);
      } else {
        launchLabEnvironment();
      }
    } else if (command.toLowerCase() === 'stop') {
      if (labInstance.status === 'running') {
        stopLab();
      } else {
        setTerminal(prev => [...prev, 'No running lab environment to stop.']);
      }
    } else if (command.toLowerCase() === 'restart') {
      restartLab();
    } else if (command.toLowerCase() === 'status') {
      setTerminal(prev => [...prev, `Lab status: ${labInstance.status}`]);
      if (labInstance.url) {
        setTerminal(prev => [...prev, `Lab URL: ${labInstance.url}`]);
      }
    } else if (command.toLowerCase() === 'exit') {
      toast({
        title: "Lab Exited",
        description: "Your progress has been saved.",
      });
      navigate('/labs');
    } else {
      setTerminal(prev => [...prev, `Command not recognized: ${command}`]);
    }
    
    // Clear command input
    setCommand('');
  };

  const getLabStatusBadge = () => {
    switch (labInstance.status) {
      case 'running':
        return <span className="inline-flex items-center bg-green-500/20 text-green-500 px-2 py-1 rounded text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
          Running
        </span>;
      case 'stopped':
        return <span className="inline-flex items-center bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-yellow-500 mr-1.5"></span>
          Stopped
        </span>;
      case 'error':
        return <span className="inline-flex items-center bg-red-500/20 text-red-500 px-2 py-1 rounded text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></span>
          Error
        </span>;
      default:
        return <span className="inline-flex items-center bg-blue-500/20 text-blue-500 px-2 py-1 rounded text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>
          Ready to Launch
        </span>;
    }
  };

  const isWebLab = currentLab?.category === 'Web Security';

  // Handle DNS errors and provide fallback
  const handleLabUrlError = (event: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
    console.log('Lab URL load error:', event);
    
    // If we have a fallback direct IP URL, use it
    if (labInstance.direct_ip_url && labInstance.url !== labInstance.direct_ip_url) {
      toast({
        title: "DNS Error Detected",
        description: "Switching to direct IP access URL...",
      });
      
      setWebAppUrl(labInstance.direct_ip_url);
      setTerminal(prev => [
        ...prev,
        '$ DNS error detected. Switching to direct IP access...',
        `$ Using fallback URL: ${labInstance.direct_ip_url}`
      ]);
    }
  };

  if (loading) return <div className="bg-nerds-darkblue min-h-screen flex items-center justify-center text-white">Loading lab environment...</div>;
  if (error) return <div className="bg-nerds-darkblue min-h-screen flex items-center justify-center text-white">Error loading lab: {error}</div>;
  if (!currentLab) return <div className="bg-nerds-darkblue min-h-screen flex items-center justify-center text-white">Lab not found</div>;

  return (
    <>
      <Helmet>
        <title>{currentLab.title} | Cyber Nerds Academy</title>
      </Helmet>
      
      <div className="bg-nerds-darkblue min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-nerds-gray/20 backdrop-blur-lg border-b border-nerds-gray/30 py-3 px-4">
          <div className="container max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white mr-4"
                onClick={() => navigate('/labs')}
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Labs
              </Button>
              <h1 className="text-white font-medium flex items-center">
                {currentLab.title} 
                <span className="ml-3">{getLabStatusBadge()}</span>
              </h1>
            </div>
            <div className="flex items-center gap-2">
              {labInstance.status === 'pending' && (
                <Button 
                  size="sm" 
                  className="bg-nerds-green text-nerds-darkblue hover:bg-nerds-green/90"
                  onClick={launchLabEnvironment}
                  disabled={isLaunching}
                >
                  {isLaunching ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-1 animate-spin" /> Launching...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-1" /> Launch Lab
                    </>
                  )}
                </Button>
              )}
              
              {labInstance.status === 'running' && (
                <>
                  <Button 
                    size="sm" 
                    className="bg-nerds-yellow text-nerds-darkblue hover:bg-nerds-yellow/90"
                    onClick={stopLab}
                  >
                    <ServerCrash className="w-4 h-4 mr-1" /> Stop Lab
                  </Button>
                  
                  <Button 
                    size="sm" 
                    className="bg-nerds-green text-nerds-darkblue hover:bg-nerds-green/90"
                    onClick={() => window.open(labInstance.url, '_blank')}
                  >
                    <Globe className="w-4 h-4 mr-1" /> Open in New Tab
                  </Button>
                </>
              )}
              
              {labInstance.status === 'stopped' && (
                <Button 
                  size="sm" 
                  className="bg-nerds-green text-nerds-darkblue hover:bg-nerds-green/90"
                  onClick={restartLab}
                >
                  <RefreshCw className="w-4 h-4 mr-1" /> Restart Lab
                </Button>
              )}
              
              <Button 
                size="sm" 
                className="bg-nerds-yellow/20 hover:bg-nerds-yellow/30 text-nerds-yellow"
                onClick={() => {
                  toast({
                    title: "Help Available",
                    description: "Use the help tab for guidance or type 'help' in the terminal.",
                  });
                }}
              >
                <HelpCircle className="w-4 h-4 mr-1" /> Get Help
              </Button>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <div className="flex-1 container max-w-7xl mx-auto p-4 flex flex-col">
          <Tabs defaultValue="terminal" className="flex-1 flex flex-col">
            <TabsList className="mx-auto mb-4 bg-nerds-gray/20">
              <TabsTrigger value="terminal" className="data-[state=active]:bg-nerds-green data-[state=active]:text-nerds-darkblue">
                <Terminal className="w-4 h-4 mr-2" /> Terminal
              </TabsTrigger>
              
              {labInstance.status === 'running' && (
                <TabsTrigger value="browser" className="data-[state=active]:bg-nerds-green data-[state=active]:text-nerds-darkblue">
                  <Globe className="w-4 h-4 mr-2" /> Browser
                </TabsTrigger>
              )}
              
              <TabsTrigger value="instructions" className="data-[state=active]:bg-nerds-green data-[state=active]:text-nerds-darkblue">
                <Info className="w-4 h-4 mr-2" /> Instructions
              </TabsTrigger>
              
              <TabsTrigger value="tasks" className="data-[state=active]:bg-nerds-green data-[state=active]:text-nerds-darkblue">
                <ListChecks className="w-4 h-4 mr-2" /> Tasks
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="terminal" className="flex-1 flex flex-col">
              <div className="bg-black/90 rounded-lg p-4 flex-1 overflow-y-auto font-mono text-sm text-green-500">
                {terminal.map((line, index) => (
                  <div key={index} className="mb-1">
                    {line}
                  </div>
                ))}
              </div>
              <form onSubmit={handleCommand} className="mt-2 flex">
                <span className="bg-black/90 text-green-500 p-2 rounded-l-md font-mono">$</span>
                <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  className="flex-1 bg-black/90 text-green-500 p-2 outline-none font-mono rounded-r-md"
                  placeholder="Enter command..."
                  autoFocus
                />
              </form>
            </TabsContent>
            
            {labInstance.status === 'running' && (
              <TabsContent value="browser" className="flex-1 flex flex-col">
                <div className="flex flex-col h-full border border-nerds-gray/30 rounded-lg overflow-hidden">
                  {/* Browser chrome */}
                  <div className="bg-nerds-gray/30 p-2 flex items-center gap-2">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 bg-nerds-gray/20 rounded px-3 py-1 text-sm text-gray-300 flex items-center">
                      <span className="truncate">{webAppUrl}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-400 hover:text-white"
                      onClick={() => window.open(labInstance.url, '_blank')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </Button>
                  </div>
                  
                  {/* Web content iframe */}
                  <div className="flex-1 relative">
                    <iframe 
                      src={webAppUrl}
                      title="Lab Environment"
                      className="w-full h-full border-0"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                      onError={handleLabUrlError}
                    ></iframe>
                  </div>
                </div>
              </TabsContent>
            )}
            
            <TabsContent value="instructions" className="flex-1">
              <div className="bg-nerds-gray/10 rounded-lg p-6 h-full overflow-y-auto">
                <h2 className="text-xl text-white font-bold mb-4">{currentLab.title}</h2>
                <p className="text-gray-300 mb-4">{currentLab.description}</p>
                
                <h3 className="text-lg text-white font-medium mb-3">Objectives</h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-6">
                  <li>Understand the basic concepts of {currentLab.category}</li>
                  <li>Learn how to use appropriate tools to identify vulnerabilities</li>
                  <li>Practice exploitation techniques in a controlled environment</li>
                  <li>Implement proper remediation and prevention measures</li>
                </ul>
                
                <h3 className="text-lg text-white font-medium mb-3">Getting Started</h3>
                <ol className="list-decimal pl-5 text-gray-300 space-y-2">
                  <li>Launch your lab environment using the "Launch Lab" button</li>
                  <li>Once launched, you can access your lab in the browser tab</li>
                  <li>Use the terminal for additional commands and tools</li>
                  <li>Follow the tasks in the Tasks tab to complete the lab</li>
                </ol>
              </div>
            </TabsContent>
            
            <TabsContent value="tasks" className="flex-1">
              <div className="bg-nerds-gray/10 rounded-lg p-6 h-full overflow-y-auto">
                <h2 className="text-xl text-white font-bold mb-4">Lab Tasks</h2>
                <p className="text-gray-300 mb-6">Complete the following tasks to finish this lab.</p>
                
                {/* Task List */}
                <div className="space-y-4">
                  <div className="bg-nerds-gray/20 p-4 rounded-lg border border-nerds-gray/30">
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-nerds-gray/30 text-gray-400 mr-3 mt-0.5">
                        1
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Launch the Lab Environment</h3>
                        <p className="text-gray-400 mt-1 text-sm">Start your lab environment and ensure it's running properly.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-nerds-gray/20 p-4 rounded-lg border border-nerds-gray/30">
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-nerds-gray/30 text-gray-400 mr-3 mt-0.5">
                        2
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Explore the Environment</h3>
                        <p className="text-gray-400 mt-1 text-sm">Familiarize yourself with the lab interface and available tools.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-nerds-gray/20 p-4 rounded-lg border border-nerds-gray/30">
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-nerds-gray/30 text-gray-400 mr-3 mt-0.5">
                        3
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Identify Vulnerabilities</h3>
                        <p className="text-gray-400 mt-1 text-sm">Find at least two security vulnerabilities in the application.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-nerds-gray/20 p-4 rounded-lg border border-nerds-gray/30">
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-nerds-gray/30 text-gray-400 mr-3 mt-0.5">
                        4
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Exploit the Vulnerabilities</h3>
                        <p className="text-gray-400 mt-1 text-sm">Successfully exploit the vulnerabilities you've identified.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-nerds-gray/20 p-4 rounded-lg border border-nerds-gray/30">
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-nerds-gray/30 text-gray-400 mr-3 mt-0.5">
                        5
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Document Your Findings</h3>
                        <p className="text-gray-400 mt-1 text-sm">Create a brief report describing the vulnerabilities and your exploitation process.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default LabEnvironment;
