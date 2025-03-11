import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return {
    ...context,
    isAdmin: () => {
      return context.user?.isAdmin ?? false;
    },
    hasAuthenticatedDashboard: () => {
      return context.user?.isAdmin ?? false;
    },
  };
};
