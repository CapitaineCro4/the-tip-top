'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
      return;
    }

    if (!isUserAdmin()) {
      router.push('/');
      return;
    }
  }, [user, isUserAdmin, router]);

  // Si on est sur la page de login, on ne montre pas la Sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Si l'utilisateur n'est pas connecté ou n'est pas admin, on ne montre rien
  if (!user || !isUserAdmin()) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
