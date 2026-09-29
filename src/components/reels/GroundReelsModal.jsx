import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronUp, 
  ChevronDown, 
  Flame, 
  MessageSquare, 
  Share2, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Radio, 
  ShieldCheck, 
  Sparkles,
  Music,
  Compass
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const SAMPLE_REELS = [
  {
    id: 'reel-1',
    author: 'Delhi Clean Air Collective',
    handle: '@cleanair_delhi',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    videoUrl: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=900&auto=format&fit=crop&q=80',
    location: 'Jantar Mantar, Delhi',
    aqi: '385 AQI',
    caption: 'Frontline citizen doctors in Delhi joining hands at Jantar Mantar. Calling for zero-emission public buses! 🫁🔥',
    soundtrack: 'Chants of Delhi Clean Air • Live Crowd Audio',
    ignites: 1420,
    commentsCount: 84,
    verified: true,
    protestId: 'pr-1'
  },
  {
    id: 'reel-2',
    author: 'Aarey Forest Forum',
    handle: '@saveaarey_mumbai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    videoUrl: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=900&auto=format&fit=crop&q=80',
    location: 'Azad Maidan, Mumbai',
    aqi: '124 AQI',
    caption: 'Warli indigenous tribal women singing folk songs of resistance to protect 3000 acres of Mumbai forest. 🌳✊',
    soundtrack: 'Warli Indigenous Folk Anthem • Aarey Camp',
    ignites: 980,
    commentsCount: 52,
    verified: true,
    protestId: 'pr-2'
  },
  {
    id: 'reel-3',
    author: 'Bangalore Commuters Forum',
    handle: '@blrcitizensunite',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    videoUrl: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=900&auto=format&fit=crop&q=80',
    location: 'Freedom Park, Bengaluru',
    aqi: '78 AQI',
    caption: 'Preparation for October 2nd massive public transport satyagraha. Citizens demanding 4,000 new BMTC buses! 🚌⚡',
    soundtrack: 'Namma Bengaluru Movement Anthem',
    ignites: 1890,
    commentsCount: 116,
    verified: true,
    protestId: 'pr-3'
  }
];

export const GroundReelsModal = ({ isOpen, onClose }) => {
  const { showToast, setSelectedProtest, protests } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [reelsData, setReelsData] = useState(SAMPLE_REELS);
  const [showFlamePop, setShowFlamePop] = useState(false);

  const currentReel = reelsData[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown' || e.key === 'j') handleNext();
      if (e.key === 'ArrowUp' || e.key === 'k') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  if (!isOpen || !currentReel) return null;

  const handleNext = () => {
    if (currentIndex < reelsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleIgniteReel = () => {
    setShowFlamePop(true);
    setReelsData(prev => prev.map((r, i) => {
      if (i === currentIndex) return { ...r, ignites: r.ignites + 1 };
      return r;
    }));
    setTimeout(() => setShowFlamePop(false), 900);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Ground Reel link copied to clipboard!', 'info');
  };

  const handleViewProtest = () => {
    if (currentReel.protestId) {
      const pr = protests.find(p => p.id === currentReel.protestId);
      if (pr) {
        setSelectedProtest(pr);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-0 sm:p-4 select-none">
      
      {/* Up & Down Desktop Arrows */}
      <div className="hidden lg:flex flex-col gap-3 absolute right-12 top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white flex items-center justify-center backdrop-blur-md transition-all"
        >
          <ChevronUp className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === reelsData.length - 1}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white flex items-center justify-center backdrop-blur-md transition-all"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      {/* 9:16 Video Container */}
      <div 
        onDoubleClick={handleIgniteReel}
        className="relative w-full max-w-sm h-full sm:h-[92vh] max-h-[860px] bg-slate-950 sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between border sm:border-slate-800"
      >
        {/* Background Visual Media */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentReel.videoUrl}
            alt={currentReel.caption}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
        </div>

        {/* Double-Tap Smooth Vector Flame Pop */}
        {showFlamePop && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <div className="w-32 h-32 rounded-full border border-rose-400/80 bg-rose-500/10 backdrop-blur-sm animate-smooth-shockwave absolute" />
            <div className="relative animate-smooth-flame">
              <Flame className="w-24 h-24 text-amber-300 fill-amber-400 filter drop-shadow-[0_0_30px_rgba(255,77,79,1)]" />
            </div>
          </div>
        )}

        {/* Top Controls */}
        <div className="relative z-10 p-4 pt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-rose-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
              <Radio className="w-2.5 h-2.5 animate-pulse" />
              Ground Reel
            </span>
            <span className="bg-slate-900/80 backdrop-blur-md text-amber-300 border border-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {currentReel.aqi}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-md"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Floating Right Action Rail */}
        <div className="relative z-10 self-end p-4 space-y-4 flex flex-col items-center">
          
          {/* Flame Ignite */}
          <button
            onClick={handleIgniteReel}
            className="flex flex-col items-center gap-1 text-white group"
          >
            <div className="w-11 h-11 rounded-full bg-black/50 hover:bg-rose-600/80 border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
            <span className="text-[11px] font-bold">{currentReel.ignites.toLocaleString()}</span>
          </button>

          {/* Comments */}
          <button className="flex flex-col items-center gap-1 text-white group">
            <div className="w-11 h-11 rounded-full bg-black/50 hover:bg-white/20 border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold">{currentReel.commentsCount}</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="w-11 h-11 rounded-full bg-black/50 hover:bg-white/20 border border-white/20 flex items-center justify-center backdrop-blur-md text-white hover:scale-110 transition-transform"
          >
            <Share2 className="w-5 h-5" />
          </button>

        </div>

        {/* Bottom Details & Sound Banner */}
        <div className="relative z-10 p-4 space-y-2.5">
          
          {/* Author */}
          <div className="flex items-center gap-2.5">
            <img
              src={currentReel.avatar}
              alt={currentReel.author}
              className="w-9 h-9 rounded-full object-cover border-2 border-brand-500"
            />
            <div>
              <div className="flex items-center gap-1 text-sm font-bold text-white">
                <span>{currentReel.author}</span>
                {currentReel.verified && <ShieldCheck className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-300">
                <MapPin className="w-3 h-3 text-brand-400" />
                <span>{currentReel.location}</span>
              </div>
            </div>
          </div>

          {/* Caption */}
          <p className="text-xs text-slate-100 leading-relaxed drop-shadow-md">
            {currentReel.caption}
          </p>

          {/* Linked Movement Banner */}
          {currentReel.protestId && (
            <button
              onClick={handleViewProtest}
              className="w-full bg-slate-900/80 hover:bg-slate-900 border border-brand-500/40 text-brand-300 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center justify-between"
            >
              <span>View Movement Event Dossier</span>
              <Compass className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Soundtrack Row */}
          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <Music className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span className="truncate">{currentReel.soundtrack}</span>
          </div>

        </div>

      </div>
    </div>
  );
};
