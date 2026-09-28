import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CITIES, 
  CATEGORIES, 
  INITIAL_PROTESTS, 
  INITIAL_STORIES, 
  INITIAL_POSTS, 
  INITIAL_COMMUNITIES, 
  SOS_LEGAL_DATA 
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Authentication & User State
  const [isGuest, setIsGuest] = useState(() => {
    return localStorage.getItem('janawaz_is_guest') === 'true';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('janawaz_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr-self',
      name: 'Aadi Sharma',
      handle: '@aadi_citizen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      role: 'Activist Citizen',
      city: 'delhi',
      verified: true,
      isAnonymousMode: false,
      joinedCommunities: ['comm-1', 'comm-2'],
      attendedProtests: ['pr-1'],
      savedFlashcards: ['right-1', 'right-3', 'right-5']
    };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Filters & Navigation
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'live' | 'scheduled'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'feed' | 'channels' | 'sos'
  const [activeViewMode, setActiveViewMode] = useState('split'); // 'split' | 'map' | 'list'

  // Dynamic Data Lists with LocalStorage caching
  const [protests, setProtests] = useState(() => {
    const saved = localStorage.getItem('janawaz_protests');
    return saved ? JSON.parse(saved) : INITIAL_PROTESTS;
  });

  const [stories, setStories] = useState(() => {
    const saved = localStorage.getItem('janawaz_stories');
    return saved ? JSON.parse(saved) : INITIAL_STORIES;
  });

  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('janawaz_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [communities, setCommunities] = useState(() => {
    const saved = localStorage.getItem('janawaz_communities');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITIES;
  });

  // Modal States
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [selectedProtest, setSelectedProtest] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [isCreateProtestOpen, setIsCreateProtestOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false);
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('janawaz_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('janawaz_is_guest', String(isGuest));
  }, [isGuest]);

  useEffect(() => {
    localStorage.setItem('janawaz_protests', JSON.stringify(protests));
  }, [protests]);

  useEffect(() => {
    localStorage.setItem('janawaz_stories', JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    localStorage.setItem('janawaz_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('janawaz_communities', JSON.stringify(communities));
  }, [communities]);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Auth Handlers
  const loginUser = (userData) => {
    setIsGuest(false);
    setCurrentUser(prev => ({
      ...prev,
      ...userData,
      id: userData.id || `usr-${Date.now()}`,
      name: userData.name || userData.email.split('@')[0],
      handle: userData.handle || `@${userData.email.split('@')[0]}`,
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      role: userData.role || 'Activist Citizen',
      verified: userData.verified ?? true
    }));
    showToast(`Solidarity! Logged in as ${userData.name || 'Citizen'} 🔥`, 'success');
  };

  const signupUser = (formData) => {
    setIsGuest(false);
    const newUser = {
      id: `usr-${Date.now()}`,
      name: formData.name,
      handle: formData.handle,
      avatar: formData.avatar,
      role: 'Activist Citizen',
      city: formData.city,
      verified: false,
      isAnonymousMode: false,
      joinedCommunities: [],
      attendedProtests: [],
      savedFlashcards: []
    };
    setCurrentUser(newUser);
    showToast(`Movement account registered for ${formData.name} 🔥`, 'success');
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    showToast('Browsing in Guest Mode (Read-only access)', 'info');
  };

  const logoutUser = () => {
    setIsGuest(true);
    showToast('Logged out. You are now browsing in Guest Mode.', 'info');
  };

  // Actions
  const toggleRSVP = (protestId) => {
    if (isGuest) {
      setIsAuthModalOpen(true);
      showToast('Please sign in to join movements and register RSVP', 'info');
      return;
    }

    setProtests(prev => prev.map(pr => {
      if (pr.id === protestId) {
        const willAttend = !pr.attendingUser;
        if (willAttend) {
          showToast(`Solidarity registered! You are joining "${pr.title}" 🔥`, 'success');
        } else {
          showToast(`RSVP cancelled for "${pr.title}"`, 'info');
        }
        return {
          ...pr,
          attendingUser: willAttend,
          headcount: willAttend ? pr.headcount + 1 : Math.max(0, pr.headcount - 1)
        };
      }
      return pr;
    }));
  };

  const addProtest = (newProtestData) => {
    if (isGuest) {
      setIsAuthModalOpen(true);
      showToast('Please sign in to organize and publish movements', 'info');
      return;
    }

    const cityObj = CITIES.find(c => c.id === newProtestData.cityId) || CITIES[1];
    const categoryObj = CATEGORIES.find(c => c.id === newProtestData.category) || CATEGORIES[1];
    
    const newProtest = {
      id: `pr-${Date.now()}`,
      title: newProtestData.title,
      slug: newProtestData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      cityId: newProtestData.cityId,
      cityName: cityObj.name,
      venue: newProtestData.venue,
      lat: Number(newProtestData.lat) || cityObj.lat + (Math.random() - 0.5) * 0.05,
      lng: Number(newProtestData.lng) || cityObj.lng + (Math.random() - 0.5) * 0.05,
      status: newProtestData.status || 'scheduled',
      date: newProtestData.date || 'Upcoming Assembly',
      scheduledDate: newProtestData.scheduledDate || new Date().toISOString(),
      category: newProtestData.category,
      categoryName: categoryObj.name,
      organizer: {
        name: currentUser.isAnonymousMode ? 'Anonymous Citizen' : currentUser.name,
        handle: currentUser.isAnonymousMode ? '@ground_citizen' : currentUser.handle,
        verified: !currentUser.isAnonymousMode,
        avatar: currentUser.avatar
      },
      headcount: 1,
      attendingUser: true,
      safetyStatus: {
        level: newProtestData.safetyLevel || 'green',
        label: newProtestData.safetyNotes || 'Permitted Peaceful Assembly',
        lastReported: 'Just now'
      },
      coverImage: newProtestData.coverImage || 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=1000&auto=format&fit=crop&q=80',
      description: newProtestData.description,
      demands: newProtestData.demands?.length ? newProtestData.demands : ['Peaceful dialogue and institutional reform'],
      volunteerRolesNeeded: newProtestData.volunteerRolesNeeded || ['Legal Observers', 'First Aid'],
      assemblyPoint: newProtestData.assemblyPoint || newProtestData.venue,
      sharesCount: 1,
      broadcastNotes: newProtestData.broadcastNotes || ''
    };

    setProtests([newProtest, ...protests]);
    showToast('Movement published to JanAwaz map and calendar! 🔥', 'success');
  };

  const addStory = (storyData) => {
    if (isGuest) {
      setIsAuthModalOpen(true);
      showToast('Please sign in to upload ground stories', 'info');
      return;
    }

    const cityObj = CITIES.find(c => c.id === storyData.cityId) || CITIES[1];
    const newStory = {
      id: `story-${Date.now()}`,
      userName: currentUser.isAnonymousMode ? 'Anonymous Citizen' : currentUser.name,
      userHandle: currentUser.isAnonymousMode ? '@anon_observer' : currentUser.handle,
      userAvatar: currentUser.avatar,
      verified: !currentUser.isAnonymousMode,
      location: storyData.location || `${cityObj.name} Ground`,
      cityId: storyData.cityId || 'delhi',
      timestamp: 'Just now',
      mediaUrl: storyData.mediaUrl,
      mediaType: 'image',
      caption: storyData.caption,
      protestId: storyData.protestId || null,
      cheersCount: 0,
      isLive: storyData.isLive ?? true
    };
    setStories([newStory, ...stories]);
    showToast('Ground story uploaded to live 24h stream! 🔥', 'success');
  };

  const cheerStory = (storyId) => {
    setStories(prev => prev.map(st => {
      if (st.id === storyId) {
        return { ...st, cheersCount: st.cheersCount + 1 };
      }
      return st;
    }));
  };

  const addPost = (postData) => {
    if (isGuest) {
      setIsAuthModalOpen(true);
      showToast('Please sign in to broadcast dispatches', 'info');
      return;
    }

    const cityObj = CITIES.find(c => c.id === postData.cityId) || CITIES[1];
    const newPost = {
      id: `post-${Date.now()}`,
      author: {
        name: postData.isAnonymous ? 'Anonymous Chronicler' : currentUser.name,
        handle: postData.isAnonymous ? '@ground_chronicler' : currentUser.handle,
        avatar: currentUser.avatar,
        badge: postData.isAnonymous ? 'Anonymous Citizen' : currentUser.role,
        verified: !postData.isAnonymous
      },
      isAnonymous: postData.isAnonymous,
      cityName: cityObj.name,
      cityId: postData.cityId,
      protestTag: postData.protestTag || '#CitizenVoice',
      protestId: postData.protestId || null,
      timestamp: 'Just now',
      content: postData.content,
      images: postData.images || [],
      amplifies: 1,
      amplifiedByUser: true,
      commentsCount: 0,
      comments: [],
      tags: postData.tags || ['#JanAwaz', '#CivicAction']
    };
    setPosts([newPost, ...posts]);
    showToast('Dispatch amplified across movement feeds! 🔥', 'success');
  };

  const toggleAmplifyPost = (postId) => {
    if (isGuest) {
      setIsAuthModalOpen(true);
      showToast('Please sign in to ignite dispatches', 'info');
      return;
    }

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isAmplified = !p.amplifiedByUser;
        return {
          ...p,
          amplifiedByUser: isAmplified,
          amplifies: isAmplified ? p.amplifies + 1 : Math.max(0, p.amplifies - 1)
        };
      }
      return p;
    }));
  };

  const addCommentToPost = (postId, commentText) => {
    if (isGuest) {
      setIsAuthModalOpen(true);
      showToast('Please sign in to comment', 'info');
      return;
    }
    if (!commentText.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      author: currentUser.isAnonymousMode ? 'Anonymous Citizen' : currentUser.name,
      handle: currentUser.isAnonymousMode ? '@anon' : currentUser.handle,
      avatar: currentUser.avatar,
      content: commentText,
      timestamp: 'Just now'
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    }));
    showToast('Comment added', 'success');
  };

  const toggleJoinCommunity = (communityId) => {
    if (isGuest) {
      setIsAuthModalOpen(true);
      showToast('Please sign in to join movement channels', 'info');
      return;
    }

    setCommunities(prev => prev.map(comm => {
      if (comm.id === communityId) {
        const isJoined = !comm.isJoined;
        if (isJoined) {
          showToast(`Joined ${comm.name}! 🔥`, 'success');
        } else {
          showToast(`Left ${comm.name}`, 'info');
        }
        return {
          ...comm,
          isJoined,
          membersCount: isJoined ? comm.membersCount + 1 : comm.membersCount - 1
        };
      }
      return comm;
    }));
  };

  const sendChatMessage = (communityId, messageText) => {
    if (isGuest) {
      setIsAuthModalOpen(true);
      showToast('Please sign in to participate in channel discussions', 'info');
      return;
    }
    if (!messageText.trim()) return;
    const newMsg = {
      id: `m-${Date.now()}`,
      sender: currentUser.isAnonymousMode ? 'Anonymous Activist' : currentUser.name,
      handle: currentUser.isAnonymousMode ? '@anon' : currentUser.handle,
      time: 'Just now',
      text: messageText
    };

    setCommunities(prev => prev.map(comm => {
      if (comm.id === communityId) {
        return {
          ...comm,
          chatMessages: [...comm.chatMessages, newMsg]
        };
      }
      return comm;
    }));
  };

  const toggleAnonymousMode = () => {
    setCurrentUser(prev => {
      const nextMode = !prev.isAnonymousMode;
      showToast(nextMode ? 'Anonymous Shield Activated 🛡️ (Identity hidden)' : 'Public Activist Identity Active', 'info');
      return { ...prev, isAnonymousMode: nextMode };
    });
  };

  // Filtered lists
  const filteredProtests = protests.filter(pr => {
    const matchesCity = selectedCity === 'all' || pr.cityId === selectedCity;
    const matchesCategory = selectedCategory === 'all' || pr.category === selectedCategory;
    const matchesStatus = statusFilter === 'all' || pr.status === statusFilter;
    const matchesSearch = !searchQuery.trim() || 
      pr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pr.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pr.cityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pr.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesCategory && matchesStatus && matchesSearch;
  });

  const filteredStories = stories.filter(st => {
    if (selectedCity === 'all') return true;
    return st.cityId === selectedCity;
  });

  const filteredPosts = posts.filter(p => {
    const matchesCity = selectedCity === 'all' || p.cityId === selectedCity;
    const matchesSearch = !searchQuery.trim() ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.protestTag?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.cityName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      isGuest,
      isAuthModalOpen,
      setIsAuthModalOpen,
      loginUser,
      signupUser,
      continueAsGuest,
      logoutUser,
      selectedCity,
      setSelectedCity,
      selectedCategory,
      setSelectedCategory,
      statusFilter,
      setStatusFilter,
      searchQuery,
      setSearchQuery,
      activeTab,
      setActiveTab,
      activeViewMode,
      setActiveViewMode,
      protests,
      filteredProtests,
      stories,
      filteredStories,
      posts,
      filteredPosts,
      communities,
      activeStoryIndex,
      setActiveStoryIndex,
      selectedProtest,
      setSelectedProtest,
      selectedCommunity,
      setSelectedCommunity,
      isCreateProtestOpen,
      setIsCreateProtestOpen,
      isCreatePostOpen,
      setIsCreatePostOpen,
      isCreateStoryOpen,
      setIsCreateStoryOpen,
      isSOSOpen,
      setIsSOSOpen,
      isProfileOpen,
      setIsProfileOpen,
      toastMessage,
      showToast,
      toggleRSVP,
      addProtest,
      addStory,
      cheerStory,
      addPost,
      toggleAmplifyPost,
      addCommentToPost,
      toggleJoinCommunity,
      sendChatMessage,
      toggleAnonymousMode,
      sosData: SOS_LEGAL_DATA
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
