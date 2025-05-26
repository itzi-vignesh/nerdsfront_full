import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertCircle, CheckCircle, LockKeyhole } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const formSchema = z.object({
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  password2: z.string().min(8, { message: 'Password must be at least 8 characters' }),
}).refine((data) => data.password === data.password2, {
  message: "Passwords don't match",
  path: ["password2"],
});

type FormValues = z.infer<typeof formSchema>;

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const { resetPassword, isLoading } = useAuth();
  const [resetSuccess, setResetSuccess] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
      setTokenError('Missing reset token. Please check your reset link.');
    }
  }, [token]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      password2: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!token) {
      setTokenError('Missing reset token. Please request a new password reset link.');
      return;
    }
    
    setServerErrors([]); // Clear previous errors
    
    try {
      const result = await resetPassword(token, values.password, values.password2);
      if (result.success) {
        setResetSuccess(true);
        // Redirect to dashboard after 3 seconds if login was successful
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else if (result.errors) {
        // Handle specific error types
        const errors: string[] = [];
        
        // Handle token errors
        if (result.errors.token) {
          const tokenErrors = Array.isArray(result.errors.token) 
            ? result.errors.token 
            : [result.errors.token];
          setTokenError(tokenErrors[0]);
        }
        
        // Handle password errors
        if (result.errors.password) {
          const passwordErrors = Array.isArray(result.errors.password) 
            ? result.errors.password 
            : [result.errors.password];
          
          // Set form error for specific field
          form.setError("password", { 
            type: "server",
            message: passwordErrors[0]
          });
          
          // Add all password errors to the server errors array for display
          errors.push(...passwordErrors);
        }
        
        // Handle password2 errors
        if (result.errors.password2) {
          const password2Errors = Array.isArray(result.errors.password2) 
            ? result.errors.password2 
            : [result.errors.password2];
          
          form.setError("password2", { 
            type: "server",
            message: password2Errors[0]
          });
          
          errors.push(...password2Errors);
        }
        
        // Handle generic errors
        if (result.errors.error) {
          const genericErrors = Array.isArray(result.errors.error) 
            ? result.errors.error 
            : [result.errors.error];
          errors.push(...genericErrors);
        }
        
        // Set all errors for display in the alert
        if (errors.length > 0) {
          setServerErrors(errors);
        }
      }
    } catch (error: any) {
      // Fallback error handling (should not occur with new error structure)
      setServerErrors(['An unexpected error occurred. Please try again.']);
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password | Cyber Nerds Academy</title>
      </Helmet>
      
      <Navbar />
      
      <div className="min-h-screen bg-nerds-darkblue flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Create a new secure password for your account
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
          <Card className="border-nerds-gray/30 bg-nerds-darkblue/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Set New Password</CardTitle>
              <CardDescription>
                Your password must be at least 8 characters and follow our security guidelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tokenError && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{tokenError}</AlertDescription>
                </Alert>
              )}
              
              {serverErrors.length > 0 && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Password Error</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-4 mt-2">
                      {serverErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
              
              {resetSuccess ? (
                <div className="text-center py-4">
                  <CheckCircle className="mx-auto h-12 w-12 text-nerds-green mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">Password Reset Successful</h3>
                  <p className="text-gray-400 mb-4">
                    Your password has been updated. You will be redirected to the dashboard.
                  </p>
                  <Link to="/dashboard">
                    <Button 
                      className="bg-nerds-green text-nerds-darkblue hover:bg-nerds-green/90 mt-2"
                    >
                      Go to Dashboard
                    </Button>
                  </Link>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">New Password</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="password" 
                              placeholder="••••••••" 
                              className="bg-nerds-gray/20 border-nerds-gray/30 text-white" 
                              disabled={isLoading || !!tokenError}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Confirm New Password</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="password" 
                              placeholder="••••••••" 
                              className="bg-nerds-gray/20 border-nerds-gray/30 text-white" 
                              disabled={isLoading || !!tokenError}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-nerds-green text-nerds-darkblue hover:bg-nerds-green/90"
                      disabled={isLoading || !!tokenError}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Resetting password...
                        </>
                      ) : (
                        <>
                          <LockKeyhole className="w-4 h-4 mr-2" />
                          Reset Password
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link to="/login" className="text-sm text-nerds-green hover:text-nerds-green/80">
                Back to login
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ResetPassword; 