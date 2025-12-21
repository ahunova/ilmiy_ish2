
import React from 'react';
import { ModuleType, Language, User } from '../types';
import { translations } from '../translations';

interface DashboardProps {
  onNavigate: (module: ModuleType) => void;
  lang: Language;
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, lang, user }) => {
  const t = translations[lang];

  const adminStats = [
    { label: "Jami Foydalanuvchilar", value: "1,240", icon: "👥", color: "blue" },
    { label: "AI So'rovlar", value: "45.2K", icon: "⚡", color: "emerald" },
    { label: "Baza Sig'imi", value: "82%", icon: "💾", color: "amber" },
    { label: "Tizim Barqarorligi", value: "99.9%", icon: "🛡️", color: "indigo" },
  ];

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-700">
      {user.role === 'admin' ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminStats.map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="text-3xl mb-4">{stat.icon}</div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-slate-900 p-12 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-10">
            <div className="h-24 w-24 bg-white/10 rounded-[2rem] flex items-center justify-center text-5xl">⚙️</div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-3">Tizim Resurslari Boshqaruvi</h3>
              <p className="text-slate-400 max-w-2xl leading-relaxed italic">
                Siz administrator sifatida Gemini API kvotalari, foydalanuvchi ma'lumotlar bazasi va grantlar oqimi algoritmlarini boshqarish huquqiga egasiz.
              </p>
              <button 
                onClick={() => onNavigate(ModuleType.RESOURCE_MANAGEMENT)}
                className="mt-6 bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all"
              >
                Texnik boshqaruvga o'tish
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <section className="relative min-h-[400px] md:h-[500px] w-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl group">
            <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Hero" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
            <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-3xl">
              <span className="inline-block w-fit px-4 py-1.5 bg-blue-600 text-white text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">PhD InnoVision AI</span>
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tighter">{t.heroTitle}</h2>
              <p className="text-slate-200 text-base md:text-xl leading-relaxed mb-8 opacity-90 font-medium">{t.heroDesc}</p>
              <button onClick={() => onNavigate(ModuleType.IMRAD_ANALYZER)} className="w-fit bg-white text-slate-900 px-10 py-4 rounded-2xl font-black hover:bg-blue-600 hover:text-white transition-all shadow-xl">{t.analysisStart}</button>
            </div>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { type: ModuleType.IMRAD_ANALYZER, title: t.imradAnalyzer, img: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f' },
              { type: ModuleType.ANTI_PLAGIARISM, title: t.antiPlagiarism, img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b' },
              { type: ModuleType.GRAMMAR_MONITOR, title: t.grammarMonitor, img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a' },
              { type: ModuleType.GRANT_HUB, title: t.grantHub, img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e' },
            ].map((item) => (
              <button key={item.title} onClick={() => onNavigate(item.type)} className="group relative h-[300px] w-full rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                <img src={item.img} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" alt={item.title} />
                <div className="absolute inset-0 bg-slate-900/40"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-left text-white">
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <div className="w-12 h-1 bg-blue-500 rounded-full group-hover:w-full transition-all"></div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
