'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/domain/user/UserType';
import { getUsers } from '@/network/api-routes/User';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';
import { FaEnvelope, FaUser } from 'react-icons/fa';
import { LoadingScreen } from '@/components/LoadingScreen';

// Charger TinyMCE dynamiquement sans SSR
const TinyMCEEditor = dynamic(
  () => import('@tinymce/tinymce-react').then((mod) => mod.Editor),
  { ssr: false }
);

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
      setUsers(users.filter((user) => !user.isAdmin && !user.isEmploye));
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const selectedEmails = users
        .filter((user) => selectedUsers.includes(String(user.id)))
        .map((user) => user.email);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/send-bulk-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: selectedEmails,
            subject: emailData.subject,
            content: emailData.content,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success('Emails envoyés avec succès !', {
          description: `Les emails ont été envoyés à ${selectedEmails.length} destinataire(s)`,
          duration: 5000,
        });
        setEmailData({ subject: '', content: '' });
        setSelectedUsers([]);
      } else {
        toast.error("Erreur lors de l'envoi des emails", {
          description: data.message || data.error || 'Une erreur est survenue',
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error("Erreur lors de l'envoi des emails", {
        description:
          error instanceof Error ? error.message : 'Une erreur est survenue',
        duration: 5000,
      });
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
    return <LoadingScreen />;
  }

  return (
    <div className="p-4 mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Envoyer un mail aux clients
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Sélectionnez les destinataires et composez votre message
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <FaUser className="mr-2 text-primary" />
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
          <div className="max-h-48 overflow-y-auto border-2 border-[#242E61]/20 p-2 rounded-lg">
            {users.map((user) => (
              <label
                key={user.id}
                className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
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
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary rounded"
                />
                <span className="ml-3 text-sm text-gray-700">
                  {user.firstName} {user.lastName} ({user.email})
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <FaEnvelope className="mr-2 text-primary" />
            Rédiger le mail
          </h2>
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
                className="w-full px-6 py-3 border-2 border-[#242E61]/20 placeholder:text-black focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all mt-1 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contenu de l&apos;email
              </label>
              <div className="mt-1">
                <TinyMCEEditor
                  apiKey="guwcd44pz17fclse2x3dzpnzfis7ds0znmb71dnkua28lkxg"
                  value={emailData.content}
                  onEditorChange={(content) =>
                    setEmailData({ ...emailData, content })
                  }
                  init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar:
                      'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | image | code',
                    placeholder: 'Commencez à écrire votre email ici...',
                    images_upload_url: `${process.env.NEXT_PUBLIC_API_URL}/upload-image`,
                    images_upload_credentials: true,
                    content_style:
                      'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 14px; }',
                  }}
                />
              </div>
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
            className="w-max-w-4xl bg-[#242E61] text-white px-6 py-3 border-2 border-transparent hover:bg-[#16803C] transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
          >
            {isSending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Envoi en cours...
              </>
            ) : (
              <>
                <FaEnvelope className="mr-2" />
                Envoyer
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
