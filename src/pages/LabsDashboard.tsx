import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail } from 'lucide-react';
import { labsAPIWrapper, authAPI } from '@/lib/api';

interface User {
  id: number;
  email: string;
  username: string;
  is_verified: boolean;
  first_name: string;
  last_name: string;
}

interface Lab {
  id: string;
  name: string;
  description: string;
  status?: 'running' | 'stopped';
  url?: string;
  subdomain?: string;
}

interface LabState {
  [key: string]: {
    status: 'running' | 'stopped';
    url?: string;
    subdomain?: string;
  };
}

const LabsDashboard: React.FC = () => {
  const [labs, setLabs] = useState<Lab[]>([
    { id: 'lab1', name: 'Web Security Lab', description: 'Learn web security fundamentals' },
    { id: 'lab2', name: 'Network Security Lab', description: 'Explore network security concepts' },
    { id: 'lab3', name: 'Cryptography Lab', description: 'Practice cryptographic techniques' },
  ]);
  const [labStates, setLabStates] = useState<LabState>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const { toast } = useToast();

  const userHash = localStorage.getItem('user_hash') || '';

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setUserLoading(true);
      const response = await authAPI.getCurrentUser();
      setUser(response.data || response);
    } catch (error) {
      console.error('Error fetching user:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch user data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setUserLoading(false);
    }
  };

  const startLab = async (labId: string, labName: string) => {
    if (!user?.is_verified) {
      toast({
        title: 'Email Verification Required',
        description: 'Please verify your email before starting labs.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(prev => ({ ...prev, [labId]: true }));
      
      const response = await labsAPIWrapper.createLabInstance(labId, labName);
      
      setLabStates(prev => ({
        ...prev,
        [labId]: {
          status: 'running',
          url: response.url,
          subdomain: response.subdomain
        }
      }));

      // Open lab in new tab
      window.open(response.url, '_blank');

      toast({
        title: 'Lab Started',
        description: 'Your lab environment is now running',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to start lab. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(prev => ({ ...prev, [labId]: false }));
    }
  };

  const stopLab = async (labId: string, labName: string) => {
    try {
      setLoading(prev => ({ ...prev, [labId]: true }));
      
      await labsAPIWrapper.stopLab(labId, labName);
      
      setLabStates(prev => ({
        ...prev,
        [labId]: {
          status: 'stopped'
        }
      }));

      toast({
        title: 'Lab Stopped',
        description: 'Your lab environment has been stopped',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to stop lab. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(prev => ({ ...prev, [labId]: false }));
    }
  };

  const resendVerification = async () => {
    if (!user?.email) return;
    
    try {
      setVerificationLoading(true);
      await authAPI.resendVerification(user.email);
      toast({ 
        title: 'Verification Email Sent', 
        description: 'Please check your inbox and spam folder.',
      });
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: 'Could not send verification email. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setVerificationLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {user && !user.is_verified && (
        <Card className="mb-6 border-2 border-yellow-400 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Verification Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Please verify your email address ({user.email}) to access the labs. 
              Check your inbox and spam folder for the verification email.
            </p>
            <Button 
              onClick={resendVerification} 
              disabled={verificationLoading}
              className="bg-yellow-500 hover:bg-yellow-600"
            >
              {verificationLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Resend Verification Email'
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      <h1 className="text-3xl font-bold mb-6">Available Labs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labs.map((lab) => (
          <Card key={lab.id} className="w-full">
            <CardHeader>
              <CardTitle>{lab.name}</CardTitle>
              <CardDescription>{lab.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {labStates[lab.id]?.status === 'running' && (
                <div className="mb-4">
                  <p className="text-sm text-green-600">Status: Running</p>
                  <p className="text-sm text-gray-600">Subdomain: {labStates[lab.id].subdomain}</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {labStates[lab.id]?.status === 'running' ? (
                <Button
                  variant="destructive"
                  onClick={() => stopLab(lab.id, lab.name)}
                  disabled={loading[lab.id]}
                >
                  {loading[lab.id] ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Stopping...
                    </>
                  ) : (
                    'Stop Lab'
                  )}
                </Button>
              ) : (
                <Button
                  onClick={() => startLab(lab.id, lab.name)}
                  disabled={loading[lab.id] || !user?.is_verified}
                >
                  {loading[lab.id] ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Starting...
                    </>
                  ) : (
                    'Start Lab'
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LabsDashboard; 