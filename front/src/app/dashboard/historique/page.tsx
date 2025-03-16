'use client';

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { TicketHistory } from '@/components/Dashboard/TicketHistory';

export default function HistoriquePage() {
  return (
    <DashboardLayout>
      <TicketHistory />
    </DashboardLayout>
  );
}
