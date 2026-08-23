import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Search, ArrowRight, BookOpen, IndianRupee, ArrowLeft, Sparkles, Award } from 'lucide-react';

export default function SchemeAI() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [schemes, setSchemes] = useState([]);

  // Add keyboard shortcut for "Back" (Alt + LeftArrow)
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key === 'ArrowLeft' && step === 2) {
        setStep(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Get form data
    const formData = new FormData(e.target);
    const payload = {
      age: parseInt(formData.get('age')),
      gender: formData.get('gender'),
      occupation: formData.get('occupation'),
      income: parseInt(formData.get('income'))
    };

    try {
      const response = await fetch(`http://${window.location.hostname}:8000/api/scheme/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Backend error');
      const data = await response.json();
      setSchemes(data.schemes);
      setStep(2);
    } catch (err) {
      console.error(err);
      alert('Failed to connect to backend. Make sure the server is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto">
      <header className="mb-10 text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          {step === 2 && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setStep(1)}
              className="p-3 rounded-2xl bg-dark-900 border border-white/5 text-gray-400 hover:text-white hover:bg-dark-800 transition-all shadow-lg"
              title="Back (Alt + ←)"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          )}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-indigo shadow-lg shadow-accent-blue/20 animate-float">
            <FileText className="w-7 h-7 text-white" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">Scheme AI</h1>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-2">Discover welfare schemes and government grants tailored specifically to your demographics in seconds.</p>
      </header>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div 
            key="form" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -15 }} 
            className="glass-panel p-8 max-w-2xl mx-auto border border-white/5 hover:border-white/10"
          >
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
              <Sparkles className="w-4 h-4 text-accent-cyan" />
              <h2 className="text-lg font-black text-white tracking-wide">Tell Us About Yourself</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Age</label>
                  <input name="age" type="number" required className="w-full bg-dark-950 border border-white/5 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/25 transition-all text-sm" placeholder="e.g. 35" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Gender</label>
                  <div className="relative">
                    <select name="gender" className="w-full bg-dark-950 border border-white/5 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent-cyan transition-all text-sm appearance-none cursor-pointer">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Primary Occupation</label>
                <div className="relative">
                  <select name="occupation" className="w-full bg-dark-950 border border-white/5 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent-cyan transition-all text-sm appearance-none cursor-pointer">
                    <option value="Farmer (Landowner)">Farmer (Landowner)</option>
                    <option value="Agricultural Laborer">Agricultural Laborer</option>
                    <option value="Artisan / Weaver">Artisan / Weaver</option>
                    <option value="Student">Student</option>
                    <option value="Small Business">Small Business</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
                </div>
              </div>
 
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Annual Family Income (₹)</label>
                <input name="income" type="number" required className="w-full bg-dark-950 border border-white/5 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent-cyan transition-all text-sm" placeholder="e.g. 50000" />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-blue to-accent-indigo hover:from-accent-cyan hover:to-accent-blue text-white font-black text-base shadow-lg hover:shadow-accent-blue/20 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <span className="animate-pulse">Matching Eligibility...</span> : <><Search className="w-5 h-5" /> Find Eligible Schemes</>}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div key="results" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-black text-white tracking-wide">Recommended Schemes</h2>
                <p className="text-gray-400 text-xs mt-1">We discovered {schemes.length} matching government grants aligned with your profile.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schemes.map((scheme, idx) => (
                <motion.div 
                  key={scheme.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="glass-panel p-6 flex flex-col justify-between relative overflow-hidden border border-white/5 hover:border-accent-blue/30 hover:shadow-neon-cyan group"
                >
                  <div className="absolute top-0 right-0 p-4">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-accent-blue/10 text-accent-cyan font-black text-xs">
                      {scheme.match}% match
                    </span>
                  </div>
                  
                  <div className="mb-6 pt-2">
                    <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center mb-4 text-accent-cyan group-hover:scale-110 transition-transform">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-black text-white mb-2 pr-16 leading-snug group-hover:text-accent-cyan transition-colors">{scheme.name}</h3>
                    <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs mb-4 bg-emerald-500/10 w-max px-2.5 py-1 rounded-lg">
                      <IndianRupee className="w-3.5 h-3.5" /> {scheme.amount}
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{scheme.desc}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-white/5">
                    <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-accent-blue hover:text-white text-gray-300 font-bold text-xs transition-all flex items-center justify-center gap-2 group-hover:bg-accent-blue group-hover:text-white group-hover:shadow-lg group-hover:shadow-accent-blue/20">
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
