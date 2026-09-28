import React from 'react';
import { Plus, Radio, Flame, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StoriesBar = () => {
  const { 
    filteredStories, 
    currentUser, 
    setActiveStoryIndex, 
    setIsCreateStoryOpen,
    selectedCity 
  } = useApp();

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3.5 backdrop-blur-md mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Ground Stories • 24h Live Stream
          </h3>
        </div>
        <span className="text-[11px] text-slate-400">
          {filteredStories.length} updates active
        </span>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto pb-1 pt-1 no-scrollbar">
        
        {/* Add Your Story Bubble */}
        <button
          onClick={() => setIsCreateStoryOpen(true)}
          className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none"
        >
          <div className="relative w-16 h-16 rounded-full p-[2px] bg-slate-800 border-2 border-dashed border-slate-600 group-hover:border-brand-500 transition-colors">
            <img
              src={currentUser.isAnonymousMode ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80' : currentUser.avatar}
              alt="You"
              className="w-full h-full rounded-full object-cover group-hover:opacity-80 transition-opacity"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center border-2 border-slate-900 shadow-md group-hover:scale-110 transition-transform">
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-300 max-w-[70px] truncate">
            Post Story
          </span>
        </button>

        {/* Story Circles */}
        {filteredStories.map((story, index) => (
          <button
            key={story.id}
            onClick={() => setActiveStoryIndex(index)}
            className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none"
          >
            <div className={`relative w-16 h-16 rounded-full p-[2.5px] transition-transform group-hover:scale-105 ${
              story.isLive 
                ? 'bg-gradient-to-tr from-brand-600 via-amber-500 to-rose-400 animate-pulse-subtle shadow-md shadow-brand-500/20' 
                : 'bg-gradient-to-tr from-slate-600 to-slate-400'
            }`}>
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-slate-950 bg-slate-900">
                <img
                  src={story.mediaUrl}
                  alt={story.userName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {story.isLive && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-rose-600 text-[9px] font-extrabold text-white px-1.5 py-0.2 rounded-full border border-slate-900 uppercase tracking-wider flex items-center gap-0.5">
                  <Radio className="w-2.5 h-2.5 animate-pulse" />
                  LIVE
                </div>
              )}
            </div>

            <div className="text-center max-w-[72px]">
              <p className="text-[11px] font-medium text-slate-200 truncate group-hover:text-brand-400 transition-colors">
                {story.userName}
              </p>
              <p className="text-[9px] text-slate-400 truncate">
                {story.location.split(',')[0]}
              </p>
            </div>
          </button>
        ))}

      </div>
    </div>
  );
};
