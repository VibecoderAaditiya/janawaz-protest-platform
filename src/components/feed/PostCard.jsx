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
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PostCard = ({ post }) => {
  const { 
    toggleAmplifyPost, 
    addCommentToPost, 
    showToast, 
    setSelectedProtest,
    protests
  } = useApp();

  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  const handleAmplify = () => {
    toggleAmplifyPost(post.id);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Post quote copied for sharing on social platforms!', 'info');
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
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
    <div className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 rounded-2xl p-4 sm:p-5 transition-all shadow-sm">
      
      {/* Post Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className={`w-10 h-10 rounded-full object-cover border-2 ${
              post.isAnonymous ? 'border-purple-500' : 'border-slate-700'
            }`}
          />
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
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-brand-400" />
                {post.cityName}
              </span>
              <span>•</span>
              <span>{post.timestamp}</span>
            </div>
          </div>
        </div>

        {/* Linked Protest Tag Pill */}
        {post.protestTag && (
          <button
            onClick={handleProtestClick}
            className="hidden sm:flex items-center gap-1 bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/30 text-brand-300 text-[11px] font-bold px-2.5 py-1 rounded-full transition-colors"
          >
            <Radio className="w-3 h-3 text-brand-400" />
            <span className="truncate max-w-[140px]">{post.protestTag}</span>
          </button>
        )}
      </div>

      {/* Post Text Content */}
      <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line mb-3">
        {post.content}
      </div>

      {/* Media Image Grid (if any) */}
      {post.images?.length > 0 && (
        <div className={`grid gap-2 mb-3 rounded-2xl overflow-hidden ${
          post.images.length === 1 ? 'grid-cols-1 max-h-96' : 'grid-cols-2 max-h-80'
        }`}>
          {post.images.map((img, idx) => (
            <div key={idx} className="relative bg-slate-950 overflow-hidden group">
              <img
                src={img}
                alt="Post media"
                className="w-full h-full object-cover max-h-80 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}

      {/* Hashtags */}
      {post.tags?.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          {post.tags.map((tag, i) => (
            <span key={i} className="text-xs font-semibold text-brand-400 hover:underline cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Bar (Amplify, Comments, Share) */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
        
        <div className="flex items-center gap-4">
          {/* Amplify / Upvote Button */}
          <button
            onClick={handleAmplify}
            className={`flex items-center gap-1.5 font-bold transition-all px-2.5 py-1.5 rounded-xl ${
              post.amplifiedByUser
                ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Flame className={`w-4 h-4 ${post.amplifiedByUser ? 'fill-brand-400 text-brand-400 animate-bounce' : ''}`} />
            <span>{post.amplifies}</span>
            <span className="hidden sm:inline font-normal text-slate-400">Amplifies</span>
          </button>

          {/* Comment toggle */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white hover:bg-slate-800 px-2.5 py-1.5 rounded-xl transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{post.commentsCount}</span>
            <span className="hidden sm:inline font-normal text-slate-400">Comments</span>
          </button>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-slate-400 hover:text-white hover:bg-slate-800 px-2.5 py-1.5 rounded-xl transition-all"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Broadcast</span>
        </button>

      </div>

      {/* Expandable Comments Drawer */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-slate-800 space-y-3 animate-in fade-in slide-in-from-top-2">
          
          {/* Add Comment Input */}
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Add ground feedback or solidarity note..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
            />
            <button
              type="submit"
              className="bg-brand-600 hover:bg-brand-500 text-white p-2 rounded-xl transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Existing Comments List */}
          <div className="space-y-2.5 pt-1">
            {post.comments?.length > 0 ? (
              post.comments.map(c => (
                <div key={c.id} className="flex items-start gap-2.5 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
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
                No comments yet. Be the first to express solidarity!
              </p>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
