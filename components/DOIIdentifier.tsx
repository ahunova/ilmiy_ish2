
import React, { useState } from 'react';
import { identifyDOI } from '../geminiService';
import { DOIMetadata, Language } from '../types';

interface Props {
  lang: Language;
}

// Fix: Added lang prop to DOIIdentifier component to match expected signature in App.tsx
const DOIIdentifier: React.FC<Props> = ({ lang }) => {
  const [query, setQuery] = useState('');
  const [metadata, setMetadata] = useState<DOIMetadata | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      // Fix: identifyDOI call (now available via geminiService fix)
      const res = await identifyDOI(query);
      setMetadata(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">DOI Identifikatsiyasi</h2>
        <p className="text-slate-500 mb-6">DOI raqamini yoki bibliografik tavsifni kiriting. Tizim avtomatik ravishda metadata va rasmiy DOI havolasini shakllantiradi.</p>
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Masalan: Smith et al., 2023, Journal of Applied Science yoki 10.1038/s41586-023-00000-x"
            className="flex-1 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !query}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:bg-slate-300 transition-all shadow-lg shadow-blue-600/20"
          >
            {loading ? 'Qidirilmoqda...' : 'Identifikatsiya'}
          </button>
        </div>
      </div>

      {metadata && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-slate-900 leading-tight flex-1 mr-4">{metadata.title}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${metadata.status === 'valid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {metadata.status === 'valid' ? 'Tasdiqlangan' : 'Noma’lum'}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Mualliflar</p>
              <div className="flex flex-wrap gap-2">
                {metadata.authors.map((a, i) => (
                  <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-medium">{a}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Jurnal va Yil</p>
              <p className="text-slate-800 font-semibold italic">{metadata.journal}</p>
              <p className="text-slate-500">{metadata.year}</p>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4 overflow-hidden">
               <div className="p-3 bg-blue-600 rounded-xl text-white font-black shrink-0">DOI</div>
               <div className="truncate">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-0.5">Identifikator</p>
                  <p className="text-blue-400 font-mono truncate">{metadata.doi}</p>
               </div>
            </div>
            <a 
              href={`https://doi.org/${metadata.doi}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-slate-900 px-6 py-2 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              Manbaga o'tish
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DOIIdentifier;
