
import React, { useState, useEffect } from 'react';
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
  const [incognito, setIncognito] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    if (incognito) return;
    const savedText = localStorage.getItem('imrad_text_current');
    const savedResults = localStorage.getItem('imrad_results_current');
    if (savedText) setText(savedText);
    if (savedResults) setResults(JSON.parse(savedResults));
  }, []);

  useEffect(() => {
    if (incognito) {
      localStorage.removeItem('imrad_text_current');
      localStorage.removeItem('imrad_results_current');
      return;
    }
    localStorage.setItem('imrad_text_current', text);
  }, [text, incognito]);

  const handleAnalyze = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const res = await analyzeIMRaD(text, lang);
      setResults(res);
      if (!incognito) {
        setLastSaved(new Date().toLocaleTimeString());
        localStorage.setItem('imrad_results_current', JSON.stringify(res));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    let report = `IMRaD STRUCTURE ANALYSIS REPORT\n`;
    report += `Date: ${new Date().toLocaleString()}\n`;
    report += `-------------------------------------------\n\n`;
    
    results.forEach(res => {
      report += `SECTION: ${res.section.toUpperCase()}\n`;
      report += `Match Confidence: ${(res.confidence * 100).toFixed(0)}%\n`;
      report += `AI SUGGESTIONS:\n`;
      res.suggestions.forEach(s => report += `  - ${s}\n`);
      if (res.missingElements && res.missingElements.length > 0) {
        report += `MISSING ELEMENTS:\n`;
        res.missingElements.forEach(m => report += `  - ${m}\n`);
      }
      report += `\n`;
    });

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `imrad_report_${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700">
      <div className="relative h-48 md:h-64 w-full rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-lg border border-slate-200">
        <img 
          src="https://images.unsplash.com/photo-1454165833767-027ffea9e778?q=80&w=1200&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Analysis"
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex flex-col justify-center px-6 md:px-12">
           <div className="flex items-center gap-3 mb-4">
              <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">End-to-End Analysis</span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">Gemini Security V3</span>
           </div>
           <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">IMRaD Struktura Tahlili</h2>
           <p className="text-slate-200 text-sm md:text-base max-w-xl italic">Tadqiqotingiz xalqaro standartlar asosida tahlil qilinadi.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setActiveTab('tool')}
            className={`whitespace-nowrap px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${activeTab === 'tool' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
          >
            Tahlil Asbobi
          </button>
          <button 
            onClick={() => setActiveTab('logic')}
            className={`whitespace-nowrap px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${activeTab === 'logic' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
          >
            Xavfsizlik Mantiqi
          </button>
        </div>
        
        <div className="flex items-center gap-6 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
             <div className="relative inline-flex items-center cursor-pointer" onClick={() => setIncognito(!incognito)}>
                <div className={`w-10 h-5 rounded-full transition-colors ${incognito ? 'bg-slate-900' : 'bg-slate-200'}`}></div>
                <div className={`absolute left-1 w-3 h-3 bg-white rounded-full transition-transform ${incognito ? 'translate-x-5' : 'translate-x-0'}`}></div>
             </div>
             <span className={`text-[10px] font-black uppercase tracking-widest ${incognito ? 'text-slate-900' : 'text-slate-400'}`}>Maxfiy rejim</span>
          </div>
          {results.length > 0 && (
             <button 
              onClick={exportReport}
              className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-1.5 rounded-lg uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
             >
               Eksport (TXT) 📥
             </button>
          )}
        </div>
      </div>

      {activeTab === 'tool' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[3rem] shadow-sm border border-slate-200 relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                Tadqiqot matni
              </h3>
              <button onClick={() => {setText(''); setResults([]); localStorage.removeItem('imrad_text_current'); localStorage.removeItem('imrad_results_current');}} className="text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest">Matnni o'chirish</button>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Introduction, Methods yoki Discussion bo'limlarini joylang..."
              className={`w-full h-80 p-8 border border-slate-100 rounded-[2.5rem] focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none font-serif text-lg leading-relaxed shadow-inner ${incognito ? 'bg-slate-900 text-blue-100 placeholder-slate-600' : 'bg-slate-50 text-slate-900'}`}
            />
            <button
              onClick={handleAnalyze}
              disabled={loading || !text}
              className="mt-8 w-full md:w-auto px-12 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black hover:bg-blue-600 disabled:bg-slate-300 transition-all shadow-xl text-sm uppercase tracking-widest"
            >
              {loading ? 'Tahlil qilinmoqda...' : 'Xavfsiz tekshirish'}
            </button>
          </div>

          <div className="space-y-6">
            {loading ? (
              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col items-center justify-center h-full space-y-6 shadow-inner">
                 <div className="h-12 w-12 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
                 <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] text-center">Xavfsiz tahlil jarayoni faollashtirildi...</p>
              </div>
            ) : results.length > 0 ? (
               results.map((res, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 border-l-8 border-l-blue-600 animate-in fade-in slide-in-from-right-4">
                   <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-slate-900 serif italic">{res.section}</h4>
                      <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">{(res.confidence * 100).toFixed(0)}% Match</span>
                   </div>
                   <div className="space-y-3">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Audit:</p>
                      <ul className="text-xs text-slate-600 space-y-3">
                        {res.suggestions.map((s, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-blue-500 font-bold">•</span> {s}
                          </li>
                        ))}
                      </ul>
                   </div>
                </div>
               ))
            ) : (
              <div className="bg-slate-50 p-12 rounded-[3rem] border border-dashed border-slate-300 flex flex-col items-center justify-center h-full text-center space-y-4">
                 <div className="text-5xl opacity-20">🛡️</div>
                 <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Xavfsiz Analizator</p>
                 <p className="text-slate-400 text-[10px] italic leading-relaxed">Tadqiqotingizni kiriting. Ma'lumotlar Gemini orqali shifrlangan holda uzatiladi.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-200">
           <h3 className="text-3xl font-bold mb-8 serif">Xavfsizlik va Konfidensiallik</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                 <p className="text-slate-600 leading-relaxed text-lg italic">Platformada foydalanuvchi kiritgan har qanday ilmiy matn qat'iy himoyalangan. Biz matnlarni tizim bazasida saqlamaymiz.</p>
                 <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 space-y-4">
                    <h4 className="font-bold text-blue-900 flex items-center gap-3 italic">
                       <span className="text-2xl">🔒</span> SSL Encryption
                    </h4>
                    <p className="text-sm text-blue-700 leading-relaxed">Siz kiritgan matn Gemini API serverlariga HTTPS kanali orqali shifrlangan holda yuboriladi va faqat tahlil davomida vaqtinchalik xotirada bo'ladi.</p>
                 </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop" 
                className="w-full h-80 object-cover rounded-[3rem] shadow-2xl" 
                alt="AI Tech"
              />
           </div>
        </div>
      )}
    </div>
  );
};

export default IMRaDAnalyzer;
