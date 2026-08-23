import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, LayoutDashboard, Leaf, FileText, Mic, GraduationCap, Heart, Briefcase, TrendingUp, Menu, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
];

const aiItems = [
  { name: 'Krishi AI', path: '/krishi-ai', icon: Leaf },
  { name: 'Scheme AI', path: '/scheme-ai', icon: FileText },
  { name: 'Voice AI', path: '/voice-ai', icon: Mic },
];

const ruralItems = [
  { name: 'Education', path: '/education', icon: GraduationCap },
  { name: 'Health Care', path: '/healthcare', icon: Heart },
  { name: 'Livelihood', path: '/livelihood', icon: Briefcase },
  { name: 'Employment & Skills', path: '/employment', icon: TrendingUp },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Keyboard shortcut for Back (Alt + LeftArrow)
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key === 'ArrowLeft') {
        navigate(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-dark-950/40 backdrop-blur-2xl">
      <div className="p-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-accent-cyan flex items-center justify-center shadow-lg shadow-primary-500/20">
            <Leaf className="text-white w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">VillageOS</h1>
            <span className="text-[10px] font-bold text-primary-400 tracking-widest uppercase">Digital Rural AI</span>
          </div>
        </div>
        <button onClick={toggleSidebar} className="md:hidden text-gray-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
              isActive
                ? "bg-gradient-to-r from-primary-500/10 to-accent-cyan/5 text-primary-400 font-bold border-l-2 border-primary-400 shadow-neon-emerald"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="text-sm tracking-wide">{item.name}</span>
          </NavLink>
        ))}

        <div className="pt-4 pb-1.5 px-4">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">AI Assistance</p>
        </div>
        {aiItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
              isActive
                ? "bg-gradient-to-r from-accent-purple/10 to-accent-indigo/5 text-accent-purple font-bold border-l-2 border-accent-purple shadow-neon-purple"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="text-sm tracking-wide">{item.name}</span>
          </NavLink>
        ))}

        <div className="pt-4 pb-1.5 px-4">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Rural Services</p>
        </div>
        {ruralItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
              isActive
                ? "bg-gradient-to-r from-accent-cyan/10 to-accent-blue/5 text-accent-cyan font-bold border-l-2 border-accent-cyan shadow-neon-cyan"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="text-sm tracking-wide">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-white/5">
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-gray-200 font-bold">System Online</span>
          </div>
          <p className="text-[10px] text-gray-500">Connected to KrishiNet Local Node</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-dark-950/80 backdrop-blur-md border-b border-white/5 z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
            title="Back (Alt + ←)"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-accent-cyan flex items-center justify-center shadow-lg">
            <Leaf className="text-white w-4 h-4" />
          </div>
          <span className="font-extrabold text-sm text-white tracking-wider">VillageOS</span>
        </div>
        <button onClick={toggleSidebar} className="p-2 text-gray-400 hover:text-white transition-colors">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 left-0 bottom-0 w-72 bg-dark-950 border-r border-white/5 z-[60] md:hidden flex flex-col"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="w-64 h-screen fixed left-0 top-0 hidden md:flex flex-col border-r border-white/5 bg-dark-900/20 z-40">
        <SidebarContent />
      </div>
    </>
  );
}
