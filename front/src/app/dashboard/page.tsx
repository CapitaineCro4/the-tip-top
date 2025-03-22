'use client';

import { dashboardContent } from '@/content/dashboardContent';
import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { TicketInput } from '@/components/Dashboard/TicketInput';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

export default function DashboardPage() {
  const { user } = useContext(AuthContext);

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">
          {user?.firstName}, bienvenue sur votre{' '}
          {dashboardContent.title}
        </h1>
        <TicketInput />
      </div>
    </DashboardLayout>
  );
}
