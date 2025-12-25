
import React, { useState, useEffect } from 'react';
// Fix: Added Language to imports and interface to support props from App.tsx
import { GrantOpportunity, Language } from '../types';

interface Props {
  lang: Language;
}

const GrantHub: React.FC<Props> = ({ lang }) => {
  const [grants, setGrants] = useState<GrantOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchGrants = async () => {
      setLoading(true);
      // Simulating fetch - focusing on Uzbekistan local grants + International
      setTimeout(() => {
        const mockGrants: GrantOpportunity[] = [
          {
            id: 'uz-1',
            title: 'Yosh olimlar uchun fundamental va amaliy tadqiqotlar loyihasi (2025)',
            agency: 'Innovatsion rivojlanish agentligi',
            deadline: '2025-02-15',
            amount: '600,000,000 UZS',
            link: 'https://mininnovation.uz/',
            description: 'PhD va tayanch doktorantlar uchun mo\'ljallangan davlat ilmiy dasturlari doirasidagi tanlov.'
          },
          {
            id: 'uz-2',
            title: '"Olimpa" ilmiy-innovatsion loyihalar tanlovi',
            agency: 'Yoshlar Akademiyasi',
            deadline: '2024-12-30',
            amount: '100,000,000 UZS',
            link: 'https://yoshlarakademiyasi.uz/',
            description: 'Iqtidorli yoshlar va PhD tadqiqotchilarning startap va ilmiy ishlanmalarini moliyalashtirish.'
          },
          {
            id: 'uz-3',
            title: 'Doktorantlar uchun xorijiy ilmiy stajirovka dasturi',
            agency: "El-yurt umidi jamg'armasi",
            deadline: '2025-03-20',
            amount: 'To\'liq qoplanadi',
            link: 'https://eyuf.uz/',
            description: 'PhD tadqiqotchilarining nufuzli xorijiy universitetlarda 3-6 oylik malaka oshirishini qo\'llab-quvvatlash.'
          },
          {
            id: 'uz-4',
            title: 'Ayol olimlar va tadqiqotchilar uchun "Innovatsion g\'oyalar" granti',
            agency: 'Oila va xotin-qizlar qo\'mitasi',
            deadline: '2025-01-10',
            amount: '250,000,000 UZS',
            link: '#',
            description: 'Ilm-fan sohasidagi xotin-qizlarning ilmiy salohiyatini oshirishga qaratilgan maqsadli grant.'
          },
          {
            id: 'intl-1',
            title: 'Horizon Europe: Cluster 2 (Culture, Creativity and Inclusive Society)',
            agency: 'Yevropa Ittifoqi',
            deadline: '2024-12-15',
            amount: '€2,500,000',
            link: '#',
            description: 'Ijtimoiy-gumanitar sohadagi PhD tadqiqotchilar uchun xalqaro konsorsium loyihalari.'
          },
          {
            id: 'intl-2',
            title: 'Fulbright Visiting Scholar Program',
            agency: 'AQSH Elchixonasi',
            deadline: '2025-01-10',
            amount: 'Full Fund',
            link: '#',
            description: 'AQSHning nufuzli tadqiqot markazlarida 9 oygacha bo\'lgan ilmiy izlanishlar uchun.'
          }
        ];
        setGrants(mockGrants);
        setLoading(false);
      }, 800);
    };

    fetchGrants();
  }, []);

  const filteredGrants = filter === 'all' 
    ? grants 
    : grants.filter(g => g.agency.toLowerCase().includes(filter.toLowerCase()) || g.title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 serif mb-1">Grantlar va Tanlovlar Monitoringi</h2>
          <p className="text-slate-500 text-sm">O'zbekiston va xalqaro miqyosdagi PhD imkoniyatlari</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100">
           <span className="text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2">
             <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
             Mahalliy va Xalqaro yangiliklar
           </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        {['all', 'Innovatsion', 'Yoshlar', 'El-yurt', 'AQSH', 'Europe'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat === 'all' ? 'all' : cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              (filter === cat) || (cat === 'all' && filter === 'all')
              ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
              : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat === 'all' ? 'Barcha Grantlar' : cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-32 space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-blue-600"></div>
          <p className="text-slate-400 font-medium animate-pulse">Ma'lumotlar yangilanmoqda...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {filteredGrants.map((grant) => (
            <div key={grant.id} className="bg-white flex flex-col p-8 rounded-[2rem] shadow-sm border border-slate-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/5 transition-all group relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${grant.id.startsWith('uz') ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                  {grant.agency}
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">Muddat</span>
                  <span className="text-slate-900 text-xs font-bold">{grant.deadline}</span>
                </div>
              </div>
              
              <h3 className="font-bold text-lg text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight min-h-[3rem]">{grant.title}</h3>
              <p className="text-sm text-slate-500 mb-8 line-clamp-3 leading-relaxed">{grant.description}</p>
              
              <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Budjet</span>
                  <span className="font-bold text-slate-900 text-lg">{grant.amount}</span>
                </div>
                <a href={grant.link} target="_blank" rel="noopener noreferrer" className="bg-slate-900 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:shadow-lg transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-8 border border-slate-800">
        <div className="h-16 w-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-3xl shadow-xl shadow-emerald-500/20 shrink-0">🏛️</div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-xl font-bold mb-2">Mahalliy ilmiy ekotizim bilan integratsiya</h4>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
            Tizim O'zbekistonning "Innovatsion rivojlanish agentligi" va boshqa davlat ilmiy tashkilotlari e'lon qiladigan 
            PhD darajasidagi barcha grantlarni real-vaqt rejimida kuzatib boradi va sizga bildirishnomalar yuboradi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GrantHub;
