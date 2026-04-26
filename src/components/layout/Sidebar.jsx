import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  UserPlus, 
  KanbanSquare, 
  Calendar, 
  BarChart3,
  Settings,
  LogOut,
  X
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Sidebar({ onClose }) {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  if (!user) return null;

  const routes = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard, roles: ['Admin', 'HR', 'Vendor', 'Hiring Manager'] },
    { name: 'Vendors', path: '/vendors', icon: Users, roles: ['Admin', 'HR'] },
    { name: 'Jobs', path: '/jobs', icon: Briefcase, roles: ['Admin', 'HR', 'Vendor', 'Hiring Manager'] },
    { name: 'Candidates', path: '/candidates', icon: UserPlus, roles: ['Admin', 'HR', 'Vendor', 'Hiring Manager'] },
    { name: 'Pipeline', path: '/pipeline', icon: KanbanSquare, roles: ['Admin', 'HR', 'Hiring Manager'] },
    { name: 'Interviews', path: '/interviews', icon: Calendar, roles: ['HR', 'Hiring Manager'] },
    { name: 'Reports', path: '/reports', icon: BarChart3, roles: ['Admin', 'HR'] },
    { name: 'Settings', path: '/settings', icon: Settings, roles: ['Admin', 'HR', 'Vendor', 'Hiring Manager'] },
  ];

  const filteredRoutes = routes.filter(route => route.roles.includes(user.role));

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside className="w-[280px] bg-[#1d3557] flex flex-col h-full z-10 transition-all duration-300 relative text-white">
      
      {/* Mobile close button */}
      {onClose && (
        <button onClick={onClose} className="absolute top-4 right-4 lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
          <X className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Profile Section */}
      <div className="flex flex-col items-center justify-center pt-12 pb-8 px-6 border-b border-white/10">
        <Avatar className="h-20 w-20 border-4 border-white/20 shadow-xl mb-4 bg-white">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-[#1d3557] font-bold text-2xl bg-blue-100">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h3 className="font-bold text-lg tracking-wide text-white">{user.name}</h3>
        <p className="text-sm text-blue-200 mt-1">{user.email}</p>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="flex flex-col gap-1 pl-4">
          {filteredRoutes.map((route) => {
            const Icon = route.icon;
            const isActive = location.pathname === route.path || 
                             (route.path !== '/' && location.pathname.startsWith(route.path));
            
            return (
              <Link
                key={route.path}
                to={route.path}
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-4 px-6 py-3.5 text-[15px] font-semibold transition-all duration-200 group relative",
                  isActive 
                    ? "bg-[#e6eff5] text-[#1d3557] rounded-l-full" 
                    : "text-blue-100 hover:bg-white/5 rounded-l-full"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 transition-transform duration-200 group-hover:scale-110", 
                  isActive ? "text-[#1d3557]" : "text-blue-200 group-hover:text-white"
                )} />
                {route.name}
                
                {/* Seamless corner illusions for active tab */}
                {isActive && (
                  <>
                    <div className="absolute -top-4 right-0 w-4 h-4 bg-transparent shadow-[4px_4px_0_4px_#e6eff5] rounded-br-full" />
                    <div className="absolute -bottom-4 right-0 w-4 h-4 bg-transparent shadow-[4px_-4px_0_4px_#e6eff5] rounded-tr-full" />
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-6 mt-auto">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-blue-200 hover:bg-white/10 hover:text-white transition-all duration-200 group w-full"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          Logout
        </button>
      </div>
    </aside>
  );
}
