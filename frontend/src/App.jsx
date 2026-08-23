import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import KrishiAI from './pages/KrishiAI';
import SchemeAI from './pages/SchemeAI';
import VoiceAI from './pages/VoiceAI';
import About from './pages/About';
import Education from './pages/Education';
import HealthCare from './pages/HealthCare';
import Livelihood from './pages/Livelihood';
import EmploymentHub from './pages/EmploymentHub';

function App() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div className="flex min-h-screen bg-dark-950 grid-bg text-gray-100 relative">
      {/* Background gradients */}
      <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

      {!isLanding && <Sidebar />}
      
      <main className={`flex-1 relative z-10 ${!isLanding ? 'md:ml-64 p-6 md:p-10 pt-20 md:pt-10' : ''}`}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/krishi-ai" element={<KrishiAI />} />
            <Route path="/scheme-ai" element={<SchemeAI />} />
            <Route path="/voice-ai" element={<VoiceAI />} />
            <Route path="/education" element={<Education />} />
            <Route path="/healthcare" element={<HealthCare />} />
            <Route path="/livelihood" element={<Livelihood />} />
            <Route path="/employment" element={<EmploymentHub />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
