
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { getLiveAcademicFeed } from '../geminiService';

interface Props { lang: Language; }

const GrantHub: React.FC<Props> = ({ lang }) => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('Barchasi');

  const categories = [
    { id: 'Barchasi', label: 'Barchasi' },
    { id: 'Uzbekistan', label: 'Milliy loyihalar' },
    { id: 'STEM', label: 'Aniq fanlar' },
    { id: 'Medicine', label: 'Tibbiyot' },
    { id: 'IT', label: 'IT & AI' },
    { id: 'Social', label: 'Ijtimoiy-gumanitar' },
    { id: 'Agriculture', label: 'Qishloq xo\'jaligi' },
    { id: 'Humanities', label: 'Gumanitar & Filologiya' }
  ];

  useEffect(() => {
    fetchNewGrants();
  }, [activeCategory, lang]);

  const fetchNewGrants = async () => {
    setLoading(true);
    try {
      let query = activeCategory === 'Barchasi' ? 'upcoming research grants and funding calls 2025 2026' : `${activeCategory} upcoming research funding opportunities 2025`;
      if (activeCategory === 'Uzbekistan') query = 'yangi ilmiy loyihalar va grantlar tanlovi 2025 ilmiyloyiha.uz';
      
      const res = await getLiveAcademicFeed(query, lang, 'grant');
      setItems(res.items || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getThematicImage = (i: number, field?: string) => {
    const images: Record<string, string[]> = {
      'STEM': ["https://images.unsplash.com/photo-1532094349884-543bc11b234d", "https://images.unsplash.com/photo-1507413245164-6160d8298b31"],
      'IT': ["https://images.unsplash.com/photo-1550751827-4bd374c3f58b", "https://images.unsplash.com/photo-1518770660439-4636190af475"],
      'Medicine': ["https://images.unsplash.com/photo-1576091160550-2173dba999ef", "https://images.unsplash.com/photo-1530026405186-ed1f139313f8"],
      'Uzbekistan': ["https://images.unsplash.com/photo-1628102421443-41a6684617be", "https://images.unsplash.com/photo-1528642463366-427f8c14031d"],
      'Social': ["https://images.unsplash.com/photo-1454165833767-027ffea9e778", "https://images.unsplash.com/photo-1516321497487-e288fb19713f"],
      'Humanities': ["https://images.unsplash.com/photo-1455390582262-044cdead277a", "https://images.unsplash.com/photo-1491841573634-28140fc7ced7"]
    };
    const pool = images[field || 'Social'] || images['Social'];
    return `${pool[i % pool.length]}?q=80&w=800&auto=format&fit=crop`;
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Grantlar va Loyihalar Oqimi</h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2 flex items-center gap-2">
            <span className="h-2 w-2 bg-[#0085FF] rounded-full animate-pulse"></span>
            Yangi Ilmiy Grantlar 2025-2026 (Live)
          </p>
        </div>
        <div className="flex gap-2 bg-white p-2 rounded-[2.5rem] border border-slate-100 shadow-xl overflow-x-auto max-w-full no-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat.id ? 'bg-[#0085FF] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white h-[450px] rounded-[3rem] border border-slate-100 animate-pulse shadow-sm"></div>
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full">
              <div className="relative h-56 overflow-hidden shrink-0">
                <img src={getThematicImage(i, item.field)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Grant" />
                <div className="absolute top-0 left-0 bg-[#0085FF] text-white px-5 py-2 font-black text-xs rounded-br-[1.5rem] shadow-xl z-10">
                  #{item.id || 124 - i}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-[#0085FF] transition-colors">
                    {item.title}
                  </h3>
                  <div className="inline-block px-4 py-1.5 bg-[#E8F5FF] text-[#0085FF] rounded-full text-[10px] font-black uppercase tracking-tight">
                    {item.type || 'Grant/Loyiha'}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                   <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${i % 3 === 0 ? 'bg-red-50 text-red-500' : 'bg-[#F0FFF4] text-[#22C55E]'}`}>
                      <span className="text-[9px] font-black uppercase tracking-tight whitespace-nowrap">
                        Muddat: {item.deadline}
                      </span>
                   </div>
                   <a href={item.link} target="_blank" rel="noopener noreferrer" className="h-12 w-12 bg-[#E8F5FF] rounded-full flex items-center justify-center text-[#0085FF] hover:bg-[#0085FF] hover:text-white transition-all shadow-md group/btn">
                    <svg className="w-6 h-6 transform transition-transform group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                   </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 p-24 rounded-[4rem] text-center border border-dashed border-slate-200">
           <div className="text-6xl mb-6 opacity-20">📡</div>
           <p className="text-slate-400 text-lg italic">Grantlar topilmadi yoki barchasining muddati o'tgan. Qidiruv yo'nalishini o'zgartirib ko'ring.</p>
           <button onClick={fetchNewGrants} className="mt-4 text-blue-600 font-black uppercase text-xs tracking-widest">Qaytadan yuklash 🔄</button>
        </div>
      )}
    </div>
  );
};

export default GrantHub;
