import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';
import { labsAPI } from '@/api/api';

interface LabFrameProps {
  labId: string;
  labUrl: string;
  labName: string;
}

export const LabFrame: React.FC<LabFrameProps> = ({ labId, labUrl, labName }) => {
  const [flag, setFlag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check lab status on component mount
    const checkLabStatus = async () => {
      try {
        const status = await labsAPI.getLabStatus();
        // Remove '-lab' suffix for comparison if present
        const normalizedLabId = labId.replace('-lab', '');
        const labStatus = status.find((s: any) => s.lab_id.replace('-lab', '') === normalizedLabId);
        if (labStatus?.is_completed) {
          setIsCompleted(true);
        }
      } catch (error) {
        console.error('Failed to fetch lab status:', error);
      }
    };
    checkLabStatus();
  }, [labId]);

  const handleSubmitFlag = async () => {
    if (!flag.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a flag',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await labsAPI.verifyFlag(labId, flag);
      toast({
        title: result.is_correct ? 'Success!' : 'Incorrect Flag',
        description: result.message,
        variant: result.is_correct ? 'default' : 'destructive',
      });
      if (result.is_correct) {
        setFlag('');
        setIsCompleted(true);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to verify flag. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{labName}</CardTitle>
          {isCompleted && (
            <Badge className="flex items-center gap-1 bg-green-500 text-white">
              <CheckCircle2 className="h-4 w-4" />
              Completed
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          <div className="aspect-video w-full overflow-hidden rounded-lg border">
            <iframe
              src={labUrl}
              className="w-full h-full"
              title={labName}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
          </div>
        </CardContent>
      </Card>

      {!isCompleted && (
        <Card>
          <CardHeader>
            <CardTitle>Submit Flag</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Enter flag here..."
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmitFlag()}
              />
              <Button
                onClick={handleSubmitFlag}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Verifying...' : 'Submit Flag'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}; 