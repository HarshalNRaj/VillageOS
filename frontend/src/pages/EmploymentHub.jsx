import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ExternalLink, ChevronRight, ArrowLeft, Sparkles } from 'lucide-react';

const DATA = {
  '8th-10th': {
    label: '8th / 10th Pass',
    jobs: [
      { title: 'Indian Army Soldier (GD)', org: 'Indian Army', pay: '₹21,700–69,100/month', link: 'https://joinindianarmy.nic.in', tag: 'Defence' },
      { title: 'Railway Group D', org: 'RRB', pay: '₹18,000–56,900/month', link: 'https://indianrailways.gov.in', tag: 'Railway' },
      { title: 'SSC MTS (Multi-Tasking Staff)', org: 'SSC', pay: '₹18,000–56,900/month', link: 'https://ssc.nic.in', tag: 'Govt.' },
      { title: 'Police Constable (State)', org: 'State Police', pay: '₹20,000–60,000/month', link: 'https://india.gov.in', tag: 'Police' },
    ],
    skills: [
      { name: 'ITI Trades (Free)', desc: 'Electrician, Plumber, Welder, Fitter — 1-2 year govt. certified courses near you.', link: 'https://www.ncvtmis.gov.in' },
      { name: 'PMKVY Free Training', desc: 'Short-term skill training in 200+ trades with ₹8,000 stipend.', link: 'https://pmkvyofficial.org' },
    ],
    internships: [
      { name: 'PM Internship Scheme', desc: 'Internship in top companies for youth. ₹5,000/month stipend. Apply at pminternship.mca.gov.in', link: 'https://pminternship.mca.gov.in' },
    ],
  },
  '12th-arts': {
    label: '12th Pass — Arts',
    jobs: [
      { title: 'SSC CHSL (LDC/DEO)', org: 'SSC', pay: '₹25,500–81,100/month', link: 'https://ssc.nic.in', tag: 'Govt.' },
      { title: 'Bank Clerk (IBPS)', org: 'IBPS', pay: '₹29,000–₹60,000/month', link: 'https://www.ibps.in', tag: 'Banking' },
      { title: 'Anganwadi Supervisor', org: 'State Govt.', pay: '₹20,000–40,000/month', link: 'https://wcd.nic.in', tag: 'Social' },
      { title: 'State PSC Clerk', org: 'State PSC', pay: '₹25,000–70,000/month', link: 'https://india.gov.in', tag: 'State Govt.' },
    ],
    skills: [
      { name: 'PMGDISHA (Digital Literacy)', desc: 'Free digital skills certification. Use CSC to enroll.', link: 'https://pmgdisha.in' },
      { name: 'Skill India — Retail & Tourism', desc: 'Free courses in hospitality, retail, and tourism with placement support.', link: 'https://skillindia.gov.in' },
    ],
    internships: [
      { name: 'PM Internship Scheme', desc: '12-month internship in top 500 companies. ₹5,000/month + ₹6,000 one-time grant.', link: 'https://pminternship.mca.gov.in' },
      { name: 'NGO Internships (Internshala)', desc: 'Free internships in social work, education, and rural development.', link: 'https://internshala.com' },
    ],
  },
  '12th-science': {
    label: '12th Pass — Science',
    jobs: [
      { title: 'Railway Technician / ALP', org: 'RRB', pay: '₹29,200–92,300/month', link: 'https://indianrailways.gov.in', tag: 'Railway' },
      { title: 'SSC JE (Junior Engineer)', org: 'SSC', pay: '₹35,400–1,12,400/month', link: 'https://ssc.nic.in', tag: 'Govt.' },
      { title: 'ISRO Technician B', org: 'ISRO', pay: '₹29,200–92,300/month', link: 'https://isro.gov.in', tag: 'Space' },
      { title: 'Defence DRDO Apprentice', org: 'DRDO', pay: '₹9,000–12,000 stipend', link: 'https://drdo.gov.in', tag: 'Defence' },
    ],
    skills: [
      { name: 'NIELIT CCC / O-Level', desc: 'Free govt. IT certification. Apply at student.nielit.gov.in', link: 'https://student.nielit.gov.in' },
      { name: 'SWAYAM — Science Courses', desc: 'Free online Physics, Chemistry, Biology courses from IITs.', link: 'https://swayam.gov.in' },
    ],
    internships: [
      { name: 'CSIR Lab Internship', desc: 'Summer internships at CSIR labs for science students.', link: 'https://www.csir.res.in' },
      { name: 'PM Internship Scheme', desc: '₹5,000/month internship with top companies. Apply online.', link: 'https://pminternship.mca.gov.in' },
    ],
  },
  '12th-commerce': {
    label: '12th Pass — Commerce',
    jobs: [
      { title: 'IBPS Bank PO / Clerk', org: 'IBPS', pay: '₹29,000–₹63,840/month', link: 'https://ibps.in', tag: 'Banking' },
      { title: 'SSC CGL (Tax Assistant)', org: 'SSC', pay: '₹29,200–₹92,300/month', link: 'https://ssc.nic.in', tag: 'Govt.' },
      { title: 'LIC Assistant', org: 'LIC of India', pay: '₹30,000–₹55,000/month', link: 'https://licindia.in', tag: 'Insurance' },
      { title: 'Post Office Clerk / PA', org: 'India Post', pay: '₹25,500–₹81,100/month', link: 'https://indiapost.gov.in', tag: 'Postal' },
    ],
    skills: [
      { name: 'Tally Accounting (Free)', desc: 'Free Tally training available at most ITIs and CSCs for commerce students.', link: 'https://tallysolutions.com' },
      { name: 'GST & Income Tax Course (SWAYAM)', desc: 'Free taxation and accounting courses from top universities.', link: 'https://swayam.gov.in' },
    ],
    internships: [
      { name: 'PM Internship Scheme', desc: 'Finance, accounts, and banking internships. ₹5,000/month.', link: 'https://pminternship.mca.gov.in' },
      { name: 'CA Foundation Articleship', desc: 'Earn while learning under ICAI\'s Chartered Accountancy program.', link: 'https://icai.org' },
    ],
  },
  'graduate-engineering': {
    label: 'Graduate — Engineering / Diploma',
    jobs: [
      { title: 'UPSC Engineering Services (IES)', org: 'UPSC', pay: '₹56,100–1,32,000+/month', link: 'https://upsc.gov.in', tag: 'UPSC' },
      { title: 'GATE → PSU Jobs (BHEL, ONGC etc.)', org: 'Various PSUs', pay: '₹50,000–1,60,000/month', link: 'https://gate2025.iitr.ac.in', tag: 'PSU' },
      { title: 'SSC JE (Junior Engineer)', org: 'SSC', pay: '₹35,400–1,12,400/month', link: 'https://ssc.nic.in', tag: 'Govt.' },
      { title: 'DRDO Scientist B', org: 'DRDO', pay: '₹56,100+/month', link: 'https://drdo.gov.in', tag: 'Defence R&D' },
    ],
    skills: [
      { name: 'SWAYAM NPTEL Courses', desc: 'Free engineering courses from IITs with certification. Improve GATE score.', link: 'https://nptel.ac.in' },
      { name: 'NASSCOM FutureSkills Prime', desc: 'Free AI, Cloud, and IoT courses for engineering graduates.', link: 'https://futureskillsprime.in' },
    ],
    internships: [
      { name: 'ISRO / DRDO Internship', desc: 'Research internships at premier national labs for engineering students.', link: 'https://isro.gov.in' },
      { name: 'PM Internship Scheme', desc: 'Top 500 company internships in technical roles. ₹5,000/month.', link: 'https://pminternship.mca.gov.in' },
    ],
  },
  'graduate-arts': {
    label: 'Graduate — Arts / Humanities / Social Work',
    jobs: [
      { title: 'UPSC Civil Services (IAS/IPS/IFS)', org: 'UPSC', pay: '₹56,100–2,50,000+/month', link: 'https://upsc.gov.in', tag: 'UPSC' },
      { title: 'State PSC (SDM/BDO/Tehsildar)', org: 'State PSC', pay: '₹45,000–1,40,000/month', link: 'https://india.gov.in', tag: 'State Govt.' },
      { title: 'SSC CGL (Inspector / Auditor)', org: 'SSC', pay: '₹35,400–1,12,400/month', link: 'https://ssc.nic.in', tag: 'Govt.' },
      { title: 'Primary School Teacher (TET)', org: 'State Govt.', pay: '₹35,000–70,000/month', link: 'https://india.gov.in', tag: 'Teaching' },
    ],
    skills: [
      { name: 'SWAYAM — Social Sciences', desc: 'Free courses in Sociology, Political Science, and Public Policy from top universities.', link: 'https://swayam.gov.in' },
      { name: 'iGOT Karmayogi (Govt. Training)', desc: 'Free government administration and policy courses for civil service aspirants.', link: 'https://igot.gov.in' },
    ],
    internships: [
      { name: 'UN Volunteers India', desc: 'Internships and volunteering with UN agencies on rural and social development.', link: 'https://www.unv.org' },
      { name: 'PM Internship Scheme', desc: 'CSR and social impact roles in top companies. ₹5,000/month.', link: 'https://pminternship.mca.gov.in' },
    ],
  },
};

