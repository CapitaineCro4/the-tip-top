'use client';

import { Suspense } from 'react';
import { ResetPasswordForm } from '@/components/Auth/ResetPasswordForm';
import { useRouter } from 'next/navigation';

function ResetPasswordPageContent() {
  const router = useRouter();

  const handleBackToLogin = () => {
    router.push('/login');
  };

  return <ResetPasswordForm onBackToLogin={handleBackToLogin} />;
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ResetPasswordPageContent />
    </Suspense>
  );
}
