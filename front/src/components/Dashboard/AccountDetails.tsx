'use client';

import { useState, useEffect } from 'react';
import { dashboardContent } from '@/content/dashboardContent';
import { FaChevronDown } from 'react-icons/fa';
import { userService, User } from '@/services/userService';

interface UpdateUserData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthDate: string;
  password?: string;
}

export const AccountDetails = () => {
  const [formData, setFormData] = useState({
    civility: '',
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
  });
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await userService.getCurrentUser();
        console.log('Données utilisateur reçues:', userData);
        setCurrentUser(userData);
        setFormData({
          civility:
            userData.gender === 'MALE'
              ? 'M'
              : userData.gender === 'FEMALE'
                ? 'MME'
                : '',
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          gender: userData.gender,
          birthDate: userData.birthDate
            ? new Date(userData.birthDate).toISOString().split('T')[0]
            : '',
          password: '',
          confirmPassword: '',
        });
      } catch (err) {
        if (err instanceof Error) {
          setError(
            err.message === 'No authentication token found'
              ? 'Veuillez vous connecter pour accéder à cette page'
              : 'Erreur lors du chargement des données utilisateur'
          );
        } else {
          setError('Erreur lors du chargement des données utilisateur');
        }
        console.error('Erreur:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const updateData: UpdateUserData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        gender:
          formData.civility === 'M'
            ? 'MALE'
            : formData.civility === 'MME'
              ? 'FEMALE'
              : '',
        birthDate: formData.birthDate,
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      await userService.updateUser(currentUser.id, updateData);
      const updatedUser = await userService.getCurrentUser();
      setCurrentUser(updatedUser);
      setFormData((prev) => ({ ...prev, password: '', confirmPassword: '' }));
      alert('Profil mis à jour avec succès !');
    } catch (err) {
      setError('Erreur lors de la mise à jour du profil');
      console.error('Erreur:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeletePopupOpen(true);
  };

  const confirmDeleteAccount = async () => {
    if (!currentUser) return;

    if (deleteInput.toLowerCase() === 'supprimer') {
      try {
        await userService.deleteUser(currentUser.id);
        // Rediriger vers la page de connexion ou déconnecter l'utilisateur
        window.location.href = '/login';
      } catch (err) {
        setError('Erreur lors de la suppression du compte');
        console.error('Erreur:', err);
      }
      setIsDeletePopupOpen(false);
      setDeleteInput('');
    } else {
      alert('Veuillez taper "supprimer" correctement.');
    }
  };

  useEffect(() => {
    if (isDeletePopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isDeletePopupOpen]);

  if (isLoading) {
    return <div className="text-center p-4">Chargement...</div>;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="p-4 bg-yellow-100 text-yellow-700 rounded">
          Aucune donnée utilisateur disponible
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">
        {dashboardContent.accountSection.title}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {dashboardContent.accountSection.fields.civility.label}
            </label>
            <div className="relative">
              <select
                value={formData.civility}
                onChange={(e) =>
                  setFormData({ ...formData, civility: e.target.value })
                }
                onFocus={() => setIsSelectOpen(true)}
                onBlur={() => setIsSelectOpen(false)}
                className="w-full px-6 py-3 border-2 placeholder:text-black border-[#242E61]/40 focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all appearance-none"
                aria-label="Sélectionnez votre civilité"
              >
                <option value="">Sélectionnez</option>
                {dashboardContent.accountSection.fields.civility.options.map(
                  (option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  )
                )}
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <FaChevronDown
                  className={`w-4 h-4 text-[#242E61] transition-transform duration-200 ${
                    isSelectOpen ? 'rotate-180' : ''
                  }`}
                />
              </span>
            </div>
          </div>

          {Object.entries(dashboardContent.accountSection.fields)
            .filter(([key]) => key !== 'civility')
            .map(([key, field]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                {key === 'birthDate' ? (
                  <input
                    type="date"
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                    className="w-full px-6 py-3 border-2 placeholder:text-black border-[#242E61]/40 focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all"
                    aria-label={field.label}
                  />
                ) : (
                  <input
                    type={
                      key.includes('password')
                        ? 'password'
                        : key === 'email'
                          ? 'email'
                          : 'text'
                    }
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                    placeholder={field.placeholder}
                    className="w-full px-6 py-3 border-2 placeholder:text-black border-[#242E61]/40 focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all"
                    aria-label={field.label}
                  />
                )}
              </div>
            ))}
        </div>

        <div className="flex flex-col space-y-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-6 py-3 border-2 placeholder:text-black border-[#242E61]/40 focus:border-[#242E61] bg-[#242E61] text-white placeholder-gray-300 outline-none transition-all hover:bg-[#1a2347] ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading
              ? 'Mise à jour...'
              : dashboardContent.accountSection.buttons.save}
          </button>

          <button className="w-full px-6 py-3 border-2 placeholder:text-black border-[#242E61]/40 focus:border-[#242E61] bg-white text-[#242E61] placeholder-gray-300 outline-none transition-all hover:bg-[#1a2347] hover:text-white">
            {dashboardContent.accountSection.buttons.changePassword}
          </button>

          <button
            type="button"
            onClick={handleDeleteAccount}
            className="text-red-600 hover:text-red-700 transition-colors"
          >
            {dashboardContent.accountSection.buttons.deleteAccount}
          </button>
        </div>
      </form>

      {/* Popup de confirmation */}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 shadow-lg max-w-sm w-full md:max-w-[400px] md:w-auto h-full md:h-auto">
            <h3 className="text-lg font-semibold mb-4">
              Confirmer la suppression du compte
            </h3>
            <p className="mb-4 text-red-600">
              Pour confirmer, tapez <strong>&quot;supprimer&quot;</strong>{' '}
              ci-dessous :
            </p>
            <input
              type="text"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              className="w-full px-4 py-2 border-2 border-[#242E61]/40 focus:border-[#242E61] outline-none mb-4"
              placeholder="Tapez 'supprimer'"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeletePopupOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={confirmDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
