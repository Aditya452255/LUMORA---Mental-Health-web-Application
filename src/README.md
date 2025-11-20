# 🌌 Lumora - Mental Health & Wellness Platform

A beautiful, fully-functional mental health and wellness web application built with React, featuring a cosmic glassmorphism design aesthetic with animated backgrounds and smooth transitions.

## ✨ Features

### 🎨 Visual Design
- **Cosmic Theme**: Deep purple (#1A102C) and blue color scheme with teal (#5DD9C1) accents
- **Glassmorphism**: Frosted glass cards with glowing borders throughout the UI
- **Animated Background**: Interactive Three.js particle system that responds to mouse movement
- **Smooth Animations**: Framer Motion for page transitions, hover effects, and micro-interactions
- **Custom Typography**: Manrope font family for clean, modern aesthetics

### 📄 Pages & Functionality

#### 1. **Landing Page** (`/`)
- Hero section with "Unlock Your Inner Peace" tagline
- Feature icons for Breathing, Meditation, Soundscapes, and Insights
- Call-to-action buttons for Sign Up and Log In
- Responsive navigation header

#### 2. **Authentication** (`/login`, `/signup`)
- Centered glass-paneled forms with glowing effects
- Login with email/password
- Sign up with name, email, and password
- Animated decorative stars
- Mock authentication using localStorage

#### 3. **Dashboard** (`/dashboard`)
- Personalized greeting with user name
- Daily intention setter
- **7-Day Streak Chart**: Interactive line graph showing meditation progress with glowing data points
- **Progress Stats**: Sessions completed, minutes meditated, stress reduction percentage
- **Quick Actions**: Links to Daily Meditation, Soundscapes, and Latest Article
- Navigation to all major sections

#### 4. **Relaxation Hub** (`/relaxation`)
- **Three Tabs**: Breathing, Meditation, Soundscapes
- **Breathing Exercises**:
  - Animated breathing visualizer with scale animations
  - 4-7-8 Breathing, Box Breathing, Deep Belly Breathing
  - Interactive play/pause controls
- **Meditation Sessions**:
  - Morning Mindfulness, Body Scan, Loving Kindness, Chakra Meditation
  - Difficulty levels and duration indicators
- **Soundscapes**:
  - Ocean Waves, Rain Forest, Mountain Wind, Tibetan Bowls, Night Crickets, White Noise
  - Audio player controls with volume slider
  - Currently playing display

#### 5. **Mini-Games Hub** (`/mini-games`)
- Search functionality for games
- **6 Mindfulness Games**:
  1. Zen Match - Pattern matching puzzle
  2. Aura Bloom - Inner garden growth
  3. Word Serenity - Word-based calm
  4. Cosmic Drift - Peaceful space navigation
  5. Breathing Beads - Rhythmic breathing game
  6. Memory Nexus - Mindful memory training
- Game cards with neon glow effects on hover
- Difficulty levels and player counts
- Featured game section

#### 6. **Journey Tracker** (`/journey`)
- **Multi-Year Progress Chart**: Area chart showing stress levels and happiness from 2022-2026
- **Key Metric**: 62% stress reduction highlight
- **Statistics**:
  - Total sessions (284)
  - Total hours (47.3)
  - Current streak (28 days)
- **Milestones Timeline**: Key achievements with dates and descriptions
- **Personal Insights**: Best streak, favorite time, top practice

#### 7. **Knowledge Center** (`/knowledge`)
- **Search Bar**: Search articles and guides
- **Category Filters**: All, Meditation, Mindfulness, Sleep, Anxiety, Stress
- **Featured Article**: Large highlighted article with imagery
- **Article Grid**: Latest articles with icons and read times
- **Sidebar**:
  - Popular videos with durations and view counts
  - Quick tips cards
  - Learning progress tracker
- Article cards with hover animations

#### 8. **Settings** (`/settings`)
- **Profile Section**:
  - Avatar display
  - Name and email editing
- **Preferences**:
  - Dark mode toggle (with animated switch)
  - Sound effects toggle
  - Language selection
- **Notifications**:
  - Push notifications
  - Daily reminders
  - Weekly reports
- **Privacy & Security**:
  - Change password
  - Two-factor authentication
  - Privacy policy
  - Delete account
- Save/Cancel functionality

#### 9. **AI Chatbot** (`/chatbot`)
- **ChatGPT-Style Interface**:
  - Sidebar with conversation history
  - Create new conversations
  - Delete conversations
  - Active conversation highlighting
- **AI Responses**: Smart contextual responses for:
  - Anxiety management
  - Sleep improvement
  - Meditation guidance
  - Stress relief
  - Mindfulness practices
- **Suggested Prompts**: Quick-start conversation starters
- **Typing Indicator**: Animated dots while AI "thinks"
- **Message History**: Persistent conversation storage
- **Timestamp**: Shows message times
- Disclaimer about professional help

#### 10. **Floating Chat Button**
- Appears on all pages except Chatbot, Login, and Signup
- Animated entrance with spring effect
- Hover tooltip showing "Chat with AI Companion"
- Quick access to AI wellness coach

### 🎯 Navigation System
- **Top Navigation**: Consistent across Dashboard, Relaxation Hub, Mini-Games, Knowledge
- **Settings Icon**: Quick access to user settings
- **Back Buttons**: Easy navigation to previous pages
- **Breadcrumb-Style**: Current page highlighting

### 📊 Data Visualization
- **Recharts Integration**: Beautiful, responsive charts
- **7-Day Streak**: Line chart with glowing nodes
- **Journey Timeline**: Multi-line area chart (2022-2026)
- **Custom Tooltips**: Glass-styled with cosmic theme
- **Gradient Fills**: Teal and purple gradients

### 🎮 Interactive Elements
- **Hover Effects**: Neon glow on buttons and cards
- **Scale Animations**: Subtle zoom on interactive elements
- **Color Transitions**: Smooth gradient animations
- **Breathing Visualizer**: Real-time scale animations
- **Loading States**: Typing indicators and animations

## 🛠 Tech Stack

### Frontend
- **React 18**: Latest React with hooks
- **TypeScript**: Type-safe development
- **React Router**: Client-side routing
- **Tailwind CSS 4.0**: Utility-first styling
- **Framer Motion**: Advanced animations
- **Three.js**: 3D particle background
- **Recharts**: Data visualization

### Styling
- **Custom CSS Variables**: Cosmic color palette
- **Glassmorphism Utilities**: Reusable glass card classes
- **Gradient Buttons**: Glow effects with shadows
- **Custom Scrollbar**: Themed scrollbar styling

### State Management
- **React Hooks**: useState, useEffect, useRef
- **localStorage**: Persistent user data
- **React Router**: Location-based state

## 🚀 Getting Started

The application is ready to run. All dependencies are automatically managed.

### Mock Authentication
- Login/Signup stores username in localStorage
- No real backend required for demo
- User data persists across sessions

### Navigation Flow
1. Start at Landing Page (`/`)
2. Sign Up or Log In
3. Access Dashboard
4. Explore all features via navigation

## 📱 Responsive Design
- Mobile-friendly layouts
- Adaptive grid systems
- Responsive charts and visualizations
- Touch-optimized interactions

## 🎨 Design System

### Colors
- **Primary**: Cosmic Purple (#1A102C)
- **Secondary**: Deep Purple (#2D1B4E)
- **Accent**: Teal Glow (#5DD9C1)
- **Highlight**: Purple Glow (#A78BFA)

### Components
- `.glass-card`: Standard glass effect
- `.glass-card-intense`: Enhanced glass with more blur
- `.glow-button`: Gradient button with neon glow
- `.glass-input`: Themed input fields
- `.neon-glow`: Hover glow effect

## 🔮 Future Enhancements (Backend Integration)

### Firebase/Supabase Integration
- Real user authentication
- Firestore for data persistence
- Cloud storage for avatars
- Real-time data sync

### Advanced Features
- Actual audio player integration
- Real meditation timers
- Progress tracking database
- Social features (sharing progress)
- Push notifications
- Real AI integration (OpenAI API)

## 📖 Component Structure

```
/components
  ├── CosmicBackground.tsx       # Three.js animated background
  ├── LandingPage.tsx            # Hero and feature showcase
  ├── Login.tsx                  # Authentication - Login
  ├── Signup.tsx                 # Authentication - Signup
  ├── Dashboard.tsx              # Main user dashboard
  ├── RelaxationHub.tsx          # Breathing, Meditation, Soundscapes
  ├── MiniGamesHub.tsx           # Mindfulness games collection
  ├── JourneyTracker.tsx         # Progress timeline and stats
  ├── Knowledge.tsx              # Articles and educational content
  ├── Settings.tsx               # User preferences and profile
  ├── Chatbot.tsx                # AI wellness companion
  └── FloatingChatButton.tsx     # Global chat access button
```

## 🎯 Key Features Implementation

### Breathing Visualizer
- Animated circle that expands/contracts
- Shows "Inhale", "Hold", "Exhale" states
- Smooth transitions with Framer Motion
- Customizable timing patterns

### Progress Charts
- Interactive tooltips
- Glowing data points
- Gradient fill areas
- Responsive container sizing

### AI Chatbot
- Context-aware responses
- Conversation management
- Message persistence
- Smart prompt suggestions

### Glassmorphism Effect
- Backdrop blur
- Semi-transparent backgrounds
- Glowing borders
- Layered depth

## 💡 Usage Tips

1. **Navigation**: Use the top navigation bar to switch between sections
2. **Chat**: Click the floating chat button (bottom-right) to access AI companion
3. **Settings**: Click the gear icon to customize your experience
4. **Progress**: View your journey in the Dashboard or Journey Tracker
5. **Relaxation**: Use the Relaxation Hub for guided sessions

## 🌟 Highlights

- ✨ Fully functional with no backend required
- 🎨 Beautiful cosmic glassmorphism design
- 🌌 Interactive Three.js background
- 💫 Smooth Framer Motion animations
- 📊 Real-time data visualizations
- 🤖 Intelligent AI chatbot responses
- 📱 Responsive across all devices
- ♿ Accessible UI components

---

Built with ❤️ for mental wellness and inner peace.
