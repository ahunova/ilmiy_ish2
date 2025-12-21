
import React from 'react';
import { ModuleType, Language, User } from '../types';
import { translations } from '../translations';

interface SidebarProps {
  activeModule: ModuleType;
  onModuleChange: (module: ModuleType) => void;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  user: User | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleChange, isOpen, onClose, lang, user, onLogout }) => {
  const t = translations[lang];

  const allNavItems = [
    { type: ModuleType.DASHBOARD, label: t.dashboard, role: ['user', 'admin'], icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
    )},
    { type: ModuleType.IMRAD_ANALYZER, label: t.imradAnalyzer, role: ['user'], icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
    )},
    { type: ModuleType.ANTI_PLAGIARISM, label: t.antiPlagiarism, role: ['user'], icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
    )},
    { type: ModuleType.GRAMMAR_MONITOR, label: t.grammarMonitor, role: ['user'], icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
    )},
    { type: ModuleType.RESOURCE_MANAGEMENT, label: t.resourceManagement, role: ['admin'], icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
    )},
    { type: ModuleType.ANALYTICS, label: "Tizim Analitikasi", role: ['admin'], icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002 2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
    )},
  ];

  const filteredItems = allNavItems.filter(item => user && item.role.includes(user.role));

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden" onClick={onClose}></div>
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 w-72 bg-white border-r border-slate-200 flex flex-col z-50 transition-transform duration-300 transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full shadow-sm'}`}>
        <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-xl">
                IV
              </div>
              <div className="flex flex-col">
                <span className="font-black text-slate-900 leading-none text-xl tracking-tighter">PhD <span className="text-blue-600">InnoVision</span></span>
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mt-1">v4.0 Pro</span>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            <p className="px-3 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">
              {user?.role === 'admin' ? 'Tizim Boshqaruvi' : 'Xizmatlar Maydoni'}
            </p>
            {filteredItems.map((item) => (
              <button
                key={item.type}
                onClick={() => onModuleChange(item.type)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                  activeModule === item.type
                    ? 'bg-slate-900 text-white font-bold shadow-xl shadow-slate-900/20 translate-x-1'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className={`${activeModule === item.type ? 'text-blue-400' : 'text-slate-400'}`}>
                  {item.icon}
                </span>
                <span className="text-sm tracking-tight">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8 pt-0">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-500 font-bold hover:bg-red-50 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            {t.logout}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
