import { useRef, useState } from 'react';
import { createSession } from '@/network/api-routes/Session';

export default function CreateSession() {
  const [message, setMessage] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    createSession({
      name: data.name as string,
      startDate: data.startDate as string,
      endDate: data.endDate as string,
      claimEndDate: data.claimEndDate as string,
      ticketsQuantity: parseInt(data.ticketsQuantity as string),
    }).then(() => {
      setMessage('Session créée avec succès');
      formRef.current?.reset();

      setTimeout(() => {
        setMessage('');
      }, 6000);
    });
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Créer une nouvelle session
      </h2>
      {message && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Succès !</strong>
          <span className="block sm:inline">{message}</span>
        </div>
      )}
      <div className="bg-white shadow rounded-lg p-6">
        <form className="space-y-4" onSubmit={handleSubmit} ref={formRef}>
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Nom de la session"
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
              <input
                type="date"
                name="startDate"
                id="startDate"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700"
              >
                Date de fin
              </label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="claimEndDate"
                className="block text-sm font-medium text-gray-700"
              >
                Date limite de réclamation
              </label>
              <input
                type="date"
                name="claimEndDate"
                id="claimEndDate"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="ticketsQuantity"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre de tickets
            </label>
            <input
              type="number"
              name="ticketsQuantity"
              id="ticketsQuantity"
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Quantité de tickets à générer"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Créer la session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
