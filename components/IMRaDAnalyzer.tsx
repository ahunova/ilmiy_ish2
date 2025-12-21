
import React, { useState } from 'react';
import { analyzeIMRaD } from '../geminiService';
import { IMRaDResult, Language } from '../types';

interface Props {
  lang: Language;
}

const IMRaDAnalyzer: React.FC<Props> = ({ lang }) => {
  const [text, setText] = useState('');
  const [results, setResults] = useState<IMRaDResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'tool' | 'logic'>('tool');

  const handleAnalyze = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const res = await analyzeIMRaD(text, lang);
      setResults(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700">
      {/* Updated Scientific Image for IMRaD */}
      <div className="relative h-48 md:h-64 w-full rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-lg border border-slate-200">
        <img 
          src="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="IMRaD Scientific Research"
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] flex flex-col justify-center px-6 md:px-12">
           <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">IMRaD Struktura Tahlili</h2>
           <p className="text-slate-200 text-sm md:text-base max-w-xl line-clamp-2 md:line-clamp-none">Maqolangiz xalqaro talablarga qanchalik mos? Bizning AI tizimimiz mantiqiy xatolarni avtomatik topadi.</p>
        </div>
      </div>

      {/* Qolgan qismlar bir xil saqlanadi... */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-slate-200">
          <h3 className="text-lg md:text-xl font-bold mb-4 md:text-slate-800 uppercase tracking-tight">Tadqiqot matnini kiritish</h3>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Introduction, Methods, Results yoki Discussion bo'limlarini bu yerga joylang..."
            className="w-full h-64 md:h-80 p-6 border border-slate-100 rounded-3xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none font-serif text-lg leading-relaxed shadow-inner"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading || !text}
            className="mt-6 md:mt-8 w-full md:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-blue-600 disabled:bg-slate-300 transition-all shadow-xl"
          >
            {loading ? 'AI ishlamoqda...' : 'Strukturani tekshirish'}
          </button>
        </div>

        <div className="space-y-4">
          {results.length > 0 && results.map((res, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 border-l-8 border-l-blue-600 animate-in slide-in-from-right-4">
               <h4 className="font-bold text-slate-900 mb-4">{res.section} ({(res.confidence * 100).toFixed(0)}%)</h4>
               <ul className="text-xs text-slate-600 space-y-2">
                 {res.suggestions.map((s, idx) => <li key={idx}>• {s}</li>)}
               </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IMRaDAnalyzer;
