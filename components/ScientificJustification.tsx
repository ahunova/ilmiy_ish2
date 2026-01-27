
import React, { useState } from 'react';
import { Language } from '../types';

interface Props {
  lang: Language;
}

const ScientificJustification: React.FC<Props> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'justification' | 'architecture' | 'stack' | 'evaluation'>('justification');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-wrap gap-4 mb-2">
        <button 
          onClick={() => setActiveTab('justification')}
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'justification' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
        >
          Metodologik aksiomalar
        </button>
        <button 
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'architecture' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
        >
          Ontologik struktura
        </button>
      </div>

      {activeTab === 'justification' && (
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold mb-8 text-slate-800 serif border-b pb-4">PhD Darajasidagi Ilmiy Asosnoma</h2>
          
          <div className="space-y-10">
            <section>
              <h3 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2">
                <span className="h-2 w-2 bg-blue-700 rounded-full"></span>
                Tadqiqotning metodologik paradigmasi
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg text-justify">
                PhD (Doctor of Philosophy) tadqiqotining fundamental mazmuni — ilmiy bilimlarni epistemologik jihatdan kengaytirish va 
                murakkab tizimli muammolarga innovatsion-konseptual yechimlar taklif etishdan iborat. Ushbu intellektual platforma 
                tadqiqotchining kognitiv salohiyatini akademik standartlar darajasida optimallashtirish uchun ishlab chiqilgan. 
                Tizimning ontologik asosini akademik matnlarni xalqaro IMRaD (Introduction, Methods, Results, and Discussion) 
                standartlari asosida diskursiv tahlil qilish tashkil etadi.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2">
                 <span className="h-2 w-2 bg-blue-700 rounded-full"></span>
                 Kognitiv-analitik modullar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-slate-800">1. IMRaD Strukturaviy Dekonstruksiyasi</h4>
                  <p className="text-sm text-slate-600 mt-2">Dissertatsiya boblarining xalqaro Scopus va Web of Science bibliometrik talablariga muvofiqligini mantiqiy-semantik verifikatsiya qilish.</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-slate-800">2. Akademik Diskurs Monitoringi</h4>
                  <p className="text-sm text-slate-600 mt-2">Matndagi grammatik konstruksiyalarni ilmiy uslubning ob'ektivlik va neytrallik prinsiplari asosida optimallashtirish.</p>
                </div>
              </div>
            </section>

            <section className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
              <h3 className="text-xl font-bold text-emerald-800 mb-3">Milliy ilmiy ekotizim bilan integratsiya</h3>
              <p className="text-slate-800 text-justify">
                PhD darajasini himoya qilish jarayoni tadqiqotning moddiy-texnik va moliyaviy barqarorligiga bog'liq. Shu sababli, 
                platforma O'zbekiston Respublikasi Innovatsion rivojlanish agentligi va Yoshlar akademiyasining strategik grant 
                dasturlarini real-vaqt rejimida tahlil qiladi va ularni tadqiqotchining ilmiy yo'nalishi bilan semantik bog'laydi.
              </p>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScientificJustification;
