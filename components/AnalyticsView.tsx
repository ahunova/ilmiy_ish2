
import React from 'react';

const AnalyticsView: React.FC = () => {
  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header for Report */}
      <div className="flex justify-between items-end bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 serif">Akademik Analitika</h2>
          <p className="text-slate-500 mt-2">DSc tadqiqot holati va kognitiv tahlil natijalari (Haftalik hisobot)</p>
        </div>
        <button 
          onClick={handleExportPDF}
          className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all flex items-center gap-2 print:hidden"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          PDF Hisobotni Yuklash
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* IMRaD Completeness Chart */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="text-blue-600">●</span> IMRaD To'liqligi (SII Index)
          </h3>
          <div className="relative h-64 flex items-center justify-center">
            {/* SVG Radar/Spider Chart for IMRaD */}
            <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
              <circle cx="100" cy="100" r="80" className="fill-none stroke-slate-100" strokeWidth="1" />
              <circle cx="100" cy="100" r="60" className="fill-none stroke-slate-100" strokeWidth="1" />
              <circle cx="100" cy="100" r="40" className="fill-none stroke-slate-100" strokeWidth="1" />
              
              {/* Axis */}
              {[0, 90, 180, 270].map(angle => (
                <line 
                  key={angle}
                  x1="100" y1="100" 
                  x2={100 + 80 * Math.cos(angle * Math.PI / 180)} 
                  y2={100 + 80 * Math.sin(angle * Math.PI / 180)} 
                  className="stroke-slate-200" strokeWidth="1" 
                />
              ))}

              {/* Data Shape */}
              <polygon 
                points={`
                  ${100 + 75 * Math.cos(0 * Math.PI / 180)},${100 + 75 * Math.sin(0 * Math.PI / 180)} 
                  ${100 + 60 * Math.cos(90 * Math.PI / 180)},${100 + 60 * Math.sin(90 * Math.PI / 180)} 
                  ${100 + 70 * Math.cos(180 * Math.PI / 180)},${100 + 70 * Math.sin(180 * Math.PI / 180)} 
                  ${100 + 50 * Math.cos(270 * Math.PI / 180)},${100 + 50 * Math.sin(270 * Math.PI / 180)}
                `}
                className="fill-blue-600/20 stroke-blue-600"
                strokeWidth="3"
                strokeLinejoin="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              <div className="flex justify-center">Introduction</div>
              <div className="flex justify-between items-center px-4">
                <span>Discussion</span>
                <span>Methods</span>
              </div>
              <div className="flex justify-center">Results</div>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500 italic text-center">Tadqiqotning metodologik asosi 85% ishonchlilik bilan validatsiya qilingan.</p>
        </div>

        {/* Grammar Error Dynamics */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="text-emerald-600">●</span> Grammatik Xatolar Dinamikasi
          </h3>
          <div className="h-64 relative">
            <svg viewBox="0 0 400 200" className="w-full h-full">
              {/* Grid lines */}
              <line x1="0" y1="180" x2="400" y2="180" className="stroke-slate-100" strokeWidth="1" />
              <line x1="0" y1="140" x2="400" y2="140" className="stroke-slate-100" strokeWidth="1" />
              <line x1="0" y1="100" x2="400" y2="100" className="stroke-slate-100" strokeWidth="1" />
              <line x1="0" y1="60" x2="400" y2="60" className="stroke-slate-100" strokeWidth="1" />
              
              {/* Line Chart */}
              <path 
                d="M 0 160 Q 50 140 100 120 T 200 80 T 300 40 T 400 30" 
                fill="none" 
                stroke="url(#gradient-emerald)" 
                strokeWidth="4" 
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient-emerald" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
              {/* Points */}
              <circle cx="100" cy="120" r="5" className="fill-emerald-500" />
              <circle cx="200" cy="80" r="5" className="fill-emerald-500" />
              <circle cx="300" cy="40" r="5" className="fill-emerald-500" />
              <circle cx="400" cy="30" r="5" className="fill-emerald-500" />
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-slate-400 font-bold uppercase mt-2">
              <span>Hafta 1</span>
              <span>Hafta 2</span>
              <span>Hafta 3</span>
              <span>Hozir</span>
            </div>
          </div>
          <div className="mt-8 flex justify-around">
            <div className="text-center">
              <span className="block text-2xl font-bold text-emerald-600">-64%</span>
              <span className="text-[10px] text-slate-500 uppercase font-bold">Xatolik Kamayishi</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-slate-800">92%</span>
              <span className="text-[10px] text-slate-500 uppercase font-bold">Stilistik Aniqlik</span>
            </div>
          </div>
        </div>

        {/* DOI Identification Statistics */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="text-indigo-600">●</span> DOI Holati va Havolalar Validatsiyasi
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#f1f5f9" strokeWidth="4" />
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#4f46e5" strokeWidth="4" strokeDasharray="95, 100" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-800">95%</span>
                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Identifikatsiya</span>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">To'g'ri havolalar</span>
                <span className="font-bold text-indigo-600">142</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[95%]"></div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">DOI topilmaganlar</span>
                <span className="font-bold text-red-500">8</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full w-[5%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Grant Stream Activity */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="text-amber-500">●</span> Grantlar Oqimi (Global RSS Flux)
          </h3>
          <div className="h-40 flex items-end gap-2">
            {[40, 70, 45, 90, 65, 80, 55, 75, 95, 60, 85, 40].map((height, i) => (
              <div 
                key={i} 
                className="flex-1 bg-amber-100 hover:bg-amber-500 transition-colors rounded-t-lg relative group"
                style={{ height: `${height}%` }}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {height} yangi grant
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-[10px] text-slate-400 font-bold">
            <span>YAN</span>
            <span>FEV</span>
            <span>MAR</span>
            <span>APR</span>
            <span>MAY</span>
            <span>IYUN</span>
            <span>IYUL</span>
            <span>AVG</span>
            <span>SENT</span>
            <span>OKT</span>
            <span>NOY</span>
            <span>DEK</span>
          </div>
          <p className="mt-6 text-sm text-slate-600">O'tgan oyda tadqiqot yo'nalishingiz bo'yicha jami <span className="font-bold text-amber-600">342 ta</span> xalqaro tanlov va grantlar e'lon qilindi.</p>
        </div>
      </div>

      {/* Automatic Report Section (only visible in print or full detail) */}
      <div className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-6">
        <h4 className="text-2xl font-bold serif">Tizimning DSc Strategik Xulosasi</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div className="space-y-2">
            <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">Mantiqiy Izchillik</span>
            <p className="text-slate-400 leading-relaxed">
              Tadqiqot sarlavhasi va IMRaD "Results" qismi o'rtasidagi bog'liqlik 82% koeffitsient bilan tasdiqlandi. 
              Mavzu dolzarbligi yetarli darajada yoritilgan.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs">Uslubiy Takomillashuv</span>
            <p className="text-slate-400 leading-relaxed">
              Ilmiy terminlardan foydalanish chastotasi xalqaro Scopus/ScienceDirect talablariga 90% muvofiq keladi.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-amber-400 font-bold uppercase tracking-widest text-xs">Moliyaviy Imkoniyat</span>
            <p className="text-slate-400 leading-relaxed">
              Keyingi 3 oy ichida tadqiqotingiz uchun eng mos keluvchi 5 ta xalqaro va 2 ta davlat granti aniqlandi.
            </p>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          <span>Hisobot ID: AI-DSC-2024-001</span>
          <span>Sana: {new Date().toLocaleDateString('uz-UZ')}</span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full"></span>
            Tizim Validatsiyadan O'tgan
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
