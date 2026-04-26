import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ROLE_OPTIONS } from '@/constants';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-select Admin on load
  useEffect(() => {
    handleRoleSelect(ROLE_OPTIONS[0].value);
  }, []);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    // Auto-fill demo credentials
    setEmail(`${selectedRole.toLowerCase().replace(' ', '')}@hireflow.com`);
    setPassword('demo123');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      // Simulate a brief loading state for secure feeling
      setTimeout(() => {
        login(email, role || 'Admin');
      }, 600);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e6eff5] p-4 font-sans relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-[-20%] left-[-15%] w-[50%] h-[50%] rounded-full bg-white/60 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-15%] w-[50%] h-[50%] rounded-full bg-[#1d3557]/10 blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[420px] relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-[#1d3557] font-bold mb-6 hover:opacity-70 transition-opacity">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <Card className="shadow-2xl shadow-[#1d3557]/10 border border-white/50 bg-white/80 backdrop-blur-xl p-4 rounded-[2rem]">
          <CardHeader className="space-y-2 text-center pb-6 pt-4">
            <div className="flex justify-center mb-2">
              <div className="w-14 h-14 bg-[#1d3557] rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-[#1d3557]/20">
                H
              </div>
            </div>
            <CardTitle className="text-2xl font-black tracking-tight text-[#1d3557]">System Access</CardTitle>
            <CardDescription className="text-sm font-medium text-slate-500">
              Select a demo profile to securely log in.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              
              {/* Demo Role Selector */}
              <div className="space-y-3">
                <Label className="text-[#1d3557] font-bold text-xs uppercase tracking-wider">Demo Credentials (Click one)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {ROLE_OPTIONS.map(r => {
                    const Icon = r.icon;
                    const isSelected = role === r.value;
                    return (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => handleRoleSelect(r.value)}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left ${
                          isSelected 
                            ? 'border-[#1d3557] bg-[#1d3557] text-white shadow-md' 
                            : 'border-slate-200 bg-white hover:border-[#1d3557]/30 text-[#1d3557]'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? 'bg-white/20' : 'bg-[#e6eff5]'}`}>
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#4b6b8b]'}`} />
                        </div>
                        <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-[#1d3557]'}`}>{r.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#1d3557] font-bold text-sm">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Auto-filled email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="h-12 bg-white border-slate-200 focus-visible:ring-[#1d3557]/20 focus-visible:border-[#1d3557] rounded-xl text-sm font-medium shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#1d3557] font-bold text-sm">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Auto-filled password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    className="h-12 bg-white border-slate-200 focus-visible:ring-[#1d3557]/20 focus-visible:border-[#1d3557] rounded-xl text-sm font-bold tracking-widest shadow-sm"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-sm font-bold bg-[#1d3557] hover:bg-[#2A4B65] text-white shadow-xl shadow-[#1d3557]/20 mt-4 rounded-xl transition-all duration-200 active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </div>
                ) : (
                  'Secure Login'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="pt-2 pb-4">
            <p className="text-center text-xs text-slate-400 w-full font-medium">
              HireFlow Enterprise ATS • v2.0
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