const EDU_OPTIONS = [
  { key: '8th-10th', label: '8th / 10th Pass', emoji: '📚' },
  { key: '12th-arts', label: '12th — Arts', emoji: '✏️' },
  { key: '12th-science', label: '12th — Science', emoji: '🔬' },
  { key: '12th-commerce', label: '12th — Commerce', emoji: '💹' },
  { key: 'graduate-engineering', label: 'Graduate — Engineering / Diploma', emoji: '⚙️' },
  { key: 'graduate-arts', label: 'Graduate — Arts / Social Work', emoji: '🎓' },
];

function Card({ item, accent, catColor }) {
  return (
    <a href={item.link} target="_blank" rel="noopener noreferrer"
      className={`group flex flex-col gap-2.5 p-4 rounded-xl bg-dark-900/40 border border-white/5 hover:border-${accent}-500/40 hover:bg-white/[0.02] transition-all duration-200`}>
      <div className="flex items-start justify-between gap-3">
        <span className="font-bold text-gray-200 text-xs md:text-sm group-hover:text-primary-400 transition-colors">{item.title || item.name}</span>
        {item.tag && <span className={`text-[9px] px-2 py-0.5 rounded-md bg-gradient-to-r ${catColor} text-white font-black flex-shrink-0`}>{item.tag}</span>}
        <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-primary-400 flex-shrink-0 transition-colors" />
      </div>
      {item.org && <p className="text-[10px] text-gray-500 font-medium">{item.org} · {item.pay}</p>}
      {item.desc && <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>}
    </a>
  );
}

