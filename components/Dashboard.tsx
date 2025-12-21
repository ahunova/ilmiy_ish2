
import React from 'react';
import { ModuleType, Language } from '../types';
import { translations } from '../translations';

interface DashboardProps {
  onNavigate: (module: ModuleType) => void;
  lang: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, lang }) => {
  const t = translations[lang];

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-700">
      <section className="relative min-h-[400px] md:h-[500px] w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl group">
        <img 
          src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1600&auto=format&fit=crop" 
          alt="Science" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-3xl py-12 md:py-0">
          <span className="inline-block w-fit px-4 py-1.5 bg-blue-600 text-white text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            PhD InnoVision AI
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tighter">
            {t.heroTitle}
          </h2>
          <p className="text-slate-200 text-base md:text-xl leading-relaxed mb-8 opacity-90 font-medium">
            {t.heroDesc}
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => onNavigate(ModuleType.IMRAD_ANALYZER)}
              className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black hover:bg-blue-600 hover:text-white transition-all shadow-xl"
            >
              {t.analysisStart}
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {[
          { type: ModuleType.IMRAD_ANALYZER, title: t.imradAnalyzer, img: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f' },
          { type: ModuleType.ANTI_PLAGIARISM, title: t.antiPlagiarism, img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b' },
          { type: ModuleType.GRAMMAR_MONITOR, title: t.grammarMonitor, img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a' },
          { type: ModuleType.GRANT_HUB, title: t.grantHub, img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e' },
        ].map((item) => (
          <button 
            key={item.title}
            onClick={() => onNavigate(item.type)}
            className="group relative h-[300px] w-full rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all"
          >
            <img src={item.img} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" alt={item.title} />
            <div className="absolute inset-0 bg-slate-900/40"></div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-left">
              <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
              <div className="w-12 h-1 bg-blue-500 rounded-full group-hover:w-full transition-all"></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
