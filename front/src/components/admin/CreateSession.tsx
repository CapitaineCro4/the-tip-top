import { useRef, useState } from 'react';
import { createSession } from '@/network/api-routes/Session';
import { FaCheck } from 'react-icons/fa';
import { toast } from 'sonner';

export default function CreateSession() {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      await createSession({
        name: data.name as string,
        startDate: data.startDate as string,
        endDate: data.endDate as string,
        claimEndDate: data.claimEndDate as string,
        ticketsQuantity: parseInt(data.ticketsQuantity as string),
      });

      toast.success('Session créée avec succès', {
        description: 'La nouvelle session a été créée avec succès.',
        duration: 5000,
      });

      formRef.current?.reset();
    } catch (error) {
      toast.error('Erreur lors de la création de la session', {
        description:
          error instanceof Error ? error.message : 'Une erreur est survenue',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-4 mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Créer une nouvelle session
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Remplissez les informations ci-dessous pour créer une nouvelle session
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <form className="space-y-6" onSubmit={handleSubmit} ref={formRef}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nom de la session
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="mt-1 block w-full px-6 py-3 border-2 border-[#242E61]/20 placeholder:text-black focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all rounded-lg"
              placeholder="Nom de la session"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700"
              >
                Date de début
              </label>
              <div className="mt-1 relative">
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  className="block w-full px-6 py-3 border-2 border-[#242E61]/20 placeholder:text-black focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all rounded-lg"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700"
              >
                Date de fin
              </label>
              <div className="mt-1 relative">
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  className="block w-full px-6 py-3 border-2 border-[#242E61]/20 placeholder:text-black focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all rounded-lg"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="claimEndDate"
                className="block text-sm font-medium text-gray-700"
              >
                Date limite de réclamation
              </label>
              <div className="mt-1 relative">
                <input
                  type="date"
                  name="claimEndDate"
                  id="claimEndDate"
                  className="block w-full px-6 py-3 border-2 border-[#242E61]/20 placeholder:text-black focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all rounded-lg"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="ticketsQuantity"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre de tickets
            </label>
            <div className="mt-1 relative">
              <input
                type="number"
                name="ticketsQuantity"
                id="ticketsQuantity"
                min="1"
                className="block w-full px-6 py-3 border-2 border-[#242E61]/20 placeholder:text-black focus:border-[#242E61] bg-white/60 text-black placeholder-gray-300 outline-none transition-all rounded-lg"
                placeholder="Quantité de tickets à générer"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-max-w-4xl bg-[#242E61] text-white px-6 py-3 border-2 border-transparent hover:bg-[#16803C] transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Création en cours...
                </>
              ) : (
                <>
                  <FaCheck className="mr-2" />
                  Créer la session
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
