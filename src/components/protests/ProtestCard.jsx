import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Radio, 
  Share2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const ProtestCard = ({ protest }) => {
  const { setSelectedProtest, toggleRSVP, showToast } = useApp();

  const handleShare = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Movement link for "${protest.title}" copied!`, 'info');
  };

  const isLive = protest.status === 'live';

  return (
    <div 
      onClick={() => setSelectedProtest(protest)}
      className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-brand-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Cover Image Header with Badges */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-950">
          <img 
            src={protest.coverImage} 
            alt={protest.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          {/* Top Left Status Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            {isLive ? (
              <span className="bg-rose-600/90 text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded-full backdrop-blur-md flex items-center gap-1 shadow-md uppercase tracking-wider">
                <Radio className="w-3 h-3 animate-pulse" />
                Live Assembly
              </span>
            ) : (
              <span className="bg-amber-600/90 text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded-full backdrop-blur-md flex items-center gap-1 shadow-md uppercase tracking-wider">
                <Calendar className="w-3 h-3" />
                Scheduled
              </span>
            )}
            
            <span className="bg-slate-900/80 text-slate-200 border border-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-md">
              {protest.cityName}
            </span>
          </div>

          {/* Top Right Share button */}
          <button
            onClick={handleShare}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/70 hover:bg-slate-900 border border-slate-700/80 text-slate-200 flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          {/* Bottom Title & Category */}
          <div className="absolute bottom-2.5 left-3 right-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
              {protest.categoryName}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-3">
          
          {/* Movement Title */}
          <h3 className="font-bold text-base text-slate-100 group-hover:text-brand-400 transition-colors leading-snug line-clamp-2">
            {protest.title}
          </h3>

          {/* Venue & Date */}
          <div className="space-y-1 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
              <span className="truncate">{protest.venue}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{protest.date}</span>
            </div>
          </div>

          {/* Description snippet */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {protest.description}
          </p>

          {/* Key Demands Preview */}
          {protest.demands?.length > 0 && (
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <span>Core Demand:</span>
              </div>
              <p className="text-[11px] text-slate-200 line-clamp-1 italic">
                "{protest.demands[0]}"
              </p>
            </div>
          )}

          {/* Safety & Ground Situation */}
          <div className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-slate-950/40 border border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${
                protest.safetyStatus.level === 'green' ? 'bg-emerald-400' :
                protest.safetyStatus.level === 'yellow' ? 'bg-yellow-400' : 'bg-rose-500'
              }`} />
              <span className="text-slate-300 text-[10px] truncate max-w-[180px]">
                {protest.safetyStatus.label}
              </span>
            </div>
            <span className="text-[9px] text-slate-500 shrink-0">
              {protest.safetyStatus.lastReported}
            </span>
          </div>

        </div>
      </div>

      {/* Card Footer: Headcount & RSVP CTA */}
      <div className="p-4 pt-0 mt-2">
        <div className="flex items-center justify-between gap-2 border-t border-slate-800/80 pt-3">
          
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Users className="w-4 h-4 text-brand-400" />
            <div>
              <span className="font-extrabold text-white">{protest.headcount.toLocaleString()}</span>
              <span className="text-slate-400 text-[11px]"> Joining</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleRSVP(protest.id);
              }}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                protest.attendingUser
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/20 active:scale-95'
              }`}
            >
              {protest.attendingUser ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Joined</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>I'm Joining</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