export default function EmploymentHub() {
  const [selected, setSelected] = useState(null);
  const data = selected ? DATA[selected] : null;

  // Add keyboard shortcut for "Back" (Alt + LeftArrow)
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key === 'ArrowLeft' && selected) {
        setSelected(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-4">
          {selected && (
            <motion.button 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setSelected(null)}
              className="p-3 rounded-2xl bg-dark-900 border border-white/5 text-gray-400 hover:text-white hover:bg-dark-800 transition-all shadow-md"
              title="Back (Alt + ←)"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          )}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center shadow-lg shadow-accent-cyan/20 animate-float">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">Employment & Skill Hub</h1>
              <p className="text-gray-400 text-xs mt-0.5">Government vacancies, vocational internships, and skill training programs.</p>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {!selected ? (
          <motion.div key="selector" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="mb-6 p-4 rounded-xl bg-accent-cyan/5 border border-accent-cyan/15 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-cyan" />
              <p className="text-accent-cyan text-xs">Choose your educational path below to filter verified career listings and skill programs.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EDU_OPTIONS.map((opt) => (
                <motion.button 
                  key={opt.key} 
                  whileHover={{ scale: 1.01 }} 
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelected(opt.key)}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-dark-900/40 border border-white/5 hover:border-accent-cyan/30 hover:bg-white/[0.01] transition-all text-left group shadow-lg"
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-gray-200 group-hover:text-accent-cyan transition-colors text-sm">{opt.label}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Explore Opportunities →</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-accent-cyan transition-colors" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            <div className="p-3 bg-dark-900 border border-white/5 rounded-xl inline-flex items-center gap-2">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Education Filter:</span>
              <span className="text-xs font-black text-accent-cyan">{data.label}</span>
            </div>

            {/* Govt Jobs */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🏛️</span>
                <h2 className="text-sm font-black text-white uppercase tracking-wider">Government Vacancies</h2>
                <span className="text-[10px] font-black bg-white/5 text-gray-400 px-2 py-0.5 rounded-full">{data.jobs.length} listed</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.jobs.map((j, i) => <Card key={i} item={j} accent="cyan" catColor="from-accent-cyan to-accent-blue" />)}
              </div>
            </section>

            {/* Internships */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🚀</span>
                <h2 className="text-sm font-black text-white uppercase tracking-wider">Internships & Stipends</h2>
                <span className="text-[10px] font-black bg-white/5 text-gray-400 px-2 py-0.5 rounded-full">{data.internships.length} listed</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.internships.map((j, i) => <Card key={i} item={j} accent="purple" catColor="from-accent-purple to-accent-indigo" />)}
              </div>
            </section>

            {/* Skill Programs */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🛠️</span>
                <h2 className="text-sm font-black text-white uppercase tracking-wider">Free Certified Trainings</h2>
                <span className="text-[10px] font-black bg-white/5 text-gray-400 px-2 py-0.5 rounded-full">{data.skills.length} listed</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.skills.map((j, i) => <Card key={i} item={j} accent="green" catColor="from-primary-500 to-accent-cyan" />)}
              </div>
            </section>

            {/* Helpline */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-accent-cyan/10 to-accent-blue/5 border border-accent-cyan/10">
              <p className="text-white font-bold text-sm">Official Career Helplines</p>
              <p className="text-[10px] text-gray-500 mt-1">
                Skill India Support: <span className="text-gray-300 font-mono font-bold">1800-123-9626</span> &nbsp;|&nbsp;
                Employment Exchange: <span className="text-gray-300 font-mono font-bold">1800-425-1514</span> &nbsp;|&nbsp;
                UPSC Helpline desk: <span className="text-gray-300 font-mono font-bold">011-23385271</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
