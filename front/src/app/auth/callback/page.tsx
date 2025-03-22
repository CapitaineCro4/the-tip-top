'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      router.push('/login?error=' + error);
      return;
    }

    if (token) {
      loginWithToken(token).then(() => {
        router.push('/dashboard');
      });
    } else {
      router.push('/login');
    }
  }, [searchParams, router, loginWithToken]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center justify-center flex flex-col items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-8 border-t-transparent border-[#242E61]"></div>
        <h2 className="mt-6 text-xl font-semibold text-[#242E61]">
          Authentification en cours...
        </h2>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center justify-center flex flex-col items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-8 border-t-transparent border-[#242E61]"></div>
            <h2 className="mt-6 text-xl font-semibold text-[#242E61]">
              Chargement...
            </h2>
          </div>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
