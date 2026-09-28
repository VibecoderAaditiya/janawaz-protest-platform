import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Radio, 
  CheckCircle2, 
  AlertCircle, 
  Share2, 
  Navigation, 
  ExternalLink, 
  Sparkles, 
  HandHeart, 
  PhoneCall, 
  Info,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProtestDetailsModal = () => {
  const { 
    selectedProtest, 
    setSelectedProtest, 
    toggleRSVP, 
    showToast,
    setIsSOSOpen
  } = useApp();

  const [selectedVolunteerRole, setSelectedVolunteerRole] = useState(null);

  if (!selectedProtest) return null;

  const isLive = selectedProtest.status === 'live';

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Movement dossier link copied to clipboard!`, 'success');
  };

  const handleVolunteer = (role) => {
    setSelectedVolunteerRole(role);
    showToast(`Thank you! You registered as volunteer for: ${role}`, 'success');
  };

  const openDirections = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${selectedProtest.lat},${selectedProtest.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 max-h-[92vh] flex flex-col">
        
        {/* Modal Top Header with Banner */}
        <div className="relative h-56 sm:h-72 w-full bg-slate-950 shrink-0">
          <img
            src={selectedProtest.coverImage}
            alt={selectedProtest.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Close & Share buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white flex items-center justify-center backdrop-blur-md transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedProtest(null)}
              className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white flex items-center justify-center backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Banner Status Tags */}
          <div className="absolute bottom-4 left-4 sm:left-6 right-4 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              {isLive ? (
                <span className="bg-rose-600 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  Live Ground Action
                </span>
              ) : (
                <span className="bg-amber-600 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg">
                  <Calendar className="w-3.5 h-3.5" />
                  Scheduled Movement
                </span>
              )}

              <span className="bg-slate-900/90 text-brand-400 border border-brand-500/40 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                {selectedProtest.categoryName}
              </span>

              <span className="bg-slate-900/80 text-slate-200 border border-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md">
                {selectedProtest.cityName}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
          
          {/* Title & Organizer Row */}
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white leading-snug mb-3">
              {selectedProtest.title}
            </h1>

            <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-800">
              {/* Organizer */}
              <div className="flex items-center gap-2.5">
                <img
                  src={selectedProtest.organizer.avatar}
                  alt={selectedProtest.organizer.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-brand-500"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-slate-100">
                      {selectedProtest.organizer.name}
                    </span>
                    {selectedProtest.organizer.verified && (
                      <ShieldCheck className="w-4 h-4 text-blue-400 fill-blue-400/20" />
                    )}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {selectedProtest.organizer.handle} • Verified Civic Organizer
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={openDirections}
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-3.5 py-2.5 rounded-xl transition-all"
                >
                  <Navigation className="w-4 h-4 text-brand-400" />
                  <span>Get Directions</span>
                </button>

                <button
                  onClick={() => toggleRSVP(selectedProtest.id)}
                  className={`flex items-center gap-1.5 font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all ${
                    selectedProtest.attendingUser
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                      : 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-600/30'
                  }`}
                >
                  {selectedProtest.attendingUser ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>You're Attending</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>RSVP & Join Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics & Venue Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-2xl">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <MapPin className="w-4 h-4 text-brand-400" />
                <span>Venue & Landmark</span>
              </div>
              <p className="font-bold text-sm text-slate-100">{selectedProtest.venue}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{selectedProtest.assemblyPoint}</p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-2xl">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Date & Schedule</span>
              </div>
              <p className="font-bold text-sm text-slate-100">{selectedProtest.date}</p>
              <p className="text-[11px] text-emerald-400 mt-0.5">Active Assembly</p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-2xl">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Users className="w-4 h-4 text-brand-400" />
                <span>Solidarity Count</span>
              </div>
              <p className="font-bold text-lg text-white">
                {selectedProtest.headcount.toLocaleString()}
                <span className="text-xs font-normal text-slate-400 ml-1">Citizens</span>
              </p>
            </div>
          </div>

          {/* Ground Safety & Legal Status Banner */}
          <div className={`p-4 rounded-2xl border ${
            selectedProtest.safetyStatus.level === 'green'
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
              : selectedProtest.safetyStatus.level === 'yellow'
              ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
              : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
          }`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Ground Safety & Legal Observers Status</h4>
                  <p className="text-xs mt-1 leading-relaxed opacity-90">{selectedProtest.safetyStatus.label}</p>
                  <p className="text-[10px] mt-1 opacity-70">Reported: {selectedProtest.safetyStatus.lastReported}</p>
                </div>
              </div>

              <button
                onClick={() => setIsSOSOpen(true)}
                className="shrink-0 bg-slate-900/80 hover:bg-slate-900 border border-white/20 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors"
              >
                Open Legal SOS
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-2">
              Movement Overview & Context
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80">
              {selectedProtest.description}
            </p>
          </div>

          {/* Charter of Demands */}
          {selectedProtest.demands?.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                <span>Non-Negotiable Charter of Demands</span>
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-normal">
                  {selectedProtest.demands.length} items
                </span>
              </h3>
              <div className="space-y-2">
                {selectedProtest.demands.map((demand, i) => (
                  <div key={i} className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">{demand}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Volunteer Roles Needed */}
          {selectedProtest.volunteerRolesNeeded?.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                <HandHeart className="w-4 h-4 text-brand-400" />
                <span>Volunteers Needed on Ground</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedProtest.volunteerRolesNeeded.map((role, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800"
                  >
                    <span className="text-xs font-semibold text-slate-200">{role}</span>
                    <button
                      onClick={() => handleVolunteer(role)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-colors ${
                        selectedVolunteerRole === role
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-slate-800 hover:bg-brand-600 text-slate-200 hover:text-white'
                      }`}
                    >
                      {selectedVolunteerRole === role ? 'Enrolled ✓' : 'Sign Up'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Broadcast Notes & Advice */}
          {selectedProtest.broadcastNotes && (
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-2 font-bold text-amber-400">
                <Info className="w-4 h-4" />
                <span>Organizer Broadcast & Ground Advice</span>
              </div>
              <p className="leading-relaxed pl-6">{selectedProtest.broadcastNotes}</p>
            </div>
          )}

        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Users className="w-4 h-4 text-brand-400" />
            <span>Join with <strong>{selectedProtest.headcount.toLocaleString()}</strong> citizens in peaceful solidarity</span>
          </div>

          <button
            onClick={() => toggleRSVP(selectedProtest.id)}
            className={`font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md ${
              selectedProtest.attendingUser
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-600/30'
            }`}
          >
            {selectedProtest.attendingUser ? "I'm Attending ✓" : "RSVP 'I am Joining'"}
          </button>
        </div>

      </div>
    </div>
  );
};
