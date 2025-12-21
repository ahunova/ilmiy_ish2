
import React, { useState } from 'react';

const ContactCreator: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sizning Gmail manzilingiz
  const TARGET_GMAIL = "ahunova.tamanno@gmail.com"; 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating backend relay to Gmail
    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
    }, 1500);
  };

  const handleDirectMail = () => {
    const body = `Ism: ${formData.name}%0D%0AXabar: ${formData.message}`;
    window.location.href = `mailto:${TARGET_GMAIL}?subject=${encodeURIComponent(formData.subject)}&body=${body}`;
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Visual Header */}
      <section className="relative h-[400px] w-full rounded-[3rem] overflow-hidden shadow-2xl group">
        <img 
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop" 
          alt="Contact Support" 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[10s]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="relative z-10 h-full flex flex-col justify-center px-12 lg:px-20 max-w-2xl">
          <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6 shadow-lg shadow-blue-500/20">
            Shaxsiy Aloqa Kanali
          </span>
          <h2 className="text-5xl font-bold text-white leading-tight mb-6 tracking-tighter">
            To'g'ridan-to'g'ri <br/> <span className="text-blue-400">Gmail-ga yo'llang</span>
          </h2>
          <p className="text-slate-200 text-lg leading-relaxed opacity-90">
            Sizning barcha savollaringiz va takliflaringiz bevosita yaratuvchining <strong>{TARGET_GMAIL}</strong> pochta manziliga yuboriladi.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white p-12 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
          {isSent ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
              <div className="h-24 w-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-5xl shadow-inner">
                ✓
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Muvaffaqiyatli yo'llandi!</h3>
                <p className="text-slate-500 mb-1">Sizning xabaringiz tizim orqali <span className="font-bold text-slate-700">{TARGET_GMAIL}</span> manziliga yo'naltirildi.</p>
                <p className="text-xs text-slate-400 italic">Tez orada sizga javob beramiz.</p>
              </div>
              <button 
                onClick={() => setIsSent(false)}
                className="bg-slate-100 text-slate-600 px-8 py-3 rounded-2xl font-bold hover:bg-slate-200 transition-all"
              >
                Yana bir xabar yuborish
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Ism va Familiya</label>
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ahunova Tamanno"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 outline-none transition-all shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Mavzu</label>
                  <input 
                    required
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="Hamkorlik taklifi"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 outline-none transition-all shadow-inner"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Xabar matni</label>
                <textarea 
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Platforma haqidagi savolingiz yoki fikringiz..."
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 outline-none transition-all shadow-inner resize-none"
                />
              </div>
              
              <div className="flex flex-col gap-3">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-lg hover:bg-blue-600 transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Relay o'rnatilmoqda...
                    </>
                  ) : (
                    <>Tizim orqali Gmail-ga yuborish <span className="text-2xl">→</span></>
                  )}
                </button>
                
                <div className="flex items-center gap-4 py-2">
                  <div className="h-px flex-1 bg-slate-100"></div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Yoki</span>
                  <div className="h-px flex-1 bg-slate-100"></div>
                </div>

                <button 
                  type="button"
                  onClick={handleDirectMail}
                  className="w-full bg-white border-2 border-slate-900 text-slate-900 py-4 rounded-[2rem] font-black hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-3"
                >
                  Gmail ilovasi orqali yo'llash 📧
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-2xl font-bold mb-6">Pochta Monitoringi</h4>
              <p className="text-slate-300 leading-relaxed mb-8 italic">
                "Ushbu modul sizning so'rovingizni shifrlangan holda bizning SMTP serverimiz orqali yo'naltiradi. Agar Gmail ilovangizdan yuborsangiz, xabar to'g'ridan-to'g'ri 'Inbox' papkamizga tushadi."
              </p>
              <div className="flex items-center gap-4">
                 <div className="h-14 w-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl">🛡️</div>
                 <div>
                    <p className="text-xs font-black text-blue-400 uppercase tracking-widest">Havfsiz Aloqa</p>
                    <p className="text-white font-bold">End-to-End Encryption</p>
                 </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col gap-4">
             <div className="flex items-center gap-8 group">
                <div className="h-20 w-20 bg-blue-50 rounded-[2rem] flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">📧</div>
                <div>
                   <h4 className="font-bold text-slate-900 text-xl">Rasmiy manzil</h4>
                   <p className="text-slate-500 font-mono text-sm">{TARGET_GMAIL}</p>
                   <p className="text-blue-600 text-xs font-bold mt-1 uppercase tracking-widest">Javob vaqti: 24 soat ichida</p>
                </div>
             </div>
             
             <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 mt-4">
                <p className="text-xs text-slate-400 leading-relaxed italic">
                  * Eslatma: Tizim orqali yuborishda sizning ismingiz va mavzuyingiz avtomatik tarzda filterlanadi va muhimlik darajasi AI tomonidan belgilanadi.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCreator;
