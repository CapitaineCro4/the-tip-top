import React from 'react';

const DocsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#242E61] mb-4">
          Documentation de l’API
        </h1>
        <p className="text-gray-600 mb-8">
          Une API complète pour gérer les sessions, utilisateurs, tickets, jeux,
          gains et l’authentification dans une application de gestion de
          promotions et de jeux.
        </p>

        {/* Key Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Gestion des sessions
            </h3>
            <p className="text-sm text-gray-600">
              Créez et gérez des sessions actives pour organiser les activités
              des utilisateurs.
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Gestion des utilisateurs
            </h3>
            <p className="text-sm text-gray-600">
              Administrez les comptes utilisateurs avec des opérations de
              création, mise à jour et suppression.
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Gestion des tickets
            </h3>
            <p className="text-sm text-gray-600">
              Enregistrez et consultez les tickets de participation des
              utilisateurs.
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Gestion des jeux
            </h3>
            <p className="text-sm text-gray-600">
              Configurez et gérez des jeux pour engager les utilisateurs.
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Gestion des gains
            </h3>
            <p className="text-sm text-gray-600">
              Suivez et attribuez des gains aux utilisateurs participants.
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Authentification
            </h3>
            <p className="text-sm text-gray-600">
              Sécurisez l’accès avec des endpoints pour l’inscription, la
              connexion et la gestion des profils.
            </p>
          </div>
        </div>

        {/* Endpoints Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Endpoints de l’API</h2>

          {/* Sessions Section */}
          <h3 className="text-lg font-semibold mb-2">Sessions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-sm font-semibold">Endpoint</th>
                  <th className="p-3 text-sm font-semibold">Méthode</th>
                  <th className="p-3 text-sm font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">/api/sessions</td>
                  <td className="p-3 text-green-600 font-mono">GET</td>
                  <td className="p-3">
                    Récupérer la liste de toutes les sessions actives.
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">/api/sessions/{'{session_id}'}</td>
                  <td className="p-3 text-green-600 font-mono">GET</td>
                  <td className="p-3">
                    Récupérer les détails d’une session spécifique.
                  </td>
                </tr>
                <tr>
                  <td className="p-3">/api/sessions</td>
                  <td className="p-3 text-yellow-600 font-mono">POST</td>
                  <td className="p-3">
                    Créer une nouvelle session pour un utilisateur.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Users Section */}
          <h3 className="text-lg font-semibold mb-2">Utilisateurs</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-sm font-semibold">Endpoint</th>
                  <th className="p-3 text-sm font-semibold">Méthode</th>
                  <th className="p-3 text-sm font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">/api/users</td>
                  <td className="p-3 text-green-600 font-mono">GET</td>
                  <td className="p-3">Récupérer la liste des utilisateurs.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">/api/users/{'{user_id}'}</td>
                  <td className="p-3 text-green-600 font-mono">GET</td>
                  <td className="p-3">
                    Récupérer les détails d’un utilisateur spécifique.
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">/api/users</td>
                  <td className="p-3 text-yellow-600 font-mono">POST</td>
                  <td className="p-3">Créer un nouveau compte utilisateur.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">/api/users/{'{user_id}'}</td>
                  <td className="p-3 text-blue-600 font-mono">PUT</td>
                  <td className="p-3">
                    Mettre à jour les informations d’un utilisateur.
                  </td>
                </tr>
                <tr>
                  <td className="p-3">/api/users/{'{user_id}'}</td>
                  <td className="p-3 text-red-600 font-mono">DELETE</td>
                  <td className="p-3">Supprimer un compte utilisateur.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Tickets Section */}
          <h3 className="text-lg font-semibold mb-2">Tickets</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-sm font-semibold">Endpoint</th>
                  <th className="p-3 text-sm font-semibold">Méthode</th>
                  <th className="p-3 text-sm font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">/api/tickets</td>
                  <td className="p-3 text-green-600 font-mono">GET</td>
                  <td className="p-3">
                    Récupérer la liste des tickets de participation.
                  </td>
                </tr>
                <tr>
                  <td className="p-3">/api/tickets</td>
                  <td className="p-3 text-yellow-600 font-mono">POST</td>
                  <td className="p-3">
                    Enregistrer un nouveau ticket de participation.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Games Section */}
          <h3 className="text-lg font-semibold mb-2">Jeux</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-sm font-semibold">Endpoint</th>
                  <th className="p-3 text-sm font-semibold">Méthode</th>
                  <th className="p-3 text-sm font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">/api/games</td>
                  <td className="p-3 text-green-600 font-mono">GET</td>
                  <td className="p-3">
                    Récupérer la liste des jeux disponibles.
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">/api/games/{'{game_id}'}</td>
                  <td className="p-3 text-green-600 font-mono">GET</td>
                  <td className="p-3">
                    Récupérer les détails d’un jeu spécifique.
                  </td>
                </tr>
                <tr>
                  <td className="p-3">/api/games</td>
                  <td className="p-3 text-yellow-600 font-mono">POST</td>
                  <td className="p-3">Créer une nouvelle partie de jeu.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Gains Section */}
          <h3 className="text-lg font-semibold mb-2">Gains</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-sm font-semibold">Endpoint</th>
                  <th className="p-3 text-sm font-semibold">Méthode</th>
                  <th className="p-3 text-sm font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">/api/gains</td>
                  <td className="p-3 text-green-600 font-mono">GET</td>
                  <td className="p-3">
                    Récupérer la liste des gains disponibles.
                  </td>
                </tr>
                <tr>
                  <td className="p-3">/api/gains/{'{gain_id}'}</td>
                  <td className="p-3 text-green-600 font-mono">GET</td>
                  <td className="p-3">
                    Récupérer les détails d’un gain spécifique.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Authentication Section */}
          <h3 className="text-lg font-semibold mb-2">Authentification</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-sm font-semibold">Endpoint</th>
                  <th className="p-3 text-sm font-semibold">Méthode</th>
                  <th className="p-3 text-sm font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">/api/auth/login</td>
                  <td className="p-3 text-yellow-600 font-mono">POST</td>
                  <td className="p-3">Connexion d’un utilisateur existant.</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">/api/auth/register</td>
                  <td className="p-3 text-yellow-600 font-mono">POST</td>
                  <td className="p-3">Inscription d’un nouvel utilisateur.</td>
                </tr>
                <tr>
                  <td className="p-3">/api/auth/me</td>
                  <td className="p-3 text-green-600 font-mono">GET</td>
                  <td className="p-3">
                    Récupérer les informations du profil connecté.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Examples Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Exemples d’utilisation</h2>

          <div className="space-y-6">
            {/* Create a User */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Création d’un utilisateur
              </h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <pre className="text-green-400">
                  {`// POST /api/auth/register
{
  "email": "joe@gmail.com",
  "firstName": "Joe",
  "lastName": "Dubois",
  "password": "votreMotDePasse",
  "gender": "MALE",
  "birthDate": "2002-03-25",
  "isAdmin": false,
  "isEmploye": false
}`}
                </pre>
              </div>
            </div>

            {/* Login */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Connexion</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <pre className="text-green-400">
                  {`// POST /api/auth/login
{
  "email": "joe@gmail.com",
  "password": "votreMotDePasse"
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
