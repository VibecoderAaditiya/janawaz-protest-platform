import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  MapPin, 
  Calendar, 
  Plus, 
  Trash2, 
  ShieldAlert, 
  Users, 
  CheckCircle2, 
  Radio
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CITIES, CATEGORIES } from '../../data/mockData';

export const CreateProtestModal = () => {
  const { 
    isCreateProtestOpen, 
    setIsCreateProtestOpen, 
    addProtest, 
    selectedCity 
  } = useApp();

  const [title, setTitle] = useState('');
  const [cityId, setCityId] = useState(selectedCity === 'all' ? 'delhi' : selectedCity);
  const [category, setCategory] = useState('climate');
  const [venue, setVenue] = useState('');
  const [assemblyPoint, setAssemblyPoint] = useState('');
  const [status, setStatus] = useState('scheduled'); // 'live' | 'scheduled'
  const [dateStr, setDateStr] = useState('Oct 15, 2026 • 10:00 AM');
  const [description, setDescription] = useState('');
  const [demands, setDemands] = useState(['']);
  const [safetyNotes, setSafetyNotes] = useState('Peaceful Assembly • Legal and Medical Desks in preparation');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=1000&auto=format&fit=crop&q=80');
  const [broadcastNotes, setBroadcastNotes] = useState('Carry water bottles, personal IDs, and rain protection.');

  if (!isCreateProtestOpen) return null;

  const handleAddDemand = () => {
    setDemands([...demands, '']);
  };

  const handleUpdateDemand = (index, value) => {
    const updated = [...demands];
    updated[index] = value;
    setDemands(updated);
  };

  const handleRemoveDemand = (index) => {
    setDemands(demands.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !venue.trim()) return;

    const filteredDemands = demands.filter(d => d.trim().length > 0);

    addProtest({
      title,
      cityId,
      category,
      venue,
      assemblyPoint: assemblyPoint || venue,
      status,
      date: status === 'live' ? 'Live Now' : dateStr,
      description,
      demands: filteredDemands.length ? filteredDemands : ['Institutional transparency and accountability'],
      safetyNotes,
      coverImage,
      broadcastNotes,
      volunteerRolesNeeded: ['First Aid / Medical', 'Legal Observers', 'Hydration Crew', 'Social Media Amplifiers']
    });

    setIsCreateProtestOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Organize / Publish Civic Movement</h2>
              <p className="text-[11px] text-slate-400">List an upcoming or live protest across India</p>
            </div>
          </div>

          <button
            onClick={() => setIsCreateProtestOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto text-xs">
          
          {/* Status Selection (Live vs Scheduled) */}
          <div className="flex items-center gap-3 p-1.5 bg-slate-950 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => setStatus('scheduled')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-bold transition-all ${
                status === 'scheduled'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>📅 Scheduled / Planned Movement</span>
            </button>

            <button
              type="button"
              onClick={() => setStatus('live')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-bold transition-all ${
                status === 'live'
                  ? 'bg-rose-600 text-white shadow-md animate-pulse'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>🔥 Ongoing / Live on Ground</span>
            </button>
          </div>

          {/* Title */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Protest / Movement Title & Slogan *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. #RightToBreathe: Mega Clean Air Human Chain & Vigil"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* City & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Target City / Region *
              </label>
              <select
                value={cityId}
                onChange={(e) => setCityId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
              >
                {CITIES.filter(c => c.id !== 'all').map(city => (
                  <option key={city.id} value={city.id}>
                    {city.name} ({city.state})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Cause / Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
              >
                {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Venue & Assembly Point */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Protest Venue / Landmark *
              </label>
              <input
                type="text"
                required
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. Jantar Mantar / Azad Maidan / Freedom Park"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Specific Assembly Point (Gate / Pillar)
              </label>
              <input
                type="text"
                value={assemblyPoint}
                onChange={(e) => setAssemblyPoint(e.target.value)}
                placeholder="e.g. Gate 2 near Metro Exit"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Date and Time (if scheduled) */}
          {status === 'scheduled' && (
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Date, Time & Assembly Schedule
              </label>
              <input
                type="text"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                placeholder="e.g. Oct 15, 2026 • 10:00 AM onwards"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Background, Issues & Purpose
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail the cause, why citizens are taking action, historical context, and what participants should expect..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Demands List */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-slate-300">
                Key Demands / Resolution Points
              </label>
              <button
                type="button"
                onClick={handleAddDemand}
                className="text-brand-400 hover:text-brand-300 font-bold flex items-center gap-1 text-[11px]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Demand</span>
              </button>
            </div>

            <div className="space-y-2">
              {demands.map((demand, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={demand}
                    onChange={(e) => handleUpdateDemand(index, e.target.value)}
                    placeholder={`Demand #${index + 1} (e.g. Rollback fee hike / Zero-emission policy)`}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
                  />
                  {demands.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveDemand(index)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Safety & Ground Instructions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Safety & Legal Observers Note
              </label>
              <input
                type="text"
                value={safetyNotes}
                onChange={(e) => setSafetyNotes(e.target.value)}
                placeholder="e.g. Peaceful assembly • Legal Aid desk present"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Ground Essentials for Attendees
              </label>
              <input
                type="text"
                value={broadcastNotes}
                onChange={(e) => setBroadcastNotes(e.target.value)}
                placeholder="e.g. Bring own water bottles, masks, ID proof"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-brand-600 via-rose-600 to-amber-600 hover:opacity-90 text-white font-extrabold text-sm py-3 rounded-2xl shadow-xl shadow-rose-600/20 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Flame className="w-4 h-4" />
              <span>Publish Movement to JanAwaz Community</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
