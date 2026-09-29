import React, { useState, useEffect } from 'react';
import { WifiOff, ShieldCheck, PhoneCall } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OfflineBanner = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const { setIsSOSOpen } = useApp();

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="bg-gradient-to-r from-red-950 via-amber-950 to-slate-950 border-b border-red-500/40 px-4 py-2 text-xs text-amber-200 flex items-center justify-between z-50 sticky top-16 shadow-lg animate-in slide-in-from-top-2">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 text-red-400 animate-pulse" />
        <span className="font-bold text-slate-100">0-Internet Protest Zone Detected:</span>
        <span className="text-amber-300 hidden sm:inline">Offline Shield active • Emergency SOS numbers & Rights guides cached</span>
      </div>

      <button
        onClick={() => setIsSOSOpen(true)}
        className="bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-1 rounded-lg flex items-center gap-1 shadow-sm transition-colors text-[11px]"
      >
        <PhoneCall className="w-3 h-3" />
        <span>View Offline SOS</span>
      </button>
    </div>
  );
};
