import React from 'react';
import { motion } from 'framer-motion';
import { Github, Code, Rocket, Server, Sparkles, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto py-10">
      <div className="glass-panel p-10 text-center relative overflow-hidden border border-white/5 shadow-2xl hover:border-white/10">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-400 via-accent-cyan to-accent-purple"></div>
        
        <Rocket className="w-16 h-16 text-accent-cyan mx-auto mb-6 animate-float" />
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">About VillageOS</h1>
        <p className="text-gray-400 text-sm md:text-base mb-10 max-w-2xl mx-auto mt-2 leading-relaxed">
          Created to empower and connect the rural communities of India, VillageOS demonstrates how standard local nodes and high-end modern AI services can be delivered with visual elegance, responsiveness, and speed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
          <div className="p-6 bg-white/[0.01] rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all">
            <h3 className="font-bold text-white text-sm mb-3.5 flex items-center gap-2">
              <Code className="w-4 h-4 text-primary-400" /> Frontend Tech
            </h3>
            <ul className="text-xs text-gray-500 space-y-2 font-medium">
              <li>Framework: <span className="text-gray-300 font-semibold">React + Vite</span></li>
              <li>Styling: <span className="text-gray-300 font-semibold">Tailwind CSS</span></li>
              <li>Animations: <span className="text-gray-300 font-semibold">Framer Motion</span></li>
              <li>Assets: <span className="text-gray-300 font-semibold">Lucide React Icons</span></li>
            </ul>
          </div>
          
          <div className="p-6 bg-white/[0.01] rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all">
            <h3 className="font-bold text-white text-sm mb-3.5 flex items-center gap-2">
              <Server className="w-4 h-4 text-accent-cyan" /> Backend Core
            </h3>
            <ul className="text-xs text-gray-500 space-y-2 font-medium">
              <li>Engine: <span className="text-gray-300 font-semibold">FastAPI (Python)</span></li>
              <li>Server: <span className="text-gray-300 font-semibold">Uvicorn Runner</span></li>
              <li>Data Models: <span className="text-gray-300 font-semibold">Pydantic v2</span></li>
              <li>API Specs: <span className="text-gray-300 font-semibold">Swagger OpenAPI</span></li>
            </ul>
          </div>

          <div className="p-6 bg-white/[0.01] rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all">
            <h3 className="font-bold text-white text-sm mb-3.5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-purple" /> AI Features
            </h3>
            <ul className="text-xs text-gray-500 space-y-2 font-medium">
              <li>Vision: <span className="text-gray-300 font-semibold">Crop Diagnostics</span></li>
              <li>NLP: <span className="text-gray-300 font-semibold">Grant Eligibility Matching</span></li>
              <li>Speech: <span className="text-gray-300 font-semibold">Web Speech Recognition</span></li>
              <li>Audio waves: <span className="text-gray-300 font-semibold">SVG CSS Visualizers</span></li>
            </ul>
          </div>
        </div>

        <a 
          href="https://github.com/HarshalNRaj/VillageOS" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs md:text-sm border border-white/5 transition-all shadow-md hover:shadow-lg"
        >
          <Github className="w-4 h-4" /> View Code on GitHub
        </a>
      </div>
    </motion.div>
  );
}
