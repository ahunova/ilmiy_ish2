
import React, { useState } from 'react';
import { Language, ArticleStats } from '../types';
import { translations } from '../translations';
import { getArticleAnalytics } from '../geminiService';

interface Props {
  lang: Language;
}

const AnalyticsView: React.FC<Props> = ({ lang }) => {
  const [problem, setProblem] = useState('');
  const [text, setText] = useState('');
  const [stats, setStats] = useState<ArticleStats | null>(null);
  const [loading, setLoading] = useState(false);
  const t = translations[lang];

  const handleAnalyze = async () => {
    if (!text || text.length < 50) return;
    setLoading(true);
    try {
      const result = await getArticleAnalytics(problem, text, lang);
      setStats(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Research Configuration Section */}
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-200">
        <h2 className="text-3xl font-bold text-slate-900 serif mb-8">Ilmiy Tadqiqot Laboratoriyasi</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">1. Muammo qo‘yish (Scientific Problem)</label>
            <input 
              type="text"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Tadqiqotingizdagi asosiy ilmiy muammoni qisqacha bayon qiling..."
              className="w-full px-8 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-serif italic"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">2. Matn yuklash (Article/Abstract)</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Maqola yoki referat matnini bu yerga joylang..."
              className="w-full h-64 p-8 border border-slate-100 rounded-[2rem] bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none font-serif text-lg leading-relaxed shadow-inner"
            />
          </div>
        </div>
        
        <button
          onClick={handleAnalyze}
          disabled={loading || text.length < 50}
          className="mt-8 bg-slate-900 text-white px-12 py-5 rounded-2xl font-black hover:bg-blue-600 disabled:bg-slate-300 transition-all shadow-xl flex items-center gap-4 group"
        >
          {loading ? (
            <>
              <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              {t.scanLoading}
            </>
          ) : (
            <>
              MART orqali tahlilni boshlash
              <span className="text-xl group-hover:translate-x-1 transition-transform">🚀</span>
            </>
          )}
        </button>
      </div>

      {stats && (
        <div className="space-y-8 animate-in zoom-in duration-500 pb-20">
          {/* Main Visual Analysis Results */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Hypothesis & Problem */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-900 p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Shakllantirilgan Gipoteza</span>
                  <h3 className="text-2xl font-bold serif leading-relaxed">
                    "{stats.hypothesis}"
                  </h3>
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="text-xs font-bold text-blue-200 uppercase mb-2">Muammo tahlili</p>
                    <p className="opacity-80 text-sm leading-relaxed">{stats.problemStatement}</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
              </div>

              {/* MART Analysis Section */}
              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                   MART Tahlili Natijalari
                   <span className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full uppercase font-black">AI Verified</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Mantiqiy (Logic)</span>
                        <span className="font-bold text-blue-600">{stats.martAnalysis.logic}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full bg-blue-600 rounded-full" style={{ width: `${stats.martAnalysis.logic}%` }}></div>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Analitik (Analytical)</span>
                        <span className="font-bold text-indigo-600">{stats.martAnalysis.analytical}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${stats.martAnalysis.analytical}%` }}></div>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Raqamli (Numerical)</span>
                        <span className="font-bold text-emerald-600">{stats.martAnalysis.numerical}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${stats.martAnalysis.numerical}%` }}></div>
                      </div>
                   </div>
                </div>
                <div className="mt-10 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 italic text-slate-600 text-sm leading-relaxed">
                   <strong>Sintez:</strong> {stats.martAnalysis.synthesis}
                </div>
              </div>
            </div>

            {/* Side Stats */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Kalit tushunchalar</h3>
                <div className="flex flex-wrap gap-2">
                  {stats.topKeywords.map((kw, i) => (
                    <span key={i} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-bold border border-blue-100">
                      {kw.word}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Metrikalar</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Originallik</span>
                    <span className="font-bold text-emerald-600">{stats.readabilityScore}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Terminlar zichligi</span>
                    <span className="font-bold text-slate-900">{stats.academicTermDensity}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Murakkablik</span>
                    <span className="font-bold text-blue-600 uppercase">{stats.complexity}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleExportPDF}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl"
              >
                PDF Hisobotini Yuklash 📥
              </button>
            </div>
          </div>
        </div>
      )}

      {!stats && !loading && (
        <div className="bg-slate-50 p-20 rounded-[3rem] border border-dashed border-slate-300 flex flex-col items-center text-center">
          <div className="text-6xl mb-6">📈</div>
          <h3 className="text-xl font-bold text-slate-400 mb-2">Tahlil tayyor emas</h3>
          <p className="text-slate-400 max-w-sm">Muammoni va matnni kiritib, MART tahlilini ishga tushiring.</p>
        </div>
      )}
    </div>
  );
};

export default AnalyticsView;
