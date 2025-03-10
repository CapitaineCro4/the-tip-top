'use client';

import { useState } from 'react';
import { dashboardContent } from '@/content/dashboardContent';

export const AccountDetails = () => {
  const [formData, setFormData] = useState({
    civility: '',
    firstName: '',
    lastName: '',
    email: '',
    city: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de mise à jour du compte
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir clôturer votre compte ?')) {
      // Logique de suppression du compte
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">
        {dashboardContent.accountSection.title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {dashboardContent.accountSection.fields.civility.label}
            </label>
            <select
              value={formData.civility}
              onChange={(e) =>
                setFormData({ ...formData, civility: e.target.value })
              }
              className="w-full px-4 py-2 border focus:ring-2 focus:ring-[#242E61] focus:border-transparent"
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
                  className="w-full px-4 py-2 border focus:ring-2 focus:ring-[#242E61] focus:border-transparent"
                />
              </div>
            ))}
        </div>

        <div className="flex flex-col space-y-4">
          <button
            type="submit"
            className="bg-[#242E61] text-white py-2 px-4 hover:bg-[#1a2347] transition-colors"
          >
            {dashboardContent.accountSection.buttons.save}
          </button>

          <button
            type="button"
            className="border border-[#242E61] text-[#242E61] py-2 px-4 hover:bg-gray-50 transition-colors"
          >
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
    </div>
  );
};
