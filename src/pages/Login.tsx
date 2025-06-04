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
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  username: z.string().min(3, { message: 'Please enter a valid username' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const Login: React.FC = () => {
  const { login, isLoading } = useAuth();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // Add server errors state
  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({});

  const onSubmit = async (values: FormValues) => {
    // Clear previous server errors
    setServerErrors({});
    
    try {
      const result = await login(values.username, values.password);
      
      if (result && !result.success && result.errors) {
        // Process server errors
        const errors = result.errors;
        const newServerErrors: Record<string, string[]> = {};
        
        // Process username errors
        if (errors.username) {
          const usernameErrors = Array.isArray(errors.username) ? errors.username : [errors.username];
          form.setError('username', {
            type: 'server',
            message: usernameErrors[0]
          });
          newServerErrors.username = usernameErrors;
        }
        
        // Process password errors
        if (errors.password) {
          const passwordErrors = Array.isArray(errors.password) ? errors.password : [errors.password];
          form.setError('password', {
            type: 'server',
            message: passwordErrors[0]
          });
          newServerErrors.password = passwordErrors;
        }
        
        setServerErrors(newServerErrors);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | NerdsLab Cyber Academy</title>
        <meta name="description" content="Login to your NerdsLab Cyber Academy account" />
      </Helmet>
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center">
                <Link to="/forgot-password" className="text-primary hover:underline">
                  Forgot your password?
                </Link>
              </div>
              
              <div className="text-sm text-center">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline">
                  Register here
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Login;
