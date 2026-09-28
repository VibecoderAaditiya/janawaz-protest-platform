import React from 'react';
import { 
  Users, 
  Flame, 
  CheckCircle2, 
  MessageSquare, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CommunityList = () => {
  const { 
    communities, 
    toggleJoinCommunity, 
    setSelectedCommunity 
  } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Communities Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-xl space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-brand-500/20 text-brand-400 border border-brand-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Civic Alliances & Campaign Hubs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Movement Communities & Channels
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Join grassroots coalitions across India to coordinate assemblies, access legal dossiers, and discuss movement strategies in encrypted, community-governed channels.
          </p>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-brand-600/10 to-transparent pointer-events-none" />
      </div>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {communities.map(comm => (
          <div
            key={comm.id}
            onClick={() => setSelectedCommunity(comm)}
            className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-brand-500/40 rounded-2xl overflow-hidden shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Banner & Avatar */}
            <div>
              <div className="relative h-28 w-full bg-slate-950">
                <img
                  src={comm.banner}
                  alt={comm.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-[10px] font-bold text-slate-200 px-2 py-0.5 rounded-full">
                  {comm.cityFocus}
                </div>
              </div>

              {/* Body */}
              <div className="p-4 pt-0 relative space-y-3">
                
                {/* Avatar */}
                <div className="flex items-end justify-between -mt-6 mb-2">
                  <img
                    src={comm.avatar}
                    alt={comm.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-900 bg-slate-800 shadow-md"
                  />
                  
                  {/* Join / Leave button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleJoinCommunity(comm.id);
                    }}
                    className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all ${
                      comm.isJoined
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                        : 'bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/30'
                    }`}
                  >
                    {comm.isJoined ? 'Joined ✓' : 'Join Channel'}
                  </button>
                </div>

                {/* Name & Handle */}
                <div>
                  <h3 className="font-bold text-base text-slate-100 group-hover:text-brand-400 transition-colors">
                    {comm.name}
                  </h3>
                  <span className="text-xs font-semibold text-brand-400">
                    {comm.handle}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {comm.description}
                </p>

                {/* Metrics */}
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-brand-400" />
                    <span className="font-bold text-slate-200">{comm.membersCount.toLocaleString()}</span>
                    <span>members</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-rose-400" />
                    <span className="font-bold text-slate-200">{comm.activeProtestsCount}</span>
                    <span>active assemblies</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer click info */}
            <div className="px-4 py-3 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                Live Discussion & Resources
              </span>
              <span className="text-brand-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5 font-bold">
                Open Channel <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
