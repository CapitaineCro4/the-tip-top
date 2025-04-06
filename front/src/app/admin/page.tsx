'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { getUsers } from '@/network/api-routes/User';
import { User } from '@/domain/user/UserType';
import AdminStats from '@/components/admin/AdminStats';
import { LoadingScreen } from '@/components/LoadingScreen';

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [appUsers, setAppUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!isAuthenticated() || !user?.isAdmin) {
      router.push('/');
      return;
    }

    setIsLoading(false);
    fetchUsers();
  }, [isAuthenticated, user, router]);

  function fetchUsers() {
    getUsers().then((users) => {
      setAppUsers(users.filter((user) => !user.isAdmin && !user.isEmploye));
    });
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Tableau de bord
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Bienvenue {user?.firstName}, voici l&apos;état actuel de votre
          application
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <AdminStats usersCount={appUsers.length} users={appUsers} />
      </div>
    </div>
  );
}
