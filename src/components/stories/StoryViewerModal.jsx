import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  MapPin, 
  Share2, 
  ShieldCheck, 
  Radio, 
  Send,
  Flame,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export const StoryViewerModal = () => {
  const { 
    stories, 
    filteredStories, 
    activeStoryIndex, 
    setActiveStoryIndex, 
    cheerStory, 
    showToast,
    setSelectedProtest,
    protests
  } = useApp();

  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [floatingEmojis, setFloatingEmojis] = useState([]);

  const currentStory = filteredStories[activeStoryIndex];

  // Auto progression timer
  useEffect(() => {
    if (activeStoryIndex === null || !currentStory || isPaused) return;

    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeStoryIndex, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeStoryIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setActiveStoryIndex(null);
      if (e.key === ' ') setIsPaused(prev => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStoryIndex]);

  if (activeStoryIndex === null || !currentStory) return null;

  const handleNext = () => {
    if (activeStoryIndex < filteredStories.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
      setProgress(0);
    } else {
      setActiveStoryIndex(null);
    }
  };

  const handlePrev = () => {
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
      setProgress(0);
    }
  };

  const spawnEmoji = (emoji) => {
    const newEmoji = {
      id: Date.now() + Math.random(),
      emoji,
      left: Math.floor(Math.random() * 60) + 20 // 20% to 80%
    };
    setFloatingEmojis(prev => [...prev, newEmoji]);
    cheerStory(currentStory.id);

    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(e => e.id !== newEmoji.id));
    }, 1400);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    spawnEmoji('❤️');
    showToast(`Solidarity reply sent to ${currentStory.userName}!`, 'success');
    setCommentText('');
  };

  const handleViewProtest = () => {
    if (currentStory.protestId) {
      const pr = protests.find(p => p.id === currentStory.protestId);
      if (pr) {
        setSelectedProtest(pr);
        setActiveStoryIndex(null);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-0 sm:p-4">
      
      {/* Desktop Navigation Arrows */}
      {activeStoryIndex > 0 && (
        <button
          onClick={handlePrev}
          className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center backdrop-blur-md transition-all z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {activeStoryIndex < filteredStories.length - 1 && (
        <button
          onClick={handleNext}
          className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center backdrop-blur-md transition-all z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Story Container */}
      <div 
        className="relative w-full max-w-md h-full sm:h-[90vh] max-h-[860px] bg-slate-950 sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between select-none"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Background Visual Media */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentStory.mediaUrl}
            alt={currentStory.caption}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
        </div>

        {/* Floating Story Reaction Emojis Animation */}
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          {floatingEmojis.map(item => (
            <div
              key={item.id}
              className="absolute text-4xl animate-in fade-in slide-in-from-bottom-20 duration-1000 transform -translate-x-1/2"
              style={{
                left: `${item.left}%`,
                bottom: '15%'
              }}
            >
              {item.emoji}
            </div>
          ))}
        </div>

        {/* Top Story Controls */}
        <div className="relative z-10 p-4 pt-3">
          {/* Multi-story Segment Progress Bars */}
          <div className="flex items-center gap-1.5 mb-3">
            {filteredStories.map((st, idx) => (
              <div key={st.id} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 transition-all duration-100 ease-linear"
                  style={{
                    width:
                      idx < activeStoryIndex
                        ? '100%'
                        : idx === activeStoryIndex
                        ? `${progress}%`
                        : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          {/* User Profile Info & Close Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500">
                <img
                  src={currentStory.userAvatar}
                  alt={currentStory.userName}
                  className="w-9 h-9 rounded-full object-cover border-2 border-black"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white leading-tight">
                    {currentStory.userName}
                  </span>
                  {currentStory.verified && (
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
                  )}
                  {currentStory.isLive && (
                    <span className="bg-rose-600 text-[9px] font-black uppercase text-white px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                      <Radio className="w-2.5 h-2.5" /> LIVE
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-300">
                  <MapPin className="w-3 h-3 text-brand-400" />
                  <span>{currentStory.location}</span>
                  <span className="mx-1">•</span>
                  <span>{currentStory.timestamp}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveStoryIndex(null)}
              className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tap Left / Right Zones */}
        <div className="relative z-10 flex-1 flex">
          <div className="w-1/3 h-full cursor-pointer" onClick={handlePrev} />
          <div className="w-2/3 h-full cursor-pointer" onClick={handleNext} />
        </div>

        {/* Bottom Actions & Instagram Quick Emoji Bar */}
        <div className="relative z-10 p-4 space-y-3">
          
          {/* Linked Movement Button */}
          {currentStory.protestId && (
            <button
              onClick={handleViewProtest}
              className="w-full bg-slate-900/85 hover:bg-slate-900 border border-brand-500/40 backdrop-blur-md text-left px-3.5 py-2 rounded-xl flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-2 text-brand-300 font-semibold truncate">
                <Radio className="w-4 h-4 text-brand-400 shrink-0" />
                <span className="truncate">View Associated Protest Movement</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            </button>
          )}

          {/* Caption */}
          <div className="bg-black/60 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-xs sm:text-sm text-slate-100 leading-relaxed">
            {currentStory.caption}
          </div>

          {/* Quick Instagram Story Emoji Reactions Row */}
          <div className="flex items-center justify-between px-2 bg-black/40 backdrop-blur-md py-1.5 rounded-full border border-white/10">
            {['🔥', '✊', '❤️', '📢', '👏', '🚩'].map((emoji, i) => (
              <button
                key={i}
                type="button"
                onClick={() => spawnEmoji(emoji)}
                className="text-lg hover:scale-130 transition-transform active:scale-90 p-1"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Action Form & Direct Reply */}
          <div className="flex items-center gap-2 pt-0.5">
            <form onSubmit={handleSendReply} className="flex-1 flex items-center bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-2 focus-within:border-brand-400">
              <input
                type="text"
                placeholder="Send reply to story..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder:text-slate-300 focus:outline-none"
              />
              <button type="submit" className="text-white hover:text-brand-400 pl-1">
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <button
              onClick={() => spawnEmoji('❤️')}
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-3.5 py-2 rounded-full shadow-lg shadow-rose-600/40 active:scale-90 transition-all"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>{currentStory.cheersCount}</span>
            </button>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Story link copied to clipboard!', 'info');
              }}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
