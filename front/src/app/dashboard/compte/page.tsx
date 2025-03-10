'use client';

import { DashboardLayout } from '@/components/ui/Dashboard/DashboardLayout';
import { AccountDetails } from '@/components/ui/Dashboard/AccountDetails';

export default function ComptePage() {
  return (
    <DashboardLayout>
      <AccountDetails />
    </DashboardLayout>
  );
} 