import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { labsAPI } from '@/api/api';
import axios from 'axios';

// Interface for lab data
export interface Lab {
  id: string;
  trackId: string;
  moduleId: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  estimatedMinutes: number;
  pointsAwarded: number;
  isCompleted: boolean;
  isLocked: boolean;
  labType: string;
  dockerImage?: string;
}

// Interface for lab instance status
export interface LabInstanceResponse {
  status: 'success' | 'error';
  lab_id: string;
  url?: string;
  direct_ip_url?: string;
  message?: string;
  container_created?: boolean;
  error?: string;
}

// Mock data for labs when API is unavailable
export const mockLabsData: Lab[] = [
  {
    id: "mediconnect-lab",
    trackId: "track-1",
    moduleId: "module-1",
    title: "MediConnect Web Application Security",
    description: "Practice web security testing on a medical records management system. Learn to identify and exploit vulnerabilities in a healthcare application while understanding the importance of securing sensitive medical data.",
    difficulty: "medium",
    category: "Web Security",
    estimatedMinutes: 90,
    pointsAwarded: 250,
    isCompleted: false,
    isLocked: false,
    labType: "docker",
    dockerImage: "mediconnect_app"
  },
  {
    id: "lab-001",
    trackId: "track-1",
    moduleId: "module-1",
    title: "Web Application Security Basics",
    description: "Learn the fundamentals of web security including XSS, CSRF, and SQL injection.",
    difficulty: "easy",
    category: "Web Security",
    estimatedMinutes: 45,
    pointsAwarded: 100,
    isCompleted: false,
    isLocked: false
  },
  {
    id: "lab-002",
    trackId: "track-1",
    moduleId: "module-2",
    title: "Network Traffic Analysis",
    description: "Analyze network traffic to identify potential security threats and vulnerabilities.",
    difficulty: "medium",
    category: "Network Security",
    estimatedMinutes: 60,
    pointsAwarded: 150,
    isCompleted: false,
    isLocked: false
  },
  {
    id: "lab-003",
    trackId: "track-2",
    moduleId: "module-1",
    title: "Cryptography Fundamentals",
    description: "Learn about encryption, hashing, and secure communication protocols.",
    difficulty: "medium",
    category: "Cryptography",
    estimatedMinutes: 75,
    pointsAwarded: 200,
    isCompleted: false,
    isLocked: false
  }
];

// Hook to fetch lab templates
export const useLabs = () => {
  const [labs, setLabs] = useState<Lab[]>(mockLabsData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // No need for useEffect since we're using static data
  return { labs, loading, error };
};
