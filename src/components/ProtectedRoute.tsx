import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-nerds-darkblue">
        <Loader2 className="w-8 h-8 text-nerds-green animate-spin" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to verification warning if user is not verified
  if (user && user.isVerified === false) {
    return <Navigate to={`/verification-warning?email=${encodeURIComponent(user.email)}`} replace />;
  }

  // Render protected content
  return <>{children}</>;
};

export default ProtectedRoute;
