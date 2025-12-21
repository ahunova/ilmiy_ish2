
import React, { useState } from 'react';
import { monitorGrammar } from '../geminiService';
import { GrammarFix, Language } from '../types';

interface Props {
  lang: Language;
}

// Fix: Added lang prop to GrammarMonitor component to handle academic style monitoring
const GrammarMonitor: React.FC<Props> = ({ lang }) => {
  const [text, setText] = useState('');
  const [fixes, setFixes] = useState<GrammarFix[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!text) return;
    setLoading(true);
    try {
      // Fix: Passed lang argument to monitorGrammar (fixes Expected 2 arguments error)
      const res = await monitorGrammar(text, lang);
      setFixes(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityLabel = (sev: string) => {
    switch(sev) {
      case 'high': return 'Yuqori';
      case 'medium': return 'O‘rta';
      case 'low': return 'Past';
      default: return sev;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Akademik Grammatik Monitoring</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tahrir talab qiladigan akademik matnni bu yerga kiriting..."
          className="w-full h-64 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none font-serif text-lg leading-relaxed"
        />
        <button
          onClick={handleCheck}
          disabled={loading || !text}
          className="mt-4 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 disabled:bg-slate-300 transition-all shadow-lg shadow-green-600/20"
        >
          {loading ? 'Tekshirilmoqda...' : 'Xatolarni aniqlash'}
        </button>
      </div>

      {fixes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800">Aniqlangan tahrirlar ({fixes.length})</h3>
          {fixes.map((fix, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`h-2 w-2 rounded-full ${fix.severity === 'high' ? 'bg-red-500' : fix.severity === 'medium' ? 'bg-amber-500' : 'bg-blue-500'}`}></span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{getSeverityLabel(fix.severity)} xavf darajasi</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                    <p className="text-xs font-bold text-red-600 mb-1 uppercase">Original</p>
                    <p className="text-slate-800 italic">"{fix.original}"</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                    <p className="text-xs font-bold text-green-600 mb-1 uppercase">Taklif</p>
                    <p className="text-slate-900 font-medium">"{fix.suggestion}"</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-500 mb-1 uppercase">Sabab/Tavsiya</p>
                <p className="text-sm text-slate-700 leading-relaxed">{fix.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GrammarMonitor;
