import React from 'react';
import { 
  Flame, 
  Map as MapIcon, 
  LayoutGrid, 
  Columns, 
  Calendar, 
  Radio, 
  Plus, 
  Filter, 
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Users,
  Compass,
  Leaf,
  Shield,
  GraduationCap,
  Tractor,
  HeartHandshake,
  WifiOff,
  Building2
} from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { StoriesBar } from './components/stories/StoriesBar';
import { StoryViewerModal } from './components/stories/StoryViewerModal';
import { CreateStoryModal } from './components/stories/CreateStoryModal';
import { ProtestMapView } from './components/protests/ProtestMapView';
import { ProtestCard } from './components/protests/ProtestCard';
import { ProtestDetailsModal } from './components/protests/ProtestDetailsModal';
import { CreateProtestModal } from './components/protests/CreateProtestModal';
import { FeedView } from './components/feed/FeedView';
import { CreatePostModal } from './components/feed/CreatePostModal';
import { CommunityList } from './components/communities/CommunityList';
import { ChannelDetailModal } from './components/communities/ChannelDetailModal';
import { SOSToolkitModal } from './components/sos/SOSToolkitModal';
import { ProfileModal } from './components/profile/ProfileModal';
import { AuthModal } from './components/auth/AuthModal';
import { Toast } from './components/common/Toast';
import { CATEGORIES } from './data/mockData';

// Category Icon Mapper
const getCategoryIcon = (id) => {
  switch (id) {
    case 'climate': return <Leaf className="w-3.5 h-3.5" />;
    case 'civil-rights': return <Shield className="w-3.5 h-3.5" />;
    case 'student': return <GraduationCap className="w-3.5 h-3.5" />;
    case 'labor-farmer': return <Tractor className="w-3.5 h-3.5" />;
    case 'women-safety': return <HeartHandshake className="w-3.5 h-3.5" />;
    case 'digital-privacy': return <WifiOff className="w-3.5 h-3.5" />;
    case 'civic-infra': return <Building2 className="w-3.5 h-3.5" />;
    default: return <Flame className="w-3.5 h-3.5" />;
  }
};

const MainContent = () => {
  const { 
    activeTab, 
    activeViewMode, 
    setActiveViewMode, 
    selectedCategory, 
    setSelectedCategory, 
    statusFilter, 
    setStatusFilter, 
    filteredProtests, 
    setIsCreateProtestOpen,
    selectedCity 
  } = useApp();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12 space-y-6">
      
      {/* TAB 1: PROTESTS & MAP EXPLORER */}
      {activeTab === 'explore' && (
        <div className="space-y-6">
          
          {/* Top Stories Bar */}
          <StoriesBar />

          {/* Cause Category Filter Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-brand-600 text-white border-brand-500 shadow-md shadow-brand-600/30'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Status Filters & View Mode Selector */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            {/* Status pills */}
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === 'all'
                    ? 'bg-slate-800 text-slate-100 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All Assemblies ({filteredProtests.length})
              </button>

              <button
                onClick={() => setStatusFilter('live')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                  statusFilter === 'live'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-rose-400'
                }`}
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>Live Now</span>
              </button>

              <button
                onClick={() => setStatusFilter('scheduled')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                  statusFilter === 'scheduled'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-amber-300'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Scheduled / Planned</span>
              </button>
            </div>

            {/* View Mode Switcher (Desktop) */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-slate-400">
              <button
                onClick={() => setActiveViewMode('split')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeViewMode === 'split' ? 'bg-slate-800 text-white shadow-sm' : 'hover:text-slate-200'
                }`}
                title="Split Map and Card List"
              >
                <Columns className="w-4 h-4" />
                <span>Split View</span>
              </button>

              <button
                onClick={() => setActiveViewMode('map')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeViewMode === 'map' ? 'bg-slate-800 text-white shadow-sm' : 'hover:text-slate-200'
                }`}
                title="Full Map View"
              >
                <MapIcon className="w-4 h-4" />
                <span>Map Only</span>
              </button>

              <button
                onClick={() => setActiveViewMode('list')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeViewMode === 'list' ? 'bg-slate-800 text-white shadow-sm' : 'hover:text-slate-200'
                }`}
                title="Full Cards Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Cards Grid</span>
              </button>
            </div>
          </div>

          {/* VIEW LAYOUT RENDERING */}
          {activeViewMode === 'split' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Interactive Map (6 cols) */}
              <div className="lg:col-span-6 xl:col-span-6 lg:sticky lg:top-24 h-[420px] lg:h-[calc(100vh-140px)]">
                <ProtestMapView />
              </div>

              {/* Right Column: Protest Cards (6 cols) */}
              <div className="lg:col-span-6 xl:col-span-6 space-y-4">
                {filteredProtests.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                    {filteredProtests.map(protest => (
                      <ProtestCard key={protest.id} protest={protest} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
                    <Compass className="w-8 h-8 text-slate-600 mx-auto" />
                    <h3 className="font-bold text-sm text-slate-300">No movements match current criteria</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Know about a planned march or civic vigil? Publish it on JanAwaz so citizens can join.
                    </p>
                    <button
                      onClick={() => setIsCreateProtestOpen(true)}
                      className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md"
                    >
                      Publish New Movement
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeViewMode === 'map' && (
            <div className="h-[75vh]">
              <ProtestMapView />
            </div>
          )}

          {activeViewMode === 'list' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProtests.map(protest => (
                <ProtestCard key={protest.id} protest={protest} />
              ))}
            </div>
          )}

        </div>
      )}

      {/* TAB 2: CITIZEN ACTION FEED */}
      {activeTab === 'feed' && <FeedView />}

      {/* TAB 3: MOVEMENT CHANNELS */}
      {activeTab === 'channels' && <CommunityList />}

    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-brand-500 selection:text-white">
        
        <div>
          {/* Header */}
          <Navbar />

          {/* Main App Content */}
          <MainContent />
        </div>

        {/* Global Modals */}
        <StoryViewerModal />
        <CreateStoryModal />
        <ProtestDetailsModal />
        <CreateProtestModal />
        <CreatePostModal />
        <ChannelDetailModal />
        <SOSToolkitModal />
        <ProfileModal />
        <AuthModal />

        {/* Global Floating Toast */}
        <Toast />

        {/* Mobile Navigation Bar */}
        <BottomNav />

      </div>
    </AppProvider>
  );
}
