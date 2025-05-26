import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mail, Loader2 } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';

interface VerificationPendingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
}

const VerificationPending: React.FC<VerificationPendingProps> = ({ 
  open, 
  onOpenChange,
  email
}) => {
  const navigate = useNavigate();
  const { resendVerification } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [resendError, setResendError] = useState('');

  const handleResendVerification = async () => {
    if (!email) return;
    
    setIsResending(true);
    setResendMessage('');
    setResendError('');
    
    try {
      const result = await resendVerification(email);
      if (result.success) {
        setResendMessage(`Verification email has been resent to ${email}`);
      } else {
        setResendError('Failed to resend verification email. Please try again.');
      }
    } catch (error) {
      setResendError('An unexpected error occurred. Please try again.');
    } finally {
      setIsResending(false);
    }
  };
  
  const handleClose = () => {
    onOpenChange(false);
    navigate('/login');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-nerds-darkblue border-nerds-gray/30">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Mail className="h-5 w-5 text-nerds-green" />
            Verify Your Email
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            We've sent a verification email to your inbox
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-4 text-center">
          <div className="bg-nerds-gray/10 p-6 rounded-lg mb-4">
            <Mail className="h-12 w-12 text-nerds-green mx-auto mb-4" />
            <p className="text-white font-semibold mb-2">Check your inbox</p>
            <p className="text-gray-300 text-sm mb-4">
              We've sent a verification email to:
            </p>
            <p className="text-nerds-yellow mb-4 font-mono text-sm bg-nerds-darkblue/50 p-2 rounded">
              {email}
            </p>
            <p className="text-gray-300 text-sm">
              Click the link in the email to activate your account and get started
            </p>
          </div>
          
          {resendMessage && (
            <Alert className="mb-4 bg-nerds-green/20 border-nerds-green">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{resendMessage}</AlertDescription>
            </Alert>
          )}
          
          {resendError && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{resendError}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4 mb-4">
            <p className="text-gray-400 text-sm">
              If you don't see the email, check your spam folder or request a new verification link
            </p>
            
            <Button 
              onClick={handleResendVerification}
              className="bg-nerds-yellow text-nerds-darkblue hover:bg-nerds-yellow/90"
              disabled={isResending}
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resending...
                </>
              ) : 'Resend Verification Email'}
            </Button>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-center">
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="border-nerds-gray/30 text-gray-400 hover:bg-nerds-gray/20 hover:text-white"
          >
            Login with a Different Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationPending; 