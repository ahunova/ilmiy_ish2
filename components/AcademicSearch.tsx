
import React, { useState } from 'react';
import { Language, AcademicMaterial } from '../types';
import { translations } from '../translations';
import { searchAcademicMaterials } from '../geminiService';

interface Props { lang: Language; }

const AcademicSearch: React.FC<Props> = ({ lang }) => {
  const t = translations[lang] as any;
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AcademicMaterial[]>([]);
  const [synthesis, setSynthesis] = useState('');
  const [filter, setFilter] = useState('all');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setResults([]);
    setSynthesis('');
    try {
      const data = await searchAcademicMaterials(query, lang);
      setResults(data.materials || []);
      setSynthesis(data.synthesis || '');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyCitation = (m: AcademicMaterial, index: number) => {
    const citation = `${m.author} (${m.year}). ${m.title}. ${m.link}`;
    navigator.clipboard.writeText(citation);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'article': return t.articleType;
      case 'thesis': return t.thesisType;
      case 'phd_work': return t.phdWorkType;
      case 'book': return t.bookType;
      case 'manual': return t.manualType;
      default: return t.otherType;
    }
  };

  const filteredResults = filter === 'all' ? results : results.filter(r => r.type === filter);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-7xl mx-auto pb-20">
      {/* Global Search Header */}
      <section className="bg-[#0F172A] p-10 md:p-14 rounded-[3.5rem] border border-white/10 shadow-2xl relative overflow-hidden text-white">
        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-6">
            <div className="h-16 w-16 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center text-3xl shadow-xl shadow-blue-500/20 animate-pulse">
               🌍
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold serif italic tracking-tight">{t.academicSearchTitle}</h2>
              <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Xalqaro Ilmiy Ma'lumotlar Sintezi (DOI/URL Supported)</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              value={query} 
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={t.searchPlaceholder}
              className="flex-1 px-8 py-6 rounded-[2rem] bg-white/5 border border-white/10 outline-none focus:ring-4 focus:ring-blue-500/20 font-serif text-lg italic shadow-inner text-white placeholder:text-slate-500 transition-all"
            />
            <button 
              onClick={handleSearch}
              disabled={loading || !query}
              className="bg-blue-600 text-white px-12 py-6 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20 disabled:bg-slate-800 disabled:text-slate-500"
            >
              {loading ? 'Skanerlanmoqda...' : t.searchButton}
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
      </section>

      {loading && (
        <div className="flex flex-col items-center justify-center py-24 space-y-8 bg-white rounded-[4rem] border border-slate-100 shadow-sm">
          <div className="h-20 w-20 border-8 border-slate-50 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="text-center space-y-2">
            <p className="text-slate-900 font-black text-sm uppercase tracking-[0.2em]">{t.searchingMaterials}</p>
            <p className="text-slate-400 text-[10px] font-medium italic">Global ilmiy bazalar bilan bog'lanish o'rnatilmoqda...</p>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Side Info & Synthesis */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Kategoriyalar</h4>
              <div className="flex flex-col gap-2">
                {['all', 'article', 'thesis', 'phd_work', 'book', 'manual'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`text-left px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                  >
                    {f === 'all' ? t.allMaterials : getTypeLabel(f)}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
               <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6">Ilmiy Xulosa (Sintez)</h4>
               <div className="text-sm leading-loose italic opacity-90 border-l-4 border-blue-600 pl-6 font-serif prose prose-invert prose-sm">
                 {synthesis}
               </div>
               <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
            </div>
          </div>

          {/* Global Results List */}
          <div className="lg:col-span-3 space-y-6">
             <div className="flex items-center justify-between px-6">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Topilgan adabiyotlar: {filteredResults.length}</p>
                <span className="flex items-center gap-2">
                   <span className="h-2 w-2 bg-emerald-500 rounded-full"></span>
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Open Access Verified</span>
                </span>
             </div>
             
             <div className="grid grid-cols-1 gap-8 animate-in slide-in-from-bottom-8 duration-700">
                {filteredResults.map((m, i) => (
                  <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col md:flex-row gap-10 items-start">
                    <div className={`h-20 w-20 shrink-0 rounded-[2rem] flex items-center justify-center text-3xl shadow-inner ${
                      m.type === 'article' ? 'bg-blue-50 text-blue-600' :
                      m.type === 'phd_work' ? 'bg-indigo-50 text-indigo-600' :
                      m.type === 'book' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-slate-50 text-slate-600'
                    }`}>
                      {m.type === 'article' ? '🌐' : m.type === 'phd_work' ? '🎓' : m.type === 'book' ? '📚' : '🔬'}
                    </div>
                    
                    <div className="flex-1 space-y-4 w-full">
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="text-[9px] font-black bg-slate-900 text-white px-4 py-1.5 rounded-full uppercase tracking-widest">
                          {getTypeLabel(m.type)}
                        </span>
                        <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Muvofiqlik: {Math.round(m.relevanceScore * 100)}%</span>
                      </div>
                      
                      <a 
                        href={m.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block group-hover:text-blue-600 transition-colors"
                      >
                        <h3 className="text-2xl font-bold text-slate-900 serif italic leading-tight">
                          {m.title}
                        </h3>
                      </a>
                      
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {m.author} • {m.year} • {m.link?.includes('doi.org') ? 'DOI: ' + m.link.split('doi.org/')[1] : 'External Source'}
                      </p>
                      
                      <p className="text-base text-slate-500 italic leading-relaxed line-clamp-3">
                        {m.description}
                      </p>
                      
                      <div className="pt-6 flex flex-wrap gap-4 border-t border-slate-50">
                         <a 
                          href={m.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-[#E8F5FF] px-6 py-3 rounded-xl text-[10px] font-black text-[#0085FF] uppercase tracking-widest hover:bg-[#0085FF] hover:text-white transition-all shadow-sm flex items-center gap-2"
                         >
                           Manbaga O'tish ↗
                         </a>
                         <button 
                           onClick={() => copyCitation(m, i)}
                           className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${copiedIndex === i ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400 hover:text-slate-900'}`}
                         >
                           {copiedIndex === i ? 'Nusxalandi ✓' : 'APA Iqtibos nusxalash'}
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {results.length === 0 && !loading && query && (
        <div className="bg-slate-50 p-24 rounded-[5rem] text-center border border-dashed border-slate-200">
           <div className="text-6xl mb-6 opacity-20">📡</div>
           <p className="text-slate-400 text-lg italic">{t.noMaterialsFound}</p>
        </div>
      )}
    </div>
  );
};

export default AcademicSearch;
