import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login for now
    if (email === 'admin@ringbelt.co.ke' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Invalid credentials. Hint: admin@ringbelt.co.ke / admin123');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center bg-slate-50 dark:bg-brand-navy px-4 transition-colors duration-500">
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-[50rem] h-[50rem] bg-brand-gold/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[50rem] h-[50rem] bg-brand-blue/20 rounded-full translate-x-1/2 translate-y-1/2 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white dark:bg-brand-navy/90 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-white/10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-brand-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3">
              <Building2 className="text-brand-blue w-8 h-8 -rotate-3" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-brand-blue dark:text-white mb-3 tracking-tight">Admin Portal</h1>
            <p className="text-slate-600 dark:text-slate-400 font-light text-sm">Secure access for Ringbelt management</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 rounded-xl text-[10px] font-bold uppercase tracking-widest text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-brand-blue/80 dark:text-brand-gold uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-blue/40 dark:text-white/40 group-focus-within:text-brand-gold transition-colors" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all text-brand-blue dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  placeholder="admin@ringbelt.co.ke"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-brand-blue/80 dark:text-brand-gold uppercase tracking-[0.2em] ml-1">Secret Key</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-blue/40 dark:text-white/40 group-focus-within:text-brand-gold transition-colors" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all text-brand-blue dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-blue dark:bg-brand-gold text-white dark:text-brand-blue py-5 rounded-xl font-bold uppercase tracking-widest text-xs hover:scale-[1.02] hover:shadow-brand-blue/20 dark:hover:shadow-brand-gold/20 transition-all flex items-center justify-center gap-3 shadow-xl mt-4"
            >
              Authenticate <ArrowRight size={18} />
            </button>
          </form>
          
          <div className="mt-10 text-center">
            <p className="text-[9px] text-slate-500 dark:text-slate-500 uppercase tracking-[0.3em] font-bold">
              Protected by Ringbelt Security
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
