
import React, { useState } from 'react';
import { analyzeIMRaD } from '../geminiService';
import { IMRaDResult, Language } from '../types';

interface Props {
  lang: Language;
}

// Fix: Added lang prop to IMRaDAnalyzer component to handle multi-language analysis
const IMRaDAnalyzer: React.FC<Props> = ({ lang }) => {
  const [text, setText] = useState('');
  const [results, setResults] = useState<IMRaDResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'tool' | 'logic'>('tool');

  const handleAnalyze = async () => {
    if (!text) return;
    setLoading(true);
    try {
      // Fix: Passed lang argument to analyzeIMRaD (fixes Expected 2 arguments error)
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
      {/* Visual Header */}
      <div className="relative h-48 md:h-64 w-full rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-lg">
        <img 
          src="https://images.unsplash.com/photo-1454165833767-027ffea9e778?q=80&w=1200&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Analysis"
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex flex-col justify-center px-6 md:px-12">
           <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">IMRaD Struktura Tahlili</h2>
           <p className="text-slate-200 text-sm md:text-base max-w-xl line-clamp-2 md:line-clamp-none">Maqolangiz xalqaro talablarga qanchalik mos? Bizning AI tizimimiz bir necha soniya ichida mantiqiy xatolarni topadi.</p>
        </div>
      </div>

      <div className="flex gap-2 md:gap-4 mb-2 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setActiveTab('tool')}
          className={`whitespace-nowrap px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl font-bold text-xs md:text-sm transition-all ${activeTab === 'tool' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
        >
          Tahlil Asbobi
        </button>
        <button 
          onClick={() => setActiveTab('logic')}
          className={`whitespace-nowrap px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl font-bold text-xs md:text-sm transition-all ${activeTab === 'logic' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
        >
          Algoritm Mantiqi
        </button>
      </div>

      {activeTab === 'tool' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-slate-200">
            <h3 className="text-lg md:text-xl font-bold mb-4 md:text-slate-800">Tadqiqot matnini kiritish</h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Introduction, Methods, Results yoki Discussion bo'limlarini bu yerga joylang..."
              className="w-full h-64 md:h-80 p-4 md:p-6 border border-slate-100 rounded-[1rem] md:rounded-3xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none font-serif text-base md:text-lg leading-relaxed shadow-inner"
            />
            <button
              onClick={handleAnalyze}
              disabled={loading || !text}
              className="mt-6 md:mt-8 w-full md:w-auto px-10 py-3 md:py-4 bg-slate-900 text-white rounded-xl md:rounded-2xl font-black hover:bg-blue-600 disabled:bg-slate-300 transition-all shadow-xl text-sm md:text-base"
            >
              {loading ? 'AI ishlamoqda...' : 'Strukturani tekshirish'}
            </button>
          </div>

          <div className="space-y-4 md:space-y-6">
            {loading ? (
              <div className="bg-white p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-200 flex flex-col items-center justify-center min-h-[200px] h-full space-y-4">
                 <div className="h-10 w-10 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
                 <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Tahlil jarayoni...</p>
              </div>
            ) : results.length > 0 ? (
               results.map((res, i) => (
                <div key={i} className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-slate-100 border-l-4 md:border-l-8 border-l-blue-600 animate-in fade-in slide-in-from-right-4">
                   <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-slate-900 text-sm md:text-base">{res.section}</h4>
                      <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">{(res.confidence * 100).toFixed(0)}%</span>
                   </div>
                   <div className="space-y-3">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Tavsiyalari:</p>
                      <ul className="text-xs md:text-sm text-slate-600 space-y-2">
                        {res.suggestions.map((s, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-blue-500">•</span> {s}
                          </li>
                        ))}
                      </ul>
                   </div>
                </div>
               ))
            ) : (
              <div className="bg-slate-50 p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-dashed border-slate-300 flex flex-col items-center justify-center min-h-[200px] h-full text-center">
                 <div className="text-4xl md:text-5xl mb-4 opacity-20">🔍</div>
                 <p className="text-slate-400 text-xs md:text-sm font-medium">Natijalar bu yerda paydo bo'ladi. Matnni kiriting va tahlil tugmasini bosing.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 md:p-12 rounded-[1.5rem] md:rounded-[3rem] shadow-sm border border-slate-200">
           <h3 className="text-xl md:text-3xl font-bold mb-6 md:mb-8">Neyron Tarmoq Mantiqi</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-4 md:space-y-6">
                 <p className="text-slate-600 leading-relaxed text-sm md:text-lg">PhD InnoVision tizimi akademik matnlarni tahlil qilishda Gemini 3 Pro modelidan foydalanadi. Bizning algoritmimiz matnni nafaqat so'zlar darajasidа, balki mantiqiy bog'liqliklar darajasida ham tekshiradi.</p>
                 <div className="p-4 md:p-6 bg-blue-50 rounded-[1rem] md:rounded-3xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 mb-2 text-sm md:text-base">SII Index (Scientific Integrity Index)</h4>
                    <p className="text-xs md:text-sm text-blue-700">Bu ko'rsatkich maqolangizning IMRaD bo'limlari orasidagi semantik zanjir qanchalik mustahkamligini anglatadi.</p>
                 </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop" 
                className="w-full h-48 md:h-80 object-cover rounded-[1rem] md:rounded-[2rem] shadow-2xl" 
                alt="AI Tech"
              />
           </div>
        </div>
      )}
    </div>
  );
};

export default IMRaDAnalyzer;
