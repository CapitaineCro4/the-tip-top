'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dashboardContent } from '@/content/dashboardContent';
import { FiHome, FiList, FiUser } from 'react-icons/fi';
import { SessionProvider } from '@/context/SessionContext';

const navItems = [
  {
    label: dashboardContent.navigation.dashboard,
    href: '/dashboard',
    icon: FiHome,
  },
  {
    label: dashboardContent.navigation.ticketHistory,
    href: '/dashboard/historique',
    icon: FiList,
  },
  {
    label: dashboardContent.navigation.accountDetails,
    href: '/dashboard/compte',
    icon: FiUser,
  },
];

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  return (
    <SessionProvider>
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r">
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-2.5 transition-colors ${
                        isActive
                          ? 'bg-[#242E61] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </SessionProvider>
  );
};
