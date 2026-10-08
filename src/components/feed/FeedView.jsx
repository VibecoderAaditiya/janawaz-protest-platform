import React, { useState } from 'react';
import { 
  Radio, 
  Flame, 
  MapPin, 
  Plus, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { StoriesBar } from '../stories/StoriesBar';
import { PostCard } from './PostCard';

export const FeedView = () => {
  const { 
    filteredPosts, 
    setIsCreatePostOpen, 
    currentUser, 
    selectedCity,
    searchQuery 
  } = useApp();

  const { t } = useLanguage();
  const [feedFilter, setFeedFilter] = useState('all'); // 'all' | 'trending' | 'verified'

  const displayedPosts = filteredPosts.filter(p => {
    if (feedFilter === 'trending') return p.amplifies > 300;
    if (feedFilter === 'verified') return p.author.verified;
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      
      {/* 24h Live Ground Stories Carousel Bar */}
      <StoriesBar />

      {/* Quick Composer Header Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.isAnonymousMode ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80' : currentUser.avatar}
            alt="You"
            className="w-10 h-10 rounded-full object-cover border border-slate-700 shrink-0"
          />
          <button
            onClick={() => setIsCreatePostOpen(true)}
            className="flex-1 bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-400 text-left transition-colors flex items-center justify-between"
          >
            <span>{t('feed_composer_placeholder')}</span>
            <Plus className="w-4 h-4 text-brand-400 shrink-0" />
          </button>
        </div>
      </div>

      {/* Feed Filter Segment */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setFeedFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              feedFilter === 'all'
                ? 'bg-slate-800 text-brand-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t('filter_all_dispatches')}
          </button>

          <button
            onClick={() => setFeedFilter('trending')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
              feedFilter === 'trending'
                ? 'bg-slate-800 text-amber-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{t('filter_trending')} ({filteredPosts.filter(p => p.amplifies > 300).length})</span>
          </button>

          <button
            onClick={() => setFeedFilter('verified')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
              feedFilter === 'verified'
                ? 'bg-slate-800 text-blue-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('filter_verified')}</span>
          </button>
        </div>

        <span className="text-[11px] text-slate-500 hidden sm:inline">
          {displayedPosts.length} posts
        </span>
      </div>

      {/* Posts Stream */}
      <div className="space-y-4">
        {displayedPosts.length > 0 ? (
          displayedPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 text-center space-y-3">
            <Radio className="w-8 h-8 text-slate-600 mx-auto" />
            <h3 className="font-bold text-sm text-slate-300">{t('feed_no_dispatches')}</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {t('feed_be_first_reporter')}
            </p>
            <button
              onClick={() => setIsCreatePostOpen(true)}
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md"
            >
              {t('btn_post_first_dispatch')}
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
