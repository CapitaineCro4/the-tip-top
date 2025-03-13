import { useRouter } from 'next/navigation';

export default function QuickActions() {
  const router = useRouter();

  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Actions rapides
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={() => router.push('/admin/users')}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Gérer les utilisateurs
        </button>
        <button
          onClick={() => router.push('/admin/orders')}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Gérer les commandes
        </button>
        <button
          onClick={() => router.push('/admin/products')}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Gérer les produits
        </button>
      </div>
    </div>
  );
}
