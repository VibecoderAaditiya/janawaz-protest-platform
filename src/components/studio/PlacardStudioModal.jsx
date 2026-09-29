import React, { useState, useRef } from 'react';
import { 
  X, 
  Palette, 
  Type, 
  Download, 
  Share2, 
  Sparkles, 
  Flame, 
  RotateCcw, 
  Image as ImageIcon,
  Check,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const SLOGAN_PRESETS = [
  { text: "CLEAN AIR IS A FUNDAMENTAL RIGHT", subtext: "Article 21 • #RightToBreathe", category: "climate" },
  { text: "हवा साफ़ करो! साँस लेने दो!", subtext: "Delhi Clean Air Collective", category: "climate" },
  { text: "SAVE AAREY, SAVE MUMBAI'S LUNGS", subtext: "Stand with the Forest • #SaveAarey", category: "climate" },
  { text: "AFFORDABLE EDUCATION FOR EVERYONE", subtext: "Rollback Fee Hikes • Student Solidarity", category: "student" },
  { text: "WORKERS DIGNITY & FAIR WAGES", subtext: "All India Gig Workers Union", category: "labor" },
  { text: "MY BODY • MY RIGHT • MY FREEDOM", subtext: "Justice & Safety Now", category: "rights" },
  { text: "END DIGITAL SURVEILLANCE & CENSORSHIP", subtext: "Privacy is Constitutional", category: "digital" },
  { text: "ROADS WITHOUT POTHOLES IS OUR RIGHT", subtext: "Civic Accountability • Bangalore", category: "civic" }
];

const COLOR_THEMES = [
  { id: 'crimson', name: 'Protest Crimson', bg: 'from-red-600 via-rose-700 to-black', text: 'text-white', border: 'border-red-500', accent: 'bg-white text-red-600' },
  { id: 'midnight', name: 'Midnight High-Contrast', bg: 'from-slate-950 via-slate-900 to-black', text: 'text-amber-400', border: 'border-amber-400', accent: 'bg-amber-400 text-black' },
  { id: 'saffron', name: 'Saffron Energy', bg: 'from-amber-500 via-orange-600 to-red-700', text: 'text-white', border: 'border-amber-300', accent: 'bg-black text-amber-300' },
  { id: 'forest', name: 'Eco Forest Green', bg: 'from-emerald-700 via-teal-900 to-black', text: 'text-emerald-100', border: 'border-emerald-400', accent: 'bg-emerald-400 text-black' },
  { id: 'cyber', name: 'Cyber Neon Yellow', bg: 'from-yellow-400 via-amber-300 to-yellow-500', text: 'text-black', border: 'border-black', accent: 'bg-black text-yellow-400' },
  { id: 'royal', name: 'Constitutional Blue', bg: 'from-blue-700 via-indigo-900 to-slate-950', text: 'text-white', border: 'border-blue-400', accent: 'bg-blue-400 text-black' }
];

const STICKERS = ['✊', '🔥', '🌿', '⚖️', '📢', '🛡️', '⚡', '🚩', '🫁', '📚'];

export const PlacardStudioModal = ({ isOpen, onClose }) => {
  const { showToast, addStory, addPost, currentUser } = useApp();

  const [mainText, setMainText] = useState("CLEAN AIR IS A FUNDAMENTAL RIGHT");
  const [subText, setSubText] = useState("Article 21 • #RightToBreathe Delhi");
  const [selectedTheme, setSelectedTheme] = useState(COLOR_THEMES[0]);
  const [selectedSticker, setSelectedSticker] = useState('✊');
  const [fontStyle, setFontStyle] = useState('sans'); // 'sans' | 'serif' | 'mono' | 'black'
  const [hasWatermark, setHasWatermark] = useState(true);

  const posterRef = useRef(null);

  if (!isOpen) return null;

  const handleDownload = () => {
    showToast('Placard generated! Ready to print or share high-res PDF/PNG', 'success');
  };

  const handlePublishAsStory = () => {
    addStory({
      caption: `Placard: ${mainText} (${subText})`,
      cityId: 'delhi',
      location: 'Placard Studio Generator',
      mediaUrl: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=900&auto=format&fit=crop&q=80',
      isLive: false
    });
    showToast('Placard published to your 24h Ground Story! 🔥', 'success');
    onClose();
  };

  const handlePublishAsPost = () => {
    addPost({
      content: `📢 [PLACARD ART]\n\n"${mainText}"\n${subText}\n\nDownload and print this placard for upcoming rallies!`,
      isAnonymous: currentUser.isAnonymousMode,
      cityId: 'delhi',
      tags: ['#PlacardArt', '#JanAwaz', '#Solidarity']
    });
    showToast('Placard broadcast to Action Feed! 🔥', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 max-h-[94vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-500 text-white flex items-center justify-center shadow-md">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">Movement Placard & Poster Studio</h2>
              <p className="text-[11px] text-slate-400">Design high-impact protest signs in seconds</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* Left Preview Canvas (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950 p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-800">
            
            {/* The Placard Poster Board */}
            <div 
              ref={posterRef}
              className={`w-full aspect-[4/5] max-w-[320px] rounded-2xl bg-gradient-to-br ${selectedTheme.bg} ${selectedTheme.text} p-6 flex flex-col justify-between border-4 ${selectedTheme.border} shadow-2xl relative overflow-hidden select-none transition-all duration-300`}
            >
              {/* Subtle Noise Texture */}
              <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-repeat bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Top Tag & Sticker */}
              <div className="relative z-10 flex items-center justify-between">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${selectedTheme.accent} shadow-md`}>
                  JanAwaz Voice
                </span>
                <span className="text-3xl filter drop-shadow-md">
                  {selectedSticker}
                </span>
              </div>

              {/* Center Main Slogan Typography */}
              <div className="relative z-10 my-auto text-center py-4">
                <h1 className={`font-black text-2xl sm:text-3xl tracking-tight uppercase leading-tight drop-shadow-md ${
                  fontStyle === 'serif' ? 'font-serif' : fontStyle === 'mono' ? 'font-mono' : 'font-sans'
                }`}>
                  {mainText}
                </h1>
              </div>

              {/* Bottom Subtext & Watermark */}
              <div className="relative z-10 border-t border-white/20 pt-3 flex items-center justify-between text-[11px] font-semibold">
                <span className="truncate max-w-[190px]">{subText}</span>
                {hasWatermark && (
                  <span className="text-[9px] uppercase tracking-wider opacity-80">
                    जनआवाज़
                  </span>
                )}
              </div>
            </div>

            {/* Quick Canvas Actions */}
            <div className="flex items-center gap-2 mt-4 w-full max-w-[320px]">
              <button
                onClick={handleDownload}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-2 rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-brand-400" />
                <span>Save Image</span>
              </button>

              <button
                onClick={handlePublishAsStory}
                className="flex-1 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold py-2 rounded-xl shadow-md shadow-brand-600/30 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Post as Story</span>
              </button>
            </div>

          </div>

          {/* Right Controls Panel (7 cols) */}
          <div className="lg:col-span-7 p-6 space-y-5 text-xs">
            
            {/* Slogan Presets Picker */}
            <div>
              <label className="block font-bold text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
                ⚡ Rapid Slogan Presets (Tap to Apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SLOGAN_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setMainText(preset.text);
                      setSubText(preset.subtext);
                    }}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-brand-500/60 text-left transition-colors group"
                  >
                    <p className="font-bold text-slate-200 text-[11px] leading-snug line-clamp-1 group-hover:text-brand-400">
                      {preset.text}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                      {preset.subtext}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Slogan Textarea */}
            <div className="space-y-2">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Primary Protest Headline (Hindi / English / Any Language)
                </label>
                <textarea
                  rows={2}
                  value={mainText}
                  onChange={(e) => setMainText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 font-bold uppercase tracking-tight focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Sub-heading / Hashtag / Movement Source
                </label>
                <input
                  type="text"
                  value={subText}
                  onChange={(e) => setSubText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* Color Palette Themes */}
            <div>
              <label className="block font-bold text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
                🎨 Aesthetic Color Theme
              </label>
              <div className="grid grid-cols-3 gap-2">
                {COLOR_THEMES.map(theme => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setSelectedTheme(theme)}
                    className={`p-2.5 rounded-xl bg-slate-950 border flex items-center gap-2 transition-all ${
                      selectedTheme.id === theme.id ? 'border-brand-500 bg-slate-900' : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${theme.bg} border border-white/20`} />
                    <span className="font-semibold text-slate-200 text-[11px] truncate">
                      {theme.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sticker Icon Stamp & Typography Style */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Symbol / Sticker
                </label>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {STICKERS.map((stk, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedSticker(stk)}
                      className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-lg border transition-all ${
                        selectedSticker === stk ? 'bg-slate-800 border-brand-500 scale-110' : 'bg-slate-950 border-slate-800'
                      }`}
                    >
                      {stk}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Typography Font
                </label>
                <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setFontStyle('sans')}
                    className={`py-1 rounded-lg font-bold text-[10px] ${fontStyle === 'sans' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
                  >
                    Bold Sans
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontStyle('serif')}
                    className={`py-1 rounded-lg font-serif font-bold text-[10px] ${fontStyle === 'serif' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
                  >
                    Serif
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontStyle('mono')}
                    className={`py-1 rounded-lg font-mono font-bold text-[10px] ${fontStyle === 'mono' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
                  >
                    Mono
                  </button>
                </div>
              </div>
            </div>

            {/* Publish Actions */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={handlePublishAsPost}
                className="flex-1 bg-gradient-to-r from-brand-600 via-rose-600 to-amber-600 hover:opacity-95 text-white font-extrabold text-xs py-3 rounded-2xl shadow-lg shadow-rose-600/30 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Publish Placard to Action Feed</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
