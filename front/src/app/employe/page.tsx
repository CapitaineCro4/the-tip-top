'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { TicketList } from '@/components/Tickets/TicketList';
import { LoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
/* import { getUsers } from '@/network/api-routes/User';
import { User } from '@/domain/user/UserType'; */

export default function EmployePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated() || (!user?.isEmploye && !user?.isAdmin)) {
      router.push('/');
      return;
    }
    setIsLoading(false);
  }, [isAuthenticated, user, router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          {user?.firstName}, bienvenue sur votre tableau de bord
        </h1>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <TicketList />
          </div>
        </div>
      </div>
    </div>
  );
}
