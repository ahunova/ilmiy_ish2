
import React, { useState, useEffect } from 'react';
import { ModuleType, Language } from './types';
import { translations } from './translations';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import UnifiedWorkspace from './components/UnifiedWorkspace';
import ResearchQuest from './components/ResearchQuest';
import AcademicEventsHub from './components/AcademicEventsHub';
import IMRaDAnalyzer from './components/IMRaDAnalyzer';
import GrammarMonitor from './components/GrammarMonitor';
import DOIIdentifier from './components/DOIIdentifier';
import ScientificJustification from './components/ScientificJustification';
import BackendView from './components/BackendView';
import AnalyticsView from './components/AnalyticsView';
import ContactCreator from './components/ContactCreator';
import AntiPlagiarism from './components/AntiPlagiarism';
import AcademicSearch from './components/AcademicSearch';
import ArticleGuide from './components/ArticleGuide';
import SecurityCenter from './components/SecurityCenter';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lang, setLang] = useState<Language>('uz');
  const [isZenMode, setIsZenMode] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [latency, setLatency] = useState(0);

  const t = translations[lang] as any;

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const interval = setInterval(() => {
      if (navigator.onLine) {
        const start = Date.now();
        fetch('https://www.google.com/favicon.ico', { mode: 'no-cors' })
          .then(() => setLatency(Date.now() - start))
          .catch(() => {});
      }
    }, 10000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  const handleModuleChange = (module: ModuleType) => {
    setActiveModule(module);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const renderModule = () => {
    switch (activeModule) {
      case ModuleType.DASHBOARD: return <Dashboard onNavigate={handleModuleChange} lang={lang} />;
      case ModuleType.UNIFIED_WORKSPACE: return <UnifiedWorkspace lang={lang} />;
      case ModuleType.INTERACTIVE_GAME: return <ResearchQuest lang={lang} />;
      case ModuleType.ACADEMIC_EVENTS: return <AcademicEventsHub lang={lang} />;
      case ModuleType.ANALYTICS: return <AnalyticsView lang={lang} />;
      case ModuleType.IMRAD_ANALYZER: return <IMRaDAnalyzer lang={lang} />;
      case ModuleType.GRAMMAR_MONITOR: return <GrammarMonitor lang={lang} />;
      case ModuleType.DOI_IDENTIFIER: return <DOIIdentifier lang={lang} />;
      case ModuleType.SCIENTIFIC_JUSTIFICATION: return <ScientificJustification lang={lang} />;
      case ModuleType.ARTICLE_GUIDE: return <ArticleGuide lang={lang} />;
      case ModuleType.SECURITY_CENTER: return <SecurityCenter lang={lang} />;
      case ModuleType.BACKEND_LOGIC: return <BackendView lang={lang} />;
      case ModuleType.CONTACT_CREATOR: return <ContactCreator lang={lang} />;
      case ModuleType.ANTI_PLAGIARISM: return <AntiPlagiarism lang={lang} />;
      case ModuleType.ACADEMIC_SEARCH: return <AcademicSearch lang={lang} />;
      case ModuleType.CONFERENCE_NEWS:
        return <AcademicEventsHub lang={lang} />;
      default: return <Dashboard onNavigate={handleModuleChange} lang={lang} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-900">
      {!isZenMode && (
        <Sidebar 
          activeModule={activeModule} 
          onModuleChange={handleModuleChange} 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          lang={lang} 
        />
      )}
      
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar relative">
        {!isZenMode && (
          <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-3 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </button>
              <div className="flex items-center gap-4 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">
                <div className="flex items-center gap-2 pr-4 border-r border-slate-300">
                   <div className={`h-2 w-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
                   <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{isOnline ? 'Online' : 'Offline'}</span>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Latency: {latency}ms</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex bg-slate-100 p-1 rounded-xl">
                {(['uz', 'ru', 'en'] as Language[]).map((l) => (
                  <button key={l} onClick={() => setLang(l)} className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${lang === l ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                    {l}
                  </button>
                ))}
              </div>
              <div className="h-9 w-9 bg-slate-900 rounded-full flex items-center justify-center text-white ring-4 ring-slate-100 shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
              </div>
            </div>
          </header>
        )}

        <div className="p-8 max-w-7xl mx-auto">
          {renderModule()}
        </div>
      </main>
    </div>
  );
};

export default App;
