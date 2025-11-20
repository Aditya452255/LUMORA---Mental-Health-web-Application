import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CosmicBackground } from './components/CosmicBackground';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Dashboard } from './components/Dashboard';
import { MiniGamesHub } from './components/MiniGamesHub';
import { JourneyTracker } from './components/JourneyTracker';
import { Settings } from './components/Settings';
import { RelaxationHub } from './components/RelaxationHub';
import { Knowledge } from './components/Knowledge';
import { Chatbot } from './components/Chatbot';
import { FloatingChatButton } from './components/FloatingChatButton';

function AppContent() {
  const location = useLocation();
  const showChatButton = location.pathname !== '/chatbot' && 
                         location.pathname !== '/login' && 
                         location.pathname !== '/signup';

  return (
    <div className="relative min-h-screen">
      <CosmicBackground />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mini-games" element={<MiniGamesHub />} />
        <Route path="/journey" element={<JourneyTracker />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/relaxation" element={<RelaxationHub />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {showChatButton && <FloatingChatButton />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}