'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingCart, Users, Settings, LogOut } from 'lucide-react';

const routes = [
  {
    label: 'Tableau de bord',
    icon: Home,
    href: '/employe',
  },
  {
    label: 'Commandes',
    icon: ShoppingCart,
    href: '/employe/orders',
  },
  {
    label: 'Clients',
    icon: Users,
    href: '/employe/customers',
  },
  {
    label: 'Paramètres',
    icon: Settings,
    href: '/employe/settings',
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('employeToken');
    window.location.href = '/employe/login';
  };

  return (
    <div className="w-64 bg-white border-r h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900">Espace Employé</h1>
      </div>

      <nav className="flex-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-50 ${
              pathname === route.href ? 'bg-gray-100 text-gray-900' : ''
            }`}
          >
            <route.icon className="h-5 w-5" />
            {route.label}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
      >
        <LogOut className="h-5 w-5" />
        Se déconnecter
      </button>
    </div>
  );
}
