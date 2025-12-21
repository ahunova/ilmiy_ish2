
import React, { useState } from 'react';

const ThesisChapter: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(`Oliy ta'lim tizimini transformatsiya qilish sharoitida talabalarning ilmiy-tadqiqot faoliyatini (ITF) tashkil etish an'anaviy yondashuvlardan raqamli ekotizimlarga o'tmoqda. Elektron axborot ta'lim muhiti — bu nafaqat resurslar majmuasi, balki talabaning kognitiv va kreativ qobiliyatlarini rivojlantirishga yo'naltirilgan intellektual maydondir.

Ushbu bobda biz ishlab chiqqan texnologiya talabani tadqiqotning boshlang'ich gipotezasidan to yakuniy ilmiy xulosagacha bo'lgan bosqichlarda "scaffolding" (qo'llab-quvvatlash) tamoyili asosida kuzatib boradi. EATMning funksional tuzilmasi o'z ichiga motivatsion, operatsion va refleksiv komponentlarni oladi. Bunda asosiy e'tibor talabaning mustaqil ravishda muammoni qo'yishi va uni raqamli vositalar yordamida yechish algoritmlarini o'zlashtirishiga qaratiladi.`);

  const defaultFormula = "TC(i) = \\sum_{j=1}^{n} (w_j \\cdot k_{ij}) + \\alpha \\cdot Log(I_{tech})";

  return (
    <div className="max-w-5xl mx-auto mb-20 space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      {/* Toolbar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div className="flex gap-2">
          <button 
            onClick={() => setIsEditing(false)}
            className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${!isEditing ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
          >
            Ko'rish rejimi
          </button>
          <button 
            onClick={() => setIsEditing(true)}
            className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${isEditing ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
          >
            Tahrirlash
          </button>
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Holat: <span className="text-emerald-500 font-bold">Avtomatik saqlanmoqda</span>
        </div>
      </div>

      {isEditing ? (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4 px-2">Matn tahrirlagichi</h3>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[600px] p-8 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 outline-none transition-all font-serif text-lg leading-loose text-slate-800 resize-none shadow-inner"
            placeholder="Ilmiy matningizni bu yerga kiriting..."
          />
        </div>
      ) : (
        <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-200 font-serif leading-loose text-slate-800 space-y-12 transition-all">
          <header className="text-center space-y-4 border-b pb-12">
            <h1 className="text-3xl font-bold uppercase tracking-widest text-slate-900 leading-tight">
              3-BOB. ELEKTRON AXBOROT TA'LIM MUHITIDA TALABALARNI ILMIY TADQIQOT FAOLIYATIGA TAYYORLASH TEXNOLOGIYASINI TAKOMILLASHTIRISH VA TADBIQ ETISH
            </h1>
            <div className="flex flex-col items-center gap-2">
              <p className="text-xl italic text-slate-500">DSc Dissertatsiyasi uchun amaliy-metodologik bob</p>
              <p className="text-lg font-bold text-slate-700 bg-slate-100 px-4 py-1 rounded-full border border-slate-200">
                Muallif: Ahunova Tamanno
              </p>
            </div>
          </header>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-900 border-l-4 border-blue-600 pl-6">3.1. Tadqiqotning metodologik asosi va joriy matn</h2>
            <div className="text-justify text-lg indent-12 whitespace-pre-wrap">
              {content || "Matn kiritilmagan. Iltimos, tahrirlash bo'limiga o'ting."}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-900 border-l-4 border-blue-600 pl-6">3.2. Tadqiqotchilik kompetensiyasini baholash algoritmi</h2>
            <p className="text-justify text-lg indent-12">
              Talabalarni ITFga tayyorlash jarayoni ko'p bosqichli matematik model asosida quriladi. Tadqiqotchilik kompetensiyasini (TC) baholash uchun quyidagi integrallashgan ko'rsatkich qo'llaniladi:
            </p>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center font-mono text-xl text-slate-900 shadow-inner">
              {`TC(i) = \\sum_{j=1}^{n} (w_j \\cdot k_{ij}) + \\alpha \\cdot Log(I_{tech})`}
            </div>
            <p className="text-sm text-slate-500 italic text-center">
              {"Bu yerda: w_j - kompetensiya vazni, k_{ij} - o'zlashtirish koeffitsienti, I_{tech} - raqamli savodxonlik indeksi."}
            </p>
          </section>

          <footer className="text-center pt-12 border-t text-slate-400 text-sm">
            <p className="font-bold text-slate-600 mb-2">Tuzuvchi: Ahunova Tamanno</p>
            <p>Ushbu ilmiy-metodologik matn "AcademiaAI" ekotizimi uchun maxsus shakllantirildi.</p>
            <p className="mt-2 text-[10px] uppercase tracking-tighter">Sana: {new Date().toLocaleDateString('uz-UZ')}</p>
          </footer>
        </div>
      )}
    </div>
  );
};

export default ThesisChapter;
