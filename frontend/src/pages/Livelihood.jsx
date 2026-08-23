import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ExternalLink, TrendingUp, ChevronDown, ChevronUp, IndianRupee } from 'lucide-react';

const categories = [
  {
    icon: '🏗️',
    title: 'Guaranteed Work & Employment',
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-l-amber-500',
    items: [
      { name: 'MGNREGA (100 Days Work)', desc: 'Every rural household is guaranteed 100 days of paid work per year at ₹250–350/day. Apply at your Gram Panchayat.', tag: '100 Days/Year', link: 'https://nrega.nic.in' },
      { name: 'PM SVANidhi (Street Vendors)', desc: 'Collateral-free micro-loans of ₹10,000–₹50,000 for street vendors and small traders with digital payment rewards.', tag: 'Micro-Loan', link: 'https://pmsvanidhi.mohua.gov.in' },
      { name: 'PM Vishwakarma Yojana', desc: 'Support for 18 traditional trades (carpenter, blacksmith, potter etc.) — free training, tools, and ₹3 lakh loan.', tag: 'Artisans', link: 'https://pmvishwakarma.gov.in' },
      { name: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana', desc: 'Free skill training for rural youth aged 15-35. Placement assistance with jobs in manufacturing, IT, and more.', tag: 'Free Training', link: 'https://ddugky.gov.in' },
    ]
  },
  {
    icon: '🏦',
    title: 'Banking, Loans & Financial Inclusion',
    color: 'from-primary-500 to-accent-cyan',
    borderColor: 'border-l-primary-500',
    items: [
      { name: 'PM Jan Dhan Yojana', desc: 'Open a zero-balance bank account with free RuPay debit card, ₹2 lakh accidental insurance and overdraft facility.', tag: 'Zero Balance', link: 'https://pmjdy.gov.in' },
      { name: 'Mudra Loan (PMMY)', desc: 'Business loans from ₹50,000 to ₹10 lakh without collateral for small businesses under Shishu, Kishore, Tarun categories.', tag: 'Up to ₹10 Lakh', link: 'https://www.mudra.org.in' },
      { name: 'PM Jeevan Jyoti Bima Yojana', desc: 'Life insurance of ₹2 lakh at just ₹436/year (₹36/month). Available at any bank. Enroll via bank account.', tag: '₹436/Year', link: 'https://www.jansuraksha.gov.in' },
      { name: 'PM Suraksha Bima Yojana', desc: 'Accidental insurance of ₹2 lakh at just ₹20/year for anyone with a bank account aged 18–70.', tag: '₹20/Year', link: 'https://www.jansuraksha.gov.in' },
    ]
  },
  {
    icon: '👩‍🍳',
    title: 'Self-Employment & Women\'s Business',
    color: 'from-accent-rose to-accent-purple',
    borderColor: 'border-l-accent-rose',
    items: [
      { name: 'NRLM – Jeevika (SHG Loans)', desc: 'Women\'s Self Help Groups can get low-interest loans from ₹15,000 upwards. Join your local SHG through the Gram Panchayat.', tag: 'Women\'s Groups', link: 'https://aajeevika.gov.in' },
      { name: 'Mahila Udyam Nidhi Scheme', desc: 'Loans up to ₹10 lakh for women starting small businesses. Soft interest rates under SIDBI.', tag: 'Women Business', link: 'https://www.sidbi.in' },
      { name: 'TRIFED & Tribal Cooperatives', desc: 'Tribal artisans and forest product collectors can sell online through TribeIndia platform at fair prices.', tag: 'Tribal Support', link: 'https://tribesindia.com' },
      { name: 'FPO – Farmer Producer Organisations', desc: 'Group farming companies that help farmers collectively sell crops, buy inputs, and access credit at better rates.', tag: 'Collective Selling', link: 'https://www.sfacindia.com' },
    ]
  },
  {
    icon: '💡',
    title: 'Business Idea Resources',
    color: 'from-accent-blue to-accent-indigo',
    borderColor: 'border-l-accent-blue',
    items: [
      { name: 'eNAM – Online Crop Trading', desc: 'Sell your produce directly to buyers across India via the National Agriculture Market app. Better prices, no middlemen.', tag: 'Sell Crops Online', link: 'https://enam.gov.in' },
      { name: 'KVIC – Khadi & Village Industries', desc: 'Loans and subsidies for starting khadi, soap, candle, honey, and agro-based village industries.', tag: 'Village Industry', link: 'https://www.kvic.org.in' },
      { name: 'GeM Portal (Govt. Marketplace)', desc: 'Rural artisans and small businesses can sell handicrafts and products directly to government departments.', tag: 'Sell to Govt.', link: 'https://gem.gov.in' },
      { name: 'MSME Udyam Registration', desc: 'Register your small business for free to access government tenders, loans, and subsidies. Takes 5 minutes online.', tag: 'Free Registration', link: 'https://udyamregistration.gov.in' },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-5 pt-0">
          {cat.items.map((item, i) => (
            <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
              className="group flex flex-col gap-2 p-4 rounded-xl bg-dark-950/40 border border-white/5 hover:border-amber-500/40 hover:bg-white/[0.02] transition-all duration-200">
              <div className="flex items-start justify-between gap-2">
                <span className="font-bold text-gray-200 group-hover:text-amber-400 transition-colors text-xs md:text-sm">{item.name}</span>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className={`text-[9px] px-2 py-0.5 rounded-md bg-gradient-to-r ${cat.color} text-white font-black`}>{item.tag}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-amber-400 transition-colors" />
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

export default function Livelihood() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-3.5 mb-2">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20 animate-float">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Livelihood Hub</h1>
            <p className="text-gray-400 text-xs mt-0.5">Microfinance loans, agricultural credit resources, and rural business ideas.</p>
          </div>
        </div>
        <div className="mt-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-3">
          <IndianRupee className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-300 leading-relaxed">These links point to direct government programs. <strong>No middleman or agent fees are required</strong>. Please contact your local CSC or block office directly to enroll.</p>
        </div>
      </header>

      <div className="space-y-4">
        {categories.map((cat, i) => (
          <CategorySection key={i} cat={cat} index={i} />
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.4 } }}
        className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-amber-900/10 to-orange-900/5 border border-amber-500/10 flex items-center gap-4">
        <TrendingUp className="w-7 h-7 text-amber-400 flex-shrink-0" />
        <div>
          <p className="text-white font-bold text-sm">Official Welfare Helplines</p>
          <p className="text-[10px] text-gray-500 mt-1">
            MGNREGA Labour Helpline: <span className="text-gray-300 font-mono font-bold">1800-111-555</span> &nbsp;|&nbsp;
            Mudra Loan Support: <span className="text-gray-300 font-mono font-bold">1800-180-1111</span> &nbsp;|&nbsp;
            PM Jan Dhan Account: <span className="text-gray-300 font-mono font-bold">1800-110-001</span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
