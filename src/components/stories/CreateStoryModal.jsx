import React, { useState } from 'react';
import { X, Image, MapPin, Radio, UploadCloud, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CITIES } from '../../data/mockData';

const SAMPLE_GROUND_PHOTOS = [
  'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80'
];

export const CreateStoryModal = () => {
  const { 
    isCreateStoryOpen, 
    setIsCreateStoryOpen, 
    addStory, 
    currentUser, 
    protests,
    selectedCity 
  } = useApp();

  const [caption, setCaption] = useState('');
  const [cityId, setCityId] = useState(selectedCity === 'all' ? 'delhi' : selectedCity);
  const [locationName, setLocationName] = useState('Jantar Mantar, Delhi');
  const [mediaUrl, setMediaUrl] = useState(SAMPLE_GROUND_PHOTOS[0]);
  const [isLive, setIsLive] = useState(true);
  const [linkedProtestId, setLinkedProtestId] = useState('');

  if (!isCreateStoryOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caption.trim()) return;

    addStory({
      caption,
      cityId,
      location: locationName,
      mediaUrl,
      mediaType: 'image',
      isLive,
      protestId: linkedProtestId || undefined
    });

    setCaption('');
    setIsCreateStoryOpen(false);
  };

  const handleCityChange = (newCityId) => {
    setCityId(newCityId);
    const city = CITIES.find(c => c.id === newCityId);
    if (city && city.id !== 'all') {
      setLocationName(`${city.name} Ground`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-rose-500 animate-pulse" />
            <h2 className="text-base font-bold text-white">Share Live Ground Story</h2>
          </div>
          <button
            onClick={() => setIsCreateStoryOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          {/* Identity Shield indicator */}
          <div className="flex items-center justify-between bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 text-xs">
            <div className="flex items-center gap-2">
              <img
                src={currentUser.isAnonymousMode ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80' : currentUser.avatar}
                alt="user"
                className="w-7 h-7 rounded-full object-cover"
              />
              <div>
                <span className="font-semibold text-slate-200">
                  {currentUser.isAnonymousMode ? 'Anonymous Ground Citizen' : currentUser.name}
                </span>
                <p className="text-[10px] text-slate-400">
                  {currentUser.isAnonymousMode ? '🛡️ Metadata and identity stripped' : 'Posting with public verified badge'}
                </p>
              </div>
            </div>
            {currentUser.isAnonymousMode && (
              <span className="bg-purple-900/60 text-purple-300 border border-purple-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Shielded
              </span>
            )}
          </div>

          {/* Photo Preview & Presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Select Live Ground Photo / Media
            </label>
            <div className="relative h-44 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 mb-2">
              <img
                src={mediaUrl}
                alt="Story preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] text-slate-200 font-medium">
                Live Preview
              </div>
            </div>

            {/* Quick Sample Photos Picker */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {SAMPLE_GROUND_PHOTOS.map((url, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setMediaUrl(url)}
                  className={`w-12 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-transform ${
                    mediaUrl === url ? 'border-brand-500 scale-105' : 'border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt="sample" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Caption */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Ground Situation Caption (Live details, barricades, crowd count)
            </label>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g., Doctors and student groups assembled peacefully. Medical desk set up at Gate 2. Share live conditions..."
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>

          {/* City & Specific Location */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                City / Region
              </label>
              <select
                value={cityId}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
              >
                {CITIES.filter(c => c.id !== 'all').map(city => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Venue Landmark
              </label>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="e.g. Jantar Mantar Gate 2"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Link to Protest Event */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Link with Existing Movement (Optional)
            </label>
            <select
              value={linkedProtestId}
              onChange={(e) => setLinkedProtestId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
            >
              <option value="">None (Standalone Ground Story)</option>
              {protests.map(pr => (
                <option key={pr.id} value={pr.id}>
                  {pr.title} ({pr.cityName})
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-500 hover:to-rose-500 text-white font-bold text-sm py-2.5 rounded-xl shadow-lg shadow-rose-600/30 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Radio className="w-4 h-4" />
              <span>Publish to 24h Live Stream</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
