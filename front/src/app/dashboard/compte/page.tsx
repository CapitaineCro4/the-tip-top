'use client';

import { DashboardLayout } from '@/components/Dashboard/DashboardLayout';
import { AccountDetails } from '@/components/Dashboard/AccountDetails';

export default function ComptePage() {
  return (
    <DashboardLayout>
      <AccountDetails />
    </DashboardLayout>
  );
}
