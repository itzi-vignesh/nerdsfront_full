import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import ChangePasswordDialog from '@/components/ChangePasswordDialog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updateProfile(formData);
      setIsEditMode(false);
      toast({
        title: 'Profile updated',
        description: 'Your profile information has been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Update failed',
        description: 'Failed to update your profile. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getInitials = () => {
    if (!user) return '?';
    const first = user.first_name?.[0] || '';
    const last = user.last_name?.[0] || '';
    return (first + last).toUpperCase() || user.username?.[0]?.toUpperCase() || '?';
  };

  return (
    <>
      <Helmet>
        <title>Your Profile</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-grow container max-w-4xl mx-auto px-4 py-8">
          <div className="grid gap-8">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.avatar_url} />
                  <AvatarFallback className="text-xl">{getInitials()}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <CardTitle className="text-2xl">
                    {user?.first_name ? `${user.first_name} ${user.last_name}` : user?.username}
                  </CardTitle>
                  <CardDescription>{user?.email}</CardDescription>
                </div>
                
                {!isEditMode && (
                  <Button variant="outline" onClick={() => setIsEditMode(true)}>
                    Edit Profile
                  </Button>
                )}
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={user?.username || ''}
                        disabled
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditMode}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        disabled={!isEditMode}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        disabled={!isEditMode}
                      />
                    </div>
                  </div>
                  
                  {isEditMode && (
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsEditMode(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Save Changes</Button>
                    </div>
                  )}
                </form>
                
                <div className="mt-8 pt-6 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsPasswordDialogOpen(true)}
                  >
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
        
        <ChangePasswordDialog 
          open={isPasswordDialogOpen} 
          onOpenChange={setIsPasswordDialogOpen} 
        />
      </div>
    </>
  );
};

export default Profile; 