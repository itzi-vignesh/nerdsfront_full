import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Loader2, Mail, CheckCircle } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPassword: React.FC = () => {
  const { forgotPassword, isLoading } = useAuth();
  const [emailSent, setEmailSent] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    const success = await forgotPassword(values.email);
    if (success) {
      setEmailSent(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password | Cyber Nerds Academy</title>
      </Helmet>
      
      <Navbar />
      
      <div className="min-h-screen bg-nerds-darkblue flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-white">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            We'll send you a link to reset it.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
          <Card className="border-nerds-gray/30 bg-nerds-darkblue/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Reset Password</CardTitle>
              <CardDescription>
                Enter your email address to receive a password reset link
              </CardDescription>
            </CardHeader>
            <CardContent>
              {emailSent ? (
                <div className="text-center py-4">
                  <CheckCircle className="mx-auto h-12 w-12 text-nerds-green mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">Email Sent</h3>
                  <p className="text-gray-400 mb-4">
                    Check your inbox for instructions to reset your password.
                  </p>
                  <Link to="/login">
                    <Button 
                      className="bg-nerds-green text-nerds-darkblue hover:bg-nerds-green/90 mt-2"
                    >
                      Return to Login
                    </Button>
                  </Link>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="your.email@example.com" 
                              className="bg-nerds-gray/20 border-nerds-gray/30 text-white" 
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-nerds-green text-nerds-darkblue hover:bg-nerds-green/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Reset Link
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

export default ForgotPassword;
