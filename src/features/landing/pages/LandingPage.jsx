import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Zap, Shield, Users, BarChart3, Briefcase, Database, Server, Lock, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode from document class
  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="bg-[#e6eff5] font-sans selection:bg-[#1d3557] selection:text-white relative min-h-screen">
      
      {/* Background Decorative Elements (Fixed to Viewport to prevent scroll bugs) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white/60 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#1d3557]/5 blur-[150px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1d3557] to-[#4b6b8b] rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-[#1d3557]/20 text-xl tracking-tighter">
              H
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-[#1d3557]">HireFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-slate-600">
            <a href="#features" className="hover:text-[#1d3557] transition-colors">System Features</a>
            <a href="#architecture" className="hover:text-[#1d3557] transition-colors">Architecture</a>
          </div>
          <div className="flex items-center gap-4">
            {/* Theme Toggle (Functional) */}
            <button 
              onClick={toggleDarkMode}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-[#1d3557]/5 hover:bg-[#1d3557]/10 text-[#1d3557]"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link to="/login" className="px-6 py-2.5 bg-[#1d3557] hover:bg-[#2A4B65] text-white rounded-xl text-[15px] font-bold transition-all duration-300 shadow-md shadow-[#1d3557]/20 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2">
              System Login <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 relative z-10 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl mx-auto pt-12 md:pt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-bold text-[#1d3557] tracking-wide">Enterprise ATS Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-[#1d3557] tracking-tight leading-[1.1] mb-8">
            Centralized Recruitment <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1d3557] to-[#4b6b8b]">Management System.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            A comprehensive Applicant Tracking System built to streamline vendor submissions, manage candidate pipelines, and coordinate hiring managers in one secure environment.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-[#1d3557] hover:bg-[#2A4B65] text-white rounded-2xl text-lg font-bold transition-all duration-300 shadow-xl shadow-[#1d3557]/20 hover:-translate-y-1 flex items-center justify-center gap-2 group">
              Access Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Hero Image Mockup (CSS only to prevent image loading errors) */}
        <div className="mt-20 w-full max-w-5xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#1d3557]/20 to-[#4b6b8b]/20 rounded-3xl blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-2xl aspect-[16/9] md:aspect-[21/9] flex items-center justify-center">
            <div className="absolute inset-0 bg-[#e6eff5] flex">
              {/* Sidebar Mock */}
              <div className="w-[20%] h-full bg-[#1d3557] p-4 hidden md:flex flex-col gap-4 border-r border-slate-700/50">
                <div className="w-10 h-10 bg-white/10 rounded-full mb-6"></div>
                <div className="w-full h-8 bg-white/10 rounded-lg"></div>
                <div className="w-3/4 h-8 bg-white/5 rounded-lg"></div>
                <div className="w-5/6 h-8 bg-white/5 rounded-lg"></div>
              </div>
              {/* Main Content Mock */}
              <div className="flex-1 p-6 flex flex-col gap-4">
                <div className="h-12 w-full bg-white rounded-xl shadow-sm border border-slate-100"></div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="h-20 bg-white rounded-xl shadow-sm border border-slate-100"></div>
                  <div className="h-20 bg-white rounded-xl shadow-sm border border-slate-100"></div>
                  <div className="h-20 bg-white rounded-xl shadow-sm border border-slate-100"></div>
                  <div className="h-20 bg-[#faeee5] rounded-xl shadow-sm border border-orange-200"></div>
                </div>
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 relative overflow-hidden">
                   <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-slate-50 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-white relative z-10 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-[#1d3557] tracking-tight mb-4">Core System Capabilities</h2>
            <p className="text-lg text-slate-500 font-medium">
              Everything required to manage the entire hiring lifecycle internally.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Interactive Pipelines", desc: "Drag-and-drop Kanban boards to effortlessly move candidates through screening, interviewing, and hiring stages." },
              { icon: Users, title: "Vendor Portal", desc: "Dedicated access for external recruiters to submit candidates directly to open job requisitions." },
              { icon: Shield, title: "Role-Based Access", desc: "Strict data isolation and custom views for Admins, HR personnel, Hiring Managers, and Vendors." },
              { icon: Briefcase, title: "Job Management", desc: "Create, publish, and track job requisitions across different departments and locations." },
              { icon: BarChart3, title: "Performance Metrics", desc: "Track hiring velocity, vendor submission quality, and overall pipeline health from the admin dashboard." },
              { icon: CheckCircle2, title: "Decision Tracking", desc: "Maintain a clear history of candidate evaluations, interview scores, and final hiring decisions." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#f8fafc] border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-[#1d3557]/5 transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 border border-slate-100">
                  <feature.icon className="w-6 h-6 text-[#1d3557]" />
                </div>
                <h3 className="text-xl font-bold text-[#1d3557] mb-2">{feature.title}</h3>
                <p className="text-slate-600 font-medium text-[15px] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-24 px-6 bg-[#f8fafc] relative z-10 border-t border-slate-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#1d3557] tracking-tight mb-4">System Architecture</h2>
          <p className="text-lg text-slate-500 font-medium mb-16 max-w-2xl mx-auto">
            A secure, scalable architecture designed for enterprise talent acquisition.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 relative">
            {/* Frontend */}
            <div className="w-full md:w-1/3 p-8 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-[#1d3557]/5 z-10 relative">
              <div className="w-16 h-16 bg-[#e6eff5] rounded-2xl mx-auto flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-[#1d3557]" />
              </div>
              <h3 className="text-xl font-bold text-[#1d3557] mb-2">Modern Frontend</h3>
              <p className="text-sm text-slate-500 font-medium">React + Tailwind UI Layer</p>
            </div>
            
            {/* Connector */}
            <div className="hidden md:flex flex-1 h-1 bg-slate-200 relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#1d3557] rounded-full border-4 border-[#f8fafc] flex items-center justify-center">
                 <Lock className="w-3 h-3 text-white" />
               </div>
            </div>

            {/* Backend */}
            <div className="w-full md:w-1/3 p-8 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-[#1d3557]/5 z-10 relative">
              <div className="w-16 h-16 bg-[#e6eff5] rounded-2xl mx-auto flex items-center justify-center mb-4">
                <Server className="w-8 h-8 text-[#1d3557]" />
              </div>
              <h3 className="text-xl font-bold text-[#1d3557] mb-2">Secure Core</h3>
              <p className="text-sm text-slate-500 font-medium">Node.js + REST API</p>
            </div>

            {/* Connector */}
            <div className="hidden md:flex flex-1 h-1 bg-slate-200 relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-slate-300 rounded-full" />
            </div>

            {/* Database */}
            <div className="w-full md:w-1/3 p-8 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-[#1d3557]/5 z-10 relative">
              <div className="w-16 h-16 bg-[#1d3557] rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-[#1d3557]/20">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1d3557] mb-2">Data Storage</h3>
              <p className="text-sm text-slate-500 font-medium">Encrypted Postgres DB</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA & Legal */}
      <footer className="bg-[#1d3557] text-white py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white font-black text-2xl mb-6">H</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to access the system?</h2>
          <p className="text-blue-200 mb-8 max-w-md">Login with your assigned credentials to access your personalized role dashboard.</p>
          <Link to="/login" className="px-8 py-3 bg-white text-[#1d3557] rounded-xl font-bold transition-all hover:bg-slate-100 hover:scale-105 active:scale-95 shadow-lg">
            Go to Login
          </Link>
          
          <div className="w-full h-px bg-white/10 my-10"></div>
          
          <p className="text-slate-400 font-medium text-sm">© {new Date().getFullYear()} HireFlow ATS Platform. Internal Use Only.</p>
        </div>
      </footer>
    </div>
  );
}
