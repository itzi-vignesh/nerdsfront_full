
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, MapPin, Briefcase, Pencil, Save, X } from "lucide-react";

const ProfileInfo: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    location: 'San Francisco, CA',
    bio: 'Cybersecurity enthusiast with 3 years of experience. Passionate about threat hunting and network security.'
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    // In a real app, we would save the data to the server
    setIsEditing(false);
  };
  
  return (
    <Card className="border-nerds-gray/30 bg-nerds-darkblue/20 backdrop-blur-sm">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg text-white">Profile Information</CardTitle>
        {!isEditing ? (
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="w-4 h-4 mr-1" /> Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-400 hover:text-white"
              onClick={() => setIsEditing(false)}
            >
              <X className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-nerds-green hover:text-nerds-green/80"
              onClick={handleSave}
            >
              <Save className="w-4 h-4 mr-1" /> Save
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Full Name</label>
              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="bg-nerds-gray/20 border-nerds-gray/30 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Email</label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-nerds-gray/20 border-nerds-gray/30 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Location</label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="bg-nerds-gray/20 border-nerds-gray/30 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Bio</label>
              <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="bg-nerds-gray/20 border-nerds-gray/30 text-white resize-none"
                rows={4}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start">
              <User className="w-5 h-5 text-nerds-green mr-3 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">Full Name</h4>
                <p className="text-gray-300">{formData.fullName}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-nerds-green mr-3 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">Email</h4>
                <p className="text-gray-300">{formData.email}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-nerds-green mr-3 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">Location</h4>
                <p className="text-gray-300">{formData.location}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Briefcase className="w-5 h-5 text-nerds-green mr-3 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">Bio</h4>
                <p className="text-gray-300">{formData.bio}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;
