export const CITIES = [
  { id: 'all', name: 'All India', state: 'National', lat: 22.5937, lng: 78.9629, zoom: 5 },
  { id: 'delhi', name: 'Delhi NCR', state: 'Delhi', lat: 28.6139, lng: 77.2090, zoom: 12 },
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', lat: 18.9400, lng: 72.8300, zoom: 12 },
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lng: 77.5946, zoom: 12 },
  { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639, zoom: 12 },
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707, zoom: 12 },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867, zoom: 12 },
  { id: 'pune', name: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567, zoom: 12 },
  { id: 'chandigarh', name: 'Chandigarh', state: 'Punjab/Haryana', lat: 30.7333, lng: 76.7794, zoom: 12 },
  { id: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462, zoom: 12 },
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873, zoom: 12 },
];

export const CATEGORIES = [
  { id: 'all', name: 'All Movements', icon: 'Flame', color: 'bg-slate-700 text-slate-100' },
  { id: 'climate', name: 'Climate & Clean Air', icon: 'Leaf', color: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30' },
  { id: 'civil-rights', name: 'Civil & Constitutional Rights', icon: 'Shield', color: 'bg-blue-600/20 text-blue-400 border-blue-500/30' },
  { id: 'student', name: 'Student & Youth Voice', icon: 'GraduationCap', color: 'bg-purple-600/20 text-purple-400 border-purple-500/30' },
  { id: 'labor-farmer', name: 'Farmers & Labor Rights', icon: 'Tractor', color: 'bg-amber-600/20 text-amber-400 border-amber-500/30' },
  { id: 'women-safety', name: 'Women Safety & Justice', icon: 'HeartHandshake', color: 'bg-rose-600/20 text-rose-400 border-rose-500/30' },
  { id: 'digital-privacy', name: 'Digital Rights & Privacy', icon: 'WifiOff', color: 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30' },
  { id: 'civic-infra', name: 'Civic Roads & Public Infra', icon: 'Building2', color: 'bg-orange-600/20 text-orange-400 border-orange-500/30' }
];

export const INITIAL_PROTESTS = [
  {
    id: 'pr-1',
    title: '#RightToBreathe: Mega Clean Air Vigil & Human Chain',
    slug: 'right-to-breathe-delhi',
    cityId: 'delhi',
    cityName: 'Delhi NCR',
    venue: 'Jantar Mantar & India Gate Lawns',
    lat: 28.6271,
    lng: 77.2166,
    status: 'live', // 'live' | 'scheduled' | 'concluded'
    date: 'Today, Live Now',
    scheduledDate: '2026-09-28T14:00:00Z',
    category: 'climate',
    categoryName: 'Climate & Clean Air',
    organizer: {
      name: 'Delhi Clean Air Collective',
      handle: '@cleanair_delhi',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80'
    },
    headcount: 3420,
    attendingUser: true,
    safetyStatus: {
      level: 'green', // 'green' (peaceful) | 'yellow' (barricades/heavy police) | 'red' (high alert)
      label: 'Peaceful Assembly • Medical & Legal Desk Open',
      lastReported: '12 mins ago by Legal Observers'
    },
    coverImage: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=1000&auto=format&fit=crop&q=80',
    description: 'Demanding year-round emission controls, stoppage of stubble-burning without farmer penalties, 10,000 new electric public buses, and continuous industrial air quality monitoring across Delhi-NCR.',
    demands: [
      'Urgent subsidy on zero-emission farm machinery for stubble management',
      'Phase out diesel heavy vehicles from core city zones with transition support',
      'Tripling air quality monitoring stations in school zones & slums',
      'Free N95 distribution drives for civic workers and traffic police'
    ],
    volunteerRolesNeeded: ['First Aid / Paramedics', 'Legal Observers (PUCL)', 'Water Supply Volunteers', 'ASL / Sign Language Translators'],
    assemblyPoint: 'Gate 2, Jantar Mantar Outer Circle',
    liveStreamUrl: 'https://twitch.tv/delhicleanair',
    sharesCount: 1420,
    broadcastNotes: 'Rain ponchos and water refill canisters available at Tent #3 near Tolstoy Marg.'
  },
  {
    id: 'pr-2',
    title: '#SaveAarey & Forest Sanctuary Protection March',
    slug: 'save-aarey-mumbai',
    cityId: 'mumbai',
    cityName: 'Mumbai',
    venue: 'Azad Maidan & CSMT Junction',
    lat: 18.9405,
    lng: 72.8335,
    status: 'live',
    date: 'Live Now (Day 3)',
    scheduledDate: '2026-09-28T10:00:00Z',
    category: 'climate',
    categoryName: 'Climate & Clean Air',
    organizer: {
      name: 'Aarey Conservation Group',
      handle: '@saveaareymumbai',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
    },
    headcount: 2150,
    attendingUser: false,
    safetyStatus: {
      level: 'yellow',
      label: 'Heavy Barricading at Mahapalika Marg • Peaceful Inside',
      lastReported: '25 mins ago'
    },
    coverImage: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=1000&auto=format&fit=crop&q=80',
    description: 'Indefinite peaceful sit-in at Azad Maidan resisting commercial buffer-zone de-reservation inside the eco-sensitive Aarey Milk Colony forest belt.',
    demands: [
      'Statutory declaration of complete 3,000-acre Aarey sector as Protected Forest',
      'Halt on commercial land conversion tenders',
      'Restoration of indigenous tribal grazing and cultivation access rights'
    ],
    volunteerRolesNeeded: ['Legal Observers', 'Food & Hydration Crew', 'Documentary Photographers'],
    assemblyPoint: 'Azad Maidan North Pavilion, opposite BMC HQ',
    sharesCount: 980,
    broadcastNotes: 'Bring own steel water bottles. Keep IDs handy.'
  },
  {
    id: 'pr-3',
    title: 'Karnataka Public Transport & Zero Pothole Satyagraha',
    slug: 'fix-our-roads-bengaluru',
    cityId: 'bengaluru',
    cityName: 'Bengaluru',
    venue: 'Freedom Park, Seshadri Road',
    lat: 12.9818,
    lng: 77.5817,
    status: 'scheduled',
    date: 'Oct 02, 2026 (Gandhi Jayanti) • 09:30 AM',
    scheduledDate: '2026-10-02T09:30:00Z',
    category: 'civic-infra',
    categoryName: 'Civic Roads & Public Infra',
    organizer: {
      name: 'Bengaluru Commuters Forum',
      handle: '@blrcitizensunite',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
    },
    headcount: 4890,
    attendingUser: true,
    safetyStatus: {
      level: 'green',
      label: 'Permitted Peaceful Gathering • Ambulance on Standby',
      lastReported: '1 hour ago'
    },
    coverImage: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1000&auto=format&fit=crop&q=80',
    description: 'Mass citizen assembly demanding time-bound civic road audits, 4,000 extra BMTC feeder buses, completed metro phase lines, and criminal liability for negligent civic contractors.',
    demands: [
      'Ward-level public safety road audit with live contractor escrow transparency',
      'Doubling of BMTC bus fleet to 12,000 buses',
      'Dedicated cycling corridors and walkable footpaths across ORR & Whitefield'
    ],
    volunteerRolesNeeded: ['Traffic Marshals', 'Crowd Safety Volunteers', 'Signpost Placard Artists'],
    assemblyPoint: 'Main Stage, Freedom Park',
    sharesCount: 3100,
    broadcastNotes: 'Carpool or take Metro to Majestic / Sir M. Visvesvaraya station.'
  },
  {
    id: 'pr-4',
    title: 'All-India Gig Workers & Delivery Riders Dignity Rally',
    slug: 'gig-workers-rights-hyderabad',
    cityId: 'hyderabad',
    cityName: 'Hyderabad',
    venue: 'Dharna Chowk, Indira Park',
    lat: 17.4126,
    lng: 78.4899,
    status: 'live',
    date: 'Live Now • Rally to Collectorate',
    scheduledDate: '2026-09-28T11:00:00Z',
    category: 'labor-farmer',
    categoryName: 'Farmers & Labor Rights',
    organizer: {
      name: 'Telangana Gig & Platform Workers Union',
      handle: '@tgpwu_union',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
    },
    headcount: 1820,
    attendingUser: false,
    safetyStatus: {
      level: 'green',
      label: 'Smooth Assembly • Legal Counsel Present',
      lastReported: '40 mins ago'
    },
    coverImage: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1000&auto=format&fit=crop&q=80',
    description: 'Demanding statutory social security, minimum floor base fare per km, accident insurance guarantee, and algorithmic transparency on arbitrary account bans.',
    demands: [
      'Mandatory Gig Workers Welfare Board with platform transaction cess',
      'Minimum guaranteed ₹25 base fare + ₹12/km surge transparency',
      'Strict ban on dark pattern time-penalties causing road hazard accidents'
    ],
    volunteerRolesNeeded: ['Legal Desk Aid', 'Social Media Amplifiers'],
    assemblyPoint: 'Indira Park Gate 1',
    sharesCount: 820,
    broadcastNotes: 'All delivery partners from Swiggy, Zomato, Blinkit, Zepto, Uber, Ola welcome.'
  },
  {
    id: 'pr-5',
    title: 'Save Public University Autonomy & Affordable Hostel Fees',
    slug: 'save-higher-education-kolkata',
    cityId: 'kolkata',
    cityName: 'Kolkata',
    venue: 'College Street & Esplanade Y-Channel',
    lat: 22.5697,
    lng: 88.3533,
    status: 'scheduled',
    date: 'Oct 04, 2026 • 02:00 PM',
    scheduledDate: '2026-10-04T14:00:00Z',
    category: 'student',
    categoryName: 'Student & Youth Voice',
    organizer: {
      name: 'Joint Student Action Committee WB',
      handle: '@studentaction_kol',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80'
    },
    headcount: 3100,
    attendingUser: false,
    safetyStatus: {
      level: 'green',
      label: 'Scheduled Peaceful March',
      lastReported: 'Yesterday'
    },
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&auto=format&fit=crop&q=80',
    description: 'Students across Presidency, Jadavpur, and Calcutta University marching for rolling back fee hikes, repairing hostel infrastructure, and releasing pending national research fellowships.',
    demands: [
      'Rollback of 40% hostel fee escalation',
      'Immediate disbursal of pending UGC and State PhD Fellowships',
      'Restoration of democratically elected campus student councils'
    ],
    volunteerRolesNeeded: ['First Aid Marshals', 'Banner Artists'],
    assemblyPoint: 'College Street Boi Para Crossing',
    sharesCount: 1650,
    broadcastNotes: 'Rain umbrellas advised. Medical kit stations at Esplanade Y-Channel.'
  },
  {
    id: 'pr-6',
    title: 'Digital Privacy, Free Expression & Anti-Censorship Coalition',
    slug: 'digital-freedom-chennai',
    cityId: 'chennai',
    cityName: 'Chennai',
    venue: 'Valluvar Kottam Memorial Grounds',
    lat: 13.0537,
    lng: 80.2407,
    status: 'scheduled',
    date: 'Oct 08, 2026 • 04:30 PM',
    scheduledDate: '2026-10-08T16:30:00Z',
    category: 'digital-privacy',
    categoryName: 'Digital Rights & Privacy',
    organizer: {
      name: 'Internet & Civil Rights Collective TN',
      handle: '@digitalfreedom_in',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
    },
    headcount: 1450,
    attendingUser: false,
    safetyStatus: {
      level: 'green',
      label: 'Open-Air Teach-In & Silent Candlelight Vigil',
      lastReported: '3 hours ago'
    },
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80',
    description: 'Teach-in, panel discussions, and candlelight demonstration addressing surveillance safeguards, encrypted communication rights, and opposition to arbitrary internet shutdowns.',
    demands: [
      'Strict judicial review protocols before internet shutdowns',
      'Strong end-to-end encryption statutory protections without backdoor mandates',
      'Citizen privacy commission independent of state telecom departments'
    ],
    volunteerRolesNeeded: ['Tech Security Workshop Hosts', 'Legal Advisers'],
    assemblyPoint: 'Valluvar Kottam Lawn B',
    sharesCount: 780,
    broadcastNotes: 'Workshops on PGP keys, Signal messaging, and Tor browser setup starting 05:00 PM.'
  }
];

export const INITIAL_STORIES = [
  {
    id: 'story-1',
    userName: 'Delhi Clean Air',
    userHandle: '@cleanair_delhi',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    verified: true,
    location: 'Jantar Mantar, Delhi',
    cityId: 'delhi',
    timestamp: '18 mins ago',
    mediaUrl: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=900&auto=format&fit=crop&q=80',
    mediaType: 'image',
    caption: 'Over 3,000 citizens holding placards at Jantar Mantar right now! Air quality sensors reading 380 AQI. We need immediate policy action! 🫁✊',
    protestId: 'pr-1',
    cheersCount: 420,
    isLive: true
  },
  {
    id: 'story-2',
    userName: 'Aarey Warriors',
    userHandle: '@saveaareymumbai',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    verified: true,
    location: 'Azad Maidan, Mumbai',
    cityId: 'mumbai',
    timestamp: '45 mins ago',
    mediaUrl: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=900&auto=format&fit=crop&q=80',
    mediaType: 'image',
    caption: 'Songs of the forest echo through Azad Maidan! Indigenous Warli artists singing folk songs for forest conservation. 🌳🎵',
    protestId: 'pr-2',
    cheersCount: 298,
    isLive: true
  },
  {
    id: 'story-3',
    userName: 'Riders Unity HYD',
    userHandle: '@tgpwu_union',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    verified: true,
    location: 'Dharna Chowk, Hyderabad',
    cityId: 'hyderabad',
    timestamp: '1 hour ago',
    mediaUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&auto=format&fit=crop&q=80',
    mediaType: 'image',
    caption: 'Gig workers union delegation is currently meeting the Labor Commissioner. Rally remains peaceful and unified! 🛵📦',
    protestId: 'pr-4',
    cheersCount: 310,
    isLive: true
  },
  {
    id: 'story-4',
    userName: 'Anonymous Chronicler',
    userHandle: '@ground_observer',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    verified: false,
    location: 'Freedom Park, Bengaluru',
    cityId: 'bengaluru',
    timestamp: '2 hours ago',
    mediaUrl: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=900&auto=format&fit=crop&q=80',
    mediaType: 'image',
    caption: 'Volunteers setting up sound systems and water distribution stalls for the upcoming Oct 2nd citizens march. 🚰🚩',
    protestId: 'pr-3',
    cheersCount: 145,
    isLive: false
  },
  {
    id: 'story-5',
    userName: 'Kolkata Youth Forum',
    userHandle: '@studentaction_kol',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    verified: true,
    location: 'Presidency Gate, Kolkata',
    cityId: 'kolkata',
    timestamp: '3 hours ago',
    mediaUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80',
    mediaType: 'image',
    caption: 'Poster painting workshop underway ahead of the College Street to Esplanade march. Colorful resistance in action! 🎨📚',
    protestId: 'pr-5',
    cheersCount: 220,
    isLive: false
  }
];

export const INITIAL_POSTS = [
  {
    id: 'post-1',
    author: {
      name: 'Pooja Narain',
      handle: '@pooja_activist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      badge: 'Legal Observer',
      verified: true
    },
    isAnonymous: false,
    cityName: 'Delhi NCR',
    cityId: 'delhi',
    protestTag: '#RightToBreathe Delhi',
    protestId: 'pr-1',
    timestamp: '25 mins ago',
    content: 'Atmosphere at Jantar Mantar is incredible today! Doctors in white coats joined alongside school teachers and elderly citizens holding signs that read "Clean Air is a Fundamental Right under Article 21".\n\nLegal observer team from PUCL is stationed near Tent 2. All gathering protocols are peaceful and orderly.',
    images: [
      'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=1000&auto=format&fit=crop&q=80'
    ],
    amplifies: 542,
    amplifiedByUser: false,
    commentsCount: 38,
    comments: [
      {
        id: 'c-1',
        author: 'Aman Joshi',
        handle: '@aman_j',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        content: 'Reaching Jantar Mantar in 20 minutes from Patel Chowk Metro! Bringing 50 extra masks.',
        timestamp: '14 mins ago'
      },
      {
        id: 'c-2',
        author: 'Ritu Sen',
        handle: '@ritu_legal',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        content: 'Legal helpline team is alert on 1800-LEGAL-AID. Please keep your personal IDs with you.',
        timestamp: '8 mins ago'
      }
    ],
    tags: ['#RightToBreathe', '#CleanAirNow', '#DelhiAirEmergency', '#Article21']
  },
  {
    id: 'post-2',
    author: {
      name: 'Ground Chronicler (Verified Anonymous)',
      handle: '@anon_observer_mumbai',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      badge: 'Anonymous Citizen',
      verified: false
    },
    isAnonymous: true,
    cityName: 'Mumbai',
    cityId: 'mumbai',
    protestTag: '#SaveAarey Sit-in',
    protestId: 'pr-2',
    timestamp: '1 hour ago',
    content: '🚨 Ground Situation Update at Azad Maidan:\n1. Police barricades placed at Mahapalika Marg exit, but entry through gate 3 remains open.\n2. Hydration and lemon water stall is operational near North Stand.\n3. Indigenous folk artists just began theatrical street performance depicting Mumbai’s leopards and forest ecology.\n\nKeep coming peacefully!',
    images: [
      'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=1000&auto=format&fit=crop&q=80'
    ],
    amplifies: 389,
    amplifiedByUser: true,
    commentsCount: 19,
    comments: [
      {
        id: 'c-3',
        author: 'Kunal Verma',
        handle: '@kunal_v',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        content: 'Thank you for the anonymous update! Catching the slow local train to CSMT now.',
        timestamp: '30 mins ago'
      }
    ],
    tags: ['#SaveAarey', '#MumbaiForest', '#GreenMumbai', '#AzadMaidan']
  },
  {
    id: 'post-3',
    author: {
      name: 'Vikramaditya Rao',
      handle: '@vikram_rights',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      badge: 'Movement Organizer',
      verified: true
    },
    isAnonymous: false,
    cityName: 'Bengaluru',
    cityId: 'bengaluru',
    protestTag: 'Karnataka Public Transport Satyagraha',
    protestId: 'pr-3',
    timestamp: '3 hours ago',
    content: '📋 Why are we gathering on October 2nd at Freedom Park?\nBengaluru residents spend an average of 162 hours stuck in traffic each year due to poor public bus availability and crumbling arterial roads.\n\nOur 3 non-negotiable demands:\n1️⃣ 4,000 new BMTC electric buses\n2️⃣ Contractor blacklisting for substandard pothole patchworks\n3️⃣ Safe pedestrian walkways on every metro corridor.\n\nRSVP on the event tab so we can prepare adequate logistics!',
    images: [
      'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1000&auto=format&fit=crop&q=80'
    ],
    amplifies: 812,
    amplifiedByUser: false,
    commentsCount: 64,
    comments: [],
    tags: ['#NammaBengaluru', '#FixOurRoads', '#BMTCForEveryCitizen', '#FreedomPark']
  }
];

export const INITIAL_COMMUNITIES = [
  {
    id: 'comm-1',
    name: 'Clean Air India Collective',
    slug: 'clean-air-collective',
    handle: '#RightToBreathe',
    banner: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=1200&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    category: 'climate',
    description: 'National alliance of citizen groups, medical experts, and environmental lawyers fighting for pollution-free breathable air across North and Central India.',
    membersCount: 14890,
    isJoined: true,
    activeProtestsCount: 2,
    cityFocus: 'Delhi NCR & Pan-India',
    rules: [
      'Strictly non-violent, constructive civic dialogue and policy advocacy',
      'Fact-checked air quality and environmental data only',
      'No partisan political endorsements — focus is on clean air for every citizen'
    ],
    resources: [
      { title: 'Air Quality Emergency Toolkit (PDF)', type: 'Document', link: '#' },
      { title: 'Public Interest Litigation (PIL) Reference Guide', type: 'Legal Aid', link: '#' },
      { title: 'Citizen Air Sensor Calibration Guide', type: 'Technical', link: '#' }
    ],
    chatMessages: [
      { id: 'm1', sender: 'Dr. Sunita Rao', handle: '@sunita_med', time: '12:30 PM', text: 'AQI spiked to 410 in Anand Vihar. We have arranged nebulizers at the Jantar Mantar first aid booth.' },
      { id: 'm2', sender: 'Arjun Verma', handle: '@arjun_v', time: '12:35 PM', text: 'Banners look great! Over 20 colleges have confirmed participation.' },
      { id: 'm3', sender: 'Pooja Narain', handle: '@pooja_activist', time: '12:42 PM', text: 'Live stream is up on the movement channel. Please share widely!' }
    ]
  },
  {
    id: 'comm-2',
    name: 'Save Aarey & Urban Forests Forum',
    slug: 'save-aarey-mumbai',
    handle: '#SaveAareyMumbai',
    banner: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=1200&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    category: 'climate',
    description: 'Defending Mumbai’s green lungs, biodiversity corridors, and tribal indigenous settlements in Aarey Colony & SGNP.',
    membersCount: 28400,
    isJoined: true,
    activeProtestsCount: 1,
    cityFocus: 'Mumbai',
    rules: [
      'Preserve forest integrity and respect indigenous tribal sovereignty',
      'Peaceful non-violent direct action and court documentation',
      'Zero littering during marches and protests'
    ],
    resources: [
      { title: 'High Court Forest Injunction Dossier', type: 'Legal', link: '#' },
      { title: 'Tree Census & Biodiversity Map of Aarey', type: 'Ecology', link: '#' }
    ],
    chatMessages: [
      { id: 'm4', sender: 'Priya Sharma', handle: '@priya_tree', time: '11:15 AM', text: 'Youth march arriving at Azad Maidan gate 3 in 15 mins.' },
      { id: 'm5', sender: 'Rohan Deshmukh', handle: '@rohan_d', time: '11:22 AM', text: 'Brought 40 handmade banners with Marathi and English slogans.' }
    ]
  },
  {
    id: 'comm-3',
    name: 'Gig Workers & Platform Labor Solidarity',
    slug: 'gig-workers-solidarity',
    handle: '#WorkersDignity',
    banner: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    category: 'labor-farmer',
    description: 'Collective bargaining and rights advocacy for app-based delivery partners, cab drivers, and platform gig workers across India.',
    membersCount: 19500,
    isJoined: false,
    activeProtestsCount: 1,
    cityFocus: 'Pan-India',
    rules: [
      'Solidarity among all app platforms without worker division',
      'Promote safety, fair wages, and statutory welfare insurance',
      'Support fellow riders in road accidents and legal disputes'
    ],
    resources: [
      { title: 'Model State Gig Worker Social Security Act', type: 'Policy', link: '#' },
      { title: 'Emergency Roadside Accident Legal Protocol', type: 'SOS Guide', link: '#' }
    ],
    chatMessages: [
      { id: 'm6', sender: 'Imran Khan', handle: '@imran_rider', time: '01:05 PM', text: 'All zones in Hyderabad standing strong today! No orders picked during peak hours.' }
    ]
  },
  {
    id: 'comm-4',
    name: 'Digital Freedom & Net Rights India',
    slug: 'digital-freedom-india',
    handle: '#DigitalRightsBharat',
    banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    category: 'digital-privacy',
    description: 'Defending online freedom of speech, open internet access, end-to-end encryption, and protesting arbitrary digital shutdowns.',
    membersCount: 11200,
    isJoined: false,
    activeProtestsCount: 1,
    cityFocus: 'Pan-India',
    rules: [
      'Open-source first mindset and ethical technology advocacy',
      'Respect digital anonymity and privacy of all whistleblowers'
    ],
    resources: [
      { title: 'Activist Digital Security & Device Hardening Handbook', type: 'Security', link: '#' },
      { title: 'Legal Precedents on Telecom Suspension Rules', type: 'Legal', link: '#' }
    ],
    chatMessages: [
      { id: 'm7', sender: 'Dev Gupta', handle: '@dev_crypt', time: '09:40 AM', text: 'Updated the Signal verified safety numbers. Make sure to enable disappearing messages.' }
    ]
  }
];

export const SOS_LEGAL_DATA = {
  emergencyContacts: [
    { name: 'People’s Union for Civil Liberties (PUCL)', phone: '+91-11-2338-4221', state: 'National / Delhi', hours: '24/7 Helpline' },
    { name: 'Human Rights Law Network (HRLN / SLIC)', phone: '+91-11-2437-4501', state: 'Pan-India Legal Cell', hours: '24/7' },
    { name: 'National Legal Services Authority (NALSA)', phone: '15100', state: 'Toll-Free Govt Legal Aid', hours: '24 Hours' },
    { name: 'Mumbai Activist Support & Legal Defense', phone: '+91-22-2262-1144', state: 'Mumbai', hours: '10 AM - 10 PM' },
    { name: 'Bengaluru Citizens Legal Aid Desk', phone: '+91-80-2294-2222', state: 'Bengaluru', hours: '24/7 Emergency' },
    { name: 'Ambulance Emergency Support', phone: '108', state: 'National Emergency Medical', hours: '24/7' },
    { name: 'National Women Helpline', phone: '1091 / 181', state: 'National Women Protection', hours: '24/7' }
  ],
  legalFlashcards: [
    {
      id: 'right-1',
      title: 'Article 19(1)(b): Right to Assemble Peacefully',
      summary: 'Every citizen has the constitutional fundamental right to assemble peacefully without arms.',
      details: 'Police permission is an administrative measure for traffic and safety management. Peaceful assembly cannot be arbitrarily dispersed unless there is a genuine, documented breach of peace.',
      statute: 'Constitution of India, Art. 19(1)(b)'
    },
    {
      id: 'right-2',
      title: 'Section 144 CrPC / BNSS Restrictions',
      summary: 'Executive Magistrate order prohibiting assembly of 4 or more persons in a specific zone.',
      details: 'Under Supreme Court rulings (Anuradha Bhasin & Ramlila Maidan cases), Section 144 cannot be used routinely to suppress legitimate dissent. The order must be temporary, proportionate, and state specific reasons.',
      statute: 'CrPC Sec 144 / BNSS Sec 163'
    },
    {
      id: 'right-3',
      title: 'D.K. Basu Guidelines on Arrest & Detention',
      summary: 'Mandatory rules police must follow during any detention or arrest.',
      details: '1. Police officer must wear clear name tag with designation.\n2. Arrest memo must be prepared on the spot with time and signed by at least one independent witness.\n3. Person arrested has the right to inform one friend/relative within 8-12 hours.\n4. Medical examination must be done upon request.\n5. Right to meet an advocate during interrogation.',
      statute: 'Supreme Court of India (DK Basu v. State of WB)'
    },
    {
      id: 'right-4',
      title: 'Right of Women Protesters During Detention',
      summary: 'Specific safeguards ensuring dignity and protection for women.',
      details: 'Under CrPC Sec 46(4), no woman can be arrested after sunset and before sunrise except under exceptional circumstances with prior written permission of Judicial Magistrate. Arrest must be carried out only by female police officers.',
      statute: 'CrPC Sec 46(4)'
    },
    {
      id: 'right-5',
      title: 'Phone Confiscation & Digital Privacy Rights',
      summary: 'Police cannot arbitrarily seize or demand unlock passwords of your phone without legal warrant.',
      details: 'In Virendra Khanna v. State of Karnataka and Puttaswamy judgment, citizens retain privacy rights against self-incrimination (Art 20(3)). If a device is seized, demand an official Seizure Memo (Hash value recorded) immediately.',
      statute: 'Art 20(3) & 21 Privacy Doctrine'
    },
    {
      id: 'right-6',
      title: 'Right to Video Record Police in Public Spaces',
      summary: 'Citizens have the legal right to film public officials performing official duties in public areas.',
      details: 'Recording police action in a public space does not constitute "obstruction of duty" unless you physically interfere with police movements or create a safety hazard.',
      statute: 'Right to Information & Public Accountability'
    }
  ],
  safetyChecklist: [
    'Always carry government ID, powerbank, and written emergency phone numbers on paper.',
    'Enable 6-digit PIN on phone and disable biometric unlock (FaceID/Fingerprint) before entering crowded protest zones.',
    'Carry a water bottle, handkerchief/bandana, and saline eye solution in case of tear gas deployment.',
    'Stay with a buddy or small group; do not wander alone into isolated barricade perimeters.',
    'If detained, remain calm, assert your right to legal counsel, and demand that your arrest memo be signed and recorded.'
  ]
};
