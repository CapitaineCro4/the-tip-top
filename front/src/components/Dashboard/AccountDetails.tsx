'use client';

import { useState, useEffect } from 'react';
import { dashboardContent } from '@/content/dashboardContent';
import { FaChevronDown, FaSpinner } from 'react-icons/fa';
import { userService, User } from '@/services/userService';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { FiUser } from 'react-icons/fi';

interface UpdateUserData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthDate: string;
  password?: string;
}

interface NotificationProps {
  message: string;
  changedFields: string[];
  onClose: () => void;
}

const Notification = ({
  message,
  changedFields,
  onClose,
}: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getDetailedMessage = (field: string) => {
    switch (field) {
      case 'Prénom':
        return 'Votre prénom a été mis à jour';
      case 'Nom':
        return 'Votre nom a été mis à jour';
      case 'Email':
        return 'Votre adresse email a été mise à jour';
      case 'Civilité':
        return 'Votre civilité a été mise à jour';
      case 'Date de naissance':
        return 'Votre date de naissance a été mise à jour';
      case 'Mot de passe':
        return 'Votre mot de passe a été mis à jour';
      default:
        return `${field} a été mis à jour`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="relative bg-white p-6 shadow-xl max-w-md w-full mx-4 animate-slide-in">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <IoMdCheckmarkCircle className="h-8 w-8 text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {message}
            </h3>
            {changedFields.length > 0 && (
              <div className="space-y-2">
                {changedFields.map((field) => (
                  <p key={field} className="text-sm text-gray-600">
                    {getDetailedMessage(field)}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const [showNotification, setShowNotification] = useState(false);
  const [changedFields, setChangedFields] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await userService.getCurrentUser();
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

      // Détecter les champs modifiés
      const modifiedFields: string[] = [];
      if (updateData.firstName !== currentUser.firstName)
        modifiedFields.push('Prénom');
      if (updateData.lastName !== currentUser.lastName)
        modifiedFields.push('Nom');
      if (updateData.email !== currentUser.email) modifiedFields.push('Email');
      if (updateData.gender !== currentUser.gender)
        modifiedFields.push('Civilité');
      if (
        updateData.birthDate !==
        new Date(currentUser.birthDate).toISOString().split('T')[0]
      )
        modifiedFields.push('Date de naissance');
      if (formData.password) modifiedFields.push('Mot de passe');

      if (formData.password) {
        updateData.password = formData.password;
      }

      await userService.updateUser(currentUser.id, updateData);
      const updatedUser = await userService.getCurrentUser();
      setCurrentUser(updatedUser);
      setFormData((prev) => ({ ...prev, password: '', confirmPassword: '' }));

      setChangedFields(modifiedFields);
      setShowNotification(true);
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
        <div className="p-4 bg-red-100 text-red-700 ">{error}</div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="p-4 bg-yellow-100 text-yellow-700">
          Aucune donnée utilisateur disponible
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {showNotification && (
        <Notification
          message="Modifications enregistrées avec succès !"
          changedFields={changedFields}
          onClose={() => setShowNotification(false)}
        />
      )}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <FiUser className="mr-3 h-6 w-6 text-blue-600" />
          {dashboardContent.accountSection.title}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                {key === 'birthDate' ? (
                  <input
                    type="date"
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    aria-label={field.label}
                  />
                )}
              </div>
            ))}
        </div>

        <div className="pt-6 border-t border-gray-200">
          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`inline-flex justify-center items-center px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-white bg-[#242E61] hover:bg-[#1a2347] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#242E61] transition-all duration-200 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Mise à jour...
                </>
              ) : (
                dashboardContent.accountSection.buttons.save
              )}
            </button>

            <button
              type="button"
              onClick={handleDeleteAccount}
              className="inline-flex justify-center items-center px-6 py-2.5 border border-transparent rounded-lg text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
            >
              {dashboardContent.accountSection.buttons.deleteAccount}
            </button>
          </div>
        </div>
      </form>

      {/* Popup de confirmation */}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full mx-4 md:mx-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirmer la suppression du compte
            </h3>
            <p className="mb-4 text-gray-600">
              Pour confirmer, tapez{' '}
              <strong className="text-red-600">&quot;supprimer&quot;</strong>{' '}
              ci-dessous :
            </p>
            <input
              type="text"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 mb-4"
              placeholder="Tapez 'supprimer'"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeletePopupOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
              >
                Annuler
              </button>
              <button
                onClick={confirmDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
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
