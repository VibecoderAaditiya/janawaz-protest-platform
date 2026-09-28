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
  Sparkles,
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

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
    setTimeout(() => setIsFlameButtonAnimating(false), 500);

    toggleAmplifyPost(post.id);
  };

  const handleDoubleTapImage = (e) => {
    setFlamePopKey(prev => prev + 1);
    setShowFlamePop(true);

    if (!post.amplifiedByUser && !isGuest) {
      toggleAmplifyPost(post.id);
    }

    setIsFlameButtonAnimating(true);
    setTimeout(() => setIsFlameButtonAnimating(false), 500);

    setTimeout(() => {
      setShowFlamePop(false);
    }, 1050);
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
        {post.content}
      </div>

      {/* Media Image with Double-Tap Roaring Motivation Flame */}
      {post.images?.length > 0 && (
        <div 
          onDoubleClick={handleDoubleTapImage}
          className="relative bg-black select-none cursor-pointer overflow-hidden max-h-[440px] flex items-center justify-center group"
        >
          <img
            src={post.images[0]}
            alt="Post ground visual"
            className="w-full h-full object-cover max-h-[440px] transition-transform duration-300 group-hover:scale-[1.01]"
          />

          {/* Motivation Flame Hint Overlay */}
          <div className="absolute bottom-2 right-2 bg-slate-950/70 border border-slate-700 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-slate-200 font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Flame className="w-3 h-3 text-brand-400" />
            <span>Double-tap to ignite 🔥</span>
          </div>

          {/* Grand Motivation Flame Pop Effect */}
          {showFlamePop && (
            <div 
              key={flamePopKey}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
            >
              <div className="relative flex items-center justify-center">
                {/* Intense Fire Energy Radiance Halo */}
                <div className="absolute -inset-10 bg-gradient-to-t from-red-600/50 via-amber-500/40 to-yellow-300/30 rounded-full blur-2xl animate-pulse"></div>

                {/* Rising Embers Sparkles */}
                <div className="absolute -left-8 -top-6 text-xl animate-ember-1">✨</div>
                <div className="absolute right-8 -top-12 text-2xl animate-ember-2">🔥</div>
                <div className="absolute left-6 -top-16 text-lg animate-ember-3">⚡</div>

                {/* Roaring Motivation Flame Icon */}
                <div className="relative animate-flame-burst filter drop-shadow-[0_0_35px_rgba(255,77,79,1)] drop-shadow-[0_0_70px_rgba(250,140,22,0.9)]">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-brand-700 via-red-500 to-amber-400 p-1 flex items-center justify-center shadow-2xl">
                    <div className="w-full h-full rounded-full bg-slate-950/40 backdrop-blur-sm flex items-center justify-center">
                      <Flame className="w-20 h-20 text-amber-300 fill-gradient-to-t from-red-600 via-amber-400 to-yellow-200 fill-amber-400" />
                    </div>
                  </div>
                </div>

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

      {/* Action Bar (Flame / Ignite Movement, Comments, Share) */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800/80 mt-2 text-xs">
        
        <div className="flex items-center gap-4">
          {/* Flame Ignite / Amplify Button */}
          <button
            onClick={handleIgniteToggle}
            className={`flex items-center gap-1.5 font-bold transition-all px-2.5 py-1.5 rounded-xl group select-none ${
              post.amplifiedByUser
                ? 'bg-gradient-to-r from-red-600/20 to-amber-600/20 text-brand-400 border border-brand-500/40 shadow-sm shadow-brand-500/20'
                : 'text-slate-300 hover:text-brand-400 hover:bg-slate-800'
            }`}
            title="Ignite & Amplify Movement"
          >
            <div className={`${isFlameButtonAnimating ? 'animate-flame-ignite' : ''}`}>
              <Flame 
                className={`w-5 h-5 transition-transform group-hover:scale-125 duration-200 ${
                  post.amplifiedByUser 
                    ? 'fill-brand-500 text-brand-400 filter drop-shadow-[0_0_10px_rgba(255,77,79,0.9)] animate-pulse' 
                    : 'text-slate-300'
                }`} 
              />
            </div>
            <span className="font-extrabold text-sm">{post.amplifies.toLocaleString()}</span>
            <span className="hidden sm:inline font-semibold text-xs text-slate-400">Ignited</span>
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
                No comments yet. Double-tap the image to ignite with the flame of motivation! 🔥
              </p>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
