import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { authAPI } from '@/api/api';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';
import TermsTerminal from '@/components/TermsTerminal';

const formSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, { message: 'You must agree to the terms and conditions' }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type FormValues = z.infer<typeof formSchema>;

const Signup: React.FC = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [termsDialogOpen, setTermsDialogOpen] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({});
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    // Clear previous server errors
    setServerErrors({});
    setIsLoading(true);
    
    try {
      // Call the API directly to avoid email verification
      const response = await authAPI.register(
        values.username, 
        values.email, 
        values.password, 
        values.confirmPassword, 
        values.firstName, 
        values.lastName
      );
      
      if (response && response.data && response.data.token) {
        // Registration successful
        toast({
          title: "Account created successfully!",
          description: "Welcome to Cyber Nerds Academy!",
        });
        
        // Auto-login the user with the provided credentials
        await login(values.username, values.password);
        
        // Navigate to dashboard
        navigate('/dashboard');
      }
    } catch (error: any) {
      // Process server errors and set them in the form
      const errors = error.response?.data || {};
      const newServerErrors: Record<string, string[]> = {};
      
      // Map backend field names to frontend field names
      const fieldMapping: Record<string, string> = {
        username: 'username',
        email: 'email',
        password: 'password',
        password2: 'confirmPassword',
        first_name: 'firstName',
        last_name: 'lastName'
      };
      
      // Process each field error
      Object.keys(errors).forEach(fieldName => {
        const frontendFieldName = fieldMapping[fieldName] || fieldName;
        const errorMessages = Array.isArray(errors[fieldName]) ? errors[fieldName] : [errors[fieldName]];
        
        // Set the error in the form
        if (frontendFieldName in form.formState.defaultValues) {
          form.setError(frontendFieldName as any, {
            type: 'server',
            message: errorMessages[0]
          });
        }
        
        // Save all errors for display
        newServerErrors[frontendFieldName] = errorMessages;
      });
      
      setServerErrors(newServerErrors);
      
      toast({
        title: "Registration failed",
        description: "Please check the form for errors",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up | Cyber Nerds Academy</title>
      </Helmet>
      
      <Navbar />
      
      <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-foreground">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary/80">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Join the Cyber Nerds Academy community
              </CardDescription>
              
              {Object.keys(serverErrors).length > 0 && (
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/50 rounded-md text-destructive text-sm">
                  <p className="font-semibold mb-1">Please correct the following errors:</p>
                  <ul className="list-disc pl-4">
                    {Object.entries(serverErrors).map(([field, errors]) => (
                      errors.map((error, index) => (
                        <li key={`${field}-${index}`}>{error}</li>
                      ))
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
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="cybernerd42" 
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="John" 
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Doe" 
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="you@example.com" 
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="password" 
                            placeholder="********" 
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="password" 
                            placeholder="********" 
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            I agree to the{' '}
                            <button
                              type="button"
                              className="text-primary hover:underline"
                              onClick={() => setTermsDialogOpen(true)}
                            >
                              terms and conditions
                            </button>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
      
      <TermsTerminal
        open={termsDialogOpen}
        onOpenChange={setTermsDialogOpen}
      />
    </>
  );
};

export default Signup;
