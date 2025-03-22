import { apis } from '@/network/axios';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthDate: Date;
  picture?: string;
  googleId?: string;
  isAdmin: boolean;
  isEmploye: boolean;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
  password?: string;
}

export const userService = {
  getCurrentUser: async (): Promise<User> => {
    try {
      console.log('Appel API getCurrentUser...'); // Debug
      const response = await apis.tiptop.get('/auth/me');
      console.log('Réponse API:', response.data); // Debug

      // Assurez-vous que toutes les propriétés requises sont présentes
      const userData: User = {
        id: response.data.id,
        firstName: response.data.firstName || '',
        lastName: response.data.lastName || '',
        email: response.data.email || '',
        gender: response.data.gender || 'MALE' || 'FEMALE',
        birthDate: new Date(response.data.birthDate || Date.now()),
        isAdmin: response.data.isAdmin || false,
        isEmploye: response.data.isEmploye || false,
        picture: response.data.picture,
        googleId: response.data.googleId,
      };

      return userData;
    } catch (error) {
      console.error('Erreur getCurrentUser:', error); // Debug
      throw error;
    }
  },

  updateUser: async (id: number, data: UpdateUserData): Promise<void> => {
    await apis.tiptop.put(`/users/${id}`, data);
  },

  deleteUser: async (id: number): Promise<void> => {
    await apis.tiptop.delete(`/users/${id}`);
  },
};
