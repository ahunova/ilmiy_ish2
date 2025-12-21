
import React, { useState } from 'react';
import { Language, ArticleStats } from '../types';
import { translations } from '../translations';
import { getArticleAnalytics } from '../geminiService';

interface Props {
  lang: Language;
}

const AnalyticsView: React.FC<Props> = ({ lang }) => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState<ArticleStats | null>(null);
  const [loading, setLoading] = useState(false);
  const t = translations[lang];

  const handleAnalyze = async () => {
    if (!text || text.length < 100) return;
    setLoading(true);
    try {
      const result = await getArticleAnalytics(text, lang);
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

  const maxCitations = stats?.topCitedSources?.length 
    ? Math.max(...stats.topCitedSources.map(s => s.count)) 
    : 1;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Article Input Section */}
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-200">
        <h2 className="text-3xl font-bold text-slate-900 serif mb-6">{t.analyzeArticle}</h2>
        <p className="text-slate-500 mb-8">Maqolangizni bu yerga joylang va AI orqali uning chuqur metrikalarini, kalit so'zlarini va strukturaviy balansini tahlil qiling.</p>
        
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.textPlaceholder}
          className="w-full h-64 p-8 border border-slate-100 rounded-[2rem] bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none font-serif text-lg leading-relaxed shadow-inner mb-6"
        />
        
        <button
          onClick={handleAnalyze}
          disabled={loading || text.length < 100}
          className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-black hover:bg-blue-600 disabled:bg-slate-300 transition-all shadow-xl flex items-center gap-3"
        >
          {loading ? t.scanLoading : t.analyzeArticle}
          {!loading && <span className="text-xl">📊</span>}
        </button>
      </div>

      {stats && (
        <div className="space-y-8 animate-in zoom-in duration-500">
          {/* Main Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">So'zlar soni</p>
              <h4 className="text-3xl font-black text-slate-900">{stats.wordCount}</h4>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{t.complexity}</p>
              <h4 className="text-xl font-black text-blue-600 uppercase">{stats.complexity}</h4>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{t.readingTime}</p>
              <h4 className="text-3xl font-black text-slate-900">{stats.readingTime} min</h4>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Readability</p>
              <h4 className="text-3xl font-black text-emerald-600">{stats.readabilityScore}%</h4>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* IMRaD Distribution */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-8">Strukturaviy Muvozanat (IMRaD Distribution)</h3>
              <div className="space-y-6">
                {stats.imradDistribution.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-600 uppercase tracking-widest">
                      <span>{item.section}</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          item.section.toLowerCase().includes('results') ? 'bg-blue-600' : 
                          item.section.toLowerCase().includes('intro') ? 'bg-indigo-400' : 'bg-slate-400'
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Cited Sources Visualization */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-8">{t.topCited}</h3>
              <div className="space-y-5">
                {stats.topCitedSources && stats.topCitedSources.length > 0 ? (
                  stats.topCitedSources.map((source, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                        <span className="truncate pr-4">{source.name}</span>
                        <span className="text-blue-600">{source.count} iqtibos</span>
                      </div>
                      <div className="w-full bg-slate-50 h-3 rounded-full overflow-hidden border border-slate-100">
                        <div 
                          className="bg-slate-900 h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${(source.count / maxCitations) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm italic">Matnda aniq iqtiboslar topilmadi.</p>
                )}
              </div>
              <p className="mt-8 text-[10px] text-slate-400 italic">Iqtiboslar chastotasi matndagi ishora va bibliografik bog'liqliklar asosida AI tomonidan baholandi.</p>
            </div>

            {/* Top Keywords */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-8">{t.keywords} & Terminlar</h3>
              <div className="flex flex-wrap gap-3">
                {stats.topKeywords.map((kw, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 px-5 py-3 rounded-2xl flex items-center gap-3 hover:bg-blue-50 transition-colors">
                    <span className="font-bold text-slate-900">{kw.word}</span>
                    <span className="bg-blue-100 text-blue-600 text-[10px] px-2 py-0.5 rounded-full font-black">{kw.count}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{t.academicDensity}</p>
                <div className="flex items-center gap-4">
                   <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full" style={{ width: `${stats.academicTermDensity}%` }}></div>
                   </div>
                   <span className="text-lg font-black text-slate-900">{stats.academicTermDensity}%</span>
                </div>
              </div>
            </div>
            
            {/* AI Summary Section */}
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-4">
               <div className="flex items-center gap-3 mb-2">
                  <span className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></span>
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">AI Strategik Xulosasi</p>
               </div>
               <p className="text-lg font-medium leading-relaxed opacity-90 italic">
                  "{stats.aiSummary}"
               </p>
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <button 
              onClick={handleExportPDF}
              className="bg-white border-2 border-slate-900 text-slate-900 px-10 py-4 rounded-2xl font-black hover:bg-slate-900 hover:text-white transition-all flex items-center gap-3 shadow-xl"
            >
              PDF Analitika Hisobotini Yuklash 📥
            </button>
          </div>
        </div>
      )}

      {!stats && !loading && (
        <div className="bg-slate-50 p-20 rounded-[3rem] border border-dashed border-slate-300 flex flex-col items-center text-center">
          <div className="text-6xl mb-6">📉</div>
          <h3 className="text-xl font-bold text-slate-400 mb-2">Ma'lumotlar mavjud emas</h3>
          <p className="text-slate-400 max-w-sm">Tahlilni boshlash uchun maqola matnini yuqoridagi maydonga kiriting.</p>
        </div>
      )}
    </div>
  );
};

export default AnalyticsView;
