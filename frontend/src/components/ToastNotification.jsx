import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ToastNotification() {
  const { toastMessage } = useAuth();

  if (!toastMessage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        className="fixed top-5 right-5 z-[200] max-w-sm w-full"
      >
        <div className="glass-panel p-4 border border-emerald-500/30 bg-dark-900/90 shadow-2xl rounded-2xl flex items-center gap-3 backdrop-blur-xl">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-white leading-snug">{toastMessage.text}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
