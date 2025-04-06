'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import EmployeeManagement from '@/components/admin/EmployeeManagement';

export default function EmployeesPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated() || !user?.isAdmin) {
      router.push('/');
    }
  }, [isAuthenticated, user, router]);

  return <EmployeeManagement />;
}
