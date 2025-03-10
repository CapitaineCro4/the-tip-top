'use client';

import { DashboardLayout } from '@/components/ui/Dashboard/DashboardLayout';
import { TicketHistory } from '@/components/ui/Dashboard/TicketHistory';

export default function HistoriquePage() {
  return (
    <DashboardLayout>
      <TicketHistory />
    </DashboardLayout>
  );
} 