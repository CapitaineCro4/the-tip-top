'use client';

import { createContext, useCallback, useEffect, useState } from 'react';
import {
  getMe,
  login as loginApi,
  adminLogin as adminLoginApi,
  employeLogin as employeLoginApi,
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
  isUserEmploye: () => boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithToken: (token: string) => Promise<void>;
  loginWithGoogle: (token: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  employeLogin: (email: string, password: string) => Promise<void>;
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
  isUserEmploye: () => false,
  login: async () => {},
  loginWithToken: async () => {},
  loginWithGoogle: async () => {},
  adminLogin: async () => {},
  employeLogin: async () => {},
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
    const initAuth = async () => {
      try {
        await getCurrentUser();
        await loadUserGames();
      } catch (error) {
        console.error("Erreur lors de l'initialisation de l'auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
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
    try {
      Cookies.set(TOKEN_KEY, token, { expires: 7 });
      await getCurrentUser();
      router.push('/dashboard');
    } catch (error) {
      console.error('Erreur lors de la connexion avec token:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (token: string): Promise<void> => {
    setLoading(true);
    try {
      Cookies.set(TOKEN_KEY, token, { expires: 7 });
      await getCurrentUser();
      router.push('/dashboard');
    } catch (error) {
      console.error('Erreur lors de la connexion Google:', error);
      throw error;
    } finally {
      setLoading(false);
    }
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

  const employeLogin = async (
    email: string,
    password: string
  ): Promise<void> => {
    setLoading(true);

    return employeLoginApi(email, password)
      .then(async (token) => {
        Cookies.set(TOKEN_KEY, token);
      })
      .then(getCurrentUser)
      .then(() => {
        router.push('/employe');
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
    try {
      const user = await getMe();
      setUser(user);
    } catch (error) {
      console.error('Erreur getCurrentUser:', error);
      setUser(null);
      throw error;
    }
  };

  const loadUserGames = async (): Promise<void> => {
    try {
      const games = await getMeGames();
      setUserGames(games);
    } catch (error) {
      console.error('Erreur loadUserGames:', error);
      setUserGames([]);
    }
  };

  const isAuthenticated = useCallback(() => {
    return !!user;
  }, [user]);

  const isUserAdmin = useCallback(() => {
    return !!user?.isAdmin;
  }, [user]);

  const isUserEmploye = useCallback(() => {
    return !!user?.isEmploye;
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
        isUserEmploye,
        login,
        loginWithToken,
        loginWithGoogle,
        adminLogin,
        employeLogin,
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
