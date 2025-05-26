import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Mail, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

const VerificationWarning: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resendVerification } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // Get email from URL query parameter or state
  const query = new URLSearchParams(location.search);
  const email = query.get('email') || (location.state as any)?.email || '';
  
  const handleResendVerification = async () => {
    if (!email) {
      setError('No email address found. Please go back to login page.');
      return;
    }
    
    setIsResending(true);
    setMessage('');
    setError('');
    
    try {
      const result = await resendVerification(email);
      if (result.success) {
        setMessage(`Verification email has been resent to ${email}. Please check your inbox.`);
      } else {
        setError('Failed to resend verification email. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsResending(false);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Verify Your Email | Cyber Nerds Academy</title>
      </Helmet>
      
      <Navbar />
      
      <div className="min-h-screen bg-nerds-darkblue flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-white">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Complete your account setup to access the platform
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
          <Card className="border-nerds-gray/30 bg-nerds-darkblue/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-nerds-yellow" />
                Email Verification Required
              </CardTitle>
              <CardDescription className="text-gray-400">
                You need to verify your email address before continuing
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="bg-nerds-gray/10 p-6 rounded-lg mb-6">
                <Mail className="h-12 w-12 text-nerds-green mx-auto mb-4" />
                <p className="text-white font-semibold text-center mb-2">Check your inbox</p>
                {email && (
                  <>
                    <p className="text-gray-300 text-sm text-center mb-2">
                      We've sent a verification email to:
                    </p>
                    <p className="text-nerds-yellow mb-4 font-mono text-sm bg-nerds-darkblue/50 p-2 rounded text-center">
                      {email}
                    </p>
                  </>
                )}
                <p className="text-gray-300 text-sm text-center">
                  Click the link in the email to activate your account and get started
                </p>
              </div>
              
              {message && (
                <Alert className="mb-4 bg-nerds-green/20 border-nerds-green">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
              
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-4">
                <p className="text-gray-400 text-sm text-center">
                  If you don't see the email, check your spam folder or request a new verification link
                </p>
                
                <div className="flex flex-col space-y-4">
                  <Button 
                    onClick={handleResendVerification}
                    className="bg-nerds-yellow text-nerds-darkblue hover:bg-nerds-yellow/90 w-full"
                    disabled={isResending || !email}
                  >
                    {isResending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resending...
                      </>
                    ) : 'Resend Verification Email'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/login')}
                    className="border-nerds-gray/30 text-gray-400 hover:bg-nerds-gray/20 hover:text-white"
                  >
                    Back to Login
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default VerificationWarning; 