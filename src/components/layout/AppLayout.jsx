import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Menu, X } from 'lucide-react';

export function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#e6eff5]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden animate-fade-in" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}
      
      {/* Sidebar - desktop always visible, mobile as overlay */}
      <div className={`
        fixed lg:relative z-40 lg:z-10 h-full
        transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden relative">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6 md:px-8 md:pb-8 pt-2 scroll-smooth">
          <div className="max-w-[1400px] mx-auto w-full animate-slide-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
