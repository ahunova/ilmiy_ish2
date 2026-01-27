
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface Props { lang: Language; }

const ArticleGuide: React.FC<Props> = ({ lang }) => {
  const t = translations[lang] as any;
  const [activeTab, setActiveTab] = useState<'intro' | 'imrad' | 'journal' | 'oak'>('intro');

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-24 max-w-7xl mx-auto">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-12 md:p-20 rounded-[4rem] text-white shadow-3xl relative overflow-hidden border-b-4 border-blue-500">
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-4">
            <span className="bg-white/10 text-blue-300 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10 italic">PhD Professional Academy</span>
            <span className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold serif italic tracking-tight leading-tight">
            Ilmiy Maqola <br/> <span className="text-blue-400">Arxitekturasi</span>
          </h2>
          <p className="text-slate-300 text-lg md:text-xl opacity-80 max-w-3xl italic leading-relaxed border-l-4 border-blue-500 pl-8">
            Ushbu qo'llanma xalqaro Scopus (Q1-Q4) va O'zbekiston Respublikasi OAK talablari asosida ilmiy matnlarni shakllantirish bo'yicha professional yo'riqnomadir.
          </p>
        </div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
      </section>

      {/* Navigation Tabs */}
      <div className="flex justify-center md:justify-start">
        <div className="inline-flex gap-2 bg-white p-2 rounded-[2rem] border border-slate-100 shadow-xl overflow-x-auto max-w-full no-scrollbar">
          {[
            { id: 'intro', label: "Konseptual Asos" },
            { id: 'imrad', label: "IMRaD Standarti" },
            { id: 'journal', label: "Nashr Tanlash" },
            { id: 'oak', label: "OAK Talablari" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-8 py-3.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-slate-100 shadow-sm min-h-[500px]">
        {activeTab === 'intro' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <h3 className="text-4xl font-bold serif text-slate-900">Tadqiqotning Konseptual Mazmuni</h3>
                <p className="text-xl text-slate-600 leading-relaxed italic border-l-8 border-blue-600 pl-10">
                  {t.articleDefinition}
                </p>
                
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Maqolaning 4 fundamental ustuni:</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { t: "Ilmiy yangilik (Novelty)", d: "Siz o'zingizgacha bo'lmagan qanday qonuniyat yoki yechimni taklif qilyapsiz?" },
                      { t: "Nazariy dolzarblik", d: "Mavzu sohadagi fundamental muammolarni yoritishda qanchalik muhim?" },
                      { t: "Amaliy ahamiyat", d: "Tadqiqot natijalarini ishlab chiqarish yoki ijtimoiy hayotga tatbiq etish imkoniyati." },
                      { t: "Verifikatsiya", d: "Natijalarning ishonchliligi va boshqa olimlar tomonidan takrorlanishi imkoniyati." }
                    ].map((item, i) => (
                      <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-blue-50 transition-colors">
                        <p className="font-bold text-slate-900 serif italic mb-1">{item.t}</p>
                        <p className="text-sm text-slate-500 italic">{item.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                  <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6">Muvaffaqiyat formulasi</h4>
                  <p className="text-3xl font-bold serif italic mb-6 leading-tight">"Yaxshi maqola — bu yaxshi hikoya, lekin faqat raqamlar bilan aytilgan."</p>
                  <ul className="space-y-4 text-sm text-slate-400">
                    <li className="flex gap-3"><span className="text-blue-500">✓</span> Sarlavha (10-12 so'z)</li>
                    <li className="flex gap-3"><span className="text-blue-500">✓</span> Kalit so'zlar (5-7 ta)</li>
                    <li className="flex gap-3"><span className="text-blue-500">✓</span> Havolalar (kamida 20-30 ta)</li>
                  </ul>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
                </div>
                
                <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100">
                   <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">Muhim eslatma:</p>
                   <p className="text-sm text-amber-800 italic">Maqola yozishdan oldin 'Research Gap' (ilmiy bo'shliq)ni aniq belgilab oling. Agar bo'shliq bo'lmasa, maqolangiz nufuzli jurnallar tomonidan rad etiladi.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'imrad' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6">
            <h3 className="text-4xl font-bold serif text-slate-900 text-center mb-16 italic">IMRaD Strukturasining Anatomiyasi</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {[
                 { 
                   title: "Introduction (Kirish)", 
                   desc: "Ushbu bo'limda 'Nima uchun bu ishni qildim?' degan savolga javob beriladi. Mavzuning dolzarbligi, obyekti va predmeti, shuningdek, tadqiqot gipotezasi keltiriladi.",
                   check: ["Mavzuning dolzarbligi", "Adabiyotlar sharhi", "Tadqiqot maqsadi"]
                 },
                 { 
                   title: "Methods (Metodologiya)", 
                   desc: "Tadqiqot qanday amalga oshirilganligi tavsiflanadi. Ishlatilgan usullar, asbob-uskunalar, statistik paketlar (SPSS, Python) va tanlanma (Sample) ko'rsatiladi.",
                   check: ["Tadqiqot dizayni", "Validlik tekshiruvi", "Ma'lumotlar manbasi"]
                 },
                 { 
                   title: "Results (Natijalar)", 
                   desc: "Faqat faktlar. Shaxsiy fikrlarsiz, olingan empirik ma'lumotlar jadval, grafik va diagrammalar ko'rinishida taqdim etiladi.",
                   check: ["Vizualizatsiya", "Statistik ishonchlilik", "Muhim ko'rsatkichlar"]
                 },
                 { 
                   title: "Discussion (Munozara)", 
                   desc: "Eng ijodiy qism. Natijalar boshqa olimlarning ishlari bilan solishtiriladi, farqlar tahlil qilinadi va cheklovlar (Limitations) ko'rsatiladi.",
                   check: ["Qiyosiy tahlil", "Xulosalar", "Kelajakdagi tadqiqotlar"]
                 }
               ].map((item, i) => (
                 <div key={i} className="bg-slate-50 p-10 rounded-[3.5rem] border border-slate-100 hover:shadow-2xl transition-all group">
                    <h4 className="text-2xl font-bold text-slate-900 serif mb-4 italic text-blue-600">{item.title}</h4>
                    <p className="text-slate-600 text-base leading-relaxed mb-8 italic">{item.desc}</p>
                    <div className="space-y-2">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nazorat ro'yxati:</p>
                       <div className="flex flex-wrap gap-2">
                          {item.check.map((c, ci) => (
                            <span key={ci} className="bg-white px-4 py-1.5 rounded-xl text-[10px] font-bold text-slate-700 shadow-sm border border-slate-100">
                               {c}
                            </span>
                          ))}
                       </div>
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="bg-blue-600 p-12 rounded-[4rem] text-white text-center shadow-3xl">
               <h4 className="text-3xl font-bold serif italic mb-4">Annotatsiya (Abstract) siri:</h4>
               <p className="text-lg opacity-90 max-w-4xl mx-auto italic">
                 "Annotatsiya — bu butun maqolaning qisqartirilgan nusxasidir (200-250 so'z). Unda birinchi jumla muammo haqida bo'lsa, oxirgi jumla aniq bir yechim yoki natija haqida bo'lishi shart."
               </p>
            </div>
          </div>
        )}

        {activeTab === 'journal' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6">
            <h3 className="text-4xl font-bold serif text-slate-900 mb-10 italic">Xalqaro Ilmiy Nashrlarni Saralash</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { h: "Kvartil (Q1-Q4)", d: "Jurnallarning nufuzi 4 ta kvartilga bo'linadi. Q1 — dunyodagi eng top 25% jurnallar. PhD himoyasi uchun kamida Q3-Q4 tavsiya etiladi." },
                 { h: "Impact Factor (IF)", d: "Jurnaldagi maqolalarning o'rtacha iqtibos olish darajasi. Thomson Reuters (WoS) bazasi tomonidan hisoblanadi." },
                 { h: "H-Index", d: "Olim yoki jurnalning samaradorligini o'lchovchi indeks. Nashrlar soni va ularga olingan iqtiboslarning o'zaro nisbati." }
               ].map((item, i) => (
                 <div key={i} className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-xl transition-all space-y-6 border-t-8 border-t-blue-600">
                    <h5 className="text-2xl font-bold text-slate-900 serif italic">{item.h}</h5>
                    <p className="text-sm text-slate-500 leading-relaxed italic">{item.d}</p>
                 </div>
               ))}
            </div>
            
            <div className="bg-slate-900 p-12 rounded-[4rem] text-white flex flex-col md:flex-row items-center gap-10">
               <div className="h-20 w-20 bg-blue-600 rounded-3xl flex items-center justify-center text-4xl shrink-0 shadow-2xl">🔍</div>
               <div className="space-y-4">
                  <h4 className="text-2xl font-bold serif italic">Yirtqich jurnallar (Predatory Journals) ogohlantiruvi</h4>
                  <p className="text-slate-400 text-sm leading-relaxed italic">
                    Hech qachon 1-2 kunda maqolani nashr qilishni va'da qiladigan va tahrir jarayonisiz (Peer-review) pul talab qiladigan nashrlarga ishonmang. Maqolani yuborishdan oldin <span className="text-blue-400 font-bold">Beall's List</span> ro'yxatini tekshiring.
                  </p>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'oak' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6">
            <h3 className="text-4xl font-bold serif text-slate-900 mb-10 italic">O'zbekiston Respublikasi OAK Talablari</h3>
            <div className="space-y-6">
               {[
                 { m: "Shrift va Format:", r: "Odatda Times New Roman, 14-shrift, 1.5 interval. Chetki maydonlar (Fields) — 2 sm dan." },
                 { m: "Bibliografik Havolalar:", r: "OAK talablari bo'yicha havolalar kvadrat qavslarda [1] ko'rsatiladi va maqola oxirida alfavit yoki tartib bo'yicha joylanadi." },
                 { m: "Uch tildagi Annotatsiya:", r: "O'zbekistonda chop etiladigan jurnallar uchun maqola nomi va annotatsiyasi o'zbek, rus va ingliz tillarida bo'lishi majburiydir." },
                 { m: "Antiplagiat Me'yori:", r: "Maqolaning o'ziga xosligi (Originality) OAK talabiga binoan kamida 80-85% bo'lishi lozim." },
                 { m: "Retsenziya:", r: "Maqolaga o'z sohasining mutaxassisi (falsafa doktori yoki fan doktori) tomonidan yozilgan ijobiy taqriz ilova qilinishi shart." }
               ].map((item, i) => (
                 <div key={i} className="flex gap-8 items-center p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100 group hover:bg-white hover:shadow-xl transition-all">
                    <span className="h-12 w-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black shrink-0 shadow-lg shadow-blue-200">{i+1}</span>
                    <div>
                       <p className="text-lg font-bold text-slate-900 serif italic">{item.m}</p>
                       <p className="text-sm text-slate-600 italic">{item.r}</p>
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="p-12 bg-slate-900 rounded-[4rem] text-center">
               <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em] mb-6">Foydali Linklar:</p>
               <div className="flex flex-wrap justify-center gap-6">
                  <a href="https://oak.uz" target="_blank" className="text-white font-bold hover:text-blue-400 transition-colors">oak.uz</a>
                  <a href="https://scopus.com" target="_blank" className="text-white font-bold hover:text-blue-400 transition-colors">scopus.com</a>
                  <a href="https://scimagojr.com" target="_blank" className="text-white font-bold hover:text-blue-400 transition-colors">scimagojr.com</a>
               </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer Roadmap */}
      <section className="bg-slate-900 p-16 rounded-[4.5rem] text-white text-center space-y-10 shadow-3xl relative overflow-hidden">
         <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Ilmiy Manuscript Yo'li</h4>
         <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
            {/* Fix syntax error by using double quotes for strings containing single quotes */}
            {["G'oya", "Lirik sharh", "Yozish (Drafting)", "Tahrir (Editing)", "Nashr (Publishing)"].map((step, i) => (
              <div key={i} className="flex flex-col items-center group">
                 <div className="h-20 w-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center font-black text-2xl mb-6 group-hover:bg-blue-600 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-blue-600/30 transition-all duration-500">
                   {i+1}
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">{step}</p>
                 {i < 4 && <div className="hidden md:block absolute right-0 top-1/2 w-8 h-0.5 bg-white/10 -mr-4"></div>}
              </div>
            ))}
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
      </section>
    </div>
  );
};

export default ArticleGuide;
