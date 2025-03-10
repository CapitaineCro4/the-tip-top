'use client';

import { dashboardContent } from '@/content/dashboardContent';
import { DashboardLayout } from '@/components/ui/Dashboard/DashboardLayout';
import { TicketInput } from '@/components/ui/Dashboard/TicketInput';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">{dashboardContent.title}</h1>
        <TicketInput />
      </div>
    </DashboardLayout>
  );
}
