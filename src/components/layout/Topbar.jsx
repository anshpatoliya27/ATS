import { Bell, Search, Check, Menu } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useDataStore } from '@/store/dataStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Topbar({ onMenuClick }) {
  const { user, logout } = useAuthStore();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useDataStore();
  const [showNotifs, setShowNotifs] = useState(false);

  if (!user) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-[#E2E8F0] flex items-center justify-between px-8 z-20 sticky top-0">
      <div className="flex items-center flex-1 gap-3">
        {/* Mobile menu button */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors text-[#64748B]"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative w-[400px] hidden md:block group">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#64748B] transition-colors group-focus-within:text-[#2563EB]" />
          <Input
            type="search"
            placeholder="Search candidates, jobs, vendors..."
            className="w-full bg-[#F8FAFC] pl-10 h-10 rounded-xl border-transparent focus-visible:ring-2 focus-visible:ring-[#2563EB]/20 focus-visible:border-[#2563EB] transition-all hover:bg-gray-100"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative rounded-full hover:bg-gray-100 text-[#64748B] h-10 w-10 transition-colors"
            onClick={() => setShowNotifs(!showNotifs)}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </Button>
          
          {showNotifs && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowNotifs(false)} />
              <div className="absolute right-0 top-12 w-[380px] bg-white rounded-2xl shadow-2xl shadow-black/10 border border-[#E2E8F0] z-40 animate-slide-up overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-[#E2E8F0]">
                  <h4 className="font-bold text-[#0F172A]">Notifications</h4>
                  {unreadCount > 0 && (
                    <button 
                      onClick={() => markAllNotificationsRead()}
                      className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 transition-colors"
                    >
                      <Check className="w-3 h-3" /> Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.map(notif => (
                    <div 
                      key={notif.id}
                      onClick={() => { markNotificationRead(notif.id); }}
                      className={`flex items-start gap-3 p-4 border-b border-[#F1F5F9] cursor-pointer transition-colors hover:bg-gray-50 ${!notif.read ? 'bg-blue-50/50' : ''}`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${!notif.read ? 'bg-[#2563EB]' : 'bg-transparent'}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm leading-snug ${!notif.read ? 'font-semibold text-[#0F172A]' : 'text-[#64748B]'}`}>{notif.message}</p>
                        <p className="text-xs text-[#94A3B8] mt-1">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                  {notifications.length === 0 && (
                    <div className="p-8 text-center text-[#94A3B8]">
                      <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm font-medium">No notifications yet</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="h-8 w-px bg-[#E2E8F0] mx-1 hidden sm:block"></div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-12 w-12 rounded-full flex items-center justify-center p-0 hover:bg-transparent">
              <Avatar className="h-10 w-10 border-2 border-white shadow-sm transition-transform hover:scale-105">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 mt-2 rounded-xl" align="end" forceMount>
            <DropdownMenuLabel className="font-normal p-3">
              <div className="flex flex-col space-y-2">
                <p className="text-base font-bold leading-none text-[#0F172A]">{user.name}</p>
                <p className="text-xs leading-none text-[#64748B]">
                  {user.email}
                </p>
                <div className="mt-2 flex">
                  <span className="inline-flex items-center rounded-full border border-transparent px-2.5 py-1 text-[10px] font-bold bg-[#2563EB]/10 text-[#2563EB] uppercase tracking-wider">
                    {user.role}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-2.5 font-medium rounded-lg mx-1 cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="p-2.5 font-medium rounded-lg mx-1 cursor-pointer">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="p-2.5 font-medium text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer rounded-lg mx-1">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
