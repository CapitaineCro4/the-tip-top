import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaHome,
  FaUsers,
  FaEnvelope,
  FaTrophy,
  FaCalendarAlt,
  FaCog,
  FaUser,
} from 'react-icons/fa';
import { TiTicket } from 'react-icons/ti';

const navItems = [
  {
    label: 'Tableau de bord',
    href: '/admin',
    icon: FaHome,
  },
  {
    label: 'Gérer les utilisateurs',
    href: '/admin/users',
    icon: FaUsers,
  },
  {
    label: 'Gérer les employés',
    href: '/admin/employees',
    icon: FaUser,
  },
  {
    label: 'Liste des tickets',
    href: '/admin/tickets',
    icon: TiTicket,
  },
  {
    label: 'Gérer les sessions',
    href: '/admin/sessions',
    icon: FaCalendarAlt,
  },
  {
    label: 'Envoyer un mail',
    href: '/admin/mailing',
    icon: FaEnvelope,
  },
  {
    label: 'Grand Tirage',
    href: '/admin/tirage',
    icon: FaTrophy,
  },
];

const bottomNavItems = [
  {
    label: 'Paramètres',
    href: '/admin/settings',
    icon: FaCog,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const renderNavItem = (item: (typeof navItems)[0]) => {
    const Icon = item.icon;
    const isActive = pathname === item.href;

    return (
      <li key={item.href}>
        <Link
          href={item.href}
          className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-all ${
            isActive
              ? 'bg-[#242E61] text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Icon className="w-5 h-5" />
          <span className="font-medium">{item.label}</span>
        </Link>
      </li>
    );
  };

  return (
    <aside className="w-full md:w-64 bg-white shadow-sm border-r min-h-screen">
      <div className="p-4">
        <nav className="space-y-1">
          <ul className="space-y-1">{navItems.map(renderNavItem)}</ul>
        </nav>

        <div className="border-t mt-6 pt-6">
          <ul className="space-y-1">{bottomNavItems.map(renderNavItem)}</ul>
        </div>
      </div>
    </aside>
  );
}
