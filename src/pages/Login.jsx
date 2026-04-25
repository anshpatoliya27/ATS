import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Login() {
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('HR');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email) {
      login(email, role);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] p-4 font-sans selection:bg-[#2563EB] selection:text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#2563EB]/5 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#2563EB]/5 blur-[100px] pointer-events-none"></div>

      <Card className="w-full max-w-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-[#E2E8F0] bg-white/95 backdrop-blur-xl relative z-10 p-2">
        <CardHeader className="space-y-2 text-center pb-8 pt-6">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-[#2563EB] rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-primary/30">
              H
            </div>
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight text-[#0F172A]">Welcome to HireFlow</CardTitle>
          <CardDescription className="text-base text-[#64748B]">
            Sign in to manage your recruitment pipeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-[#0F172A] font-semibold text-sm">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="h-12 bg-[#F8FAFC] border-[#E2E8F0] focus-visible:ring-[#2563EB]/20 focus-visible:border-[#2563EB]"
              />
            </div>
            <div className="space-y-2.5">
              <Label htmlFor="role" className="text-[#0F172A] font-semibold text-sm">Select Role</Label>
              <div className="relative">
                <select 
                  id="role"
                  className="flex h-12 w-full appearance-none rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-sm text-[#0F172A] ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/20 focus-visible:border-[#2563EB] shadow-sm transition-colors"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Admin">Admin</option>
                  <option value="HR">HR</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Hiring Manager">Hiring Manager</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#64748B]">
                  <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full h-12 text-base font-bold bg-[#2563EB] hover:bg-[#1D4ED8] shadow-md shadow-[#2563EB]/20 mt-4 rounded-xl">
              Continue to Dashboard
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 pt-4 pb-6">
          <div className="text-sm text-center text-[#64748B] w-full">
            By signing in, you agree to our <a href="#" className="text-[#2563EB] hover:underline font-medium">Terms of Service</a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
