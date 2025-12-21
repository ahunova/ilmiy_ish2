
import React, { useState } from 'react';
import { ModuleType, Language } from './types';
import { translations } from './translations';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import IMRaDAnalyzer from './components/IMRaDAnalyzer';
import GrammarMonitor from './components/GrammarMonitor';
import DOIIdentifier from './components/DOIIdentifier';
import GrantHub from './components/GrantHub';
import ScientificJustification from './components/ScientificJustification';
import BackendView from './components/BackendView';
import AnalyticsView from './components/AnalyticsView';
import ContactCreator from './components/ContactCreator';
import AntiPlagiarism from './components/AntiPlagiarism';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lang, setLang] = useState<Language>('uz');

  const t = translations[lang];

  const handleModuleChange = (module: ModuleType) => {
    setActiveModule(module);
    setIsSidebarOpen(false);
  };

  const renderModule = () => {
    switch (activeModule) {
      case ModuleType.DASHBOARD:
        return <Dashboard onNavigate={setActiveModule} lang={lang} />;
      case ModuleType.ANALYTICS:
        return <AnalyticsView lang={lang} />;
      case ModuleType.IMRAD_ANALYZER:
        return <IMRaDAnalyzer lang={lang} />;
      case ModuleType.GRAMMAR_MONITOR:
        return <GrammarMonitor lang={lang} />;
      case ModuleType.DOI_IDENTIFIER:
        return <DOIIdentifier lang={lang} />;
      case ModuleType.GRANT_HUB:
        return <GrantHub lang={lang} />;
      case ModuleType.SCIENTIFIC_JUSTIFICATION:
        return <ScientificJustification lang={lang} />;
      case ModuleType.BACKEND_LOGIC:
        return <BackendView lang={lang} />;
      case ModuleType.CONTACT_CREATOR:
        return <ContactCreator lang={lang} />;
      case ModuleType.ANTI_PLAGIARISM:
        return <AntiPlagiarism lang={lang} />;
      default:
        return <Dashboard onNavigate={setActiveModule} lang={lang} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <Sidebar 
        activeModule={activeModule} 
        onModuleChange={handleModuleChange} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        lang={lang}
      />
      
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar relative w-full">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-4 flex justify-between items-center print:hidden">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            
            <div className="hidden sm:block">
              <nav className="flex items-center text-xs text-slate-500 gap-2 mb-0.5">
                <span>PhD InnoVision</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-900 font-medium">Digital workspace</span>
              </nav>
              <h1 className="text-sm md:text-xl font-bold text-slate-900 flex items-center gap-2 uppercase tracking-tight">
                Academic AI Suite
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            {/* Language Selector */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              {(['uz', 'ru', 'en'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${lang === l ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Admin Profile */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900">{t.admin}</p>
                <p className="text-[9px] text-blue-600 uppercase font-black tracking-widest">{t.phdCandidate}</p>
              </div>
              <div className="h-10 w-10 bg-slate-900 rounded-full flex items-center justify-center text-white ring-4 ring-slate-100 shadow-lg group cursor-pointer hover:scale-105 transition-transform">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {renderModule()}
        </div>
      </main>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}</style>
    </div>
  );
};

export default App;
