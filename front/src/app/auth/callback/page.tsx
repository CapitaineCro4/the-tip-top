'use client';

import { Suspense } from 'react';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { LoadingScreen } from '@/components/LoadingScreen/LoadingScreen';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithGoogle } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      router.push('/');
      return;
    }

    loginWithGoogle(token).catch((error) => {
      console.error('Erreur lors de la connexion Google:', error);
      router.push('/?error=auth_failed');
    });
  }, [searchParams, router, loginWithGoogle]);

  return <LoadingScreen />;
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <CallbackContent />
    </Suspense>
  );
}
