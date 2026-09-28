# 🔥 JanAwaz (जनआवाज़) — Voice of the People

> **India's Decentralized Civic Movement, Protest Tracker & Community Action Platform**

JanAwaz is an open-source, mobile-first social movement web application designed for tracking live and scheduled peaceful protests, civic vigils, and policy advocacy movements across India. It integrates Instagram-style ground stories, citizen action journalism, campaign channels, interactive GIS maps, and an activist legal defense SOS toolkit.

---

## 🌟 Key Features

### 1. 🗺️ Live & Scheduled Protest Discovery (India Map & Timeline)
- **Interactive Leaflet/OpenStreetMap**: Live visualization of gatherings with custom pulsing radar markers and safety radii across major Indian cities (Delhi NCR, Mumbai, Bengaluru, Kolkata, Chennai, Hyderabad, Pune, Chandigarh, Jaipur, Lucknow).
- **Protest Dossiers**: Complete charter of non-negotiable demands, verified organizer profiles, exact assembly landmarks, Google Maps navigation links, live livestream broadcasts, and ground essentials checklists.
- **Headcount RSVP & Solidarity**: One-touch *"I am Joining"* RSVP button with real-time crowd numbers and confetti celebration.
- **Volunteer Roles Registry**: On-ground recruitment for First Aid / Paramedics, Legal Observers, Hydration Teams, and ASL Translators.
- **Organizer Submission Wizard**: Form to publish planned or live civic assemblies with safety protocols.

### 2. ⚡ 24h Ground Stories (Ephemeral Situation Updates)
- Instagram-style story circles bar with active gradient rings.
- Fullscreen immersive story player with timed progress bars, tap navigation, location stamps, and live tags.
- One-touch Cheer / Solidarity reactions and direct feedback loop to ground reporters.
- Ground story publisher with photo presets and custom uploads.

### 3. 📢 Citizen Action Feed & Amplification
- Community feed streams: *All Dispatches*, *Trending Viral Movements*, *Verified Organizers*.
- Upvote / **Amplify** counter to highlight key updates.
- Nested discussion threads and shareable quote card broadcast shortcuts.
- Anonymous posting toggle to protect whistleblowers and activist identities.

### 4. 🏛️ Movement Communities & Campaign Hubs
- Dedicated hubs for ongoing campaigns (e.g. `#RightToBreathe`, `#SaveAareyMumbai`, `#WorkersDignity`, `#DigitalRightsBharat`).
- Real-time discussion rooms, legal aid dossiers, public interest litigation (PIL) templates, and non-violent assembly guidelines.

### 5. 🚨 Activist SOS & India Legal Defense Toolkit
- **Emergency Helplines**: Quick dial and copy for PUCL, Human Rights Law Network (HRLN / SLIC), NALSA (15100), Ambulance (108), and National Women Helpline (1091/181).
- **Know Your Rights Flashcards**: Indian legal doctrines including Article 19(1)(b) Peaceful Assembly, Section 144 CrPC / BNSS safeguards, D.K. Basu arrest & detention guidelines, right to film police in public, phone seizure doctrines, and women detention rules under CrPC 46(4).
- **Activist Ground Checklist**: Digital hygiene, signal safety, and medical precautions.

### 6. 🛡️ Privacy & Anonymous Shield Mode
- One-touch header shield toggle: instantly scrub personal metadata and post as verified anonymous ground chronicler.

---

## 🚀 Quick Start Guide (Run on Any Device)

### Prerequisites
- Node.js (v18.0 or higher)
- npm or yarn

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/your-username/janawaz-protest-platform.git

# Navigate into project directory
cd janawaz-protest-platform

# Install dependencies
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run preview
```

---

## 🐳 Docker Deployment

Run JanAwaz in a lightweight container with 1 command:

```bash
docker-compose up --build
```
Access the application at [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, Lucide Icons, Custom CSS Pulse & Glassmorphism
- **Mapping**: Leaflet, React-Leaflet, OpenStreetMap / CartoDB Voyager Tiles
- **Interactions**: Canvas Confetti, Reactive Context Store
- **Persistence**: Browser LocalStorage & IndexedDB

```
janawaz-protest-platform/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── Dockerfile
├── docker-compose.yml
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   └── AppContext.jsx          # Global platform state & persistence
    ├── data/
    │   └── mockData.js             # Seed data for Indian cities & protests
    └── components/
        ├── Navbar.jsx              # City filter, search, SOS button, shield
        ├── BottomNav.jsx           # Mobile touch navigation
        ├── common/
        │   ├── Badge.jsx
        │   └── Toast.jsx
        ├── stories/
        │   ├── StoriesBar.jsx      # Top story carousel
        │   ├── StoryViewerModal.jsx# Fullscreen story viewer
        │   └── CreateStoryModal.jsx
        ├── protests/
        │   ├── ProtestMapView.jsx  # Leaflet interactive map
        │   ├── ProtestCard.jsx     # Protest event card & RSVP
        │   ├── ProtestDetailsModal.jsx
        │   └── CreateProtestModal.jsx
        ├── feed/
        │   ├── FeedView.jsx        # Citizen journalism action stream
        │   ├── PostCard.jsx
        │   └── CreatePostModal.jsx
        ├── communities/
        │   ├── CommunityList.jsx   # Movement hubs directory
        │   └── ChannelDetailModal.jsx
        ├── sos/
        │   └── SOSToolkitModal.jsx # Legal SOS & rights flashcards
        └── profile/
            └── ProfileModal.jsx    # Persona & badges manager
```

---

## 📤 How to Push this Repository to GitHub

```bash
# 1. Initialize git
git init

# 2. Add files and commit
git add .
git commit -m "feat: initial commit of JanAwaz protest & civic action platform"

# 3. Rename branch to main
git branch -M main

# 4. Add your GitHub remote
git remote add origin https://github.com/<your-github-username>/janawaz-protest-platform.git

# 5. Push to GitHub
git push -u origin main
```

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
