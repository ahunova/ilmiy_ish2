
import React from 'react';
import { ModuleType, Language } from '../types';
import { translations } from '../translations';

const EDTECH_URL = 'https://ed-tech-clone-sigma.vercel.app';

interface SidebarProps {
  activeModule: ModuleType;
  onModuleChange: (module: ModuleType) => void;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const IconWrapper = ({ children, active }: React.PropsWithChildren<{ active: boolean }>) => (
  <span className={`w-6 h-6 flex items-center justify-center transition-colors ${active ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`}>
    {children}
  </span>
);

const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleChange, isOpen, onClose, lang }) => {
  const t = translations[lang] as any;

  const mainHubs = [
    { type: ModuleType.DASHBOARD, label: t.dashboard, icon: <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg> },
    { type: ModuleType.ACADEMIC_SEARCH, label: lang === 'uz' ? 'Manbalar Qidiruvi' : 'Academic Search', icon: <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg> },
    { type: ModuleType.UNIFIED_WORKSPACE, label: t.unifiedWorkspace, icon: <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM2.25 17.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v.75c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-.75z" /></svg> },
    { type: ModuleType.INTERACTIVE_GAME, label: t.interactiveGame, icon: <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38 4.876 4.876 0 01-3.907-1.927 4.876 4.876 0 01-1.108-4.423 5.866 5.866 0 015.85-5.971 4.876 4.876 0 013.908 1.927 4.876 4.876 0 011.107 4.423l-.01.031z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21.21 15.89A6 6 0 1115.48 4.74a4.874 4.874 0 00-1.923 3.91 4.874 4.874 0 004.42 1.106 5.87 5.87 0 013.233 6.134z" /></svg> },
    { type: ModuleType.CONFERENCE_NEWS, label: t.conferenceNews, icon: <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 105.304 0 3.75 3.75 0 00-5.304 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg> },
  ];

  const tools = [
    { type: ModuleType.IMRAD_ANALYZER, label: t.imradAnalyzer, icon: <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg> },
    { type: ModuleType.GRAMMAR_MONITOR, label: t.grammarMonitor, icon: <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg> },
    { type: ModuleType.ANTI_PLAGIARISM, label: t.antiPlagiarism, icon: <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6.119c-.035.505-.054 1.015-.054 1.531 0 5.223 3.328 9.67 7.977 11.26a11.95 11.95 0 007.977-11.26c0-.516-.019-1.026-.054-1.531A11.959 11.959 0 0112 2.714z" /></svg> },
    { type: ModuleType.DOI_IDENTIFIER, label: t.doiIdentifier, icon: <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg> },
    { type: ModuleType.ANALYTICS, label: t.analytics, icon: <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg> },
  ];

  const info = [
    { type: ModuleType.SCIENTIFIC_JUSTIFICATION, label: t.scientificJustification, icon: <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg> },
    { type: ModuleType.ARTICLE_GUIDE, label: t.articleGuide, icon: <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" /></svg> },
    { type: ModuleType.CONTACT_CREATOR, label: t.contactCreator, icon: <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg> },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden" onClick={onClose}></div>
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 w-72 bg-white border-r border-slate-200 flex flex-col z-50 transition-transform duration-300 transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full shadow-sm'}`}>
        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-xl flex items-center justify-center text-white text-xl font-black shadow-lg">IT</div>
              <div className="flex flex-col"><span className="font-black text-slate-900 leading-none text-lg tracking-tighter uppercase">Intellektual <span className="text-blue-600">Taxlil</span></span></div>
            </div>
            <button onClick={onClose} className="lg:hidden p-2 text-slate-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button>
          </div>

          <div className="space-y-6 flex-1">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 px-4">Asosiy Markazlar</p>
              <nav className="space-y-1">
                {mainHubs.map((item) => (
                  <button key={item.type} onClick={() => onModuleChange(item.type)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${activeModule === item.type ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                    <IconWrapper active={activeModule === item.type}>{item.icon}</IconWrapper>
                    <span className="text-xs font-bold tracking-tight">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 px-4">Akademik Vositalar</p>
              <nav className="space-y-1">
                {tools.map((item) => (
                  <button key={item.type} onClick={() => onModuleChange(item.type)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group ${activeModule === item.type ? 'bg-slate-900 text-white font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                    <IconWrapper active={false}>{item.icon}</IconWrapper>
                    <span className="text-xs font-semibold">{item.label}</span>
                  </button>
                ))}
                <button
                  onClick={() => window.open(EDTECH_URL, '_blank')}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                >
                  <IconWrapper active={false}>
                    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  </IconWrapper>
                  <span className="text-xs font-semibold">{t.grantHub}</span>
                  <svg className="w-3 h-3 ml-auto text-slate-300 group-hover:text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </button>
              </nav>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 px-4">Ma'lumotlar</p>
              <nav className="space-y-1">
                {info.map((item) => (
                  <button key={item.type} onClick={() => onModuleChange(item.type)} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group ${activeModule === item.type ? 'bg-slate-900 text-white font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                    <IconWrapper active={activeModule === item.type}>{item.icon}</IconWrapper>
                    <span className="text-xs font-semibold">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100">
             <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
                <div className="h-8 w-8 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center text-xs">☁️</div>
                <div className="flex-1">
                   <p className="text-[10px] font-black text-slate-900 uppercase">Cloud Sync Active</p>
                   <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Hybrid DB Mode</p>
                </div>
             </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
