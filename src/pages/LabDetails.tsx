import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { labsAPI, labsAPIWrapper } from '@/lib/api';
import { LabFrame } from '@/components/LabFrame';

interface Lab {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  estimated_minutes: number;
  points_awarded: number;
  lab_type: string;
  docker_image: string;
  status?: 'running' | 'stopped';
  created_at?: string;
  url?: string;
}

const difficultyColors = {
  beginner: 'bg-green-500',
  intermediate: 'bg-yellow-500',
  advanced: 'bg-red-500',
};

const LabDetails: React.FC = () => {
  const { labId } = useParams<{ labId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [lab, setLab] = useState<Lab | null>(null);
  const [loading, setLoading] = useState(true);
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'deployed' | 'error'>('idle');
  const [deploymentUrl, setDeploymentUrl] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchLab = async () => {
      try {
        const data = await labsAPI.getLab(labId!);
        setLab(data);
        
        // Check if lab is already running
        try {
          const status = await labsAPIWrapper.getLabStatus(labId!);
          if (status.status === 'running') {
            setDeploymentStatus('deployed');
            setDeploymentUrl(status.url);
          }
        } catch (error) {
          console.error('Error checking lab status:', error);
        }
      } catch (error) {
        console.error('Error fetching lab:', error);
        toast({
          title: 'Error',
          description: 'Failed to load lab details',
          variant: 'destructive',
        });
        navigate('/labs');
      } finally {
        setLoading(false);
      }
    };

    fetchLab();
  }, [labId, navigate, toast]);
  
  const handleDeploy = async () => {
    if (!labId) return;
    
    try {
      setDeploymentStatus('deploying');
      const response = await labsAPIWrapper.startLab(labId);
      
      setDeploymentUrl(response.url);
      setLab(prev => ({
        ...prev!,
        url: response.url,
        status: 'running'
      }));
      setDeploymentStatus('deployed');
      
      toast({
        title: "Lab Deployed",
        description: "Your lab environment is now running",
      });
    } catch (error: any) {
      console.error('Deployment error:', error);
      setDeploymentStatus('error');
      
      // Handle specific error cases
      if (error.response?.data?.error === 'Lab session already exists for this user') {
        toast({
          title: "Lab Session Exists",
          description: "You already have a lab session running. Please stop it first.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Deployment Failed",
          description: error.response?.data?.error || "Failed to deploy lab. Please try again.",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleReset = async () => {
    if (!labId) return;
    
    try {
      setDeploymentStatus('deploying');
      const response = await labsAPI.restartLab(labId);
      
      if (response.status === 'success') {
        setDeploymentUrl(response.url);
        setLab(prev => ({
          ...prev!,
          url: response.url,
          status: 'running'
        }));
        setDeploymentStatus('deployed');
        
        toast({
          title: 'Lab Reset',
          description: 'Lab environment has been reset successfully',
        });
      } else {
        throw new Error(response.message || 'Failed to reset lab');
      }
    } catch (error: any) {
      setDeploymentStatus('error');
      toast({
        title: 'Reset Failed',
        description: error.message || 'Failed to reset lab. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  const handleStop = async () => {
    if (!labId) return;
    
    try {
      await labsAPIWrapper.stopLab(labId);
      setDeploymentStatus('idle');
      setDeploymentUrl(null);
      
      // Update the lab object
      setLab(prev => ({
        ...prev!,
        status: 'stopped',
        url: undefined
      }));
      
      toast({
        title: 'Lab Stopped',
        description: 'Lab environment has been stopped successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Stop Failed',
        description: error.response?.data?.error || 'Failed to stop lab. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Loading Lab Details - NerdsLab</title>
        </Helmet>
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">Loading lab details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!lab) {
    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Lab Not Found - NerdsLab</title>
        </Helmet>
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Lab Not Found</CardTitle>
              <CardDescription>The requested lab could not be found.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate('/labs')}>Back to Labs</Button>
            </CardFooter>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{lab.title || 'Lab Details'} - NerdsLab</title>
      </Helmet>
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate('/labs')}
        >
          &larr; Back to Labs
        </Button>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{lab.title}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className={difficultyColors[lab.difficulty as keyof typeof difficultyColors]}>
                        {lab.difficulty}
                      </Badge>
                      <Badge variant="outline">{lab.category}</Badge>
                    </div>
                  </div>
                  
                  {deploymentStatus === 'deployed' && deploymentUrl && (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => window.open(deploymentUrl, '_blank')}
                      >
                        Open in New Tab
                      </Button>
                      <Button 
                        variant="destructive"
                        onClick={handleStop}
                      >
                        Stop Lab
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="instructions">Instructions</TabsTrigger>
                    <TabsTrigger value="hints">Hints</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="py-4">
                    <div className="prose dark:prose-invert max-w-none">
                      <p>{lab.description}</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="instructions" className="py-4">
                    <div className="prose dark:prose-invert max-w-none">
                      <h3>Lab Instructions</h3>
                      <p>Follow these steps to complete the lab:</p>
                      <ol>
                        <li>Deploy the lab environment using the "Deploy Lab" button</li>
                        <li>Access the lab environment through your browser</li>
                        <li>Complete the challenges according to the lab instructions</li>
                        <li>Submit your findings or flags as required</li>
                      </ol>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="hints" className="py-4">
                    <div className="prose dark:prose-invert max-w-none">
                      <h3>Hints</h3>
                      <p>If you get stuck, consider the following hints:</p>
                      <ul>
                        <li>Check for common misconfigurations</li>
                        <li>Look for exposed services</li>
                        <li>Try standard default credentials</li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Lab Environment</CardTitle>
                <CardDescription>
                  Deploy and manage your lab instance
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Status:</span>
                    <Badge variant={deploymentStatus === 'deployed' ? 'default' : 'outline'}>
                      {deploymentStatus === 'deployed' ? 'Running' : 'Stopped'}
                    </Badge>
                  </div>
                  
                  {lab.created_at && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Created:</span>
                      <span>{new Date(lab.created_at).toLocaleString()}</span>
                    </div>
                  )}
                  
                  {deploymentUrl && (
                    <>
                      <Separator />
                      <div className="pt-2">
                        <p className="font-medium mb-2">Lab URL:</p>
                        <p className="text-sm break-all mb-4">
                          <a 
                            href={deploymentUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {deploymentUrl}
                          </a>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              
              <CardFooter>
                {deploymentStatus === 'idle' && (
                  <Button 
                    className="w-full" 
                    onClick={handleDeploy}
                  >
                    Deploy Lab
                  </Button>
                )}
                
                {deploymentStatus === 'deploying' && (
                  <Button disabled className="w-full">
                    <span className="mr-2 animate-spin">⟳</span> Deploying...
                  </Button>
                )}
                
                {deploymentStatus === 'deployed' && (
                  <div className="w-full">
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        onClick={handleReset}
                      >
                        Reset
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={handleStop}
                      >
                        Stop
                      </Button>
                    </div>
                  </div>
                )}
                
                {deploymentStatus === 'error' && (
                  <Button 
                    variant="destructive"
                    className="w-full" 
                    onClick={handleDeploy}
                  >
                    Retry Deployment
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
        
        <div className="mt-8">
          {deploymentStatus === 'deployed' && deploymentUrl && (
            <LabFrame
              labId={lab.id}
              labUrl={deploymentUrl}
              labName={lab.title}
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LabDetails; 