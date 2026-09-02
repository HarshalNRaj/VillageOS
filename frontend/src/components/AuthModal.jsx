import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Lock, MapPin, Eye, EyeOff, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, UserCheck, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authMode, setAuthMode, login, register } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    village: '',
    role: 'Farmer',
    rememberMe: true
  });

  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      login({
        name: 'Harshal Raj',
        email: 'harshal@villageos.in',
        village: 'Ramanagara Panchayat',
        role: 'Farmer (Landowner)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
      });
      setIsLoading(false);
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (authMode === 'login') {
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields.');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          login({
            name: formData.email.split('@')[0] || 'Citizen',
            email: formData.email,
            village: formData.village || 'Gram Panchayat',
            role: formData.role || 'Citizen',
            avatar: null
          });
          setIsSuccess(false);
        }, 500);
      }, 800);
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in all required fields.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          register({
            name: formData.name,
            email: formData.email,
            village: formData.village || 'Gram Panchayat',
            role: formData.role,
            avatar: null
          });
          setIsSuccess(false);
        }, 500);
      }, 800);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-dark-950/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-dark-900/90 border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 glass-panel"
        >
          {/* Header Glow background */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-accent-cyan/20 rounded-full blur-3xl pointer-events-none"></div>

          {/* Close button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Content */}
          <div className="p-8 relative z-10">
            {/* Header branding */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-cyan shadow-lg shadow-primary-500/20 mb-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {authMode === 'login' ? 'Welcome Back to VillageOS' : 'Create Your Account'}
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                {authMode === 'login' 
                  ? 'Access crop diagnostics, government schemes & rural services.' 
                  : 'Join VillageOS Lite to access personalized rural AI features.'}
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex p-1 bg-dark-950/60 rounded-2xl border border-white/5 mb-6 relative">
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setError(''); }}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all relative z-10 ${authMode === 'login' ? 'text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('register'); setError(''); }}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all relative z-10 ${authMode === 'register' ? 'text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
              >
                Create Account
              </button>

              {/* Active slider indicator */}
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl bg-gradient-to-r from-primary-500 to-accent-cyan ${authMode === 'login' ? 'left-1' : 'left-[calc(50%+2px)]'}`}
              />
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium text-center"
              >
                {error}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Register: Full Name */}
              {authMode === 'register' && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh Gowda"
                      className="w-full bg-dark-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/20 transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>
              )}

              {/* Email / Mobile */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Email or Mobile Number *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. farmer@villageos.in or +91 9876543210"
                    className="w-full bg-dark-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/20 transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>

              {/* Register: Village / Panchayat */}
              {authMode === 'register' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Gram Panchayat
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        name="village"
                        value={formData.village}
                        onChange={handleChange}
                        placeholder="Ramanagara"
                        className="w-full bg-dark-950 border border-white/10 rounded-xl pl-10 pr-3 py-3 text-xs text-white focus:outline-none focus:border-primary-400 transition-all placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      User Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-primary-400 transition-all"
                    >
                      <option value="Farmer">Farmer</option>
                      <option value="Citizen">Citizen</option>
                      <option value="Student">Student</option>
                      <option value="Panchayat Officer">Officer</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-dark-950 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/20 transition-all placeholder:text-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Register: Confirm Password */}
              {authMode === 'register' && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full bg-dark-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/20 transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-cyan hover:from-primary-400 hover:to-accent-blue text-dark-950 font-black text-sm shadow-lg hover:shadow-primary-500/20 transition-all flex items-center justify-center gap-2 mt-6 relative overflow-hidden"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-dark-950 border-t-transparent rounded-full animate-spin"></div>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-dark-950" />
                    Success!
                  </>
                ) : (
                  <>
                    {authMode === 'login' ? 'Sign In to VillageOS' : 'Create Account'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Quick Demo Login Option */}
              {authMode === 'login' && (
                <div className="pt-2">
                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-white/5"></div>
                    <span className="flex-shrink mx-3 text-[10px] text-gray-500 uppercase tracking-widest">Or Instant Demo</span>
                    <div className="flex-grow border-t border-white/5"></div>
                  </div>
                  <button
                    type="button"
                    onClick={handleQuickDemoLogin}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <UserCheck className="w-4 h-4 text-accent-cyan" />
                    Instant Demo Login (Ramesh Gowda)
                  </button>
                </div>
              )}
            </form>

            {/* Footer toggle text */}
            <div className="text-center mt-6">
              <p className="text-xs text-gray-400">
                {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setError(''); }}
                  className="text-primary-400 font-bold hover:underline ml-1"
                >
                  {authMode === 'login' ? 'Register Now' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
