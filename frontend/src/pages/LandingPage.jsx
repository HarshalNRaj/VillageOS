import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Shield, Briefcase, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-950 grid-bg overflow-hidden relative">
      {/* Background gradients/blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-blue/10 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none animate-float"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center py-6 px-6 lg:px-20 border-b border-white/5 bg-dark-950/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-accent-cyan flex items-center justify-center shadow-lg shadow-primary-500/30">
            <Leaf className="text-white w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-wider">VillageOS</h1>
            <span className="text-[9px] font-bold text-primary-400 tracking-widest uppercase block -mt-1">Rural AI Infrastructure</span>
          </div>
        </div>
        <button 
          onClick={() => navigate('/dashboard')}
          className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-primary-500 hover:text-white border border-white/10 hover:border-primary-500 transition-all duration-300 font-bold text-sm text-gray-300 shadow-lg hover:shadow-primary-500/20"
        >
          Launch Portal
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-24 pb-32 px-6 text-center min-h-[85vh]">
        <motion.div 
          className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-white/[0.03] border border-white/5 text-primary-400 text-xs font-bold tracking-wide mb-8 shadow-inner"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80 }}
        >
          <span className="w-2 h-2 rounded-full bg-primary-400 animate-ping"></span>
          <span className="w-2 h-2 rounded-full bg-primary-500 absolute"></span>
          Digital AI Infrastructure for Rural Communities
        </motion.div>

        <motion.h2 
          className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 max-w-4xl leading-[1.1]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Empowering Rural India <br />
          Through <span className="gradient-text">Generative AI</span>
        </motion.h2>

        <motion.p 
          className="text-gray-400 text-base md:text-lg max-w-2xl mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          A localized operating system delivering instant crop diagnostics, personalized government assistance schemes, and real-time community services.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-56 h-14 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-cyan text-dark-950 font-black text-base hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Launch Dashboard <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => navigate('/about')}
            className="w-56 h-14 flex items-center justify-center gap-2 rounded-2xl bg-white/[0.03] border border-white/10 text-white font-bold text-base hover:bg-white/5 transition-all duration-300"
          >
            Learn More
          </button>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-6xl w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <FeatureCard 
            icon={<Leaf className="w-6 h-6 text-primary-400" />}
            title="Krishi AI"
            desc="Instant crop disease diagnostics and smart preventative treatments for fields."
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-accent-cyan" />}
            title="Scheme AI"
            desc="Demographic-based government scheme matching engine with instant eligibility scoring."
          />
          <FeatureCard 
            icon={<Briefcase className="w-6 h-6 text-accent-purple" />}
            title="Employment Hub"
            desc="Explore rural & urban job listings, MGNREGA work, and technical skill programs."
          />
        </motion.div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div 
      variants={itemVariants} 
      className="glass-panel p-8 text-left hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300 group hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
    >
      <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
        {icon}
      </div>
      <h3 className="text-lg font-black text-white mb-2 tracking-wide group-hover:text-primary-400 transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}
