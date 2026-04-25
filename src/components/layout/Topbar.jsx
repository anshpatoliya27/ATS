import { Bell, Search } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Topbar() {
  const { user, logout } = useAuthStore();

  if (!user) return null;

  return (
    <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-[#E2E8F0] flex items-center justify-between px-8 z-20 sticky top-0">
      <div className="flex items-center flex-1">
        <div className="relative w-[400px] hidden md:block group">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#64748B] transition-colors group-focus-within:text-[#2563EB]" />
          <Input
            type="search"
            placeholder="Search candidates, jobs, vendors..."
            className="w-full bg-[#F8FAFC] pl-10 h-10 rounded-xl border-transparent focus-visible:ring-2 focus-visible:ring-[#2563EB]/20 focus-visible:border-[#2563EB] transition-all hover:bg-gray-100"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-gray-100 text-[#64748B] h-10 w-10 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </Button>
        
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
          <DropdownMenuContent className="w-64 mt-2" align="end" forceMount>
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
            <DropdownMenuItem className="p-2.5 font-medium">Profile</DropdownMenuItem>
            <DropdownMenuItem className="p-2.5 font-medium">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="p-2.5 font-medium text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
