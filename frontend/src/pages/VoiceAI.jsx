import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send, Volume2, Bot, User, Loader2, Sparkles } from 'lucide-react';

const INTENTS = [
  [["fertilizer", "fertiliser", "manure", "compost", "urea", "dap", "npk", "nutrient", "buy fertilizer"], "You can buy fertilizers at your nearest Krishi Seva Kendra or cooperative society. For DAP and Urea, check the government-subsidized supply at your block office."],
  [["sow", "seed", "sowing", "planting", "transplant", "germination", "seedling"], "Based on current weather patterns in your region, it is best to delay sowing by 5-7 days for better soil moisture levels."],
  [["weather", "rain", "rainfall", "forecast", "monsoon", "cloud", "temperature"], "Light showers are expected over the next two days in your region. It is a good time for soil preparation and field bunding."],
  [["disease", "pest", "insect", "blight", "fungus", "rot", "wilt", "yellow leaf", "spray"], "Yellow or brown leaves may indicate a fungal infection. Apply Mancozeb or Copper Oxychloride spray at 2g per liter of water."],
  [["irrigation", "water", "drip", "sprinkler", "canal", "borewell", "pump"], "Drip irrigation can save up to 50% water compared to flood irrigation. The government offers 45-55% subsidy on drip systems under PMKSY scheme."],
  [["soil", "land", "ph", "testing", "organic", "fertility"], "A soil health card test will tell you the exact pH and nutrient levels of your land. Apply for a free test at your nearest Krishi Seva Kendra."],
  [["scheme", "yojana", "subsidy", "government", "pm kisan", "loan", "credit"], "PM-KISAN scheme gives ₹6,000 per year directly to your bank account in 3 installments. Register at pmkisan.gov.in or your nearest CSC center."],
  [["market", "mandi", "price", "sell", "rate", "wheat", "rice"], "Today's mandi rates: Wheat ₹2,275/quintal, Rice ₹2,183/quintal, Cotton ₹7,200/quintal. Check AgMarkNet or eNAM app for live prices."],
  [["education", "school", "study", "scholarship", "college", "course", "diksha"], "Your children can study for free on the DIKSHA portal (diksha.gov.in) — it has NCERT textbooks and videos in 30+ languages."],
  [["hospital", "doctor", "medicine", "sick", "health", "fever", "ambulance"], "Call 108 for a free ambulance in any emergency. For free online doctor consultation, use the e-Sanjeevani app or visit esanjeevaniopd.in."],
  [["job", "work", "employment", "mgnrega", "labour", "wages"], "Under MGNREGA, your household is guaranteed 100 days of paid work per year at ₹250-350/day. Register your job card at the Gram Panchayat office."],
  [["bank", "account", "money", "save", "jan dhan", "upi"], "Open a zero-balance Jan Dhan account at any bank. You get a free RuPay debit card and ₹2 lakh accidental insurance."],
  [["women", "woman", "wife", "shg", "beti", "ladki"], "Women can join a Self Help Group (SHG) in their village to access group loans, savings, and government scheme benefits."],
  [["hello", "hi", "namaste", "namaskara", "hey"], "Namaskara! I am your VillageOS AI assistant. Ask me about farming, health, education, jobs, government schemes, or market prices. How can I help you today?"]
];

function getFallbackVoiceReply(text) {
  const textLower = text.toLowerCase();
  for (const [keywords, reply] of INTENTS) {
    if (keywords.some(kw => textLower.includes(kw))) {
      return reply;
    }
  }
  return "Namaskara! I am ready to help. You can ask about crop diseases, seeds, scholarships, MGNREGA jobs, hospital services, or government schemes.";
}

