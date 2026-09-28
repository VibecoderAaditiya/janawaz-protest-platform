import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  ShieldCheck, 
  User, 
  Mail, 
  Lock, 
  MapPin, 
  ArrowRight, 
  Sparkles,
  Eye,
  EyeOff,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CITIES } from '../../data/mockData';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
];

export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    loginUser, 
    signupUser, 
    continueAsGuest,
    showToast 
  } = useApp();

  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [city, setCity] = useState('delhi');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_PRESETS[0]);
  const [showPassword, setShowPassword] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    loginUser({ email, password });
    setIsAuthModalOpen(false);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    signupUser({
      name,
      handle: handle ? (handle.startsWith('@') ? handle : `@${handle}`) : `@${name.toLowerCase().replace(/\s+/g, '_')}`,
      email,
      password,
      city,
      avatar: selectedAvatar
    });
    setIsAuthModalOpen(false);
  };

  const handleQuickDemoLogin = (role) => {
    if (role === 'organizer') {
      loginUser({
        id: 'usr-organizer',
        name: 'Pooja Narain',
        handle: '@pooja_activist',
        avatar: AVATAR_PRESETS[0],
        role: 'Verified Organizer',
        city: 'delhi',
        verified: true
      });
    } else {
      loginUser({
        id: 'usr-citizen',
        name: 'Aman Joshi',
        handle: '@aman_citizen',
        avatar: AVATAR_PRESETS[1],
        role: 'Activist Citizen',
        city: 'mumbai',
        verified: false
      });
    }
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-600 via-rose-600 to-amber-600 p-6 text-white text-center relative shrink-0">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-md"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-2.5 shadow-lg">
            <Flame className="w-7 h-7 text-white animate-pulse" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">JanAwaz Community</h2>
          <p className="text-xs text-red-100 mt-1">Connect, organize & amplify civic action across India</p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950/60 p-1">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              mode === 'login' ? 'bg-slate-800 text-brand-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              mode === 'signup' ? 'bg-slate-800 text-brand-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          
          {/* Quick Demo Login Presets */}
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              ⚡ Quick Instant Demo Login
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('organizer')}
                className="bg-slate-900 hover:bg-brand-600 text-slate-200 hover:text-white p-2 rounded-xl border border-slate-700/80 transition-colors flex items-center justify-center gap-1.5 font-semibold"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Organizer Demo</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('citizen')}
                className="bg-slate-900 hover:bg-slate-800 text-slate-200 p-2 rounded-xl border border-slate-700/80 transition-colors flex items-center justify-center gap-1.5 font-semibold"
              >
                <UserCheck className="w-3.5 h-3.5 text-brand-400" />
                <span>Citizen Demo</span>
              </button>
            </div>
          </div>

          {/* Form */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="activist@janawaz.org"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-9 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-500 hover:to-rose-500 text-white font-extrabold py-3 rounded-xl shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>Sign In to JanAwaz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Select Profile Avatar</label>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {AVATAR_PRESETS.map((url, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setSelectedAvatar(url)}
                      className={`w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 transition-transform ${
                        selectedAvatar === url ? 'border-brand-500 scale-110' : 'border-slate-700 opacity-60'
                      }`}
                    >
                      <img src={url} alt="preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Meera Sen"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Handle</label>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="@meera_voice"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Home City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                >
                  {CITIES.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.state})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="meera@movement.org"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-extrabold py-2.5 rounded-xl shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>Create Movement Account</span>
              </button>
            </form>
          )}

          {/* Continue as Guest */}
          <div className="pt-2 text-center border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                continueAsGuest();
                setIsAuthModalOpen(false);
              }}
              className="text-xs text-slate-400 hover:text-white font-medium underline transition-colors"
            >
              Continue browsing as Guest (Read-only mode)
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
