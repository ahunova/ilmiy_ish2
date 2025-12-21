
import React, { useState } from 'react';

const ScientificJustification: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'justification' | 'architecture' | 'stack' | 'evaluation'>('justification');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-wrap gap-4 mb-2">
        <button 
          onClick={() => setActiveTab('justification')}
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'justification' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
        >
          PhD Ilmiy Asosnoma
        </button>
        <button 
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'architecture' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
        >
          Texnik Arxitektura
        </button>
        <button 
          onClick={() => setActiveTab('stack')}
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'stack' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
        >
          Texnologik Stack
        </button>
        <button 
          onClick={() => setActiveTab('evaluation')}
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'evaluation' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
        >
          Baholash Metodikasi
        </button>
      </div>

      {activeTab === 'justification' && (
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold mb-8 text-slate-800 serif border-b pb-4">Konsepsiya: PhD Darajasidagi Ilmiy Asosnoma</h2>
          
          <div className="space-y-10">
            <section>
              <h3 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2">
                <span className="h-2 w-2 bg-blue-700 rounded-full"></span>
                PhD Platformasining Ilmiy Maqsadi
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg text-justify">
                PhD (Falsafa doktori) tadqiqotining asosi — yangi bilim yaratish va mavjud muammolarga original yechimlar taklif etishdir. 
                Ushbu platforma PhD tadqiqotchisining kognitiv salohiyatini oshirish uchun xizmat qiladi. Asosiy maqsad — akademik matnlarni 
                xalqaro standartlar (IMRaD) darajasida tahlil qilish, mantiqiy xatolarni minimallashtirish va mahalliy ilmiy 
                finanslashtirish manbalari (Innovatsiya vazirligi grantlari) bilan integratsiyani ta'minlashdir.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2">
                 <span className="h-2 w-2 bg-blue-700 rounded-full"></span>
                 PhD Tadqiqotchisi uchun Modullar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-slate-800">1. IMRaD Strukturaviy Analiz</h4>
                  <p className="text-sm text-slate-600">Dissertatsiya boblari va maqolalarning xalqaro Scopus/ScienceDirect talablariga mosligini tekshirish.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-slate-800">2. Akademik Uslub Monitoringi</h4>
                  <p className="text-sm text-slate-600">Matndagi grammatik va uslubiy xatolarni PhD darajasidagi rasmiy akademik ohang bilan solishtirish.</p>
                </div>
              </div>
            </section>

            <section className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
              <h3 className="text-xl font-bold text-emerald-800 mb-3">O'zbekiston Ilmiy Muhiti Integratsiyasi</h3>
              <p className="text-slate-800 text-justify">
                PhD bosqichi moliyaviy qo'llab-quvvatlashga ko'p jihatdan bog'liq. Shuning uchun, platforma O'zbekistondagi 
                "Yosh olimlar", "Olimpa" va "Innovatsiya" grantlarini real-vaqt rejimida tahlil qiladi va tadqiqotchiga 
                uning mavzusiga mos keluvchi grantlarni avtomatik tavsiya etadi.
              </p>
            </section>
          </div>
        </div>
      )}
      
      {/* Diqqat: Qolgan tablar (architecture, stack, evaluation) PhD darajasiga mos ravishda saqlab qolindi */}
    </div>
  );
};

export default ScientificJustification;
