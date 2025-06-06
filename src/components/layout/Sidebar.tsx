import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom
import { Home, Search, Library, RadioTower, Users, PlusSquare, Heart } from 'lucide-react'; // Doraemon-esque icons or general purpose
import { cn } from '@/lib/utils';

// Doraemon theme colors (example)
const DORAEMON_BLUE = 'bg-sky-500'; // A bright, friendly blue
const DORAEMON_WHITE = 'text-white';
const DORAEMON_HOVER_BLUE = 'hover:bg-sky-600';
const DORAEMON_ACTIVE_BLUE = 'bg-sky-600'; // Darker blue for active state

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  currentPath: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, currentPath }) => {
  const isActive = currentPath === to || (to !== "/" && currentPath.startsWith(to));
  console.log(`NavItem '${label}' isActive: ${isActive} (current: ${currentPath}, to: ${to})`);
  return (
    <Link
      to={to}
      className={cn(
        'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200',
        DORAEMON_WHITE,
        DORAEMON_HOVER_BLUE,
        isActive ? DORAEMON_ACTIVE_BLUE : ''
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  console.log("Rendering Sidebar, current path:", location.pathname);

  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/search', icon: Search, label: 'Search' },
    { to: '/library', icon: Library, label: 'Your Library' },
  ];

  const playlistItems = [
    { to: '/playlist/create', icon: PlusSquare, label: 'Create Playlist' },
    { to: '/collection/tracks', icon: Heart, label: 'Liked Songs' },
    // Add more dynamic playlists later
  ];


  return (
    <aside className={cn('w-64 h-screen p-4 space-y-6 fixed top-0 left-0', DORAEMON_BLUE, 'shadow-lg flex flex-col')}>
      <div className="text-center py-4">
        <Link to="/" className={cn('text-2xl font-bold', DORAEMON_WHITE)}>
          AppLogo {/* Placeholder for Doraemon-themed logo */}
        </Link>
      </div>
      <nav className="space-y-2 flex-grow">
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} currentPath={location.pathname} />
        ))}
        <hr className="my-4 border-sky-400" />
        {playlistItems.map((item) => (
            <NavItem key={item.to} {...item} currentPath={location.pathname} />
        ))}
      </nav>
      <div className="mt-auto pb-4">
        {/* Potentially a user profile section or settings */}
        <p className={cn('text-xs text-center', DORAEMON_WHITE, 'opacity-70')}>© 2024 Your App</p>
      </div>
    </aside>
  );
};

export default Sidebar;