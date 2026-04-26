import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ROLE_OPTIONS } from '@/constants';

export function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('HR');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      // Simulate a brief loading state
      setTimeout(() => {
        login(email, role);
      }, 400);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] p-4 font-sans selection:bg-[#2563EB] selection:text-white relative overflow-hidden">
      {/* Animated background gradient orbs */}
      <div className="absolute top-[-20%] left-[-15%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#2563EB]/8 to-[#7C3AED]/5 blur-[120px] pointer-events-none animate-pulse-soft"></div>
      <div className="absolute bottom-[-20%] right-[-15%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#2563EB]/6 to-[#06B6D4]/4 blur-[120px] pointer-events-none animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-[30%] right-[20%] w-[25%] h-[25%] rounded-full bg-[#F59E0B]/4 blur-[80px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 animate-slide-up">
        <Card className="shadow-[0_8px_40px_rgb(0,0,0,0.06)] border-[#E2E8F0] bg-white/95 backdrop-blur-xl p-2 rounded-2xl">
          <CardHeader className="space-y-2 text-center pb-6 pt-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-lg shadow-blue-500/30 transition-transform hover:scale-105 hover:rotate-3">
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
                  className="h-12 bg-[#F8FAFC] border-[#E2E8F0] focus-visible:ring-[#2563EB]/20 focus-visible:border-[#2563EB] rounded-xl text-base"
                />
              </div>

              {/* Role selector cards */}
              <div className="space-y-2.5">
                <Label className="text-[#0F172A] font-semibold text-sm">Select Role</Label>
                <div className="grid grid-cols-2 gap-2.5">
                  {ROLE_OPTIONS.map(r => {
                    const Icon = r.icon;
                    const isSelected = role === r.value;
                    return (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setRole(r.value)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                          isSelected 
                            ? 'border-[#2563EB] bg-blue-50 shadow-sm shadow-blue-100' 
                            : 'border-[#E2E8F0] bg-white hover:bg-gray-50 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          isSelected 
                            ? `bg-gradient-to-br ${r.color} shadow-lg` 
                            : 'bg-gray-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-[#64748B]'}`} />
                        </div>
                        <div>
                          <p className={`text-sm font-bold ${isSelected ? 'text-[#2563EB]' : 'text-[#0F172A]'}`}>{r.label}</p>
                          <p className="text-[10px] text-[#94A3B8] font-medium mt-0.5">{r.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-bold bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] shadow-lg shadow-[#2563EB]/25 mt-2 rounded-xl transition-all duration-200 active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  'Continue to Dashboard'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 pt-2 pb-6">
            <div className="text-sm text-center text-[#64748B] w-full">
              By signing in, you agree to our <a href="#" className="text-[#2563EB] hover:underline font-medium">Terms of Service</a>
            </div>
          </CardFooter>
        </Card>
        
        {/* Powered by footer */}
        <p className="text-center text-xs text-[#94A3B8] mt-6 font-medium">
          Powered by <span className="font-bold text-[#64748B]">HireFlow</span> • Enterprise ATS Platform
        </p>
      </div>
    </div>
  );
}
