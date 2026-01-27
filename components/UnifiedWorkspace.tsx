
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { analyzeIMRaD, monitorGrammar } from '../geminiService';
import { db } from '../db';

interface Props { lang: Language; }

const UnifiedWorkspace: React.FC<Props> = ({ lang }) => {
  const t = translations[lang] as any;
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<{ imrad: any[], grammar: any[] } | null>(null);
  const [activeAnalysis, setActiveAnalysis] = useState<'imrad' | 'grammar'>('imrad');

  // Initial load from IndexedDB
  useEffect(() => {
    const loadData = async () => {
      const data: any = await db.getManuscript('current_session');
      if (data) {
        setText(data.content);
        setLastSaved(new Date(data.updatedAt).toLocaleTimeString());
      }
    };
    loadData();
  }, []);

  // Auto-save logic
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (text) {
        await db.saveManuscript('current_session', text, 'Draft Manuscript');
        setLastSaved(new Date().toLocaleTimeString());
      }
    }, 2000); // 2 seconds after typing stops
    return () => clearTimeout(timer);
  }, [text]);

  const handleFullAnalysis = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const [imradRes, grammarRes] = await Promise.all([
        analyzeIMRaD(text, lang),
        monitorGrammar(text, lang)
      ]);
      setAnalysisResults({ imrad: imradRes, grammar: grammarRes });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6 animate-in fade-in duration-700">
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">🛠️</div>
          <div>
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Manuscript Resilience Editor</h2>
            <p className="text-[9px] text-emerald-500 font-black uppercase tracking-widest flex items-center gap-2">
               <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full"></span>
               Auto-save Active {lastSaved && `(${lastSaved})`}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleFullAnalysis}
            disabled={loading || !text}
            className="px-6 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 disabled:bg-slate-200 transition-all shadow-xl"
          >
            {loading ? "Tahlil..." : "Integrallashgan Tahlil ✨"}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col overflow-hidden relative">
          <div className="px-8 py-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
             Manuscript Editor (IndexedDB Protected)
             <span>Words: {text.split(/\s+/).filter(x => x).length}</span>
          </div>
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Introduction yoki Method bo'limini shu yerda yozing. Ma'lumotlar avtomatik saqlanadi..."
            className="flex-1 p-10 outline-none resize-none font-serif text-xl leading-relaxed text-slate-800 bg-white"
          />
        </div>

        <div className="lg:w-[400px] bg-slate-900 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-white/5">
           <div className="grid grid-cols-2 p-2 gap-2 border-b border-white/5">
              <button onClick={() => setActiveAnalysis('imrad')} className={`py-3 rounded-2xl text-[9px] font-black uppercase transition-all ${activeAnalysis === 'imrad' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'}`}>Structure</button>
              <button onClick={() => setActiveAnalysis('grammar')} className={`py-3 rounded-2xl text-[9px] font-black uppercase transition-all ${activeAnalysis === 'grammar' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'}`}>Grammar</button>
           </div>
           <div className="flex-1 p-6 overflow-y-auto custom-scrollbar-dark">
              {!analysisResults ? (
                <div className="h-full flex flex-col items-center justify-center opacity-30 text-center space-y-4">
                  <div className="text-4xl">🧬</div>
                  <p className="text-[10px] font-black text-white uppercase tracking-widest">Tahlil natijalari yo'q</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {activeAnalysis === 'imrad' && analysisResults.imrad.map((res, i) => (
                    <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/10">
                       <h4 className="text-sm font-bold text-white serif mb-2 italic">{res.section}</h4>
                       <ul className="text-[10px] text-slate-400 space-y-1">
                          {res.suggestions.map((s: string, idx: number) => <li key={idx}>• {s}</li>)}
                       </ul>
                    </div>
                  ))}
                  {activeAnalysis === 'grammar' && analysisResults.grammar.map((fix, i) => (
                    <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-2">
                       <p className="text-[10px] text-red-400/80 line-through">{fix.original}</p>
                       <p className="text-xs text-emerald-400 font-bold">{fix.suggestion}</p>
                    </div>
                  ))}
                </div>
              )}
           </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar-dark::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default UnifiedWorkspace;
