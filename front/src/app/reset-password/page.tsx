'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { LoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import { ResetPasswordForm } from '@/components/Auth/ResetPasswordForm';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/');
      return;
    }

    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      router.push('/');
      return;
    }

    setIsLoading(false);
  }, [isAuthenticated, router, searchParams]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleBackToLogin = () => {
    router.push('/login');
  };

  return <ResetPasswordForm onBackToLogin={handleBackToLogin} />;
}
