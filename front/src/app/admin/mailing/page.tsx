'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/domain/user/UserType';
import { getUsers } from '@/network/api-routes/User';

export default function MailingPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [emailData, setEmailData] = useState({
    subject: '',
    content: '',
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const selectedEmails = users
        .filter((user) => selectedUsers.includes(String(user.id)))
        .map((user) => user.email);

      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: selectedEmails,
          subject: emailData.subject,
          content: emailData.content,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Email envoyé avec succès !');
        setEmailData({ subject: '', content: '' });
        setSelectedUsers([]);
      } else {
        throw new Error(data.error || "Erreur lors de l'envoi de l'email");
      }
    } catch (error) {
      alert("Erreur lors de l'envoi de l'email. Veuillez réessayer.");
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => String(user.id)));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4  mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Envoyer un mail aux clients
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Sélectionnez les destinataires et composez votre message
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6  shadow-sm">
          <h2 className="text-lg font-medium mb-4">
            Sélectionner les destinataires
          </h2>
          <div className="mb-4">
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-sm text-primary hover:text-primary-dark"
            >
              {selectedUsers.length === users.length
                ? 'Désélectionner tout'
                : 'Sélectionner tout'}
            </button>
          </div>
          <div className="max-h-48 overflow-y-auto border-2 border-[#242E61]/20 p-2">
            {users.map((user) => (
              <label
                key={user.id}
                className="flex items-center p-2 hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(String(user.id))}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers([...selectedUsers, String(user.id)]);
                    } else {
                      setSelectedUsers(
                        selectedUsers.filter((id) => id !== String(user.id))
                      );
                    }
                  }}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span className="ml-3 text-sm text-gray-700">
                  {user.firstName} {user.lastName} ({user.email})
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white p-6  shadow-sm">
          <h2 className="text-lg font-medium mb-4">Rédiger le mail</h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                value={emailData.subject}
                onChange={(e) =>
                  setEmailData({ ...emailData, subject: e.target.value })
                }
                className="w-full px-6 py-3 border-2 border-[#242E61]/20 placeholder:text-black  focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all mt-1"
                required
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Contenu
              </label>
              <textarea
                id="content"
                rows={6}
                value={emailData.content}
                onChange={(e) =>
                  setEmailData({ ...emailData, content: e.target.value })
                }
                className="w-full px-6 py-3 border-2 border-[#242E61]/20 placeholder:text-black  focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all mt-1"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={
              isSending ||
              selectedUsers.length === 0 ||
              !emailData.subject ||
              !emailData.content
            }
            className="w-max-w-4xl bg-[#242E61] text-white  px-6 py-3 border-2 border-transparent hover:bg-[#16803C] transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? 'Envoi en cours...' : 'Envoyer'}
          </button>
        </div>
      </form>
    </div>
  );
}
