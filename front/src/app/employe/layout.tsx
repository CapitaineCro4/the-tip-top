'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EmployeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserEmploye } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !isUserEmploye()) {
      router.push('/');
    }
  }, [user, isUserEmploye, router]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">

      {/* Main content */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
