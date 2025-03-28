'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { getUsers } from '@/network/api-routes/User';
import { User } from '@/domain/user/UserType';
import AdminStats from '@/components/admin/AdminStats';
import CreateSession from '@/components/admin/CreateSession';

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
          {user?.firstName}, bienvenue sur votre tableau de bord
        </h1>
      </div>

      <div className="space-y-6">
        <AdminStats usersCount={appUsers.length} users={appUsers} />
        <CreateSession />
      </div>
    </div>
  );
}
