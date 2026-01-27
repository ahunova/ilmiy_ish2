
import React, { useState } from 'react';
import { identifyDOI } from '../geminiService';
import { DOIMetadata, Language } from '../types';

interface Props {
  lang: Language;
}

const DOIIdentifier: React.FC<Props> = ({ lang }) => {
  const [query, setQuery] = useState('');
  const [metadata, setMetadata] = useState<DOIMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await identifyDOI(query);
      setMetadata(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const generateBibTeX = () => {
    if (!metadata) return "";
    const citeKey = (metadata.authors[0]?.split(' ').pop()?.toLowerCase() || 'unknown') + metadata.year;
    return `@article{${citeKey},
  author = {${metadata.authors.join(' and ')}},
  title = {${metadata.title}},
  journal = {${metadata.journal}},
  year = {${metadata.year}},
  doi = {${metadata.doi}}
}`;
  };

  const copyToClipboard = () => {
    const bibtex = generateBibTeX();
    navigator.clipboard.writeText(bibtex);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-6">
           <div className="h-14 w-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
           </div>
           <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">DOI Identifikatsiyasi</h2>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Raqamli Adabiyotlar Agregatori</p>
           </div>
        </div>
        
        <p className="text-slate-500 mb-8 leading-relaxed italic">DOI raqamini yoki bibliografik tavsifni kiriting. Tizim avtomatik ravishda CrossRef metadata va BibTeX formatini yaratadi.</p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Masalan: Smith et al., 2024 yoki 10.1038/s41586..."
            className="flex-1 px-8 py-5 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-inner font-serif text-lg italic bg-slate-50"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !query}
            className="px-10 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-blue-600 disabled:bg-slate-200 transition-all shadow-xl flex items-center justify-center gap-3"
          >
            {loading ? <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : "Identifikatsiya"}
          </button>
        </div>
      </div>

      {metadata && (
        <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100 animate-in slide-in-from-bottom-8 duration-500 relative overflow-hidden">
          <div className="flex justify-between items-start mb-10 pb-8 border-b border-slate-50 relative z-10">
            <div className="space-y-3">
               <span className={`px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${metadata.status === 'valid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                {metadata.status === 'valid' ? 'VERIFIED SCIENTIFIC SOURCE' : 'UNKNOWN SOURCE'}
               </span>
               <h3 className="text-3xl font-bold text-slate-900 leading-tight serif italic">{metadata.title}</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 relative z-10">
            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Mualliflar Jamoasi</p>
                <div className="flex flex-wrap gap-3">
                  {metadata.authors.map((a, i) => (
                    <span key={i} className="bg-slate-50 text-slate-800 px-5 py-2 rounded-2xl text-xs font-bold border border-slate-100 italic shadow-sm hover:bg-white transition-colors cursor-default">{a}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Nashriyot Ma'lumotlari</p>
                <p className="text-xl font-bold text-slate-800 serif leading-relaxed">{metadata.journal}</p>
                <p className="text-slate-500 text-sm font-medium mt-1">{metadata.year}-yil nashri • Akademik Verifikatsiya</p>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
               <div className="flex justify-between items-center mb-6">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">BibTeX Citation</p>
                  <button 
                    onClick={copyToClipboard}
                    className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${copySuccess ? 'bg-emerald-500 text-white' : 'bg-white text-slate-900 hover:bg-blue-600 hover:text-white shadow-xl'}`}
                  >
                    {copySuccess ? "Nusxalandi! ✓" : "Nusxalash 📋"}
                  </button>
               </div>
               <pre className="text-[11px] font-mono text-blue-100/80 overflow-x-auto leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10 shadow-inner">
                 {generateBibTeX()}
               </pre>
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover:opacity-100 opacity-50"></div>
            </div>
          </div>

          <div className="bg-slate-50 p-10 rounded-[3.5rem] flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-100">
            <div className="flex items-center gap-6">
               <div className="h-16 w-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-sm shadow-xl shadow-blue-500/20">DOI</div>
               <div className="truncate">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Persistent Identifier</p>
                  <p className="text-blue-600 font-mono text-lg truncate max-w-sm font-bold">{metadata.doi}</p>
               </div>
            </div>
            <a 
              href={`https://doi.org/${metadata.doi}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto bg-slate-900 text-white px-10 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl text-center"
            >
              Manbaga O'tish ↗
            </a>
          </div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
        </div>
      )}
    </div>
  );
};

export default DOIIdentifier;
