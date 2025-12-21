
import React, { useState } from 'react';
import { User, Role, Language } from '../types';
import { translations } from '../translations';

interface AuthProps {
  onAuth: (user: User) => void;
  lang: Language;
}

const AuthView: React.FC<AuthProps> = ({ onAuth, lang }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const t = translations[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulyatsiya qilingan autentifikatsiya
    const role: Role = email.includes('admin') ? 'admin' : 'user';
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: mode === 'login' ? (role === 'admin' ? 'Tizim Administratori' : 'Tadqiqotchi') : name,
      email,
      role
    };
    onAuth(newUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -ml-48 -mt-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-48 -mb-48"></div>

      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 relative z-10 border border-white/20">
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-xl mx-auto mb-4">
            IV
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{mode === 'login' ? t.login : t.register}</h2>
          <p className="text-sm text-slate-400 mt-1 uppercase tracking-widest font-black text-[10px]">PhD InnoVision v4.0</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.fullName}</label>
              <input 
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                placeholder="Ahunova Tamanno"
              />
            </div>
          )}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.email}</label>
            <input 
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              placeholder="admin@phd.uz yoki researcher@phd.uz"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.password}</label>
            <input 
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-3.5 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-black mt-4 hover:bg-blue-600 transition-all shadow-xl hover:-translate-y-1"
          >
            {mode === 'login' ? t.login : t.register}
          </button>
        </form>

        <div className="text-center mt-6">
          <button 
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            {mode === 'login' ? t.noAccount : t.hasAccount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
