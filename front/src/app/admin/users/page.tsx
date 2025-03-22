'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { getUsers } from '@/network/api-routes/User';
import { User } from '@/domain/user/UserType';
import { FaEye } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

export default function UsersPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated() || !user?.isAdmin) {
      router.push('/');
      return;
    }

    setIsLoading(false);
    fetchUsers();
  }, [isAuthenticated, user, router]);

  function fetchUsers() {
    getUsers().then((users) => {
      setUsers(users.filter((user) => !user.isAdmin));
    });
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#242E61] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-2xl font-semibold text-[#242E61]">
                  Gestion des utilisateurs
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  Liste de tous les utilisateurs de l&apos;application
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-[#242E61]">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
                          >
                            Nom
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                          >
                            Date d&apos;inscription
                          </th>
                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                          >
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {user.firstName} {user.lastName}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {user.email}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button
                                className="text-[#242E61] hover:text-[#242E61]/80"
                                onClick={() => handleViewUser(user)}
                                title="Voir les détails"
                              >
                                <FaEye />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 max-w-lg w-full mx-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#242E61]">
                Détails de l&apos;utilisateur
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoMdClose size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">Nom complet</h3>
                <p className="text-gray-600">
                  {selectedUser.firstName} {selectedUser.lastName}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Email</h3>
                <p className="text-gray-600">{selectedUser.email}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Genre</h3>
                <p className="text-gray-600">
                  {selectedUser.gender === 'MALE' ? 'Homme' : 'Femme'}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">
                  Date de naissance
                </h3>
                <p className="text-gray-600">
                  {new Date(selectedUser.birthDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">
                  Date d&apos;inscription
                </h3>
                <p className="text-gray-600">
                  {new Date(selectedUser.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
