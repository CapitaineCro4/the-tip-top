'use client';

import { useState } from 'react';
import {
  FaCog,
  FaTicketAlt,
  FaEnvelope,
  FaUser,
  FaSave,
  FaSpinner,
} from 'react-icons/fa';
import { toast } from 'sonner';

interface Settings {
  ticketSettings: {
    autoAssign: boolean;
    maxTicketsPerUser: number;
    responseTimeLimit: number; // en heures
  };
  emailSettings: {
    notificationsEnabled: boolean;
    senderEmail: string;
    smtpServer: string;
    smtpPort: number;
  };
  userSettings: {
    allowUserRegistration: boolean;
    requireEmailVerification: boolean;
    defaultUserRole: 'CLIENT' | 'EMPLOYE';
  };
}

export default function Settings() {
  const [settings, setSettings] = useState<Settings>({
    ticketSettings: {
      autoAssign: true,
      maxTicketsPerUser: 5,
      responseTimeLimit: 24,
    },
    emailSettings: {
      notificationsEnabled: true,
      senderEmail: 'noreply@the-tip-top.com',
      smtpServer: 'smtp.the-tip-top.com',
      smtpPort: 587,
    },
    userSettings: {
      allowUserRegistration: true,
      requireEmailVerification: true,
      defaultUserRole: 'CLIENT',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implémenter l'appel API pour sauvegarder les paramètres
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulation d'appel API
      toast.success('Paramètres sauvegardés avec succès');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde des paramètres', {
        description:
          error instanceof Error ? error.message : 'Une erreur est survenue',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    section: keyof Settings,
    field: string,
    value: string | number | boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <FaCog className="text-2xl text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
            <p className="text-sm text-gray-500">
              Configurez les paramètres du système
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Paramètres des tickets */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <FaTicketAlt className="text-xl text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Paramètres des tickets
            </h2>
          </div>
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                id="autoAssign"
                checked={settings.ticketSettings.autoAssign}
                onChange={(e) =>
                  handleChange('ticketSettings', 'autoAssign', e.target.checked)
                }
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
              />
              <label
                htmlFor="autoAssign"
                className="ml-3 block text-sm font-medium text-gray-900"
              >
                Attribution automatique des tickets
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="maxTickets"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre maximum de tickets par utilisateur
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="maxTickets"
                    value={settings.ticketSettings.maxTicketsPerUser}
                    onChange={(e) =>
                      handleChange(
                        'ticketSettings',
                        'maxTicketsPerUser',
                        parseInt(e.target.value)
                      )
                    }
                    className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    min="1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="responseTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Délai de réponse maximum (heures)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="responseTime"
                    value={settings.ticketSettings.responseTimeLimit}
                    onChange={(e) =>
                      handleChange(
                        'ticketSettings',
                        'responseTimeLimit',
                        parseInt(e.target.value)
                      )
                    }
                    className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    min="1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Paramètres des emails */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <FaEnvelope className="text-xl text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Paramètres des emails
            </h2>
          </div>
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                id="notificationsEnabled"
                checked={settings.emailSettings.notificationsEnabled}
                onChange={(e) =>
                  handleChange(
                    'emailSettings',
                    'notificationsEnabled',
                    e.target.checked
                  )
                }
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
              />
              <label
                htmlFor="notificationsEnabled"
                className="ml-3 block text-sm font-medium text-gray-900"
              >
                Activer les notifications par email
              </label>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="senderEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Email de l&apos;expéditeur
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="senderEmail"
                  value={settings.emailSettings.senderEmail}
                  onChange={(e) =>
                    handleChange('emailSettings', 'senderEmail', e.target.value)
                  }
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="smtpServer"
                  className="block text-sm font-medium text-gray-700"
                >
                  Serveur SMTP
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="smtpServer"
                    value={settings.emailSettings.smtpServer}
                    onChange={(e) =>
                      handleChange(
                        'emailSettings',
                        'smtpServer',
                        e.target.value
                      )
                    }
                    className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="smtpPort"
                  className="block text-sm font-medium text-gray-700"
                >
                  Port SMTP
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="smtpPort"
                    value={settings.emailSettings.smtpPort}
                    onChange={(e) =>
                      handleChange(
                        'emailSettings',
                        'smtpPort',
                        parseInt(e.target.value)
                      )
                    }
                    className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Paramètres des utilisateurs */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <FaUser className="text-xl text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Paramètres des utilisateurs
            </h2>
          </div>
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                id="allowUserRegistration"
                checked={settings.userSettings.allowUserRegistration}
                onChange={(e) =>
                  handleChange(
                    'userSettings',
                    'allowUserRegistration',
                    e.target.checked
                  )
                }
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
              />
              <label
                htmlFor="allowUserRegistration"
                className="ml-3 block text-sm font-medium text-gray-900"
              >
                Autoriser l&apos;inscription des utilisateurs
              </label>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                id="requireEmailVerification"
                checked={settings.userSettings.requireEmailVerification}
                onChange={(e) =>
                  handleChange(
                    'userSettings',
                    'requireEmailVerification',
                    e.target.checked
                  )
                }
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
              />
              <label
                htmlFor="requireEmailVerification"
                className="ml-3 block text-sm font-medium text-gray-900"
              >
                Exiger la vérification de l&apos;email
              </label>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="defaultUserRole"
                className="block text-sm font-medium text-gray-700"
              >
                Rôle par défaut des nouveaux utilisateurs
              </label>
              <div className="relative">
                <select
                  id="defaultUserRole"
                  value={settings.userSettings.defaultUserRole}
                  onChange={(e) =>
                    handleChange(
                      'userSettings',
                      'defaultUserRole',
                      e.target.value
                    )
                  }
                  className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                >
                  <option value="CLIENT">Client</option>
                  <option value="EMPLOYE">Employé</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5" />
                Sauvegarde en cours...
              </>
            ) : (
              <>
                <FaSave className="-ml-1 mr-3 h-5 w-5" />
                Sauvegarder les paramètres
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
