import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  MapPin, 
  Search, 
  ShieldAlert, 
  PlusCircle, 
  Shield, 
  ShieldCheck, 
  Compass, 
  Radio, 
  Users,
  LogIn,
  Download,
  Smartphone
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CITIES } from '../data/mockData';

export const Navbar = () => {
  const { 
    selectedCity, 
    setSelectedCity, 
    searchQuery, 
    setSearchQuery, 
    activeTab, 
    setActiveTab, 
    currentUser, 
    isGuest,
    setIsAuthModalOpen,
    toggleAnonymousMode,
    setIsCreateProtestOpen,
    setIsSOSOpen,
    setIsProfileOpen,
    showToast
  } = useApp();

  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallApp = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        showToast('JanAwaz installed to your device home screen!', 'success');
      }
      setInstallPrompt(null);
    } else {
      showToast('To install JanAwaz: Tap Share on Safari/Chrome and click "Add to Home Screen"', 'info');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setActiveTab('explore')}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-rose-500 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
                <Flame className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-white font-display">
                    Jan<span className="text-brand-500">Awaz</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-rose-500/20 text-rose-300 border border-rose-500/30 px-1.5 py-0.5 rounded">
                    India
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 -mt-0.5 tracking-wide hidden sm:block">जनआवाज़ • Voice of People</p>
              </div>
            </button>
          </div>

          {/* City Selector & Search */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl mx-4">
            {/* City Dropdown */}
            <div className="relative shrink-0">
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-slate-200 hover:border-slate-600 transition-colors">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer pr-2 text-slate-200"
                >
                  {CITIES.map(city => (
                    <option key={city.id} value={city.id} className="bg-slate-900 text-slate-200">
                      {city.name} {city.id !== 'all' ? `(${city.state})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search protests, venues, #SaveAarey, Jantar Mantar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-brand-500 rounded-xl pl-10 pr-4 py-2 text-xs placeholder:text-slate-500 text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'explore' 
                  ? 'bg-slate-800 text-brand-400 font-semibold border border-slate-700' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              Protests & Map
            </button>

            <button
              onClick={() => setActiveTab('feed')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'feed' 
                  ? 'bg-slate-800 text-brand-400 font-semibold border border-slate-700' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Radio className="w-4 h-4" />
              Action Feed
            </button>

            <button
              onClick={() => setActiveTab('channels')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'channels' 
                  ? 'bg-slate-800 text-brand-400 font-semibold border border-slate-700' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              Communities
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Install App Button */}
            <button
              onClick={handleInstallApp}
              className="hidden sm:flex items-center gap-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold px-2.5 py-2 rounded-xl transition-all"
              title="Install JanAwaz App on Phone or PC"
            >
              <Smartphone className="w-3.5 h-3.5 text-brand-400" />
              <span>App</span>
            </button>

            {/* SOS Button */}
            <button
              onClick={() => setIsSOSOpen(true)}
              className="relative flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs px-3 py-2 rounded-xl shadow-lg shadow-red-600/30 active:scale-95 transition-all border border-red-400/30"
            >
              <ShieldAlert className="w-4 h-4 animate-bounce" />
              <span className="hidden sm:inline">SOS & Rights</span>
              <span className="flex h-2 w-2 relative -ml-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-200"></span>
              </span>
            </button>

            {/* Placard Studio Button */}
            <button
              onClick={() => setIsPlacardStudioOpen(true)}
              className="hidden lg:flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-amber-300 text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-sm"
              title="Movement Placard & Poster Studio"
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>Placard Studio</span>
            </button>

            {/* Create Movement Button */}
            <button
              onClick={() => setIsCreateProtestOpen(true)}
              className="hidden sm:flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-xs font-semibold px-3 py-2 rounded-xl transition-all"
            >
              <PlusCircle className="w-4 h-4 text-brand-400" />
              <span>Start Movement</span>
            </button>

            {/* Anonymous Mode Shield */}
            {!isGuest && (
              <button
                onClick={toggleAnonymousMode}
                className={`p-2 rounded-xl border text-xs font-medium transition-all ${
                  currentUser.isAnonymousMode 
                    ? 'bg-purple-950/80 border-purple-500/60 text-purple-300 shadow-lg shadow-purple-900/30' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
                title={currentUser.isAnonymousMode ? "Anonymous Shield Active" : "Enable Anonymous Shield Mode"}
              >
                {currentUser.isAnonymousMode ? (
                  <Shield className="w-4 h-4 text-purple-400 animate-pulse" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-slate-400" />
                )}
              </button>
            )}

            {/* Profile Avatar / Sign In */}
            {isGuest ? (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-3 py-2 rounded-xl shadow-md shadow-brand-600/30 transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            ) : (
              <button
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-2 p-1 rounded-full border border-slate-700 hover:border-brand-500 transition-colors bg-slate-900"
              >
                <img 
                  src={currentUser.isAnonymousMode ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80' : currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-7 h-7 rounded-full object-cover"
                />
              </button>
            )}
          </div>

        </div>

        {/* Mobile City & Search bar */}
        <div className="flex md:hidden items-center gap-2 pb-3 pt-1">
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-brand-400" />
            <select 
              value={selectedCity} 
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent text-xs font-medium focus:outline-none"
            >
              {CITIES.map(city => (
                <option key={city.id} value={city.id} className="bg-slate-900 text-slate-200">
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input 
              type="text"
              placeholder="Search protests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none"
            />
          </div>
        </div>

      </div>
    </header>
  );
};
