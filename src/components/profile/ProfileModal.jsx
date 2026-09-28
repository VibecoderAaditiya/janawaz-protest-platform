import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Shield, 
  Award, 
  MapPin, 
  Calendar, 
  Flame, 
  Radio, 
  BookOpen, 
  Edit3, 
  CheckCircle2,
  Users,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CITIES } from '../../data/mockData';

export const ProfileModal = () => {
  const { 
    isProfileOpen, 
    setIsProfileOpen, 
    currentUser, 
    setCurrentUser, 
    protests, 
    posts, 
    logoutUser,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('protests'); // 'protests' | 'badges' | 'settings'
  const [name, setName] = useState(currentUser.name);
  const [handle, setHandle] = useState(currentUser.handle);
  const [role, setRole] = useState(currentUser.role);
  const [userCity, setUserCity] = useState(currentUser.city);

  if (!isProfileOpen) return null;

  const attendedProtestItems = protests.filter(p => p.attendingUser);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setCurrentUser(prev => ({
      ...prev,
      name,
      handle,
      role,
      city: userCity
    }));
    showToast('Profile updated successfully', 'success');
  };

  const handleLogout = () => {
    logoutUser();
    setIsProfileOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 max-h-[92vh] flex flex-col">
        
        {/* Header Banner */}
        <div className="relative h-28 bg-gradient-to-r from-brand-600 via-rose-600 to-amber-600 p-4 flex justify-end shrink-0">
          <button
            onClick={() => setIsProfileOpen(false)}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Details Header */}
        <div className="px-6 relative -mt-10 pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-end justify-between">
            <div className="relative">
              <img
                src={currentUser.isAnonymousMode ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80' : currentUser.avatar}
                alt="Profile"
                className="w-20 h-20 rounded-2xl object-cover border-4 border-slate-900 bg-slate-800 shadow-xl"
              />
              {currentUser.isAnonymousMode ? (
                <div className="absolute -bottom-1 -right-1 bg-purple-600 text-white p-1 rounded-full border-2 border-slate-900">
                  <Shield className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full border-2 border-slate-900">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={handleLogout}
                className="bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-400 border border-slate-700 hover:border-rose-700 font-semibold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          <div className="mt-3">
            <h3 className="font-extrabold text-lg text-white">
              {currentUser.isAnonymousMode ? 'Anonymous Citizen Shield' : currentUser.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span>{currentUser.isAnonymousMode ? '@ground_citizen' : currentUser.handle}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-brand-400" />
                {CITIES.find(c => c.id === currentUser.city)?.name || 'Delhi NCR'}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-slate-950/40 shrink-0">
          <button
            onClick={() => setActiveTab('protests')}
            className={`pb-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'protests'
                ? 'border-brand-500 text-brand-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            My Joined Movements ({attendedProtestItems.length})
          </button>

          <button
            onClick={() => setActiveTab('badges')}
            className={`pb-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'badges'
                ? 'border-brand-500 text-brand-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Activist Badges
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-2.5 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'settings'
                ? 'border-brand-500 text-brand-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Edit Profile
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3 text-xs">
          
          {/* TAB 1: Attended Protests */}
          {activeTab === 'protests' && (
            <div className="space-y-2.5">
              {attendedProtestItems.length > 0 ? (
                attendedProtestItems.map(pr => (
                  <div key={pr.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800">
                    <div>
                      <h4 className="font-bold text-slate-100 text-xs line-clamp-1">{pr.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{pr.venue} • {pr.cityName}</p>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                      RSVP'd ✓
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic text-center py-4">
                  You haven't RSVP'd to any protests yet. Browse the Map & Protests tab to join.
                </p>
              )}
            </div>
          )}

          {/* TAB 2: Badges */}
          {activeTab === 'badges' && (
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200 text-xs">Peaceful Assembler</h4>
                  <p className="text-[10px] text-slate-400">Verified participant</p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200 text-xs">Legal Observer</h4>
                  <p className="text-[10px] text-slate-400">Trained in CrPC/BNSS</p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200 text-xs">Ground Chronicler</h4>
                  <p className="text-[10px] text-slate-400">10+ live reports</p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200 text-xs">Privacy Champion</h4>
                  <p className="text-[10px] text-slate-400">Digital hygiene verified</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Edit Profile */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Handle</label>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Civic Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Home City</label>
                <select
                  value={userCity}
                  onChange={(e) => setUserCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                >
                  {CITIES.filter(c => c.id !== 'all').map(city => (
                    <option key={city.id} value={city.id}>
                      {city.name} ({city.state})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-2.5 rounded-xl transition-all shadow-md"
              >
                Save Profile Changes
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
