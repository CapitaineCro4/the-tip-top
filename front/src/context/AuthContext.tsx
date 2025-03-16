'use client';

import { createContext, useCallback, useEffect, useState } from 'react';
import {
  getMe,
  login as loginApi,
  adminLogin as adminLoginApi,
  getMeGames,
} from '@/network/api-routes/Authentication';
import { User } from '@/domain/user/UserType';
import { TOKEN_KEY } from '@/shared/constants';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Game } from '@/domain/game/GameType';

export const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User) => void;
  isAuthenticated: () => boolean;
  hasAuthenticatedDashboard: () => boolean;
  isUserAdmin: () => boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithToken: (token: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  userGames: Game[];
  loadUserGames: () => Promise<void>;
}>({
  user: null,
  setUser: () => {},
  isAuthenticated: () => false,
  hasAuthenticatedDashboard: () => false,
  isUserAdmin: () => false,
  login: async () => {},
  loginWithToken: async () => {},
  adminLogin: async () => {},
  logout: async () => {},
  loading: false,
  userGames: [],
  loadUserGames: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userGames, setUserGames] = useState<Game[]>([]);
  const router = useRouter();

  useEffect(() => {
    getCurrentUser();
    loadUserGames();
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);

    return loginApi(email, password)
      .then(async (token) => {
        Cookies.set(TOKEN_KEY, token);
      })
      .then(getCurrentUser)
      .then(() => {
        router.push('/dashboard');
      })
      .finally(() => setLoading(false));
  };

  const loginWithToken = async (token: string): Promise<void> => {
    setLoading(true);
    Cookies.set(TOKEN_KEY, token);
    await getCurrentUser();
    setLoading(false);
  };

  const adminLogin = async (email: string, password: string): Promise<void> => {
    setLoading(true);

    return adminLoginApi(email, password)
      .then(async (token) => {
        Cookies.set(TOKEN_KEY, token);
      })
      .then(getCurrentUser)
      .then(() => {
        router.push('/admin');
      })
      .finally(() => setLoading(false));
  };

  const logout = async (): Promise<void> => {
    return Promise.resolve().then(() => {
      setLoading(true);

      Cookies.remove(TOKEN_KEY);

      setUser(null);
      setLoading(false);

      router.push('/');
    });
  };

  const getCurrentUser = async (): Promise<void> => {
    getMe()
      .then((user) => setUser(user))
      .catch(() => {
        setUser(null);
      });
  };

  const loadUserGames = async (): Promise<void> => {
    getMeGames()
      .then((games) => setUserGames(games))
      .catch(() => {
        setUserGames([]);
      });
  };

  const isAuthenticated = useCallback(() => {
    return !!user;
  }, [user]);

  const isUserAdmin = useCallback(() => {
    return !!user?.isAdmin;
  }, [user]);

  const hasAuthenticatedDashboard = useCallback(() => {
    return (
      isAuthenticated() &&
      !isUserAdmin() &&
      window.location.pathname === '/dashboard'
    );
  }, [isAuthenticated, isUserAdmin]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        hasAuthenticatedDashboard,
        isUserAdmin,
        login,
        loginWithToken,
        adminLogin,
        logout,
        loading,
        userGames,
        loadUserGames,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
