'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
/* import { getUsers } from '@/network/api-routes/User';
import { User } from '@/domain/user/UserType'; */

export default function EmployePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
/*   const [appUsers, setAppUsers] = useState<User[]>([]); */

  useEffect(() => {
    if (!isAuthenticated() || !user?.isEmploye) {
      router.push('/');
      return;
    }

    setIsLoading(false);
    /* fetchUsers(); */
  }, [isAuthenticated, user, router]);

/*   function fetchUsers() {
    getUsers().then((users) => {
      setAppUsers(users.filter((user) => !user.isEmploye));
    });
  } */

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Bonjour, employé bienvenue sur votre Tableau de bord
        </h1>
      </div>
    </div>
  );
}
