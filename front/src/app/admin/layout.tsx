'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !isUserAdmin()) {
      router.push('/');
    }
  }, [user, isUserAdmin, router]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
