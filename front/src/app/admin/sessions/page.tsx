'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import CreateSession from '@/components/admin/CreateSession';
import SessionList from '@/components/admin/SessionList';
import { FaCalendarPlus, FaList } from 'react-icons/fa';
import { LoadingScreen } from '@/components/LoadingScreen';

export default function SessionsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('create'); // 'create' ou 'list'

  useEffect(() => {
    if (!isAuthenticated() || !user?.isAdmin) {
      router.push('/');
      return;
    }

    setIsLoading(false);
  }, [isAuthenticated, user, router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Gestion des sessions
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Créez et gérez les sessions de jeu concours
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b">
          <div className="flex">
            <button
              onClick={() => setActiveTab('create')}
              className={`flex items-center space-x-2 px-6 py-3 focus:outline-none ${
                activeTab === 'create'
                  ? 'border-b-2 border-[#242E61] text-[#242E61]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaCalendarPlus className="w-4 h-4" />
              <span>Créer une session</span>
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`flex items-center space-x-2 px-6 py-3 focus:outline-none ${
                activeTab === 'list'
                  ? 'border-b-2 border-[#242E61] text-[#242E61]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaList className="w-4 h-4" />
              <span>Liste des sessions</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'create' ? <CreateSession /> : <SessionList />}
        </div>
      </div>
    </div>
  );
}
