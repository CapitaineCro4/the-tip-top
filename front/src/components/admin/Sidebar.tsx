import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaUser, FaUsers, FaEnvelope, FaTrophy } from 'react-icons/fa';
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
    label: 'Historique des tickets',
    href: '/admin/tickets',
    icon: TiTicket,
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
  {
    label: 'Détails du compte',
    href: '/admin/account',
    icon: FaUser,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
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
  );
}
