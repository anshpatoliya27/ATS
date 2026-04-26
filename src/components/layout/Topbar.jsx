import { Bell, Search, Moon, Sun, Menu, Check } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useDataStore } from '@/store/dataStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function Topbar({ onMenuClick }) {
  const { user } = useAuthStore();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useDataStore();
  const [showNotifs, setShowNotifs] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  if (!user) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-20 flex items-center px-6 lg:px-8 pt-6 pb-2 z-20 sticky top-0 bg-[#e6eff5] w-full">
      <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 h-16 flex items-center justify-between px-6">
        
        {/* Left: Mobile Menu & Welcome Text */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors text-[#1d3557]"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-extrabold text-[#1d3557] hidden sm:block tracking-tight">
            Welcome {user.name.split(' ')[0]} !
          </h2>
        </div>

        {/* Right: Search & Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* Search Bar */}
          <div className="relative w-[200px] md:w-[320px] group hidden xs:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] transition-colors group-focus-within:text-[#1d3557]" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-[#f8fafc] pl-11 h-10 rounded-full border border-slate-200 focus-visible:ring-2 focus-visible:ring-[#1d3557]/20 focus-visible:border-[#1d3557] transition-all hover:bg-gray-50/80 shadow-inner"
            />
          </div>

          <div className="flex items-center gap-3 bg-[#1d3557] rounded-full p-1.5 px-3 shadow-md shadow-blue-900/10">
            {/* Theme Toggle (Visual only for now) */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/20 text-white"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" fill="currentColor" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifs(!showNotifs)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/20 text-white relative"
              >
                <Bell className="w-4 h-4" fill={unreadCount > 0 ? "currentColor" : "none"} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#1d3557]"></span>
                )}
              </button>
              
              {showNotifs && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setShowNotifs(false)} />
                  <div className="absolute right-0 top-12 w-[340px] bg-white rounded-2xl shadow-2xl shadow-[#1d3557]/10 border border-[#E2E8F0] z-40 animate-slide-up overflow-hidden text-[#0F172A]">
                    <div className="flex items-center justify-between p-4 border-b border-[#E2E8F0]">
                      <h4 className="font-bold text-[#0F172A]">Notifications</h4>
                      {unreadCount > 0 && (
                        <button 
                          onClick={() => markAllNotificationsRead()}
                          className="text-xs font-semibold text-[#1d3557] hover:text-blue-800 flex items-center gap-1 transition-colors"
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
                          <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${!notif.read ? 'bg-[#1d3557]' : 'bg-transparent'}`} />
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
          </div>

        </div>
      </div>
    </header>
  );
}
