'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dashboardContent } from '@/content/dashboardContent';
import { FiHome, FiList, FiUser, FiChevronRight } from 'react-icons/fi';
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
        <aside className="w-full md:w-72 bg-white border-r border-gray-200 shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Mon Espace
            </h2>
            <nav>
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                          isActive
                            ? 'bg-[#242E61] text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-lg ${
                              isActive
                                ? 'bg-white/10'
                                : 'bg-gray-100 group-hover:bg-gray-200 transition-colors duration-200'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <FiChevronRight
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isActive
                              ? 'opacity-100'
                              : 'opacity-0 group-hover:opacity-100'
                          }`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </SessionProvider>
  );
};
