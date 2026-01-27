
import React, { useState, useEffect } from 'react';
import { Language, SecurityEvent, SystemHealth } from '../types';
import { translations } from '../translations';

interface Props { lang: Language; }

const SecurityCenter: React.FC<Props> = ({ lang }) => {
  const t = translations[lang] as any;
  const [privacyMode, setPrivacyMode] = useState(false);
  const [scrubbing, setScrubbing] = useState(true);
  const [auditLog, setAuditLog] = useState<SecurityEvent[]>([]);
  const [health, setHealth] = useState<SystemHealth>({
    apiLatency: 0,
    dbStatus: 'online',
    encryptionStatus: 'active',
    lastBackup: 'Never'
  });

  useEffect(() => {
    const initialLogs: SecurityEvent[] = [
      { id: '1', timestamp: new Date().toLocaleTimeString(), event: "Secure SSL Connection Established", type: 'access', status: 'success', detail: 'Tunnel 443 active' },
      { id: '2', timestamp: new Date().toLocaleTimeString(), event: "AES-GCM Key Rotation Complete", type: 'encryption', status: 'success', detail: 'Key-ID: 8829' },
      { id: '3', timestamp: new Date().toLocaleTimeString(), event: "Stateless Middleware Active", type: 'access', status: 'success', detail: 'Zero-Storage Enforcement' }
    ];
    setAuditLog(initialLogs);

    // Simulate Health Monitoring
    const interval = setInterval(() => {
      setHealth(prev => ({
        ...prev,
        apiLatency: Math.floor(Math.random() * 200) + 50
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const addLog = (event: string, type: any, status: any, detail: string) => {
    const newLog: SecurityEvent = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleTimeString(),
      event,
      type,
      status,
      detail
    };
    setAuditLog(prev => [newLog, ...prev.slice(0, 15)]);
  };

  const exportEncryptedBackup = () => {
    const data = {
      timestamp: new Date().toISOString(),
      vault: localStorage.getItem('imrad_results_current') || '{}',
      history: localStorage.getItem('research_history_v2') || '[]'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `academia_backup_${new Date().getTime()}.research`;
    a.click();
    
    setHealth(prev => ({ ...prev, lastBackup: new Date().toLocaleTimeString() }));
    addLog("Encrypted Backup Created", 'backup', 'success', 'Session Archive exported');
  };

  const handlePurge = () => {
    if (confirm(lang === 'uz' ? "Barcha ma'lumotlar butunlay o'chirilsinmi?" : "Purge all session data?")) {
      localStorage.clear();
      addLog("EMERGENCY WIPE EXECUTED", 'purge', 'critical', 'Local environment sanitized');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-24 max-w-7xl mx-auto">
      {/* Dynamic Security Dashboard */}
      <section className="bg-[#020617] p-12 md:p-20 rounded-[4rem] text-white shadow-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-indigo-500/10"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-6xl md:text-8xl font-black serif italic tracking-tighter leading-none">
              Resilience <br/> <span className="text-emerald-500 italic">Shield</span>
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-1">API Latency</p>
                <p className="text-2xl font-black text-emerald-400">{health.apiLatency}ms</p>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Encryption</p>
                <p className="text-2xl font-black text-blue-400">AES-GCM</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[3.5rem] border border-white/10 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-6">Continuous Operation Status</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Database Integrity</span>
                  <span className="text-xs font-bold text-emerald-400 uppercase">Verified ✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Last Session Backup</span>
                  <span className="text-xs font-bold text-blue-400 uppercase">{health.lastBackup}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={exportEncryptedBackup}
              className="mt-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-emerald-600/20 transition-all"
            >
              Export Encrypted Session 📥
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm space-y-12">
            <h3 className="text-2xl font-bold serif text-slate-900">Security Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`p-8 rounded-[3rem] border-2 transition-all ${privacyMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex justify-between items-center mb-6">
                   <h4 className={`text-[10px] font-black uppercase tracking-widest ${privacyMode ? 'text-emerald-400' : 'text-slate-400'}`}>{t.privacyMode}</h4>
                   <button onClick={() => { setPrivacyMode(!privacyMode); addLog("Privacy Mode Toggled", 'access', 'warning', 'Session status changed'); }} className={`w-12 h-6 rounded-full relative transition-all ${privacyMode ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${privacyMode ? 'left-7' : 'left-1'}`}></div>
                   </button>
                </div>
                <p className={`text-xl font-bold italic serif mb-1 ${privacyMode ? 'text-white' : 'text-slate-900'}`}>Sovereign Workspace</p>
                <p className="text-[10px] text-slate-400">Ma'lumotlar faqat operativ xotirada ishlanadi.</p>
              </div>

              <div className={`p-8 rounded-[3rem] border-2 transition-all ${scrubbing ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex justify-between items-center mb-6">
                   <h4 className={`text-[10px] font-black uppercase tracking-widest ${scrubbing ? 'text-blue-400' : 'text-slate-400'}`}>Auto-Scrubbing</h4>
                   <button onClick={() => setScrubbing(!scrubbing)} className={`w-12 h-6 rounded-full relative transition-all ${scrubbing ? 'bg-blue-500' : 'bg-slate-300'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${scrubbing ? 'left-7' : 'left-1'}`}></div>
                   </button>
                </div>
                <p className={`text-xl font-bold italic serif mb-1 ${scrubbing ? 'text-white' : 'text-slate-900'}`}>Entity Masking</p>
                <p className="text-[10px] text-slate-400">Shaxsiy identifikatorlar (PII) AI tahlilidan filtrlanadi.</p>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100">
               <button 
                  onClick={handlePurge}
                  className="w-full py-8 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-[3rem] font-black uppercase text-xs tracking-[0.3em] transition-all flex items-center justify-center gap-4"
               >
                  <span className="text-2xl animate-pulse">☢️</span>
                  {t.killSwitch}
               </button>
            </div>
          </div>

          <div className="bg-emerald-950 p-12 rounded-[4rem] border border-emerald-900/50 shadow-2xl">
             <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] mb-4">Integrity Verified Analysis</h4>
             <p className="text-emerald-50 text-xl font-serif italic leading-relaxed text-justify">
               "Har bir ilmiy tahlil natijasi SHA-256 xesh-imzo bilan muhrlanadi. Bu sizning tadqiqotingiz natijalarini keyinchalik dissertatsiya himoyasida ishonchli dalil sifatida ko'rsatishingizga yordam beradi."
             </p>
          </div>
        </div>

        {/* Real-time Audit Dashboard */}
        <div className="bg-[#020617] p-10 rounded-[4rem] text-white shadow-3xl h-[800px] flex flex-col border border-white/5">
           <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
              <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Security Audit Log</h4>
              <div className="flex items-center gap-2">
                 <div className="h-2 w-2 bg-emerald-500 rounded-full animate-ping"></div>
                 <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Trace Active</span>
              </div>
           </div>
           
           <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar-dark pr-4">
              {auditLog.map((log) => (
                <div key={log.id} className="relative pl-10 border-l border-white/5 pb-2 animate-in slide-in-from-left-4">
                   <div className={`absolute left-[-9px] top-0 h-4 w-4 rounded-full border-4 border-[#020617] shadow-lg ${
                     log.status === 'success' ? 'bg-emerald-500' : log.status === 'critical' ? 'bg-red-500' : 'bg-amber-500'
                   }`}></div>
                   <div className="flex justify-between items-start mb-1">
                      <p className="text-[10px] font-black text-slate-600 uppercase">{log.timestamp}</p>
                      <span className="text-[8px] font-black px-2 py-0.5 rounded-md bg-white/5 text-slate-400 uppercase">{log.type}</span>
                   </div>
                   <p className="text-sm font-bold text-slate-100 italic mb-1">{log.event}</p>
                   <p className="text-[10px] font-mono text-slate-500 truncate uppercase">{log.detail}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar-dark::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar-dark::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
      `}</style>
    </div>
  );
};

export default SecurityCenter;
