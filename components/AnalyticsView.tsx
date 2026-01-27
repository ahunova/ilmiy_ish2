
import React, { useState, useEffect } from 'react';
import { Language, ArticleStats } from '../types';
import { translations } from '../translations';
// Fixed: Changed missing export searchScientificLiterature to searchAcademicMaterials
import { getArticleAnalytics, searchAcademicMaterials } from '../geminiService';

interface Props {
  lang: Language;
}

const AnalyticsView: React.FC<Props> = ({ lang }) => {
  const [problem, setProblem] = useState('');
  const [text, setText] = useState('');
  const [stats, setStats] = useState<ArticleStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [literature, setLiterature] = useState<{ text: string, sources: any[] } | null>(null);
  const [searching, setSearching] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('research_history_v2');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("History parse error", e);
      }
    }
  }, []);

  const handleAnalyze = async () => {
    if (!text || text.length < 50) return;
    setLoading(true);
    setLiterature(null);
    try {
      const result = await getArticleAnalytics(problem, text, lang);
      setStats(result);
      
      const newHistory = [{ 
        problem: problem || "Nomsiz tadqiqot", 
        date: new Date().toISOString(), 
        stats: result,
        textPreview: text.substring(0, 100) + "..."
      }, ...history.slice(0, 9)];
      
      setHistory(newHistory);
      localStorage.setItem('research_history_v2', JSON.stringify(newHistory));

      handleSearchLiterature();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchLiterature = async () => {
    const query = problem || text.substring(0, 100);
    setSearching(true);
    try {
      // Fixed: Using searchAcademicMaterials and adapting result structure for the UI
      const res = await searchAcademicMaterials(query, lang);
      setLiterature({
        text: res.synthesis,
        sources: res.materials.map(m => ({
          web: { title: m.title, uri: m.link }
        }))
      });
    } catch (e) {
      console.error(e);
    } finally {
      setSearching(false);
    }
  };

  const loadFromHistory = (item: any) => {
    setStats(item.stats);
    setProblem(item.problem);
    setLiterature(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Main Workspace */}
        <div className="lg:col-span-3 space-y-10">
          <section className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100">
             <div className="flex items-center gap-4 mb-10">
                <div className="h-12 w-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-blue-500/20">🔬</div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight serif">Research Laboratory</h2>
             </div>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Tadqiqot Muammosi yoki Mavzu</label>
                <input 
                  type="text"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="Muammoni qisqa va aniq bayon qiling..."
                  className="w-full px-8 py-5 rounded-[1.5rem] bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-serif text-lg italic shadow-inner"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Tahlil uchun matn (Abstract / Methods)</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Kognitiv tahlil qilinishi kerak bo'lgan akademik matnni kiritish..."
                  className="w-full h-80 p-8 border border-slate-100 rounded-[2.5rem] bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none font-serif text-lg leading-relaxed shadow-inner"
                />
              </div>
            </div>
            <button
              onClick={handleAnalyze}
              disabled={loading || text.length < 50}
              className="mt-10 bg-slate-900 text-white px-12 py-6 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-blue-600 disabled:bg-slate-200 transition-all shadow-2xl flex items-center gap-5 group"
            >
              {loading ? <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : "MART Tahlilini Boshlash ➔"}
            </button>
          </section>

          {stats && (
            <div className="space-y-12 animate-in slide-in-from-bottom-12 duration-700">
               {/* MART Results Dashboard */}
               <div className="bg-slate-900 p-12 md:p-16 rounded-[4.5rem] text-white shadow-3xl relative overflow-hidden border border-white/5">
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                     <div className="space-y-8">
                        <div className="flex items-center gap-3">
                           <span className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></span>
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Scientific Synthesis v4.0</span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-bold serif leading-tight italic tracking-tight">"{stats.hypothesis}"</h3>
                        <p className="text-slate-400 text-lg leading-loose text-justify italic border-l-4 border-blue-600 pl-8">
                           {stats.martAnalysis.synthesis}
                        </p>
                     </div>
                     <div className="bg-white/5 backdrop-blur-md p-10 rounded-[3.5rem] border border-white/10 space-y-8 shadow-2xl">
                        {[
                          { l: 'Mantiqiy Izchillik', v: stats.martAnalysis.logic, c: 'bg-blue-500' },
                          { l: 'Analitik Chuqurlik', v: stats.martAnalysis.analytical, c: 'bg-indigo-500' },
                          { l: 'Raqamli Dalillar', v: stats.martAnalysis.numerical, c: 'bg-emerald-500' }
                        ].map(m => (
                          <div key={m.l} className="space-y-3">
                             <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                                <span>{m.l}</span>
                                <span className="text-white">{m.v}%</span>
                             </div>
                             <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                                <div className={`h-full ${m.c} transition-all duration-1000 shadow-lg`} style={{ width: `${m.v}%` }}></div>
                             </div>
                          </div>
                        ))}
                        <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Overall Integrity</span>
                           <span className="text-2xl font-black text-blue-500">{( (stats.martAnalysis.logic + stats.martAnalysis.analytical + stats.martAnalysis.numerical) / 3 ).toFixed(1)}%</span>
                        </div>
                     </div>
                  </div>
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] -mr-64 -mt-64"></div>
               </div>

               {/* Literature Grounding Results */}
               {searching ? (
                 <div className="bg-white p-20 rounded-[4rem] border border-slate-100 flex flex-col items-center justify-center space-y-6 shadow-sm">
                    <div className="h-16 w-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-black text-xs uppercase tracking-[0.2em]">Global ilmiy adabiyotlar (2024-2025) qidirilmoqda...</p>
                 </div>
               ) : literature && (
                 <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm animate-in fade-in duration-1000">
                    <div className="flex justify-between items-center mb-10">
                       <h3 className="text-2xl font-bold text-slate-900 serif italic flex items-center gap-4">
                          Google Search Grounding
                          <span className="text-[10px] bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full font-black uppercase tracking-widest border border-emerald-100">Real-time Search</span>
                       </h3>
                    </div>
                    <div className="prose prose-slate max-w-none text-slate-600 text-lg leading-relaxed whitespace-pre-wrap italic bg-slate-50 p-10 rounded-[3rem] mb-12 border border-slate-100 shadow-inner">
                       {literature.text}
                    </div>
                    {literature.sources.length > 0 && (
                      <div className="space-y-6">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Identifikatsiya qilingan manbalar:</p>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {literature.sources.map((chunk: any, i: number) => (
                              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-blue-500/50 hover:shadow-xl transition-all group">
                                 <p className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{chunk.web?.title || "Academic Literature Item"}</p>
                                 <a href={chunk.web?.uri} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 font-mono truncate block mt-2 opacity-60 hover:opacity-100 transition-opacity">{chunk.web?.uri}</a>
                              </div>
                            ))}
                         </div>
                      </div>
                    )}
                 </div>
               )}
            </div>
          )}
        </div>

        {/* Professional Sidebar: History & Stats */}
        <div className="space-y-8">
           <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Arxiv / Tarix</h4>
                 <span className="bg-slate-50 text-slate-400 text-[10px] px-3 py-1 rounded-lg font-bold">{history.length}/10</span>
              </div>
              {history.length > 0 ? (
                <div className="space-y-4">
                   {history.map((item, idx) => (
                     <button 
                       key={idx} 
                       onClick={() => loadFromHistory(item)}
                       className="w-full text-left p-5 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl hover:border-blue-100 border border-transparent transition-all group"
                     >
                        <p className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors mb-2">{item.problem}</p>
                        <div className="flex justify-between items-center">
                           <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{new Date(item.date).toLocaleDateString()}</span>
                           <span className="h-1.5 w-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        </div>
                     </button>
                   ))}
                   <button 
                     onClick={() => { localStorage.removeItem('research_history_v2'); setHistory([]); }}
                     className="w-full mt-4 py-3 text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-red-400 transition-colors"
                   >
                     Tarixni tozalash
                   </button>
                </div>
              ) : (
                <div className="py-12 text-center space-y-4 opacity-30">
                   <div className="text-4xl">📁</div>
                   <p className="text-xs text-slate-500 italic">Hali tahlillar arxivi mavjud emas.</p>
                </div>
              )}
           </div>

           <div className="bg-gradient-to-br from-indigo-600 to-blue-800 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                 <h4 className="font-black text-xs uppercase tracking-widest opacity-80">AI Insight</h4>
                 <p className="text-sm leading-relaxed text-indigo-50 font-medium italic">
                    "MART metodologiyasi tadqiqotning nafaqat mazmunini, balki uning mantiqiy barqarorligini baholash uchun PhD darajasidagi eng samarali instrumentdir."
                 </p>
                 <div className="pt-6 border-t border-white/10">
                    <div className="flex justify-between items-center mb-3">
                       <span className="text-[9px] font-black uppercase tracking-widest text-indigo-200">Processing Precision</span>
                       <span className="text-lg font-black">99.2%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full">
                       <div className="h-full bg-white rounded-full shadow-lg" style={{ width: '99.2%' }}></div>
                    </div>
                 </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
