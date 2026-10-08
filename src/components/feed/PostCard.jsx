import React, { useState } from 'react';
import { 
  Flame, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  ShieldCheck, 
  Shield, 
  MapPin, 
  Send, 
  Radio, 
  MoreHorizontal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { dynamicTranslations } from '../../i18n/translations';

export const PostCard = ({ post }) => {
  const { 
    toggleAmplifyPost, 
    addCommentToPost, 
    showToast, 
    setSelectedProtest, 
    protests,
    isGuest,
    setIsAuthModalOpen
  } = useApp();

  const { lang, t } = useLanguage();
  const postContentTranslated = dynamicTranslations[post.id]?.[lang] || post.content;

  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [showFlamePop, setShowFlamePop] = useState(false);
  const [flamePopKey, setFlamePopKey] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFlameButtonAnimating, setIsFlameButtonAnimating] = useState(false);

  const handleIgniteToggle = (e) => {
    e?.stopPropagation();
    if (isGuest) {
      setIsAuthModalOpen(true);
      showToast('Please sign in or create an account to ignite movements', 'info');
      return;
    }
    setIsFlameButtonAnimating(true);
    setTimeout(() => setIsFlameButtonAnimating(false), 450);

    toggleAmplifyPost(post.id);
  };

  const handleDoubleTapImage = (e) => {
    setFlamePopKey(prev => prev + 1);
    setShowFlamePop(true);

    if (!post.amplifiedByUser && !isGuest) {
      toggleAmplifyPost(post.id);
    }

    setIsFlameButtonAnimating(true);
    setTimeout(() => setIsFlameButtonAnimating(false), 450);

    setTimeout(() => {
      setShowFlamePop(false);
    }, 900);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Movement dispatch copied for broadcasting!', 'info');
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (isGuest) {
      setIsAuthModalOpen(true);
      showToast('Please sign in to join discussions', 'info');
      return;
    }
    if (!commentInput.trim()) return;
    addCommentToPost(post.id, commentInput);
    setCommentInput('');
  };

  const handleProtestClick = () => {
    if (post.protestId) {
      const pr = protests.find(p => p.id === post.protestId);
      if (pr) setSelectedProtest(pr);
    }
  };

  return (
    <div className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800/90 rounded-3xl overflow-hidden transition-all shadow-lg hover:shadow-2xl hover:shadow-brand-500/10">
      
      {/* Post Header */}
      <div className="flex items-center justify-between p-3.5 sm:p-4 pb-2.5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className={`w-10 h-10 rounded-full object-cover border-2 ${
                post.isAnonymous ? 'border-purple-500' : 'border-brand-500'
              }`}
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-sm text-slate-100">
                {post.author.name}
              </span>
              {post.author.verified && !post.isAnonymous && (
                <ShieldCheck className="w-4 h-4 text-blue-400 fill-blue-400/20" />
              )}
              {post.isAnonymous && (
                <span className="bg-purple-950/80 text-purple-300 border border-purple-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Shield className="w-3 h-3 text-purple-400" />
                  Shielded
                </span>
              )}
              {post.author.badge && !post.isAnonymous && (
                <span className="bg-slate-800 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-slate-700">
                  {post.author.badge}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
              <span>{post.author.handle}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5">
                <MapPin className="w-3 h-3 text-brand-400" />
                {post.cityName}
              </span>
              <span>•</span>
              <span>{post.timestamp}</span>
            </div>
          </div>
        </div>

        {/* Linked Movement Tag */}
        {post.protestTag && (
          <button
            onClick={handleProtestClick}
            className="hidden sm:flex items-center gap-1 bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/30 text-brand-300 text-[11px] font-bold px-2.5 py-1 rounded-full transition-colors"
          >
            <Radio className="w-3 h-3 text-brand-400" />
            <span className="truncate max-w-[130px]">{post.protestTag}</span>
          </button>
        )}
      </div>

      {/* Post Text Content */}
      <div className="px-4 py-2 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
        {postContentTranslated}
      </div>

      {/* Media Image with Clean, Ultra-Smooth Vector Flame Pop */}
      {post.images?.length > 0 && (
        <div 
          onDoubleClick={handleDoubleTapImage}
          className="relative bg-black select-none cursor-pointer overflow-hidden max-h-[440px] flex items-center justify-center group"
        >
          <img
            src={post.images[0]}
            alt="Post ground visual"
            className="w-full h-full object-cover max-h-[440px] transition-transform duration-500 group-hover:scale-[1.01]"
          />

          {/* Minimalist Double-Tap Flame Shockwave Animation */}
          {showFlamePop && (
            <div 
              key={flamePopKey}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
            >
              {/* Expanding Frosted Glass Shockwave Ring */}
              <div className="absolute w-36 h-36 rounded-full border border-rose-400/80 bg-rose-500/10 backdrop-blur-sm animate-smooth-shockwave" />

              {/* Radial Light Halo */}
              <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-rose-600/60 via-amber-500/40 to-yellow-400/20 blur-2xl animate-smooth-halo" />

              {/* Sculpted Flame Vector */}
              <div className="relative animate-smooth-flame">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-24 h-24 filter drop-shadow-[0_4px_24px_rgba(255,77,79,0.95)]"
                >
                  <defs>
                    <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#cf1322" />
                      <stop offset="45%" stopColor="#ff4d4f" />
                      <stop offset="80%" stopColor="#ffa940" />
                      <stop offset="100%" stopColor="#fffb8f" />
                    </linearGradient>
                    <linearGradient id="innerCore" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#ffa940" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                  </defs>
                  
                  {/* Outer Flame Silhouette */}
                  <path 
                    d="M12 2C9.5 5.5 8 8.5 8 11.5c0 1.2.3 2.3.9 3.2-1.3-.9-1.9-2.2-1.9-3.7 0-.5.1-1 .2-1.5C5.1 11.2 4 13.5 4 16c0 4.4 3.6 8 8 8s8-3.6 8-8c0-3.2-1.9-6.3-4.5-8.5.3 1.2.2 2.5-.5 3.5-.8-1.5-1.7-3.2-1.7-5.5 0-1.2.4-2.4 1.2-3.5C13.5 2.2 12.8 2 12 2z" 
                    fill="url(#flameGrad)" 
                  />
                  
                  {/* Inner Golden Core */}
                  <path 
                    d="M12 11c-1.5 2-2 3.5-2 5 0 2.2 1.8 4 4 4s4-1.8 4-4c0-1.8-1.2-3.5-2.5-4.8.2.8.1 1.6-.3 2.3-.5-1-1.2-2.1-1.2-3.5 0-.7.3-1.5.8-2.2-.6.4-1.1.9-1.5 1.5l-1.3 1.7z" 
                    fill="url(#innerCore)" 
                    opacity="0.95"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hashtags */}
      {post.tags?.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap px-4 pt-2.5">
          {post.tags.map((tag, i) => (
            <span key={i} className="text-xs font-semibold text-brand-400 hover:underline cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800/80 mt-2 text-xs">
        
        <div className="flex items-center gap-4">
          {/* Flame Ignite / Amplify Button with Smooth Spring Bounce */}
          <button
            onClick={handleIgniteToggle}
            className={`flex items-center gap-1.5 font-bold transition-all px-2.5 py-1.5 rounded-xl group select-none ${
              post.amplifiedByUser
                ? 'bg-rose-500/15 text-brand-400 border border-brand-500/30 shadow-sm shadow-brand-500/20'
                : 'text-slate-300 hover:text-brand-400 hover:bg-slate-800'
            }`}
            title="Ignite & Amplify Movement"
          >
            <div className={`${isFlameButtonAnimating ? 'animate-smooth-btn' : ''}`}>
              <Flame 
                className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                  post.amplifiedByUser 
                    ? 'fill-brand-500 text-brand-400 filter drop-shadow-[0_0_8px_rgba(255,77,79,0.85)]' 
                    : 'text-slate-300'
                }`} 
              />
            </div>
            <span className="font-extrabold text-sm">{post.amplifies.toLocaleString()}</span>
            <span className="hidden sm:inline font-semibold text-xs text-slate-400">{t('post_ignited')}</span>
          </button>

          {/* Comment toggle */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white px-2 py-1 rounded-xl transition-all group"
          >
            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-semibold">{post.commentsCount}</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="text-slate-300 hover:text-white px-2 py-1 rounded-xl transition-all group"
          >
            <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Bookmark */}
        <button
          onClick={() => {
            setIsBookmarked(!isBookmarked);
            showToast(isBookmarked ? 'Removed from saved' : 'Saved to movement bookmarks', 'info');
          }}
          className={`p-1.5 rounded-xl transition-colors ${
            isBookmarked ? 'text-brand-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-brand-400' : ''}`} />
        </button>

      </div>

      {/* Expandable Comments Drawer */}
      {showComments && (
        <div className="p-4 pt-2 border-t border-slate-800/80 bg-slate-950/40 space-y-3 animate-in fade-in slide-in-from-top-2">
          
          {/* Add Comment Input */}
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Add ground solidarity or feedback..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
            />
            <button
              type="submit"
              className="bg-brand-600 hover:bg-brand-500 text-white p-2 rounded-xl transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Existing Comments */}
          <div className="space-y-2 pt-1 max-h-48 overflow-y-auto">
            {post.comments?.length > 0 ? (
              post.comments.map(c => (
                <div key={c.id} className="flex items-start gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                  <img
                    src={c.avatar}
                    alt={c.author}
                    className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-slate-200 truncate">{c.author}</span>
                      <span className="text-[10px] text-slate-500">{c.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-snug mt-0.5">{c.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic text-center py-2">
                No comments yet. Double-tap the image to ignite the movement! 🔥
              </p>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
