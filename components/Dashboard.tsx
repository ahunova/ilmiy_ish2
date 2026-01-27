
import React from 'react';
import { ModuleType, Language } from '../types';
import { translations } from '../translations';

interface DashboardProps {
  onNavigate: (module: ModuleType) => void;
  lang: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, lang }) => {
  const t = translations[lang] as any;

  return (
    <div className="space-y-12 md:space-y-20 animate-in fade-in duration-700 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[400px] md:h-[500px] w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl group border border-slate-200">
        <img 
          src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1600&auto=format&fit=crop" 
          alt="Science" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-3xl py-12 md:py-0">
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

      {/* Main Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[
          { type: ModuleType.IMRAD_ANALYZER, title: t.imradAnalyzer, img: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f' },
          { type: ModuleType.ACADEMIC_EVENTS, title: t.academicEvents, img: 'https://images.unsplash.com/photo-1540575861501-7ad060e29ad3' },
          { type: ModuleType.GRAMMAR_MONITOR, title: t.grammarMonitor, img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a' },
        ].map((item) => (
          <button 
            key={item.title}
            onClick={() => onNavigate(item.type)}
            className="group relative h-[300px] w-full rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all"
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

      {/* Roadmap Section */}
      <section className="bg-white p-10 md:p-16 rounded-[4rem] border border-slate-200 shadow-sm text-center relative overflow-hidden">
        <h3 className="text-3xl font-bold text-slate-900 serif mb-4">Ilmiy Sayohat Rejasi</h3>
        <p className="text-slate-500 mb-16 max-w-2xl mx-auto">PhD darajasini himoya qilish uchun ilmiy ishni tashkil etishning mantiqiy zanjiri.</p>
        
        <div className="relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {[
              { 
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>, 
                label: 'Muammo tanlash' 
              },
              { 
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" /></svg>, 
                label: 'Adabiyotlar sharhi' 
              },
              { 
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v1.242c0 .829.512 1.545 1.238 1.818l2.124.796c.726.273 1.238.989 1.238 1.818v1.242m-6.914 2.152L3 12.75l3.232 3.232a2.25 2.25 0 003.182 0l3.232-3.232-3.232-3.232a2.25 2.25 0 00-3.182 0z" /></svg>, 
                label: 'Eksperiment' 
              },
              { 
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>, 
                label: 'Tahlil va Xulosa' 
              },
              { 
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75c0-1.027-.259-2.006-.713-2.864m11.213 2.864a.75.75 0 110-1.5.75.75 0 010 1.5zm0 0v-3.675A55.378 55.378 0 0012 8.443m7.007 11.55A5.981 5.981 0 0117.25 15.75c0-1.027.259-2.006.713-2.864" /></svg>, 
                label: 'Nashr va Himoya' 
              },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div className="h-20 w-20 bg-white border border-slate-100 text-blue-600 rounded-[2.5rem] flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:border-blue-500 group-hover:bg-blue-50 transition-all duration-300">
                  {step.icon}
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