export default function VoiceAI() {
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Namaskara! I am your VillageOS assistant. Ask me questions about farming seeds, weather updates, hospital facilities, or local job listings. You can type or speak to me in Kannada or English.', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userText = inputText;
    const newMsg = { role: 'user', text: userText, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(`http://${window.location.hostname}:8000/api/voice/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userText, language: 'en' }),
      });

      if (!response.ok) throw new Error('Backend error');
      const data = await response.json();

      setMessages(prev => [...prev, {
        role: 'ai',
        text: data.reply,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }]);
    } catch (err) {
      console.warn('Backend server not reachable, using client-side AI reply.');
      await new Promise((resolve) => setTimeout(resolve, 600));
      const replyText = getFallbackVoiceReply(userText);
      setMessages(prev => [...prev, {
        role: 'ai',
        text: replyText,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListen = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please try Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col justify-between">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-accent-purple" />
            <span className="text-[10px] uppercase tracking-widest font-black text-accent-purple">Voice Assistance Channel</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Voice AI</h1>
        </div>
        <div className="glass-panel px-4 py-2 flex items-center gap-2 rounded-full border border-emerald-500/20 shadow-neon-emerald">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-black uppercase text-emerald-400">AI Node Connected</span>
        </div>
      </header>

      <div className="flex-1 glass-panel rounded-2xl flex flex-col overflow-hidden relative border border-white/5 shadow-2xl mb-4">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={idx} 
              className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${msg.role === 'user' ? 'bg-gradient-to-br from-accent-cyan to-accent-blue' : 'bg-gradient-to-br from-accent-purple to-accent-indigo'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
              </div>
              <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${msg.role === 'user' ? 'bg-accent-blue/20 text-accent-cyan rounded-tr-none border border-accent-blue/30' : 'bg-white/[0.02] text-gray-200 rounded-tl-none border border-white/5'}`}>
                  <p>{msg.text}</p>
                </div>
                <div className="flex items-center gap-2 mt-1 px-1">
                  <span className="text-[10px] text-gray-500 font-mono">{msg.time}</span>
                  {msg.role === 'ai' && (
                    <button className="text-gray-500 hover:text-primary-400 transition-colors" title="Read Aloud">
                      <Volume2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {isListening && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 max-w-[80%] ml-auto flex-row-reverse">
              <div className="w-10 h-10 rounded-xl bg-accent-cyan/20 animate-pulse flex items-center justify-center flex-shrink-0 border border-accent-cyan/30">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="p-4 rounded-2xl bg-accent-cyan/10 rounded-tr-none text-accent-cyan flex items-center gap-2 border border-accent-cyan/20">
                <span className="w-2 h-2 bg-accent-cyan rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-accent-cyan rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 bg-accent-cyan rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-dark-900/40 border-t border-white/5">
          <form onSubmit={handleSend} className="flex items-end gap-3 relative">
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Voice AI something, or tap the microphone..." 
                className="w-full bg-dark-950 border border-white/5 rounded-xl pl-4 pr-14 py-4 text-xs md:text-sm text-white focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/20 transition-all placeholder:text-gray-600"
              />
              <button 
                type="button"
                onClick={toggleListen}
                className={`absolute right-2.5 top-2.5 bottom-2.5 aspect-square rounded-lg flex items-center justify-center transition-all ${isListening ? 'bg-accent-rose/20 text-accent-rose hover:bg-accent-rose/30 shadow-[0_0_10px_rgba(244,63,94,0.3)]' : 'hover:bg-white/5 text-gray-500 hover:text-white border border-transparent hover:border-white/5'}`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>
            <button 
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="h-12 px-6 rounded-xl bg-accent-purple hover:bg-accent-indigo disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs md:text-sm transition-all flex items-center gap-2 shadow-lg hover:shadow-accent-purple/20"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span className="hidden sm:inline">{isLoading ? 'Sending...' : 'Send'}</span>
            </button>
          </form>
          
          {/* Animated visualizer effect when listening */}
          <AnimatePresence>
            {isListening && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: 24, opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }}
                className="flex items-center justify-center gap-1.5 mt-4 overflow-hidden"
              >
                {[...Array(20)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="w-1 bg-gradient-to-t from-accent-cyan to-accent-blue rounded-full"
                    animate={{ height: ['20%', '100%', '40%', '80%', '20%'] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
