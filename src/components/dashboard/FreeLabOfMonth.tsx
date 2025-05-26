
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Clock, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const FreeLabOfMonth: React.FC = () => {
  return (
    <Card className="border-nerds-gray/30 bg-nerds-darkblue/20 backdrop-blur-sm overflow-hidden">
      <div className="absolute top-0 right-0">
        <Badge className="bg-nerds-green text-black font-bold m-4">
          FREE
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg text-white">
          <Gift className="w-5 h-5 mr-2 text-nerds-green" />
          Free Lab of the Month
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-40 mb-4 overflow-hidden rounded-md">
          <img 
            src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
            alt="Cyber Security Lab"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nerds-darkblue to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-3">
            <h3 className="text-white font-bold">Cryptography Basics: Breaking Simple Ciphers</h3>
            <p className="text-gray-300 text-sm">Learn the fundamentals of cryptography by breaking classic ciphers</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-center mb-4">
          <div className="bg-nerds-gray/20 p-2 rounded-md">
            <div className="flex items-center justify-center gap-1 text-nerds-yellow mb-1">
              <Trophy className="w-4 h-4" />
              <span className="text-sm">500 pts</span>
            </div>
            <p className="text-xs text-gray-400">Reward</p>
          </div>
          <div className="bg-nerds-gray/20 p-2 rounded-md">
            <div className="flex items-center justify-center gap-1 text-nerds-yellow mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">90 min</span>
            </div>
            <p className="text-xs text-gray-400">Duration</p>
          </div>
        </div>
        
        <div className="text-sm text-gray-400 mb-2">
          <p>Available until: <span className="text-white">June 30, 2025</span></p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-nerds-green text-nerds-darkblue hover:bg-nerds-green/90 flex items-center justify-center"
          asChild
        >
          <Link to="/labs/free-month">
            Start Lab <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FreeLabOfMonth;
