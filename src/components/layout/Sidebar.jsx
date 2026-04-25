import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  UserPlus, 
  KanbanSquare, 
  Calendar, 
  BarChart3,
  Settings
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { user } = useAuthStore();
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
  ];

  const filteredRoutes = routes.filter(route => route.roles.includes(user.role));

  return (
    <aside className="w-[280px] bg-white border-r border-[#E2E8F0] flex flex-col h-full shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 hidden lg:flex transition-all duration-300">
      <div className="h-20 flex items-center px-8 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-primary/20">
            H
          </div>
          <span className="font-bold text-xl tracking-tight text-[#0F172A]">HireFlow</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="px-4 mb-3 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
          Main Menu
        </div>
        <nav className="space-y-1.5">
          {filteredRoutes.map((route) => {
            const Icon = route.icon;
            const isActive = location.pathname === route.path || 
                             (route.path !== '/' && location.pathname.startsWith(route.path));
            
            return (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative overflow-hidden",
                  isActive 
                    ? "text-[#2563EB] bg-[#2563EB]/10 shadow-sm" 
                    : "text-[#64748B] hover:bg-gray-50 hover:text-[#0F172A]"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2563EB] rounded-r-full" />
                )}
                <Icon className={cn(
                  "w-5 h-5 transition-transform duration-200 group-hover:scale-110", 
                  isActive ? "text-[#2563EB]" : "text-[#64748B] group-hover:text-[#2563EB]"
                )} />
                {route.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-[#E2E8F0] bg-gray-50/50 mt-auto">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#64748B] hover:bg-white hover:text-[#0F172A] hover:shadow-sm transition-all duration-200 group"
        >
          <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
