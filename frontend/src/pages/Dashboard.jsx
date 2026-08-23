import React from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, FileText, Bot, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';

const stats = [
  { label: 'Families Assisted', value: '18,240', icon: Users, color: 'text-accent-blue', border: 'hover:border-accent-blue/30', bg: 'bg-accent-blue/10', glow: 'shadow-neon-cyan' },
  { label: 'Medical Queries', value: '4,150', icon: Activity, color: 'text-accent-rose', border: 'hover:border-accent-rose/30', bg: 'bg-accent-rose/10', glow: 'shadow-[0_0_15px_rgba(244,63,94,0.15)]' },
  { label: 'Students Learning', value: '7,600', icon: FileText, color: 'text-primary-400', border: 'hover:border-primary-400/30', bg: 'bg-primary-500/10', glow: 'shadow-neon-emerald' },
  { label: 'AI Interactions', value: '62.8K', icon: Bot, color: 'text-accent-purple', border: 'hover:border-accent-purple/30', bg: 'bg-accent-purple/10', glow: 'shadow-neon-purple' },
];

export default function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-primary-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="text-[10px] uppercase tracking-widest font-black text-primary-400">Live Infrastructure Analytics</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">Platform Overview</h1>
          <p className="text-gray-400 text-sm mt-1">Real-time impact statistics of VillageOS across rural digital portals.</p>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.02] border border-white/5 text-gray-400 text-xs">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          Data refreshed 2 mins ago
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className={`glass-panel p-6 border border-white/5 ${stat.border} hover:bg-white/[0.01] hover:${stat.glow} transition-all duration-300 group`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3 mr-1" /> +12.4%
              </span>
            </div>
            <h3 className="text-3xl font-black text-white tracking-tight mb-1">{stat.value}</h3>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Analytics widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-6 border border-white/5 flex flex-col hover:border-white/10">
          <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
            <div>
              <h3 className="text-lg font-black text-white tracking-wide">Service Impact Breakdown</h3>
              <p className="text-xs text-gray-500">Distribution of user queries by domain.</p>
            </div>
            <span className="text-[10px] font-extrabold uppercase bg-white/5 px-2.5 py-1 rounded text-gray-400">Last 30 Days</span>
          </div>
          
          <div className="space-y-6 flex-1">
            {[
              { label: 'Agriculture & Krishi AI', count: '5,240', percent: 85, color: 'from-emerald-500 to-teal-500' },
              { label: 'Healthcare & Emergency', count: '4,150', percent: 72, color: 'from-rose-500 to-pink-500' },
              { label: 'Education & Scholarships', count: '3,800', percent: 65, color: 'from-blue-500 to-accent-cyan' },
              { label: 'Employment & Livelihood', count: '2,900', percent: 48, color: 'from-amber-500 to-orange-500' },
              { label: 'Government Schemes', count: '2,150', percent: 35, color: 'from-purple-500 to-indigo-500' },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300 font-medium text-xs md:text-sm">{item.label}</span>
                  <span className="text-white font-black text-xs md:text-sm">{item.count}</span>
                </div>
                <div className="h-2 w-full bg-dark-950 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ duration: 1.2, delay: 0.3 + (i * 0.08), ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 border border-white/5 flex flex-col hover:border-white/10">
          <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
            <Bot className="w-5 h-5 text-accent-purple" />
            <div>
              <h3 className="text-lg font-black text-white tracking-wide">Top AI Queries</h3>
              <p className="text-xs text-gray-500">Most frequent user interactions.</p>
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            {[
              { tag: 'Agriculture', text: 'Best time for paddy sowing?', hits: '1.2K', color: 'text-primary-400 bg-primary-500/10' },
              { tag: 'Health', text: 'Nearest Jan Aushadhi Kendra?', hits: '940', color: 'text-accent-rose bg-accent-rose/10' },
              { tag: 'Education', text: 'Post-matric scholarship date?', hits: '850', color: 'text-accent-cyan bg-accent-cyan/10' },
              { tag: 'Livelihood', text: 'How to apply for Mudra loan?', hits: '720', color: 'text-amber-400 bg-amber-500/10' },
              { tag: 'Schemes', text: 'PM Kisan installment status?', hits: '680', color: 'text-accent-purple bg-accent-purple/10' },
            ].map((item, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 group">
                <div className="flex justify-between items-center mb-1.5">
                  <span className={`text-[9px] uppercase tracking-widest font-black px-2 py-0.5 rounded ${item.color}`}>{item.tag}</span>
                  <span className="text-[10px] text-gray-500 font-medium">{item.hits} searches</span>
                </div>
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors">"{item.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
