import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  const { token, setToken, changePassword } = useAuth();

  // Clear the form on close
  useEffect(() => {
    if (!open) {
      // Reset form
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setNewPasswordConfirm('');
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setValidationError('');
    setServerErrors([]);
    setCurrentPasswordError('');
    setNewPasswordError('');
    setConfirmPasswordError('');
  };

  // Form validation
  const validateForm = () => {
    if (!currentPassword) {
      setValidationError('Current password is required');
      return false;
    }
    if (!newPassword) {
      setValidationError('New password is required');
      return false;
    }
    if (!newPasswordConfirm) {
      setValidationError('Please confirm your new password');
      return false;
    }
    if (newPassword !== newPasswordConfirm) {
      setValidationError('New passwords do not match');
      return false;
    }
    if (newPassword.length < 8) {
      setValidationError('New password must be at least 8 characters');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setServerErrors([]);
    setCurrentPasswordError('');
    setNewPasswordError('');
    setConfirmPasswordError('');
    setValidationError('');
    
    try {
      const result = await changePassword(currentPassword, newPassword, newPasswordConfirm);
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Your password has been changed successfully.',
          variant: 'default',
        });
        onOpenChange(false);
        resetForm();
      } else if (result.errors) {
        // Handle field-specific errors from the server
        const errors: string[] = [];
        
        // Handle current_password errors
        if (result.errors.current_password) {
          const currentErrors = Array.isArray(result.errors.current_password) 
            ? result.errors.current_password 
            : [result.errors.current_password];
          setCurrentPasswordError(currentErrors[0]);
          errors.push(...currentErrors);
        }
        
        // Handle new_password errors
        if (result.errors.new_password) {
          const newPasswordErrors = Array.isArray(result.errors.new_password) 
            ? result.errors.new_password 
            : [result.errors.new_password];
          setNewPasswordError(newPasswordErrors[0]);
          errors.push(...newPasswordErrors);
        }
        
        // Handle generic errors
        if (result.errors.error) {
          const genericErrors = Array.isArray(result.errors.error) 
            ? result.errors.error 
            : [result.errors.error];
          setValidationError(genericErrors[0]);
          errors.push(...genericErrors);
        }
        
        // Set all errors for display in the server errors section
        if (errors.length > 0) {
          setServerErrors(errors);
        }
      }
    } catch (error: any) {
      setValidationError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-nerds-darkblue border-nerds-gray/30">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-nerds-green" />
            Change Password
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Update your password to keep your account secure.
          </DialogDescription>
        </DialogHeader>
        
        {validationError && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-md text-red-500 text-sm">
            {validationError}
          </div>
        )}
        
        {serverErrors.length > 0 && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-md text-red-500 text-sm">
            <p className="font-semibold mb-1">Password validation errors:</p>
            <ul className="list-disc pl-4">
              {serverErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-white">
              Current Password
            </Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`pr-10 bg-nerds-gray/20 border-nerds-gray/30 text-white ${currentPasswordError ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-white"
              >
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {currentPasswordError && (
              <p className="text-sm text-red-500 mt-1">{currentPasswordError}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-white">
              New Password
            </Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`pr-10 bg-nerds-gray/20 border-nerds-gray/30 text-white ${newPasswordError ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-white"
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {newPasswordError && (
              <p className="text-sm text-red-500 mt-1">{newPasswordError}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-white">
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                className={`pr-10 bg-nerds-gray/20 border-nerds-gray/30 text-white ${confirmPasswordError ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {confirmPasswordError && (
              <p className="text-sm text-red-500 mt-1">{confirmPasswordError}</p>
            )}
          </div>
          
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-nerds-gray/30 text-gray-400 hover:bg-nerds-gray/20 hover:text-white"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-nerds-green text-nerds-darkblue hover:bg-nerds-green/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
