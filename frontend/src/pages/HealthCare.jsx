import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Phone, MapPin, AlertCircle, Pill, Stethoscope, ChevronDown, ChevronUp } from 'lucide-react';

const emergencyNumbers = [
  { name: 'National Emergency', number: '112', color: 'bg-accent-rose/10 text-accent-rose border-accent-rose/25', icon: '🚨' },
  { name: 'Ambulance Call', number: '108', color: 'bg-accent-rose/15 text-accent-rose border-accent-rose/30', icon: '🚑' },
  { name: 'Women Helpline', number: '181', color: 'bg-accent-purple/10 text-accent-purple border-accent-purple/20', icon: '👩' },
  { name: 'Child Helpline', number: '1098', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', icon: '👶' },
  { name: 'Mental Health Support', number: '9152987821', color: 'bg-accent-blue/10 text-accent-cyan border-accent-blue/20', icon: '🧠' },
  { name: 'Poison Control', number: '1800-116-117', color: 'bg-amber-600/15 text-amber-500 border-amber-600/20', icon: '☠️' },
];

const categories = [
  {
    icon: '🏥',
    title: 'Free & Low-Cost Healthcare',
    color: 'from-accent-rose to-accent-purple',
    borderColor: 'border-l-accent-rose',
    items: [
      { name: 'Ayushman Bharat (PM-JAY)', desc: 'Free health insurance up to ₹5 lakh/year for 10 crore+ poor families. Check eligibility & nearby empanelled hospitals.', tag: '₹5 Lakh Cover', link: 'https://pmjay.gov.in' },
      { name: 'Jan Aushadhi Kendras', desc: 'Buy generic medicines at 50–90% cheaper prices than branded ones. 10,000+ outlets across India.', tag: 'Cheap Medicines', link: 'https://janaushadhi.gov.in' },
      { name: 'e-Sanjeevani Telemedicine', desc: 'Free online doctor consultation from home via mobile. Available in Hindi and 12 regional languages.', tag: 'Free OPD', link: 'https://esanjeevaniopd.in' },
      { name: 'National Health Mission (NHM)', desc: 'Free maternal, child, and primary healthcare at government PHCs and sub-centres in every village.', tag: 'Govt. Free', link: 'https://nhm.gov.in' },
    ]
  },
  {
    icon: '🤱',
    title: 'Maternal & Child Health',
    color: 'from-accent-purple to-accent-indigo',
    borderColor: 'border-l-accent-purple',
    items: [
      { name: 'Janani Suraksha Yojana', desc: 'Cash incentive of ₹1,400 for rural women who deliver in government hospitals. Promotes safe delivery.', tag: 'Cash Benefit', link: 'https://nhm.gov.in/index1.php?lang=1&level=3&lid=309&sublinkid=841' },
      { name: 'POSHAN Abhiyaan', desc: 'Free nutrition support for pregnant women, lactating mothers, and children under 6 years.', tag: 'Nutrition', link: 'https://poshanabhiyaan.gov.in' },
      { name: 'Pradhan Mantri Matru Vandana Yojana', desc: '₹5,000 cash incentive for first-time pregnant women for proper nutrition and rest.', tag: '₹5,000 Aid', link: 'https://pmmvy.wcd.gov.in' },
      { name: 'Rashtriya Kishor Swasthya Karyakram', desc: 'Free adolescent health services including counseling, iron-folic acid tablets, and mental health support.', tag: 'Youth Health', link: 'https://nhm.gov.in' },
    ]
  },
  {
    icon: '🧠',
    title: 'Mental Health & Well-being',
    color: 'from-accent-blue to-accent-cyan',
    borderColor: 'border-l-accent-blue',
    items: [
      { name: 'NIMHANS Tele-Manas', desc: 'Free 24/7 mental health support helpline. Call 14416 to speak with a counselor in your local language.', tag: 'Call: 14416', link: 'https://nimhans.ac.in' },
      { name: 'iCall by TISS', desc: 'Free psychological counseling service via phone and email for stress, anxiety, and depression.', tag: 'Free Counseling', link: 'https://icallhelpline.org' },
      { name: 'Vandrevala Foundation', desc: '24/7 free mental health helpline at 1860-2662-345. Helps with suicidal thoughts, grief, addiction.', tag: '24/7 Free', link: 'https://www.vandrevalafoundation.com' },
      { name: 'District Mental Health Programme', desc: 'Free mental health services available at your district hospital under the National Mental Health Programme.', tag: 'Govt. Free', link: 'https://nhm.gov.in' },
    ]
  },
  {
    icon: '💊',
    title: 'Disease Prevention & Vaccination',
    color: 'from-primary-500 to-accent-cyan',
    borderColor: 'border-l-primary-500',
    items: [
      { name: 'Universal Immunisation Programme', desc: 'Free vaccines for children — Polio, BCG, DPT, Measles, Hepatitis B and more at every PHC.', tag: 'Free Vaccines', link: 'https://nhm.gov.in' },
      { name: 'National Tuberculosis Programme', desc: 'Free TB diagnosis, treatment, and ₹500/month nutritional support under Nikshay Poshan Yojana.', tag: 'Free Treatment', link: 'https://nikshay.in' },
      { name: 'Malaria & Dengue Control', desc: 'Free blood tests, nets, and medicine for malaria and dengue at government health centres.', tag: 'Free Testing', link: 'https://nvbdcp.gov.in' },
      { name: 'Ayushman Arogya Mandir', desc: 'Upgraded health and wellness centres in villages providing comprehensive primary healthcare for free.', tag: 'Village Level', link: 'https://ayushmanarogyamandir.nhp.gov.in' },
    ]
  },
];

function CategorySection({ cat, index }) {
  const [open, setOpen] = useState(true);
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}
      className={`bg-dark-900/40 border border-white/5 border-l-4 ${cat.borderColor} rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300 shadow-lg`}>
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
              className="group flex flex-col gap-2 p-4 rounded-xl bg-dark-950/40 border border-white/5 hover:border-accent-rose/30 hover:bg-white/[0.02] transition-all duration-200 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <span className="font-bold text-gray-200 group-hover:text-accent-rose transition-colors text-xs md:text-sm">{item.name}</span>
                <span className={`text-[9px] px-2 py-0.5 rounded-md bg-gradient-to-r ${cat.color} text-white font-black flex-shrink-0`}>{item.tag}</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function HealthCare() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-3.5 mb-2">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-rose to-accent-purple flex items-center justify-center shadow-lg shadow-accent-rose/20 animate-float">
            <Heart className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Health Hub</h1>
            <p className="text-gray-400 text-xs mt-0.5">Subsidized medicines, government health insurance schemes, and online consulting.</p>
          </div>
        </div>
      </header>

      {/* Emergency Numbers */}
      <div className="mb-8 p-6 rounded-2xl bg-white/[0.01] border border-white/5">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-4 h-4 text-accent-rose" />
          <h2 className="text-[10px] font-black text-accent-rose uppercase tracking-widest">Emergency Helplines</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {emergencyNumbers.map((e, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
              className={`flex items-center gap-3 p-3.5 rounded-xl border ${e.color} hover:bg-white/[0.01] transition-all`}>
              <span className="text-lg">{e.icon}</span>
              <div>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">{e.name}</p>
                <p className="font-extrabold text-white font-mono text-xs md:text-sm">{e.number}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {categories.map((cat, i) => (
          <CategorySection key={i} cat={cat} index={i} />
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }}
        className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-accent-rose/10 to-accent-purple/5 border border-accent-rose/10 flex items-center gap-4">
        <Stethoscope className="w-7 h-7 text-accent-rose flex-shrink-0" />
        <div>
          <p className="text-white font-bold text-sm">Find Your Nearest Government Hospital</p>
          <p className="text-xs text-gray-500 mt-1">Visit <span className="text-gray-300 font-bold">healthfacilities.in</span> or consult your village Gram Panchayat coordinator for empanelled general clinic addresses.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
