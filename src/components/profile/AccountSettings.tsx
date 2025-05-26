
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Linkedin, Bell, Shield, Globe, Lock } from "lucide-react";
import { toast } from '@/components/ui/use-toast';
import ChangePasswordDialog from '@/components/ChangePasswordDialog';

const AccountSettings: React.FC = () => {
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    profileVisibility: 'public',
    twoFactorAuth: false
  });
  
  const handleLinkedInConnect = () => {
    if (!linkedInUrl) {
      toast({
        title: "Error",
        description: "Please enter a LinkedIn URL",
        variant: "destructive"
      });
      return;
    }
    
    setIsConnecting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "LinkedIn Connected",
        description: "Your LinkedIn profile has been connected successfully"
      });
      setIsConnecting(false);
    }, 1500);
  };
  
  const handleSettingChange = (setting: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
    
    toast({
      title: "Setting Updated",
      description: `${setting} has been updated successfully`
    });
  };
  
  return (
    <>
      <Card className="border-nerds-gray/30 bg-nerds-darkblue/20 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-white">Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* LinkedIn Integration */}
          <div className="border-b border-nerds-gray/20 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Linkedin className="text-nerds-blue w-5 h-5" />
              <h3 className="text-white font-medium">LinkedIn Integration</h3>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Connect your LinkedIn profile to display your professional achievements
            </p>
            <div className="flex gap-3">
              <Input
                placeholder="LinkedIn Profile URL"
                className="bg-nerds-gray/20 border-nerds-gray/30 text-white flex-1"
                value={linkedInUrl}
                onChange={(e) => setLinkedInUrl(e.target.value)}
              />
              <Button 
                onClick={handleLinkedInConnect}
                disabled={isConnecting}
                className="bg-nerds-blue hover:bg-nerds-blue/80 text-white"
              >
                {isConnecting ? 'Connecting...' : 'Connect'}
              </Button>
            </div>
          </div>
          
          {/* Notification Settings */}
          <div className="border-b border-nerds-gray/20 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Bell className="text-nerds-yellow w-5 h-5" />
              <h3 className="text-white font-medium">Notification Settings</h3>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm">Email Notifications</p>
                <p className="text-gray-400 text-xs">Receive updates, lab notifications via email</p>
              </div>
              <Switch 
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                className="data-[state=checked]:bg-nerds-green"
              />
            </div>
          </div>
          
          {/* Privacy Settings */}
          <div className="border-b border-nerds-gray/20 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="text-nerds-green w-5 h-5" />
              <h3 className="text-white font-medium">Privacy Settings</h3>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm">Profile Visibility</p>
                <p className="text-gray-400 text-xs">Control who can view your profile and achievements</p>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  className={`px-3 py-1 text-xs rounded-md ${
                    settings.profileVisibility === 'public' 
                      ? 'bg-nerds-green text-black' 
                      : 'bg-nerds-gray/30 text-gray-300'
                  }`}
                  onClick={() => handleSettingChange('profileVisibility', 'public')}
                >
                  Public
                </button>
                <button 
                  className={`px-3 py-1 text-xs rounded-md ${
                    settings.profileVisibility === 'private' 
                      ? 'bg-nerds-green text-black' 
                      : 'bg-nerds-gray/30 text-gray-300'
                  }`}
                  onClick={() => handleSettingChange('profileVisibility', 'private')}
                >
                  Private
                </button>
              </div>
            </div>
          </div>
          
          {/* Security Settings */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="text-nerds-red w-5 h-5" />
              <h3 className="text-white font-medium">Security Settings</h3>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white text-sm">Two-Factor Authentication</p>
                <p className="text-gray-400 text-xs">Add an extra layer of security to your account</p>
              </div>
              <Switch 
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                className="data-[state=checked]:bg-nerds-green"
              />
            </div>
            <Button 
              variant="outline" 
              className="w-full border-nerds-red/30 text-nerds-red hover:bg-nerds-red/10 hover:text-nerds-red flex gap-2"
              onClick={() => setShowPasswordDialog(true)}
            >
              <Lock className="w-4 h-4" /> Change Password
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <ChangePasswordDialog 
        open={showPasswordDialog} 
        onOpenChange={setShowPasswordDialog} 
      />
    </>
  );
};

export default AccountSettings;
