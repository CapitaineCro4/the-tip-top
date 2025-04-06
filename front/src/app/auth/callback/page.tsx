'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { LoadingScreen } from '@/components/LoadingScreen/LoadingScreen';

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      router.push('/');
      return;
    }

    login(code, 'google').then(() => {
      router.push('/');
    });
  }, [searchParams, router, login]);

  return <LoadingScreen />;
}
