import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, GraduationCap, Smartphone, Award, ChevronDown, ChevronUp } from 'lucide-react';

const categories = [
  {
    icon: '🎓',
    title: 'Free Online Education',
    color: 'from-accent-blue to-accent-indigo',
    borderColor: 'border-l-accent-blue',
    items: [
      { name: 'DIKSHA Portal', desc: 'Free NCERT textbooks, videos & courses for Classes 1–12 in 30+ languages.', link: 'https://diksha.gov.in', tag: 'Govt. Free' },
      { name: 'SWAYAM', desc: 'Free online courses from IITs, IIMs, and central universities. Earn certificates.', link: 'https://swayam.gov.in', tag: 'Govt. Free' },
      { name: 'PM eVIDYA', desc: 'One-stop digital education platform with TV, radio, and online content.', link: 'https://www.pmevidya.education.gov.in', tag: 'Govt. Free' },
      { name: 'Khan Academy (Hindi)', desc: 'World-class Maths, Science, and English lessons available free in Hindi.', link: 'https://hi.khanacademy.org', tag: 'Free' },
    ]
  },
  {
    icon: '🪙',
    title: 'Scholarships & Financial Aid',
    color: 'from-primary-500 to-accent-cyan',
    borderColor: 'border-l-primary-500',
    items: [
      { name: 'NSP – National Scholarship Portal', desc: 'Apply for pre-matric, post-matric, and merit scholarships for SC/ST/OBC/Minority students.', link: 'https://scholarships.gov.in', tag: 'Apply Now' },
      { name: 'PM Scholarship Scheme', desc: 'Scholarships for children of ex-servicemen and police officers for professional courses.', link: 'https://ksb.gov.in/pmss.htm', tag: 'Apply Now' },
      { name: 'Vidyalakshmi Portal', desc: 'Apply for education loans and scholarships from multiple banks in one place.', link: 'https://www.vidyalakshmi.co.in', tag: 'Loan & Aid' },
      { name: 'Inspire Scholarship (DST)', desc: 'Scholarship for top science students to pursue research careers. ₹80,000/year.', link: 'https://online-inspire.gov.in', tag: 'Science' },
    ]
  },
  {
    icon: '📱',
    title: 'Digital Literacy & Skills',
    color: 'from-accent-purple to-accent-indigo',
    borderColor: 'border-l-accent-purple',
    items: [
      { name: 'PMGDISHA', desc: 'Pradhan Mantri Gramin Digital Saksharta Abhiyan — free digital literacy training at your nearest CSC.', link: 'https://www.pmgdisha.in', tag: 'Free Training' },
      { name: 'Google Primer (Hindi)', desc: 'Free 5-minute lessons on digital marketing, business, and skills on your phone.', link: 'https://www.yourprimer.com', tag: 'App' },
      { name: 'NIELIT Free Courses', desc: 'Free IT and computer courses (CCC, BCC) with government certification.', link: 'https://student.nielit.gov.in', tag: 'Govt. Certified' },
      { name: 'Skill India Portal', desc: 'Find free vocational training centers near you for 200+ job-oriented skills.', link: 'https://www.skillindia.gov.in', tag: 'Vocational' },
    ]
  },
  {
    icon: '👩‍💼',
    title: 'Women\'s Education & Empowerment',
    color: 'from-accent-rose to-accent-purple',
    borderColor: 'border-l-accent-rose',
    items: [
      { name: 'Beti Bachao Beti Padhao', desc: 'Government initiative ensuring girl education and welfare. Find local camps and programs.', link: 'https://wcd.nic.in/bbbp-schemes', tag: 'Women' },
      { name: 'Sukanya Samriddhi Yojana', desc: 'Open an account for your daughter with high interest (8.2%) to save for her education.', link: 'https://www.india.gov.in/sukanya-samriddhi-yojna', tag: 'Savings' },
      { name: 'Mahila Samakhya', desc: 'Empowering rural women through education, awareness, and collective decision-making.', link: 'https://msma.gov.in', tag: 'Community' },
      { name: 'Free Coaching Scheme (Minorities)', desc: 'Free coaching for minorities for UPSC, SSC, Bank PO, and state PSC exams.', link: 'https://minorityaffairs.gov.in', tag: 'Free Coaching' },
    ]
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

function CategorySection({ cat, index }) {
  const [open, setOpen] = useState(true);
  return (
    <motion.div custom={index} variants={cardVariants} initial="hidden" animate="visible" className={`bg-dark-900/40 border border-white/5 border-l-4 ${cat.borderColor} rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300 shadow-lg`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors">
        <div className="flex items-center gap-3">
          <span className="text-xl">{cat.icon}</span>
          <h2 className="text-sm md:text-base font-bold text-white tracking-wide">{cat.title}</h2>
          <span className="text-[10px] text-gray-500 font-extrabold bg-white/5 px-2 py-0.5 rounded-full">{cat.items.length} resources</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 pt-0">
          {cat.items.map((item, i) => (
            <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
              className="group flex flex-col gap-2 p-4 rounded-xl bg-dark-950/40 border border-white/5 hover:border-primary-500/30 hover:bg-white/[0.02] transition-all duration-200 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <span className="font-bold text-gray-200 group-hover:text-primary-400 transition-colors text-xs md:text-sm">{item.name}</span>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className={`text-[9px] px-2 py-0.5 rounded-md bg-gradient-to-r ${cat.color} text-white font-black`}>{item.tag}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-primary-400 transition-colors" />
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Education() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-3.5 mb-2">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-blue to-accent-indigo flex items-center justify-center shadow-lg shadow-accent-blue/20">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Education Hub</h1>
            <p className="text-gray-400 text-xs mt-0.5">Free educational portals, student scholarships, and digital training assets.</p>
          </div>
        </div>
        <div className="mt-4 p-4 rounded-xl bg-accent-blue/5 border border-accent-blue/10 flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-accent-blue flex-shrink-0 mt-0.5" />
          <p className="text-xs text-accent-blue/80 leading-relaxed">All services listed are <strong>100% free</strong> or government subsidized. If you do not have digital internet access, you can visit your nearest village <strong>CSC (Common Service Centre)</strong> for assistance.</p>
        </div>
      </header>

      <div className="space-y-4">
        {categories.map((cat, i) => (
          <CategorySection key={i} cat={cat} index={i} />
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }}
        className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-accent-purple/10 to-accent-indigo/5 border border-accent-purple/10 flex items-center gap-4">
        <Smartphone className="w-7 h-7 text-accent-purple flex-shrink-0" />
        <div>
          <p className="text-white font-bold text-sm">Offline Education Helplines</p>
          <p className="text-[10px] text-gray-500 mt-1">
            General Literacy Helpline: <span className="text-gray-300 font-mono font-bold">1800-180-5678</span> &nbsp;|&nbsp;
            National Scholarship Hub: <span className="text-gray-300 font-mono font-bold">0120-6619540</span> &nbsp;|&nbsp;
            Skill India Portal: <span className="text-gray-300 font-mono font-bold">1800-123-9626</span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
