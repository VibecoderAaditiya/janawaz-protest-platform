import React from 'react';
import { Compass, Radio, Users, ShieldAlert, User, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNav = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setIsCreatePostOpen, 
    setIsSOSOpen,
    setIsProfileOpen
  } = useApp();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 px-4 py-2">
      <div className="flex items-center justify-around">
        
        {/* Explore / Map */}
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center gap-1 ${
            activeTab === 'explore' ? 'text-brand-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-medium">Protests</span>
        </button>

        {/* Action Feed */}
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center gap-1 ${
            activeTab === 'feed' ? 'text-brand-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Radio className="w-5 h-5" />
          <span className="text-[10px] font-medium">Feed</span>
        </button>

        {/* Central Quick Create */}
        <button
          onClick={() => setIsCreatePostOpen(true)}
          className="w-11 h-11 -mt-5 rounded-full bg-gradient-to-tr from-brand-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/40 active:scale-95 transition-transform"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Channels */}
        <button
          onClick={() => setActiveTab('channels')}
          className={`flex flex-col items-center gap-1 ${
            activeTab === 'channels' ? 'text-brand-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-medium">Channels</span>
        </button>

        {/* SOS / Profile */}
        <button
          onClick={() => setIsSOSOpen(true)}
          className="flex flex-col items-center gap-1 text-red-400 hover:text-red-300"
        >
          <ShieldAlert className="w-5 h-5" />
          <span className="text-[10px] font-bold">SOS</span>
        </button>

      </div>
    </div>
  );
};
