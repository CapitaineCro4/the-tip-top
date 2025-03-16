'use client';

import { useState, useEffect } from 'react';
import { dashboardContent } from '@/content/dashboardContent';
import { FaChevronDown } from 'react-icons/fa';

export const AccountDetails = () => {
  const [formData, setFormData] = useState({
    civility: '',
    firstName: '',
    lastName: '',
    email: '',
    city: '',
  });
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de mise à jour du compte
  };

  const handleDeleteAccount = async () => {
    setIsDeletePopupOpen(true);
  };

  const confirmDeleteAccount = async () => {
    if (deleteInput.toLowerCase() === 'supprimer') {
      console.log('Compte supprimé !');
      setIsDeletePopupOpen(false);
      setDeleteInput('');
    } else {
      alert('Veuillez taper "supprimer" correctement.');
    }
  };

  // Désactiver le scroll quand la popup est ouverte
  useEffect(() => {
    if (isDeletePopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Nettoyage au démontage du composant
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isDeletePopupOpen]);

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
                <input
                  type={key === 'email' ? 'email' : 'text'}
                  value={formData[key as keyof typeof formData]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  placeholder={field.placeholder}
                  className="w-full px-6 py-3 border-2 placeholder:text-black border-[#242E61]/40 focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all"
                  aria-label={field.label}
                />
              </div>
            ))}
        </div>

        <div className="flex flex-col space-y-4">
          <button
            type="submit"
            className="w-full px-6 py-3 border-2 placeholder:text-black border-[#242E61]/40 focus:border-[#242E61] bg-[#242E61] text-white placeholder-gray-300 outline-none transition-all hover:bg-[#1a2347]"
          >
            {dashboardContent.accountSection.buttons.save}
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
