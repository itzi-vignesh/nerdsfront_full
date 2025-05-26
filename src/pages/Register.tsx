import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { authAPI } from '@/api/api';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedHeroBackground from '@/components/AnimatedHeroBackground';
import { useAuth } from '@/contexts/AuthContext';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.password2) newErrors.password2 = 'Passwords do not match';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const response = await authAPI.register(
        formData.username,
        formData.email,
        formData.password,
        formData.password2,
        formData.first_name,
        formData.last_name
      );
      
      if (response.data?.token) {
        toast({
          title: 'Registration successful!',
          description: 'Your account has been created.',
        });
        
        // Auto-login the user
        login(formData.username, formData.password);
        navigate('/dashboard');
      } else {
        toast({
          title: 'Registration successful!',
          description: 'Please check your email to verify your account.',
          variant: 'default',
        });
        
        navigate('/login');
      }
    } catch (error: any) {
      const responseErrors = error.response?.data || {};
      
      // Format backend validation errors
      if (typeof responseErrors === 'object') {
        const formattedErrors: Record<string, string> = {};
        
        Object.entries(responseErrors).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            formattedErrors[key] = value[0] as string;
          } else if (typeof value === 'string') {
            formattedErrors[key] = value;
          }
        });
        
        setErrors(formattedErrors);
      } else {
        toast({
          title: 'Registration failed',
          description: 'Please try again later.',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <AnimatedHeroBackground />
        
        <Card className="w-full max-w-md z-10 border-border/50 bg-background/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">
              Join NerdsLab Cyber Academy to start your cybersecurity journey
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className={errors.username ? 'border-destructive' : ''}
                />
                {errors.username && <p className="text-destructive text-sm">{errors.username}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="First name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Last name"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={errors.password ? 'border-destructive' : ''}
                />
                {errors.password && <p className="text-destructive text-sm">{errors.password}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password2">Confirm Password</Label>
                <Input
                  id="password2"
                  name="password2"
                  type="password"
                  value={formData.password2}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={errors.password2 ? 'border-destructive' : ''}
                />
                {errors.password2 && <p className="text-destructive text-sm">{errors.password2}</p>}
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Register'}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Register; 