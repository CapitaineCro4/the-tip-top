'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function EmployeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserEmploye, isUserAdmin, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Ne rien faire pendant le chargement
    if (loading) return;

    // Si on est sur la page de login, ne pas rediriger
    if (pathname === '/employe/login') return;

    // Une fois le chargement terminé, vérifier l'authentification
    if (!user) {
      router.push('/employe/login');
      return;
    }

    if (!isUserEmploye() && !isUserAdmin()) {
      router.push('/');
      return;
    }
  }, [user, isUserEmploye, isUserAdmin, router, loading, pathname]);

  // Si on est sur la page de login, on retourne directement le contenu
  if (pathname === '/employe/login') {
    return <>{children}</>;
  }

  // Afficher un loader pendant le chargement
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#242E61]"></div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté ou n'est pas employé/admin, on ne montre rien
  if (!user || (!isUserEmploye() && !isUserAdmin())) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Main content */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
