import React, { useState } from 'react';
import { 
  X, 
  Image, 
  Shield, 
  MapPin, 
  Radio, 
  Send, 
  Hash, 
  AlertCircle, 
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CITIES } from '../../data/mockData';

const SAMPLE_POST_IMAGES = [
  'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=1000&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=1000&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1000&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1000&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&auto=format&fit=crop&q=80'
];

export const CreatePostModal = () => {
  const { 
    isCreatePostOpen, 
    setIsCreatePostOpen, 
    addPost, 
    currentUser, 
    protests,
    selectedCity 
  } = useApp();

  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(currentUser.isAnonymousMode);
  const [cityId, setCityId] = useState(selectedCity === 'all' ? 'delhi' : selectedCity);
  const [selectedProtestId, setSelectedProtestId] = useState('');
  const [selectedImage, setSelectedImage] = useState(SAMPLE_POST_IMAGES[0]);
  const [includeImage, setIncludeImage] = useState(true);
  const [tagsInput, setTagsInput] = useState('#JanAwaz, #CivicAction, #CitizenVoice');

  if (!isCreatePostOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const protestObj = protests.find(p => p.id === selectedProtestId);
    const parsedTags = tagsInput.split(',').map(t => t.trim()).filter(t => t.length > 0);

    addPost({
      content,
      isAnonymous,
      cityId,
      protestId: selectedProtestId || null,
      protestTag: protestObj ? protestObj.title : null,
      images: includeImage && selectedImage ? [selectedImage] : [],
      tags: parsedTags.length ? parsedTags : ['#JanAwaz', '#Solidarity']
    });

    setContent('');
    setIsCreatePostOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/50 shrink-0">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>Publish Citizen Dispatch</span>
          </h2>
          <button
            onClick={() => setIsCreatePostOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto text-xs">
          
          {/* Anonymous Mode Shield Toggle */}
          <div className="flex items-center justify-between bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                isAnonymous ? 'bg-purple-900/40 text-purple-300' : 'bg-slate-800 text-slate-300'
              }`}>
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-200">
                  {isAnonymous ? 'Anonymous Citizen Mode' : 'Public Profile Dispatch'}
                </span>
                <p className="text-[10px] text-slate-400">
                  {isAnonymous ? 'Your identity & metadata are scrubbed for safety' : `Posting as ${currentUser.name}`}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                isAnonymous 
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30' 
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {isAnonymous ? 'Shield Active 🛡️' : 'Shield Off'}
            </button>
          </div>

          {/* Post Content */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Dispatch Update & Citizen Journalism
            </label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What is happening on the ground? Report crowd numbers, legal presence, student speeches, or movement demands..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* City & Movement Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                City / Location
              </label>
              <select
                value={cityId}
                onChange={(e) => setCityId(e.target.value)}
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
              <label className="block font-semibold text-slate-300 mb-1">
                Link to Movement
              </label>
              <select
                value={selectedProtestId}
                onChange={(e) => setSelectedProtestId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
              >
                <option value="">None (General Dispatch)</option>
                {protests.map(pr => (
                  <option key={pr.id} value={pr.id}>
                    {pr.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Attach Photo */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-slate-300">
                Attach Ground Photo / Verification
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-slate-200">
                <input
                  type="checkbox"
                  checked={includeImage}
                  onChange={(e) => setIncludeImage(e.target.checked)}
                  className="rounded border-slate-700 text-brand-500 focus:ring-0"
                />
                <span>Include photo</span>
              </label>
            </div>

            {includeImage && (
              <div className="space-y-2">
                <div className="relative h-36 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                  <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {SAMPLE_POST_IMAGES.map((img, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setSelectedImage(img)}
                      className={`w-12 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-transform ${
                        selectedImage === img ? 'border-brand-500 scale-105' : 'border-slate-700 opacity-60'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Hashtags */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Hashtags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="#RightToBreathe, #CleanAir, #Delhi"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs py-3 rounded-xl shadow-lg shadow-brand-600/30 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast Dispatch to Movement Feed</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
