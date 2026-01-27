
import React, { useState, useEffect } from 'react';
import { Language, SavedEvent } from '../types';
import { getLiveAcademicFeed } from '../geminiService';
import { db } from '../db';

interface Props { lang: Language; }

const AcademicEventsHub: React.FC<Props> = ({ lang }) => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'grant' | 'conference'>('grant');
  const [activeCategory, setActiveCategory] = useState('Barchasi');
  const [favorites, setFavorites] = useState<SavedEvent[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const categories = [
    { id: 'Barchasi', label: 'Barchasi' },
    { id: 'Uzbekistan', label: 'O\'zbekiston' },
    { id: 'IT', label: 'IT & Eng' },
    { id: 'Medicine', label: 'Medicine' },
    { id: 'STEM', label: 'STEM' },
    { id: 'Social', label: 'Social Sciences' },
    { id: 'Humanities', label: 'Gumanitar & Filologiya' }
  ];

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const saved = await db.getFavorites();
    setFavorites(saved as any);
  };

  useEffect(() => {
    if (!showOnlyFavorites) fetchEvents();
  }, [activeTab, activeCategory, lang, showOnlyFavorites]);

  const fetchEvents = async () => {
    setLoading(true);
    setItems([]);
    try {
      const yearFilter = "upcoming academic year 2025 2026";
      let query = activeCategory === 'Barchasi' 
        ? `Find latest ${activeTab} opportunities for ${yearFilter}` 
        : `Search for ${activeCategory} ${activeTab}s occurring in ${yearFilter}`;
      
      if (activeCategory === 'Uzbekistan') {
        query = activeTab === 'grant' 
          ? 'yangi ilmiy loyihalar tanlovi va grantlar 2025 O\'zbekiston mininnovation.uz ilmiyloyiha.uz' 
          : 'yangi xalqaro ilmiy-amaliy konferensiyalar 2025 2026 O\'zbekiston anjumanlar';
      }

      const res = await getLiveAcademicFeed(query, lang, activeTab);
      const validItems = (res.items || []).filter((item: any) => item.title && item.link);
      setItems(validItems);
    } catch (e) {
      console.error("Fetch Error:", e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (item: any) => {
    const isExist = favorites.find(f => f.link === item.link);
    if (isExist) {
      await db.deleteFavorite(item.link);
    } else {
      const newFav = {
        id: item.id || Date.now(),
        title: item.title,
        link: item.link,
        deadline: item.deadline,
        type: item.type || (activeTab === 'grant' ? 'Grant' : 'Anjuman'),
        category: activeTab,
      };
      await db.saveFavorite(newFav);
    }
    loadFavorites();
  };

  const displayedItems = showOnlyFavorites ? favorites.filter(f => f.category === activeTab) : items;

  const getThematicImage = (i: number, field?: string) => {
    const f = (field || '').toLowerCase();
    const imageLibrary: Record<string, string[]> = {
      it: ["https://images.unsplash.com/photo-1518770660439-4636190af475", "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"],
      medicine: ["https://images.unsplash.com/photo-1576091160550-2173dba999ef", "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7"],
      stem: ["https://images.unsplash.com/photo-1532094349884-543bc11b234d", "https://images.unsplash.com/photo-1507413245164-6160d8298b31"],
      default_grant: ["https://images.unsplash.com/photo-1526304640581-d334cdbbf45e", "https://images.unsplash.com/photo-1576091160550-2173dba999ef"]
    };
    let pool = activeTab === 'grant' ? imageLibrary.default_grant : imageLibrary.it;
    return `${pool[i % pool.length]}?q=80&w=800&auto=format&fit=crop`;
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-24">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div className="space-y-6">
          <div className="flex gap-2 p-1.5 bg-white rounded-[2.2rem] border border-slate-100 shadow-xl inline-flex">
            <button onClick={() => { setActiveTab('grant'); setActiveCategory('Barchasi'); setShowOnlyFavorites(false); }} className={`px-10 py-4 rounded-[1.8rem] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'grant' ? 'bg-[#0085FF] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>Grantlar</button>
            <button onClick={() => { setActiveTab('conference'); setActiveCategory('Barchasi'); setShowOnlyFavorites(false); }} className={`px-10 py-4 rounded-[1.8rem] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'conference' ? 'bg-[#0085FF] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>Konferensiyalar</button>
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight leading-none">{showOnlyFavorites ? 'Saqlanganlar' : (activeTab === 'grant' ? 'Ilmiy Grantlar Oqimi' : 'Xalqaro Konferensiyalar')}</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-4">
              <span className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full animate-pulse ${activeTab === 'grant' ? 'bg-blue-600' : 'bg-emerald-500'}`}></span>Live Monitoring 2025</span>
              <button onClick={() => setShowOnlyFavorites(!showOnlyFavorites)} className={`flex items-center gap-2 transition-all ${showOnlyFavorites ? 'text-blue-600' : 'text-slate-400'}`}>
                <span>{showOnlyFavorites ? '★ Barcha natijalar' : '☆ Sevimlilar'}</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded-md">{favorites.filter(f => f.category === activeTab).length}</span>
              </button>
            </p>
          </div>
        </div>
        <div className="flex gap-2 bg-white p-2 rounded-[2.5rem] border border-slate-100 shadow-xl overflow-x-auto max-w-full no-scrollbar">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setShowOnlyFavorites(false); }} className={`px-6 py-3 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat.id && !showOnlyFavorites ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>{cat.label}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1,2,3,4].map(i => <div key={i} className="bg-white h-[450px] rounded-[3.5rem] border border-slate-100 animate-pulse"></div>)}
        </div>
      ) : displayedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-in slide-in-from-bottom-8 duration-700">
          {displayedItems.map((item, i) => {
            const isFav = favorites.find(f => f.link === item.link);
            return (
              <div key={i} className="bg-white rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full relative">
                <button onClick={() => toggleFavorite(item)} className={`absolute top-6 right-6 z-20 h-10 w-10 rounded-full flex items-center justify-center transition-all ${isFav ? 'bg-amber-400 text-white shadow-xl scale-110' : 'bg-white/40 backdrop-blur-md text-white hover:bg-white hover:text-amber-400'}`}>{isFav ? '★' : '☆'}</button>
                <div className="relative h-56 overflow-hidden shrink-0">
                  <img src={getThematicImage(i, item.field)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Event" />
                  <div className="absolute top-0 left-0 bg-slate-900/80 backdrop-blur-sm text-white px-4 py-2 font-black text-[9px] rounded-br-[1.5rem] shadow-xl z-10 uppercase tracking-widest">{item.field || (activeTab === 'grant' ? 'Research' : 'Global')}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-[#0085FF] transition-colors line-clamp-3 serif italic">{item.title}</h3>
                    <div className="inline-block px-4 py-1.5 bg-[#E8F5FF] text-[#0085FF] rounded-full text-[10px] font-black uppercase tracking-tight">{item.type || (activeTab === 'grant' ? 'Research Funding' : 'Scientific Conference')}</div>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                     <div className="px-4 py-2 rounded-full flex items-center gap-2 bg-[#F0FFF4] text-[#22C55E]"><span className="text-[9px] font-black uppercase tracking-tight whitespace-nowrap">{item.deadline || 'Ochiq'}</span></div>
                     <a href={item.link} target="_blank" rel="noopener noreferrer" className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-slate-900 transition-all shadow-xl group/btn transform hover:rotate-12"><svg className="w-5 h-5 transform transition-transform group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white p-24 rounded-[4rem] text-center border border-dashed border-slate-200">
           <div className="text-6xl mb-6 opacity-20">📡</div>
           <p className="text-slate-400 text-lg italic max-w-md mx-auto">{showOnlyFavorites ? 'Saqlanganlar yo\'q.' : 'Ma\'lumotlar yuklanmoqda...'}</p>
        </div>
      )}
    </div>
  );
};

export default AcademicEventsHub;
