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
      
      // Process non-field errors
      if (errors.non_field_errors) {
        const generalErrors = Array.isArray(errors.non_field_errors) 
          ? errors.non_field_errors 
          : [errors.non_field_errors];
        newServerErrors.general = generalErrors;
      } else if (errors.detail) {
        const detailErrors = Array.isArray(errors.detail) ? errors.detail : [errors.detail];
        newServerErrors.general = detailErrors;
      }
      
      setServerErrors(newServerErrors);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Cyber Nerds Academy</title>
      </Helmet>
      
      <Navbar />
      
      <div className="min-h-screen bg-nerds-darkblue flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Or{' '}
            <Link to="/signup" className="font-medium text-nerds-green hover:text-nerds-green/80">
              create a free account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
          <Card className="border-nerds-gray/30 bg-nerds-darkblue/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Sign in</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
              
              {serverErrors.general && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-md text-red-500 text-sm">
                  <p className="font-semibold mb-1">Error:</p>
                  <ul className="list-disc pl-4">
                    {serverErrors.general.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Username</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="cybernerd42" 
                            className="bg-nerds-gray/20 border-nerds-gray/30 text-white" 
                            disabled={isLoading}
                          />
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
                        <FormLabel className="text-white">Password</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="password" 
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
                        Signing in...
                      </>
                    ) : 'Sign in'}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link to="/forgot-password" className="text-sm text-nerds-green hover:text-nerds-green/80">
                Forgot your password?
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Login;
