import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, LayoutDashboard, Leaf, FileText, GraduationCap, Heart, Briefcase, TrendingUp, Menu, X, ArrowLeft, LogOut, LogIn, UserPlus, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../context/AuthContext';

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
  const { user, logout, openAuthModal } = useAuth();

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
      
      <div className="p-4 border-t border-white/5 space-y-3">
        {user ? (
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-accent-cyan flex items-center justify-center text-dark-950 font-black text-sm flex-shrink-0 shadow-md">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{user.name}</p>
                <p className="text-[10px] text-primary-400 font-semibold truncate">{user.role || 'Citizen'}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-xl text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              onClick={() => openAuthModal('login')}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-primary-500 to-accent-cyan text-dark-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-primary-500/20 transition-all"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
            <button
              onClick={() => openAuthModal('register')}
              className="w-full py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs flex items-center justify-center gap-2 border border-white/5 transition-all"
            >
              <UserPlus className="w-3.5 h-3.5" />
              Create Account
            </button>
          </div>
        )}
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
        <div className="flex items-center gap-2">
          {user ? (
            <button
              onClick={logout}
              className="p-2 rounded-xl text-gray-400 hover:text-rose-400"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="px-3 py-1.5 rounded-xl bg-primary-500/20 text-primary-400 font-bold text-xs border border-primary-500/30"
            >
              Sign In
            </button>
          )}
          <button onClick={toggleSidebar} className="p-2 text-gray-400 hover:text-white transition-colors">
            <Menu className="w-5 h-5" />
          </button>
        </div>
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
