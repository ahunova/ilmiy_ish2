
import React, { useState, useEffect } from 'react';
import { ModuleType, Language, User } from './types';
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
import AuthView from './components/AuthView';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lang, setLang] = useState<Language>('uz');

  const t = translations[lang];

  const handleAuth = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    setActiveModule(ModuleType.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveModule(ModuleType.DASHBOARD);
  };

  if (!user) {
    return <AuthView onAuth={handleAuth} lang={lang} />;
  }

  const renderModule = () => {
    switch (activeModule) {
      case ModuleType.DASHBOARD:
        return <Dashboard onNavigate={setActiveModule} lang={lang} user={user} />;
      case ModuleType.IMRAD_ANALYZER:
        return <IMRaDAnalyzer lang={lang} />;
      case ModuleType.GRAMMAR_MONITOR:
        return <GrammarMonitor lang={lang} />;
      case ModuleType.DOI_IDENTIFIER:
        return <DOIIdentifier lang={lang} />;
      case ModuleType.GRANT_HUB:
        return <GrantHub />;
      case ModuleType.ANTI_PLAGIARISM:
        return <AntiPlagiarism lang={lang} />;
      case ModuleType.ANALYTICS:
        return <AnalyticsView />;
      case ModuleType.RESOURCE_MANAGEMENT:
        return <BackendView />;
      case ModuleType.SCIENTIFIC_JUSTIFICATION:
        return <ScientificJustification />;
      case ModuleType.CONTACT_CREATOR:
        return <ContactCreator />;
      default:
        return <Dashboard onNavigate={setActiveModule} lang={lang} user={user} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <Sidebar 
        activeModule={activeModule} 
        onModuleChange={setActiveModule} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        lang={lang}
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar relative w-full">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-4 flex justify-between items-center print:hidden">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <h1 className="text-sm md:text-xl font-bold text-slate-900 uppercase tracking-tight">
              {user.role === 'admin' ? 'System Management' : 'Academic AI Suite'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex bg-slate-100 p-1 rounded-xl">
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

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900">{user.name}</p>
                <p className="text-[9px] text-blue-600 uppercase font-black tracking-widest">{user.role === 'admin' ? t.admin : t.phdCandidate}</p>
              </div>
              <div className="h-10 w-10 bg-slate-900 rounded-full flex items-center justify-center text-white ring-4 ring-slate-100">
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
    </div>
  );
};

export default App;
