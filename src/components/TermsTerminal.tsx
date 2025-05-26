
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, X } from "lucide-react";

interface TermsTerminalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TermsTerminal: React.FC<TermsTerminalProps> = ({ open, onOpenChange }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentLine, setCurrentLine] = useState(0);
  
  const termsText = [
    "# CYBER NERDS ACADEMY - TERMS AND CONDITIONS",
    "",
    "## 1.0 ACCESS GRANTED",
    "By accessing the Cyber Nerds Academy ('the Platform'), you agree to be bound by these terms and conditions ('the Agreement'). Unauthorized access is prohibited and may result in termination of your account and legal action.",
    "",
    "## 2.0 ACCOUNT SECURITY",
    "2.1 You are responsible for maintaining the confidentiality of your login credentials.",
    "2.2 You must immediately notify Cyber Nerds Academy of any unauthorized use of your account.",
    "2.3 We reserve the right to terminate accounts that violate our security protocols.",
    "",
    "## 3.0 ACCEPTABLE USE",
    "3.1 You may not use the Platform for any illegal or unauthorized purpose.",
    "3.2 You agree not to modify, reverse engineer, or attempt to gain unauthorized access to the Platform's code or infrastructure.",
    "3.3 All skills and techniques learned through the Platform must be used ethically and legally.",
    "",
    "## 4.0 INTELLECTUAL PROPERTY",
    "4.1 All content provided on the Platform is the property of Cyber Nerds Academy or its licensors.",
    "4.2 You are granted a limited, non-exclusive license to access and use the content for personal, non-commercial purposes.",
    "4.3 Redistribution or commercial use of any materials from the Platform is strictly prohibited without explicit written permission.",
    "",
    "## 5.0 LIMITATION OF LIABILITY",
    "5.1 THE PLATFORM IS PROVIDED 'AS IS' WITHOUT WARRANTIES OF ANY KIND.",
    "5.2 CYBER NERDS ACADEMY SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES.",
    "5.3 WE DO NOT ENDORSE OR ASSUME RESPONSIBILITY FOR ANY THIRD-PARTY CONTENT OR SERVICES.",
    "",
    "## 6.0 TERMINATION",
    "6.1 We reserve the right to terminate or suspend access to the Platform at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.",
    "",
    "## 7.0 GOVERNING LAW",
    "7.1 These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Cyber Nerds Academy operates, without regard to its conflict of law principles.",
    "",
    "## 8.0 ACKNOWLEDGMENT",
    "By using the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.",
    "",
    "// END OF TERMS AND CONDITIONS //",
    "// CYBER NERDS ACADEMY - SECURING THE DIGITAL FRONTIER //"
  ];

  // Simulate typing effect
  useEffect(() => {
    if (!open) {
      setDisplayedText("");
      setCurrentLine(0);
      return;
    }

    if (currentLine < termsText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + termsText[currentLine] + "\n");
        setCurrentLine(prev => prev + 1);
      }, 50); // Adjust typing speed here
      
      return () => clearTimeout(timer);
    }
  }, [currentLine, open, termsText]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl border-2 border-nerds-green bg-black text-nerds-green font-mono p-0 overflow-hidden shadow-[0_0_20px_rgba(0,255,0,0.5)]">
        <DialogHeader className="bg-nerds-green/10 border-b border-nerds-green/30 p-3 flex flex-row items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            <DialogTitle className="text-nerds-green text-lg">TERMINAL://TERMS_AND_CONDITIONS.sh</DialogTitle>
          </div>
          <DialogClose className="text-nerds-green hover:text-white">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>
        
        <div className="relative">
          <ScrollArea className="h-[60vh]">
            <div className="p-4 relative">
              <pre className="whitespace-pre-wrap">
                {displayedText}
                <span className="inline-block w-2 h-4 bg-nerds-green animate-pulse ml-1"></span>
              </pre>
            </div>
          </ScrollArea>
          
          <div className="absolute bottom-2 right-2">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="bg-nerds-darkblue/30 border border-nerds-green text-nerds-green hover:bg-nerds-green/20"
            >
              ACKNOWLEDGE AND EXIT
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsTerminal;
