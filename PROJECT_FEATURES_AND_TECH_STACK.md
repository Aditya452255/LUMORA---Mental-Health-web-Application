# Mental Health Web App - Complete Features & Technical Stack

**Project Name**: Lumora - Mental Health & Wellness Platform  
**Version**: 0.1.0  
**Type**: Full-Stack Web Application  
**Date Generated**: January 7, 2026

---

## 📋 TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Frontend Features](#frontend-features)
3. [Backend Features](#backend-features)
4. [Technical Stack - Frontend](#technical-stack---frontend)
5. [Technical Stack - Backend](#technical-stack---backend)
6. [Architecture & Structure](#architecture--structure)
7. [Database Schema](#database-schema)
8. [API Endpoints](#api-endpoints)
9. [Design System](#design-system)
10. [Deployment & Development](#deployment--development)

---

## PROJECT OVERVIEW

**Lumora** is a comprehensive mental health and wellness platform with a beautiful cosmic glassmorphism design aesthetic. It provides users with tools for meditation, relaxation, mindfulness games, progress tracking, educational content, and AI-powered wellness coaching.

### Key Characteristics:
- ✨ Fully functional with no backend required for demo
- 🎨 Beautiful cosmic glassmorphism design
- 🌌 Interactive Three.js particle background
- 💫 Smooth Framer Motion animations
- 📊 Real-time data visualizations
- 🤖 Intelligent AI chatbot responses
- 📱 Responsive across all devices
- ♿ Accessible UI components
- 🔐 Secure authentication with JWT & MongoDB

---

## FRONTEND FEATURES

### 🎯 Core Pages & Routes

#### 1. **Landing Page** (`/`)
- Hero section with "Unlock Your Inner Peace" tagline
- Feature showcase with icons for Breathing, Meditation, Soundscapes, and Insights
- Call-to-action buttons for Sign Up and Log In
- Responsive navigation header
- Animated decorative elements

#### 2. **Authentication System** (`/login`, `/signup`)
- **Login Page**:
  - Email and password fields
  - Centered glass-paneled form with glowing effects
  - Mock authentication using localStorage
  - Link to signup page
  - Animated decorative stars
  
- **Signup Page**:
  - Name, email, and password fields
  - Form validation
  - Centered glass-paneled form design
  - Link to login page
  - Password confirmation
  - Animated decorative elements

#### 3. **Dashboard** (`/dashboard`)
- Personalized greeting with user name
- Daily intention setter
- **7-Day Streak Chart**: Interactive line graph showing meditation progress with glowing data points
- **Progress Statistics**:
  - Sessions completed
  - Minutes meditated
  - Stress reduction percentage
- **Quick Action Links**:
  - Daily Meditation
  - Soundscapes
  - Latest Article
- Navigation to all major sections

#### 4. **Relaxation Hub** (`/relaxation`)
A comprehensive wellness center with three main categories:

**Breathing Exercises**:
- Animated breathing visualizer with scale animations
- 4-7-8 Breathing technique
- Box Breathing (4-4-4-4)
- Deep Belly Breathing
- Interactive play/pause controls
- Real-time visual feedback with "Inhale", "Hold", "Exhale" states
- Customizable timing patterns

**Meditation Sessions**:
- Morning Mindfulness meditation
- Body Scan meditation
- Loving Kindness meditation
- Chakra Meditation
- Difficulty levels (Beginner, Intermediate, Advanced)
- Duration indicators (5-30 minutes)
- Session descriptions and benefits

**Soundscapes**:
- Ocean Waves
- Rain Forest
- Mountain Wind
- Tibetan Bowls
- Night Crickets
- White Noise
- Audio player controls (play, pause, volume)
- Volume slider for fine control
- Currently playing display
- Loop and shuffle options

#### 5. **Mini-Games Hub** (`/mini-games`)
A collection of 6 mindfulness games designed for relaxation and mental wellness:

1. **Chess** - Strategic board game
2. **Sudoku** - Number puzzle game
3. **Sliding Puzzle** - Tile arrangement puzzle
4. **Minesweeper** - Logic and deduction game
5. **Memory Card** - Memory matching game
6. **Tic Tac Toe** - Classic three-in-a-row game

Game Features:
- Search functionality for games
- Game cards with neon glow effects on hover
- Difficulty levels display (Easy, Medium, Hard)
- Player count information
- Featured game section
- Game descriptions and benefits
- Launch functionality for each game

#### 6. **Journey Tracker** (`/journey`)
Comprehensive progress tracking and analytics:

- **Multi-Year Progress Chart**: Area chart showing stress levels and happiness metrics from 2022-2026
- **Key Metrics**:
  - 62% stress reduction highlight
  - Total sessions (284)
  - Total hours meditated (47.3)
  - Current streak (28 days)
- **Milestones Timeline**: Key achievements with dates and descriptions
  - Milestones displayed in chronological order
  - Achievement descriptions and dates
- **Personal Insights**:
  - Best streak achieved
  - Favorite time of day for practice
  - Top meditation practice type

#### 7. **Knowledge Center** (`/knowledge`)
Educational hub with articles and learning resources:

- **Search Bar**: Search articles and guides by keywords
- **Category Filters**:
  - All categories
  - Meditation guides
  - Mindfulness practices
  - Sleep improvement
  - Anxiety management
  - Stress reduction
- **Featured Article**: Large highlighted article with imagery and description
- **Article Grid**: Latest articles with:
  - Title and description
  - Category icons
  - Read time estimates
  - Featured image
- **Sidebar Resources**:
  - Popular videos with durations
  - View counts
  - Quick tips cards
  - Learning progress tracker
- Article cards with hover animations

#### 8. **Settings** (`/settings`)
User preferences and account management:

**Profile Section**:
- Avatar display and editing
- Name editing
- Email display and editing

**Preferences**:
- Dark mode toggle (with animated switch)
- Sound effects toggle
- Language selection (English, Spanish, French, German)
- Theme customization

**Notifications**:
- Push notifications toggle
- Daily reminders toggle
- Weekly reports toggle
- Email notification preferences

**Privacy & Security**:
- Change password functionality
- Two-factor authentication setup
- Privacy policy access
- Delete account option
- Data export functionality

**Account Management**:
- Save/Cancel functionality
- Confirmation dialogs
- Success notifications

#### 9. **AI Chatbot** (`/chatbot`)
Intelligent AI wellness companion:

**Interface Features**:
- ChatGPT-style layout
- Sidebar with conversation history
- Create new conversations
- Delete conversations
- Active conversation highlighting
- Search through conversations

**AI Capabilities**:
- Smart contextual responses for:
  - Anxiety management
  - Sleep improvement
  - Meditation guidance
  - Stress relief
  - Mindfulness practices
  - General wellness advice
- Context-aware conversation flow
- Personality-driven responses

**User Experience**:
- Suggested prompt starters for quick start
- Typing indicator with animated dots while AI "thinks"
- Message history with timestamps
- Persistent conversation storage
- User-friendly message formatting
- Professional help disclaimer

#### 10. **Floating Chat Button**
- Appears on all pages except Chatbot, Login, and Signup
- Animated entrance with spring effect
- Hover tooltip showing "Chat with AI Companion"
- Quick access to AI wellness coach
- Smooth transitions

### 🎨 Visual & Interaction Features

**Design Elements**:
- Cosmic Theme Color Scheme:
  - Primary: Cosmic Purple (#1A102C)
  - Secondary: Deep Purple (#2D1B4E)
  - Accent: Teal Glow (#5DD9C1)
  - Highlight: Purple Glow (#A78BFA)
- Glassmorphism effects throughout
- Frosted glass cards with glowing borders
- Custom Typography: Manrope font family

**Animation Effects**:
- Smooth page transitions with Framer Motion
- Hover effects with neon glow
- Scale animations on interactive elements
- Color transitions and gradient animations
- Breathing visualizer with real-time scale animations
- Loading states with typing indicators

**Data Visualization**:
- 7-Day Streak: Interactive line chart with glowing nodes
- Journey Timeline: Multi-line area chart (2022-2026)
- Custom tooltips with glass styling
- Gradient fills in teal and purple
- Responsive chart sizing
- Interactive legend

### 📱 Navigation System

- **Top Navigation Bar**: Consistent across Dashboard, Relaxation Hub, Mini-Games, Knowledge
- **Settings Icon**: Quick access to user settings from any page
- **Back Buttons**: Easy navigation to previous pages
- **Breadcrumb-Style Navigation**: Current page highlighting
- **Floating Chat Button**: Global access to AI companion
- **Route Protection**: Authentication checks for protected pages

### 🔐 Authentication & State Management

- Mock authentication using localStorage
- User data persistence across sessions
- JWT token structure (for backend integration)
- React Hooks for state management:
  - useState for component state
  - useEffect for side effects
  - useRef for DOM manipulation
- React Router for client-side routing
- Custom hooks for authentication logic

---

## BACKEND FEATURES

### 🔐 Authentication System

**User Registration (Signup)**:
- POST `/api/auth/signup`
- Accepts: `{ name, email, password }`
- Password hashing with bcryptjs
- User creation in MongoDB
- JWT token generation
- Returns: `{ token, user }`

**User Login**:
- POST `/api/auth/login`
- Accepts: `{ email, password }`
- Password verification
- JWT token generation
- Returns: `{ token, user }`
- Session management

**Security Features**:
- Password hashing with bcryptjs (2.4.3)
- JWT authentication (jsonwebtoken 9.0.0)
- CORS support for cross-origin requests
- Environment variable protection

### 📦 Game Management System

**API Endpoints**:
- GET `/api/games` - Fetch game configuration
- Game configuration mapping support
- Dynamic game loading

**Game Data Structure**:
- Game ID mapping
- Endpoint configuration
- Game metadata

### 💬 Chat System

**API Endpoints**:
- Chat-related routes available
- Conversation management
- Message persistence (when MongoDB connected)

**Chat Features**:
- Message history storage
- Conversation threading
- Timestamp tracking

### 🗄️ Database Integration

**Database**: MongoDB
- User collection with profiles
- User authentication data
- Game progress tracking
- Chat history storage
- Conversation management

**Connection Management**:
- Mongoose ODM (7.0.0)
- Connection pooling
- Error handling
- Environment-based configuration

### 🔧 Server Infrastructure

**Core Stack**:
- Node.js (16+)
- Express.js (4.18.2)
- CORS enabled for frontend communication
- Environment variable management with dotenv

**Middleware**:
- CORS middleware for cross-origin requests
- JSON body parser
- Authentication middleware (custom)
- Error handling middleware

**Development Tools**:
- Nodemon for auto-restart during development
- Concurrently for running multiple services

---

## TECHNICAL STACK - FRONTEND

### Core Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3.1 | UI library and component framework |
| TypeScript | 5.4.2 | Type-safe development |
| React Router DOM | * | Client-side routing and navigation |
| Vite | 6.3.5 | Build tool and dev server |
| Tailwind CSS | 4.0 | Utility-first CSS framework |

### UI & Component Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| Radix UI (25+ components) | ^1.0+ | Accessible, unstyled UI primitives |
| shadcn/ui | - | Pre-built React components |
| Lucide React | 0.487.0 | Beautiful SVG icon library |
| Framer Motion | 12.23.24 | Advanced animations and gestures |

### Data & State Management

| Library | Version | Purpose |
|---------|---------|---------|
| React Hook Form | 7.55.0 | Efficient form handling |
| React DOM | 18.3.1 | React DOM rendering |

### Visualization & Charts

| Library | Version | Purpose |
|---------|---------|---------|
| Recharts | 2.15.2 | React chart library |
| Three.js | * | 3D graphics and particle system |

### Styling & Effects

| Library | Version | Purpose |
|---------|---------|---------|
| Tailwind Merge | * | Utility-first CSS merging |
| CLSX | * | Conditional CSS class names |
| Class Variance Authority | 0.7.1 | CSS class composition |
| Next Themes | 0.4.6 | Theme management |

### UI Enhancement

| Library | Version | Purpose |
|---------|---------|---------|
| Sonner | 2.0.3 | Toast notifications |
| Embla Carousel | 8.6.0 | Carousel component |
| React Day Picker | 8.10.1 | Calendar/date picker |
| Input OTP | 1.4.2 | OTP input component |
| CMDK | 1.1.1 | Command palette |
| Vaul | 1.1.2 | Drawer component |
| React Resizable Panels | 2.1.7 | Resizable panel layouts |

### Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| Vite React SWC Plugin | 3.10.2 | Fast React refresh with SWC |
| Concurrently | 8.2.0 | Run multiple npm scripts |
| Node Types | 20.10.0 | TypeScript Node definitions |
| React Types | 19.2.6 | TypeScript React definitions |

### Build & Configuration Files

- **vite.config.ts**: Vite build configuration with module aliasing
- **tsconfig.json**: TypeScript compiler options
- **package.json**: Project dependencies and scripts
- **index.html**: Entry HTML template

### Key Dependencies Summary

- **25+ Radix UI Components**: Accordion, Alert Dialog, Avatar, Badge, Button, Calendar, Card, Carousel, Checkbox, Collapsible, Command, Context Menu, Dialog, Drawer, Dropdown Menu, Form, Hover Card, Input, Label, Menubar, Navigation Menu, Popover, Progress, Radio Group, Scroll Area, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Switch, Table, Tabs, Textarea, Toggle, Toggle Group, Tooltip
- **Three.js**: 3D animations and particle systems
- **Framer Motion**: Page transitions and interactive animations
- **Recharts**: Data visualization and charts

---

## TECHNICAL STACK - BACKEND

### Core Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 16+ | JavaScript runtime |
| Express.js | 4.18.2 | Web application framework |
| MongoDB | - | NoSQL database |
| Mongoose | 7.0.0 | MongoDB ODM |

### Security & Authentication

| Library | Version | Purpose |
|---------|---------|---------|
| bcryptjs | 2.4.3 | Password hashing |
| jsonwebtoken | 9.0.0 | JWT authentication |
| dotenv | 16.0.0 | Environment variable management |
| CORS | 2.8.5 | Cross-Origin Resource Sharing |

### Python Integration

- **FastAPI / Uvicorn**: Python chatbot API
- **Concurrent Execution**: Python and Node services run simultaneously

### Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| Nodemon | 2.0.22 | Auto-restart Node.js on file changes |
| Concurrently | 8.2.0 | Run Node and Python services together |

### API Server Configuration

- **Port**: 5000 (default)
- **CORS**: Enabled for frontend communication
- **Middleware**: JSON body parser, CORS headers
- **Authentication**: JWT-based with middleware

### Environment Configuration

Required environment variables:
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `PORT`: Server port (default: 5000)

---

## ARCHITECTURE & STRUCTURE

### Directory Structure

```
Mental Health Web App 2/
├── src/                           # Frontend source
│   ├── components/                # React components
│   │   ├── CosmicBackground.tsx   # Three.js particle background
│   │   ├── LandingPage.tsx        # Hero landing page
│   │   ├── Login.tsx              # Login form
│   │   ├── Signup.tsx             # Signup form
│   │   ├── Dashboard.tsx          # Main user dashboard
│   │   ├── RelaxationHub.tsx      # Breathing, meditation, soundscapes
│   │   ├── MiniGamesHub.tsx       # 6 mindfulness games
│   │   ├── JourneyTracker.tsx     # Progress tracking
│   │   ├── Knowledge.tsx          # Educational content
│   │   ├── Settings.tsx           # User preferences
│   │   ├── Chatbot.tsx            # AI chatbot interface
│   │   ├── FloatingChatButton.tsx # Global chat button
│   │   ├── figma/                 # Figma-specific components
│   │   │   └── ImageWithFallback.tsx
│   │   └── ui/                    # Reusable UI components (25+)
│   │       ├── accordion.tsx
│   │       ├── alert.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── checkbox.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── select.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toggle.tsx
│   │       ├── tooltip.tsx
│   │       └── [more components...]
│   ├── config/                    # Configuration files
│   │   └── games.ts               # Game configuration
│   ├── hooks/                     # Custom React hooks
│   │   ├── useAuth.tsx            # Authentication hook
│   │   ├── useMeditationSession.ts
│   │   └── useSoundscapePlayer.ts
│   ├── lib/                       # Utility libraries
│   │   ├── api.ts                 # API integration
│   │   └── games.ts               # Game utilities
│   ├── styles/                    # Global styles
│   │   ├── globals.css            # Global CSS
│   │   └── aurora.js              # Aurora effect styles
│   ├── utils/                     # Utility functions
│   │   └── particles.ts           # Particle system utilities
│   ├── App.tsx                    # Main App component
│   ├── main.tsx                   # React entry point
│   └── index.css                  # Global styling
│
├── server/                        # Backend source
│   ├── index.js                   # Express app setup
│   ├── chatbot_app.py             # Python FastAPI chatbot
│   ├── middleware/                # Express middleware
│   │   └── auth.js                # JWT authentication
│   ├── models/                    # Database models
│   │   └── User.js                # User schema
│   └── routes/                    # API routes
│       ├── auth.js                # Authentication routes
│       ├── chat.js                # Chat routes
│       └── games.js               # Games routes
│
├── build/                         # Production build output
│   ├── index.html
│   └── assets/                    # Bundled CSS/JS
│
├── scripts/                       # Utility scripts
│   └── sudoku-starter.js
│
├── .env                           # Environment variables
├── package.json                   # Frontend dependencies
├── tsconfig.json                  # TypeScript config
├── vite.config.ts                 # Vite config
└── README.md                      # Documentation
```

### Component Architecture

```
App (Router wrapper)
├── CosmicBackground (3D background)
└── AppContent (Route handler)
    ├── Landing (public)
    ├── Login (public)
    ├── Signup (public)
    ├── Dashboard (protected)
    ├── RelaxationHub (protected)
    ├── MiniGamesHub (protected)
    ├── JourneyTracker (protected)
    ├── Knowledge (protected)
    ├── Settings (protected)
    ├── Chatbot (protected)
    └── FloatingChatButton (conditional render)
```

---

## DATABASE SCHEMA

### User Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date,
  profile: {
    avatar: String,
    bio: String,
    preferences: {
      darkMode: Boolean,
      soundEffects: Boolean,
      language: String,
      theme: String
    },
    notifications: {
      pushNotifications: Boolean,
      dailyReminders: Boolean,
      weeklyReports: Boolean,
      emailNotifications: Boolean
    }
  },
  meditationStats: {
    sessionsCompleted: Number,
    minutesMeditated: Number,
    currentStreak: Number,
    longestStreak: Number,
    lastSessionDate: Date
  }
}
```

### Game Progress Collection (Optional)

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  gameId: Number,
  gameName: String,
  score: Number,
  difficulty: String,
  playedAt: Date,
  duration: Number (minutes)
}
```

### Chat Conversation Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  title: String,
  messages: [
    {
      role: String (user|assistant),
      content: String,
      timestamp: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

---

## API ENDPOINTS

### Authentication Routes

| Method | Endpoint | Request Body | Response | Purpose |
|--------|----------|--------------|----------|---------|
| POST | `/api/auth/signup` | `{ name, email, password }` | `{ token, user }` | User registration |
| POST | `/api/auth/login` | `{ email, password }` | `{ token, user }` | User login |

### Games Routes

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/games` | Fetch game configuration |

### Chat Routes

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/chat` | Get chat history |
| POST | `/api/chat` | Create new chat |
| DELETE | `/api/chat/:id` | Delete conversation |
| POST | `/api/chat/:id/messages` | Add message to conversation |

### Frontend API Integration

**Base URL**: `http://localhost:5000/api`

Environment variable: `VITE_API_URL`

---

## DESIGN SYSTEM

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Cosmic Purple | #1A102C | Primary background |
| Deep Purple | #2D1B4E | Secondary elements |
| Teal Glow | #5DD9C1 | Primary accent |
| Purple Glow | #A78BFA | Highlight and hover |
| White | #FFFFFF | Text and contrast |
| Dark Gray | #1F2937 | Secondary text |

### Typography

- **Font Family**: Manrope
- **Sizes**: 12px, 14px, 16px, 18px, 20px, 24px, 32px, 48px
- **Weights**: 400 (Regular), 600 (Semi-bold), 700 (Bold)

### Spacing Scale

- 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

### Component Styles

| Class | Usage |
|-------|-------|
| `.glass-card` | Standard glass effect card |
| `.glass-card-intense` | Enhanced glass with more blur |
| `.glow-button` | Gradient button with neon glow |
| `.glass-input` | Themed input fields |
| `.neon-glow` | Hover glow effect |
| `.glassmorphism` | General glass effect |
| `.cosmic-bg` | Cosmic background styling |

### Responsive Breakpoints

- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

---

## DEPLOYMENT & DEVELOPMENT

### Development Setup

```powershell
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install Python requirements (if using chatbot)
python -m pip install -r server/requirements.txt

# From root directory, run both services
npm run dev:all
```

### Development Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start frontend dev server (port 5173) |
| `npm run build` | Build frontend for production |
| `npm run server:devall` | Start backend services |
| `npm run dev:all` | Start frontend and backend together |

### Server Scripts

| Script | Purpose |
|--------|---------|
| `npm start` | Production Node server |
| `npm run dev` | Development Node server with auto-reload |
| `npm run chat` | Start Python FastAPI chatbot (port 8000) |
| `npm run dev:all` | Start both Node and Python services |

### Build Configuration

**Frontend Build Tool**: Vite
- Fast HMR (Hot Module Replacement)
- Optimized production builds
- TypeScript support with SWC
- CSS/SCSS support
- Asset optimization

**Output Directory**: `build/`

### Environment Variables

**Frontend** (`.env`):
```
VITE_API_URL=http://localhost:5000/api
```

**Backend** (`server/.env`):
```
MONGO_URI=mongodb://...
JWT_SECRET=your-secret-key
PORT=5000
```

### Deployment Considerations

**Frontend**:
- Build with `npm run build`
- Deploy `build/` folder to CDN or static hosting
- Vite provides optimized bundle splitting

**Backend**:
- Deploy Node server to cloud platform (Heroku, AWS, etc.)
- Set environment variables on deployment platform
- MongoDB Atlas for managed database
- Python chatbot can run as separate service

**Production Checklist**:
- [ ] Update API_URL for production backend
- [ ] Set secure JWT_SECRET
- [ ] Configure MongoDB Atlas
- [ ] Enable HTTPS
- [ ] Set up environment variables
- [ ] Configure CORS for production domain
- [ ] Enable error logging and monitoring
- [ ] Set up database backups

---

## SUMMARY

### Key Features Overview

**User Experience**:
- 10 main pages with full functionality
- Animated, responsive UI with cosmic theme
- AI chatbot for wellness coaching
- 6 interactive mindfulness games
- Comprehensive progress tracking
- Educational knowledge center
- Personalized settings and preferences

**Technical Highlights**:
- React 18 with TypeScript for type safety
- Vite for fast development and optimized builds
- 25+ accessible Radix UI components
- Three.js for interactive particle background
- Framer Motion for smooth animations
- Recharts for data visualization
- Express.js backend with MongoDB
- JWT authentication and bcrypt password hashing
- Python FastAPI for AI chatbot

**Architecture**:
- Full-stack web application
- Modular component structure
- Scalable backend with Express and MongoDB
- Concurrent frontend and backend services
- Environment-based configuration

**Scalability**:
- Ready for Firebase/Supabase integration
- Extensible game system
- Modular chatbot architecture
- RESTful API design
- Database-backed persistence

---

**Generated**: January 7, 2026  
**Project Location**: Mental Health Web App 2  
**Status**: Ready for Development & Deployment
