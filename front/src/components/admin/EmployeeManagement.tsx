'use client';

import { useState, useEffect } from 'react';
import {
  FaUserPlus,
  FaUserTimes,
  FaEnvelope,
  FaLock,
  FaUser,
  FaVenusMars,
  FaBirthdayCake,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { toast } from 'sonner';
import { userService } from '@/services/userService';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isEmploye: boolean;
  gender: string;
  birthDate: Date;
}

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null
  );
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'MALE',
    birthDate: '',
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await userService.getEmployees();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Erreur lors du chargement des employés', {
        description:
          error instanceof Error ? error.message : 'Une erreur est survenue',
        duration: 5000,
      });
      setEmployees([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas', {
        description: 'Veuillez vérifier vos mots de passe.',
        duration: 5000,
      });
      setIsLoading(false);
      return;
    }

    try {
      const newEmployee = await userService.createEmployee({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        birthDate: new Date(formData.birthDate),
      });

      setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
      setShowCreateForm(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: 'MALE',
        birthDate: '',
      });

      toast.success('Employé créé avec succès', {
        description: 'Le compte employé a été créé avec succès.',
        duration: 5000,
      });
    } catch (error) {
      toast.error('Erreur lors de la création de l&apos;employé', {
        description:
          error instanceof Error ? error.message : 'Une erreur est survenue',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmation !== 'SUPPRIMER') {
      toast.error('Veuillez saisir "SUPPRIMER" pour confirmer la suppression');
      return;
    }

    if (employeeToDelete) {
      try {
        await userService.deleteEmployee(employeeToDelete.id);
        setEmployees(employees.filter((emp) => emp.id !== employeeToDelete.id));
        toast.success('Employé supprimé avec succès', {
          description: 'Le compte employé a été supprimé.',
          duration: 5000,
        });
      } catch (error) {
        toast.error("Erreur lors de la suppression de l'employé", {
          description:
            error instanceof Error ? error.message : 'Une erreur est survenue',
          duration: 5000,
        });
      }
    }
    setShowDeleteModal(false);
    setDeleteConfirmation('');
    setEmployeeToDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <FaUser className="mr-2" />
          Gestion des Employés
        </h1>
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
          <span className="font-semibold">{employees.length}</span> employé
          {employees.length > 1 ? 's' : ''}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">
            Liste des Employés
          </h2>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-[#242E61] text-white px-4 py-2 rounded-lg hover:bg-[#16803C] transition-all duration-300 flex items-center"
          >
            <FaUserPlus className="mr-2" />
            Nouvel Employé
          </button>
        </div>

        {showCreateForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaUserPlus className="mr-2" />
              Créer un nouvel employé
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2 border-2 border-[#242E61]/20 placeholder:text-black focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all rounded-lg"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2 border-2 border-[#242E61]/20 placeholder:text-black focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all rounded-lg"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2 border-2 border-[#242E61]/20 placeholder:text-black focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Genre
                  </label>
                  <div className="relative">
                    <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2 border-2 border-[#242E61]/20 placeholder:text-black focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all rounded-lg"
                      required
                    >
                      <option value="MALE">Homme</option>
                      <option value="FEMALE">Femme</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de naissance
                  </label>
                  <div className="relative">
                    <FaBirthdayCake className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) =>
                        setFormData({ ...formData, birthDate: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2 border-2 border-[#242E61]/20 placeholder:text-black focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all rounded-lg"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2 border-2 border-[#242E61]/20 placeholder:text-black focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all rounded-lg"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-2 border-2 border-[#242E61]/20 placeholder:text-black focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all rounded-lg"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#242E61] text-white px-4 py-2 rounded-lg hover:bg-[#16803C] transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Création en cours...
                    </>
                  ) : (
                    <>
                      <FaUserPlus className="mr-2" />
                      Créer
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {employee.firstName} {employee.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {employee.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeleteClick(employee)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaUserTimes className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      {showDeleteModal && employeeToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <FaExclamationTriangle className="text-red-500 mr-2" />
              <h3 className="text-lg font-semibold">
                Confirmer la suppression
              </h3>
            </div>
            <p className="mb-4">
              Êtes-vous sûr de vouloir supprimer l&apos;employé{' '}
              <span className="font-semibold">
                {employeeToDelete.firstName} {employeeToDelete.lastName}
              </span>
              ?
            </p>
            <p className="mb-4 text-sm text-gray-600">
              Pour confirmer, veuillez saisir &quot;SUPPRIMER&quot; dans le
              champ ci-dessous :
            </p>
            <input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              className="w-full px-4 py-2 border-2 border-[#242E61]/20 placeholder:text-black focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all rounded-lg"
              placeholder="Saisissez SUPPRIMER"
            />
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmation('');
                  setEmployeeToDelete(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleteConfirmation !== 'SUPPRIMER'}
                className="bg-[#242E61] text-white px-4 py-2 rounded-lg hover:bg-[#16803C] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
