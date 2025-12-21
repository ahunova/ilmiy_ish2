
import React, { useState } from 'react';
import { checkPlagiarism } from '../geminiService';
import { PlagiarismResult, Language } from '../types';
import { translations } from '../translations';

interface Props { lang: Language; }

const AntiPlagiarism: React.FC<Props> = ({ lang }) => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<PlagiarismResult | null>(null);
  const [loading, setLoading] = useState(false);
  const t = translations[lang];

  const handleScan = async () => {
    if (!text || text.length < 50) return;
    setLoading(true);
    try {
      const res = await checkPlagiarism(text, lang);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
        <h3 className="text-lg md:text-xl font-bold mb-6 text-slate-800 uppercase tracking-tight">
           {t.antiPlagiarism}
        </h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.textPlaceholder}
          className="w-full h-64 md:h-96 p-8 border border-slate-100 rounded-3xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all resize-none font-serif text-lg leading-relaxed shadow-inner"
        />
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
           <p className="text-xs text-slate-400 font-medium italic">Chars: {text.length} / 4000</p>
           <button
              onClick={handleScan}
              disabled={loading || text.length < 50}
              className="w-full sm:w-auto px-12 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-emerald-600 disabled:bg-slate-300 transition-all shadow-xl flex items-center justify-center gap-3"
            >
              {loading ? t.scanLoading : t.analysisStart}
            </button>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-10">
           <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 text-center shadow-lg">
              <div className="text-4xl font-black text-slate-900 mb-2">{result.originalityScore}%</div>
              <div className="text-[10px] font-black uppercase text-slate-400 mb-6">{t.originality}</div>
              <p className="text-sm text-slate-600 italic">{result.verdict}</p>
           </div>
           
           <div className="lg:col-span-2 bg-slate-900 p-10 rounded-[2.5rem] text-white">
              <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-6">{t.suggestions}</h4>
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {result.matches.map((match, i) => (
                  <div key={i} className="border-b border-slate-800 pb-6 last:border-0">
                    <p className="text-xs text-slate-400 mb-2 font-mono">"{match.text.substring(0, 100)}..."</p>
                    <p className="text-sm text-emerald-400 font-medium">💡 {match.suggestion}</p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AntiPlagiarism;
