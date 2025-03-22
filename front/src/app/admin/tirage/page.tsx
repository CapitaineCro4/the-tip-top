'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/domain/user/UserType';
import { getUsers } from '@/network/api-routes/User';
import ReactConfetti from 'react-confetti';

export default function TiragePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [winner, setWinner] = useState<User | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (!isAuthenticated() || !user?.isAdmin) {
      router.push('/');
      return;
    }

    setIsLoading(false);
    fetchUsers();

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isAuthenticated, user, router]);

  function fetchUsers() {
    getUsers().then((users) => {
      setUsers(users.filter((user) => !user.isAdmin));
    });
  }

  const handleDraw = () => {
    if (users.length === 0) return;

    // Animation de tirage au sort
    setWinner(null);
    setShowConfetti(false);

    let shuffleCount = 0;
    const maxShuffles = 20;
    const shuffleInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * users.length);
      setWinner(users[randomIndex]);
      shuffleCount++;

      if (shuffleCount >= maxShuffles) {
        clearInterval(shuffleInterval);
        setShowConfetti(true);
        // Arrêter les confettis après 5 secondes
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 mx-auto">
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Grand Tirage au Sort
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Tirage au sort parmi tous les clients
        </p>
      </div>

      <div className="bg-white p-6  shadow-sm">
        <div className="mb-6">
          <p className="text-gray-600">
            Nombre total de participants : {users.length}
          </p>
        </div>

        {winner && (
          <div className="mb-8 p-6 bg-primary/5  text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              🎉 Gagnant(e) 🎉
            </h2>
            <p className="text-lg text-primary">
              {winner.firstName} {winner.lastName}
            </p>
            <p className="text-sm text-gray-600 mt-1">{winner.email}</p>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={handleDraw}
            disabled={users.length === 0}
            className="w-max-w-4xl bg-[#242E61] text-white  px-6 py-3 border-2 border-transparent hover:bg-[#16803C] transition-all duration-300 flex items-center justify-center"
          >
            Lancer le tirage
          </button>
        </div>
      </div>
    </div>
  );
}
