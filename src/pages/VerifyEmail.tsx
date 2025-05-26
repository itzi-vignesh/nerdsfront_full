import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, XCircle, MailQuestion } from 'lucide-react';
import api from '@/api/api';

const VerifyEmail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // Extract token from URL
  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  
  // Check email address from URL for resend functionality
  const emailParam = query.get('email');
  if (emailParam && !email) {
    setEmail(emailParam);
  }

  useEffect(() => {
    if (!token) {
      setIsVerifying(false);
      setIsValid(false);
      setError('No verification token found in URL.');
      return;
    }

    const checkToken = async () => {
      try {
        console.log("Checking token validity:", token);
        const response = await api.get(`/accounts/verify-email/?token=${token}`);
        console.log("Token check response:", response.data);
        
        setIsValid(response.data.is_valid);
        if (!response.data.is_valid) {
          setError(response.data.error || 'Invalid or expired token');
        } else {
          // If token is valid, automatically verify the email
          handleVerify();
        }
      } catch (error: any) {
        console.error('Token validation error:', error);
        setIsValid(false);
        setError('Failed to validate token');
      } finally {
        setIsVerifying(false);
      }
    };

    checkToken();
  }, [token]);

  const handleVerify = async () => {
    if (!token) return;
    
    setIsVerifying(true);
    try {
      console.log("Verifying email with token:", token);
      const response = await api.post('/accounts/verify-email/', { token });
      console.log("Verification response:", response.data);
      
      setMessage('Email verified successfully! Your account is now active.');
      setIsValid(true);
      
      // If the API returns a token, store it and navigate to dashboard
      if (response.data.token) {
        setToken(response.data.token);
        
        // Show success message for 2 seconds before redirecting
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Email verification error:', error);
      console.error('Error details:', error.response?.data);
      setIsValid(false);
      setError(error.response?.data?.error || 'Failed to verify email');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setIsVerifying(true);
    try {
      await api.post('/accounts/resend-verification/', { email });
      setMessage(`Verification email has been resent to ${email}. Please check your inbox.`);
    } catch (error: any) {
      console.error('Resend verification error:', error);
      setError(error.response?.data?.error || 'Failed to resend verification email');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Verify Email | Cyber Nerds Academy</title>
      </Helmet>
      
      <Navbar />
      
      <div className="min-h-screen bg-nerds-darkblue flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-white">
            Email Verification
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Complete your account setup
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
          <Card className="border-nerds-gray/30 bg-nerds-darkblue/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-center">
                {isVerifying ? (
                  <Loader2 className="h-10 w-10 text-nerds-green animate-spin mx-auto" />
                ) : isValid === true ? (
                  <CheckCircle className="h-10 w-10 text-nerds-green mx-auto" />
                ) : isValid === false ? (
                  <XCircle className="h-10 w-10 text-red-500 mx-auto" />
                ) : (
                  <MailQuestion className="h-10 w-10 text-nerds-yellow mx-auto" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              {isVerifying ? (
                <p className="text-gray-300">Verifying your email...</p>
              ) : isValid === true ? (
                <>
                  {message && (
                    <Alert className="mb-4 bg-nerds-green/20 border-nerds-green">
                      <CheckCircle className="h-4 w-4" />
                      <AlertTitle>Success</AlertTitle>
                      <AlertDescription>{message}</AlertDescription>
                    </Alert>
                  )}
                  <p className="text-gray-300 mb-4">Your email has been verified successfully.</p>
                  <Button 
                    onClick={() => navigate('/login')}
                    className="bg-nerds-green text-nerds-darkblue hover:bg-nerds-green/90"
                  >
                    Login to Your Account
                  </Button>
                </>
              ) : isValid === false ? (
                <>
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <XCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <p className="text-gray-300 mb-4">We couldn't verify your email with this link.</p>
                  <div className="space-y-4">
                    {token && (
                      <Button 
                        onClick={handleVerify}
                        className="bg-nerds-green text-nerds-darkblue hover:bg-nerds-green/90 w-full"
                        disabled={isVerifying}
                      >
                        {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Try Again
                      </Button>
                    )}
                    <div className="text-sm text-gray-400 py-2">or</div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-300">
                        Need a new verification link?
                      </p>
                      <div className="flex flex-col space-y-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="bg-nerds-gray/20 border-nerds-gray/30 text-white px-4 py-2 rounded-md"
                        />
                        <Button 
                          onClick={handleResendVerification}
                          className="bg-nerds-blue text-white hover:bg-nerds-blue/90"
                          disabled={isVerifying || !email}
                        >
                          {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Resend Verification Email
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-300">Please wait while we process your request...</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default VerifyEmail; 