
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface Props { lang: Language; }

const ResearchQuest: React.FC<Props> = ({ lang }) => {
  const t = translations[lang] as any;
  const [gameState, setGameState] = useState<'intro' | 'theory' | 'challenge' | 'finish' | 'gameover'>('intro');
  const [level, setLevel] = useState(1);
  const [stats, setStats] = useState({ 
    score: 0, 
    reputation: 50, 
    logic: 50, 
    resources: 100 
  });
  const [showFeedback, setShowFeedback] = useState<{ type: 'correct' | 'wrong', msg: string } | null>(null);

  const levels = [
    {
      id: 1,
      title: t.quest1Title,
      icon: "🔍",
      theory: "PhD darajasidagi tadqiqotning eng birinchi bosqichi - mavjud adabiyotlardagi 'bo'shliqni' (Research Gap) topishdir. Bu sizning ishingizning yangiligini isbotlaydi.",
      question: "Scopus bazasida 1000 ta maqola topildi. Tadqiqot obyekti bir xil, lekin hech biri 'AI-native feedback' metodini qo'llamagan. Bu qanday turdagi bo'shliq?",
      options: [
        { id: 'a', text: "Metodologik bo'shliq (Methodological Gap)", correct: true, impact: { rep: 10, logic: 15 } },
        { id: 'b', text: "Nazariy qarama-qarshilik (Conflict Gap)", correct: false, impact: { rep: -5, res: -10 } }
      ]
    },
    {
      id: 2,
      title: t.quest2Title,
      icon: "⚔️",
      theory: "Sizning maqolangiz 'Reviewer #2' ga tushdi. U sizning 'Results' bo'limingizni mantiqsiz va o'ta subyektiv deb hisoblaydi.",
      question: "Tanqidga qanday javob qaytarish akademik jihatdan eng to'g'ri strategiya?",
      options: [
        { id: 'a', text: "Taqrizchi fikriga qo'shilmasdan, tahririyatga norozilik xati yozish.", correct: false, impact: { rep: -20, res: -20 } },
        { id: 'b', text: "Natijalarni qo'shimcha mantiqiy-statistik dalillar (P-value, Chi-square) bilan mustahkamlab, tushuntirish xati yozish.", correct: true, impact: { rep: 20, logic: 20 } }
      ]
    },
    {
      id: 3,
      title: t.quest3Title,
      icon: "🌀",
      theory: "IMRaD strukturasida 'Discussion' bo'limi eng murakkab qism. Bu yerda siz o'z natijalaringizni dunyo olimlari natijalari bilan solishtirishingiz kerak.",
      question: "Discussion bo'limida olingan natijalar boshqa mualliflar natijalari bilan mos kelmadi. Nima qilish kerak?",
      options: [
        { id: 'a', text: "Faqat mos keladigan qismlarni qoldirib, qolganini o'chirish.", correct: false, impact: { logic: -30, rep: -15 } },
        { id: 'b', text: "Farqning metodologik yoki obyektiv sabablarini tahlil qilib, ilmiy munozara shaklida yozish.", correct: true, impact: { logic: 25, rep: 15 } }
      ]
    },
    {
      id: 4,
      title: t.quest4Title,
      icon: "💰",
      theory: "Grant ajratuvchi fond sizdan tadqiqotning 'Commercialization' (tijoratlashtirish) salohiyatini ko'rsatishni talab qildi.",
      question: "Fundamental PhD tadqiqotida tijoratlashtirishni qanday ko'rsatish eng ishonarli?",
      options: [
        { id: 'a', text: "Kelgusida kutilayotgan ijtimoiy-iqtisodiy samara va patentlanadigan algoritmlarni bayon qilish.", correct: true, impact: { res: 50, rep: 10 } },
        { id: 'b', text: "Bu fundamental ish, unda tijorat qism bo'lishi shart emas deb javob berish.", correct: false, impact: { res: -50, rep: -5 } }
      ]
    },
    {
      id: 5,
      title: t.quest5Title,
      icon: "🎓",
      theory: "Himoya kuni. Kengash a'zosi: 'Sizning ishingizda ilmiy yangilik (Scientific Novelty) ko'rinmayapti' dedi.",
      question: "Argumentativ hujumdan qanday himoyalanish kerak?",
      options: [
        { id: 'a', text: "Avvalgi darajadagi ishlarning metodologik tahliliga tayanib, yangi topilgan qonuniyatlarni ko'rsatish.", correct: true, impact: { rep: 50, logic: 30 } },
        { id: 'b', text: "Kengash a'zosi bilan shaxsiy konfliktga kirishish.", correct: false, impact: { rep: -100, logic: -50 } }
      ]
    }
  ];

  const currentLevelData = levels[level - 1];

  const handleAnswer = (opt: any) => {
    if (opt.correct) {
      const newStats = {
        score: stats.score + 100,
        reputation: Math.min(100, stats.reputation + opt.impact.rep),
        logic: Math.min(100, stats.logic + opt.impact.logic),
        resources: Math.min(150, stats.resources + (opt.impact.res || 0))
      };
      setStats(newStats);
      setShowFeedback({ type: 'correct', msg: "A'lo! Akademik reputatsiya va mantiq oshdi! ✅" });
      
      setTimeout(() => {
        if (level < levels.length) {
          setLevel(l => l + 1);
          setGameState('theory');
        } else {
          setGameState('finish');
        }
        setShowFeedback(null);
      }, 2000);
    } else {
      const newStats = {
        ...stats,
        reputation: Math.max(0, stats.reputation + opt.impact.rep),
        logic: Math.max(0, stats.logic + (opt.impact.logic || 0)),
        resources: Math.max(0, stats.resources + opt.impact.res)
      };
      setStats(newStats);
      setShowFeedback({ type: 'wrong', msg: "Xato! Resurslar va reputatsiya yo'qotildi... ❌" });
      
      if (newStats.reputation <= 0 || newStats.resources <= 0) {
        setTimeout(() => setGameState('gameover'), 1500);
      } else {
        setTimeout(() => setShowFeedback(null), 1500);
      }
    }
  };

  const getRank = () => {
    if (stats.score > 400) return "Academic Elite (DSc)";
    if (stats.score > 200) return "Senior Researcher (PhD)";
    return "Junior Scholar";
  };

  return (
    <div className="max-w-6xl mx-auto pb-24 animate-in fade-in duration-700">
      {/* RPG STATS PANEL */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: t.expPoints, value: stats.score, color: 'text-blue-500', icon: '✨' },
          { label: t.reputation, value: `${stats.reputation}%`, color: 'text-indigo-500', icon: '🏛️' },
          { label: t.logicPower, value: `${stats.logic}%`, color: 'text-purple-500', icon: '🧠' },
          { label: t.resourceLevel, value: stats.resources, color: 'text-emerald-500', icon: '💎' },
        ].map((s, i) => (
          <div key={i} className="bg-slate-900 p-6 rounded-[2rem] border border-white/5 shadow-2xl">
             <div className="flex justify-between items-center mb-2">
                <span className="text-xl">{s.icon}</span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</span>
             </div>
             <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
             <div className="h-1 w-full bg-white/5 rounded-full mt-3 overflow-hidden">
                <div className={`h-full ${s.color.replace('text', 'bg')} opacity-40`} style={{ width: typeof s.value === 'string' ? s.value : `${(s.value/500)*100}%` }}></div>
             </div>
          </div>
        ))}
      </div>

      {gameState === 'intro' && (
        <div className="bg-[#0F172A] p-16 rounded-[4rem] text-center space-y-10 shadow-3xl border border-white/10 relative overflow-hidden group">
           <div className="relative z-10 space-y-8">
              <div className="h-32 w-32 bg-blue-600 rounded-[3rem] flex items-center justify-center text-6xl mx-auto shadow-2xl shadow-blue-600/30 animate-bounce">🎓</div>
              <h3 className="text-4xl md:text-6xl font-black text-white serif italic">{t.gameTitle}</h3>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed italic border-l-4 border-blue-600 pl-8">
                {t.gameIntro}
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
                 <button 
                  onClick={() => setGameState('theory')}
                  className="px-16 py-6 bg-blue-600 text-white rounded-[2.5rem] font-black text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20 active:scale-95"
                 >
                   Start Simulation ➔
                 </button>
                 <div className="bg-white/5 px-8 py-6 rounded-[2rem] text-slate-500 text-xs font-bold flex items-center gap-3">
                    <span className="h-2 w-2 bg-blue-500 rounded-full animate-ping"></span>
                    Current Rank: {getRank()}
                 </div>
              </div>
           </div>
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent opacity-50"></div>
        </div>
      )}

      {(gameState === 'theory' || gameState === 'challenge') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in slide-in-from-bottom-10">
           {/* Quest Progress */}
           <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Quest Log</h4>
                 <div className="space-y-4">
                    {levels.map(l => (
                      <div key={l.id} className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${level === l.id ? 'bg-blue-600 text-white shadow-xl' : level > l.id ? 'bg-emerald-50 text-emerald-600 opacity-60' : 'bg-slate-50 opacity-40'}`}>
                         <div className="h-8 w-8 rounded-xl bg-white/20 flex items-center justify-center text-sm font-black">{l.id}</div>
                         <div className="text-left flex-1">
                            <p className="text-[11px] font-bold truncate">{l.title}</p>
                         </div>
                         {level > l.id && <span>✓</span>}
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl">
                 <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Current Buffs</h4>
                 <div className="space-y-3">
                    <div className="flex justify-between text-xs italic opacity-70">
                       <span>Scientific Ethics</span>
                       <span className="text-emerald-400">+10%</span>
                    </div>
                    <div className="flex justify-between text-xs italic opacity-70">
                       <span>Vision AI Insight</span>
                       <span className="text-blue-400">+15%</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Quest Content */}
           <div className="lg:col-span-2 space-y-8">
              {gameState === 'theory' ? (
                <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl space-y-8 animate-in fade-in">
                   <div className="flex items-center gap-6">
                      <div className="h-20 w-20 bg-blue-50 text-blue-600 rounded-[2.5rem] flex items-center justify-center text-4xl shadow-inner">{currentLevelData.icon}</div>
                      <div>
                         <h3 className="text-3xl font-bold serif text-slate-900">{currentLevelData.title}</h3>
                         <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Scientific Milestone {level}</p>
                      </div>
                   </div>
                   
                   <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 space-y-6">
                      <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{t.theoryBlock}</h4>
                      <p className="text-xl text-slate-700 font-serif italic leading-relaxed">{currentLevelData.theory}</p>
                   </div>

                   <button 
                    onClick={() => setGameState('challenge')}
                    className="w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-xl hover:bg-blue-600 transition-all shadow-2xl shadow-slate-900/10 active:scale-95"
                   >
                     Take Action ➔
                   </button>
                </div>
              ) : (
                <div className="space-y-10 animate-in zoom-in-95">
                   <div className="bg-indigo-950 p-12 rounded-[4rem] text-white text-center shadow-3xl space-y-6">
                      <span className="px-6 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300 border border-white/10">High-Stakes Decision</span>
                      <h3 className="text-2xl md:text-3xl font-bold serif leading-tight">{currentLevelData.question}</h3>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {currentLevelData.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleAnswer(opt)}
                          className="p-10 bg-white border-4 border-slate-100 rounded-[3.5rem] hover:border-blue-600 hover:shadow-2xl transition-all group text-left relative overflow-hidden"
                        >
                          <div className="flex items-center gap-6 relative z-10">
                            <span className="h-14 w-14 bg-slate-50 rounded-[1.5rem] flex items-center justify-center font-black group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors uppercase text-lg">{i === 0 ? 'A' : 'B'}</span>
                            <span className="text-lg font-bold text-slate-800 leading-tight flex-1">{opt.text}</span>
                          </div>
                          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-3xl -mr-12 -mt-12 group-hover:bg-blue-500/20 transition-all"></div>
                        </button>
                      ))}
                   </div>
                </div>
              )}
           </div>
        </div>
      )}

      {gameState === 'finish' && (
        <div className="bg-[#0F172A] p-24 rounded-[5rem] text-white text-center space-y-12 shadow-3xl border-8 border-blue-600 relative overflow-hidden">
           <div className="relative z-10">
             <div className="text-[150px] mb-10 animate-tada drop-shadow-2xl">🎓</div>
             <h3 className="text-5xl md:text-7xl font-black serif italic mb-8">{t.congrats}</h3>
             <div className="flex flex-col items-center gap-4 mb-14">
               <p className="text-[12px] font-black text-slate-500 uppercase tracking-[0.5em]">Final Academic Status</p>
               <p className="text-8xl font-black text-blue-500 tracking-tighter">{stats.score}</p>
               <div className="bg-white/5 px-10 py-4 rounded-[2rem] text-2xl font-bold text-emerald-400 italic mt-6 border border-white/10">
                  Rank: {getRank()}
               </div>
             </div>
             
             <div className="flex flex-col md:flex-row gap-6 justify-center">
                <button 
                  onClick={() => window.location.reload()}
                  className="px-16 py-6 bg-blue-600 text-white rounded-[2.5rem] font-black text-xl hover:bg-blue-700 transition-all shadow-2xl"
                >
                  Download Certificate 📜
                </button>
                <button 
                  onClick={() => { setLevel(1); setStats({score:0, reputation:50, logic:50, resources:100}); setGameState('intro'); }}
                  className="px-16 py-6 bg-white/10 text-white rounded-[2.5rem] font-black text-xl hover:bg-white/20 transition-all"
                >
                  Research New Area 🔄
                </button>
             </div>
           </div>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px] -mr-96 -mt-96"></div>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="bg-red-950 p-24 rounded-[5rem] text-white text-center space-y-12 shadow-3xl border-8 border-red-600 animate-in zoom-in">
           <div className="text-[120px] mb-10 opacity-60">🏚️</div>
           <h3 className="text-5xl font-black serif italic">Akademik Inqiroz...</h3>
           <p className="text-xl text-red-200 opacity-80 max-w-2xl mx-auto italic">
             Sizning tadqiqotingiz yetarli mantiqiy yoki resurs asoslariga ega bo'lmadi. Tadqiqot to'xtatildi.
           </p>
           <button 
              onClick={() => { setLevel(1); setStats({score:0, reputation:50, logic:50, resources:100}); setGameState('intro'); }}
              className="px-16 py-6 bg-white text-red-950 rounded-[2.5rem] font-black text-xl hover:bg-red-100 transition-all shadow-2xl"
            >
              Qaytadan urinib ko'rish 🔄
            </button>
        </div>
      )}

      {showFeedback && (
        <div className={`fixed bottom-12 left-1/2 -translate-x-1/2 px-16 py-8 rounded-[3rem] text-white font-black text-2xl shadow-3xl animate-in slide-in-from-bottom-12 z-[100] border-4 ${showFeedback.type === 'correct' ? 'bg-emerald-600 border-emerald-400' : 'bg-red-600 border-red-400'}`}>
           <div className="flex items-center gap-6">
              <span className="text-4xl">{showFeedback.type === 'correct' ? '🌟' : '⚠️'}</span>
              {showFeedback.msg}
           </div>
        </div>
      )}
    </div>
  );
};

export default ResearchQuest;
