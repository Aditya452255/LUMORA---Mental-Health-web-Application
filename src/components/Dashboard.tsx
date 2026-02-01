import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Settings, User, TrendingUp, Music, BookOpen, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');
  const [intention, setIntention] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Mock data for 7-day streak
  const progressData = [
    { day: 'Mon', sessions: 2 },
    { day: 'Tue', sessions: 3 },
    { day: 'Wed', sessions: 4 },
    { day: 'Thu', sessions: 3 },
    { day: 'Fri', sessions: 5 },
    { day: 'Sat', sessions: 4 },
    { day: 'Sun', sessions: 6 },
  ];

  const quickActions = [
    {
      title: 'Daily Meditation',
      subtitle: '10 min guided session',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-500',
      link: '/relaxation',
    },
    {
      title: 'Soundscapes',
      subtitle: 'Calming nature sounds',
      icon: Music,
      gradient: 'from-teal-500 to-blue-500',
      link: '/relaxation',
    },
    {
      title: 'Latest Article',
      subtitle: 'The Power of Mindfulness',
      icon: BookOpen,
      gradient: 'from-indigo-500 to-purple-500',
      link: '/knowledge',
    },
  ];

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="glass-card px-6 py-2 flex items-center gap-2 hover:neon-glow transition-all"
          >
            <span className="text-teal-400">←</span> Dashboard
          </button>
          <button
            onClick={() => navigate('/relaxation')}
            className="text-white/70 hover:text-white transition-colors px-4"
          >
            Relaxation Hub
          </button>
          <button 
            onClick={() => navigate('/mini-games')}
            className="text-white/70 hover:text-white transition-colors px-4"
          >
            Mini-Games
          </button>
          <button 
            onClick={() => navigate('/knowledge')}
            className="text-white/70 hover:text-white transition-colors px-4"
          >
            Knowledge
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/chatbot')}
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:neon-glow transition-all"
          >
            <Bell className="w-5 h-5 text-teal-400" />
          </button>
          <button 
            onClick={() => navigate('/settings')}
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:neon-glow transition-all"
          >
            <Settings className="w-5 h-5 text-teal-400" />
          </button>
          <button className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:neon-glow transition-all">
            <User className="w-5 h-5 text-teal-400" />
          </button>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="mb-4">Welcome Back, {userName}</h2>
          <div className="glass-card p-6">
            <label className="text-white/60 text-sm mb-2 block">
              Set your intention for today
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="I will be present and mindful today..."
                value={intention}
                onChange={(e) => setIntention(e.target.value)}
                className="flex-1 glass-input"
              />
              <button className="px-6 py-2 rounded-full glow-button flex items-center gap-2">
                <Edit2 className="w-4 h-4" />
                Set
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progress Chart */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="mb-1">7-Day Streak</h3>
                <p className="text-white/60 text-sm">Your meditation progress</p>
              </div>
              <div className="glass-card px-4 py-2">
                <span className="text-teal-400">🔥 7 Days</span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={progressData}>
                <defs>
                  <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5DD9C1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#5DD9C1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="day" 
                  stroke="rgba(255,255,255,0.5)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.5)"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(45, 27, 78, 0.9)',
                    border: '1px solid rgba(93, 217, 193, 0.3)',
                    borderRadius: '12px',
                    color: 'white',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sessions"
                  stroke="#5DD9C1"
                  strokeWidth={3}
                  dot={{
                    fill: '#5DD9C1',
                    strokeWidth: 2,
                    r: 6,
                    filter: 'drop-shadow(0 0 8px rgba(93, 217, 193, 0.8))',
                  }}
                  activeDot={{
                    r: 8,
                    filter: 'drop-shadow(0 0 12px rgba(93, 217, 193, 1))',
                  }}
                  fill="url(#colorSessions)"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 flex flex-col justify-center"
          >
            <h3 className="mb-6">Your Journey</h3>
            <div className="space-y-4">
              <div className="glass-card p-4 hover:neon-glow transition-all cursor-pointer">
                <div className="text-3xl mb-1">27</div>
                <div className="text-white/60 text-sm">Sessions Completed</div>
              </div>
              <div className="glass-card p-4 hover:neon-glow transition-all cursor-pointer">
                <div className="text-3xl mb-1">180</div>
                <div className="text-white/60 text-sm">Minutes Meditated</div>
              </div>
              <div className="glass-card p-4 hover:neon-glow transition-all cursor-pointer">
                <div className="text-3xl mb-1">62%</div>
                <div className="text-white/60 text-sm">Stress Reduction</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <h3 className="mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="glass-card p-6 text-left relative overflow-hidden group"
                onClick={() => navigate(action.link)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <action.icon className="w-10 h-10 text-teal-400 mb-4" />
                <h4 className="mb-1">{action.title}</h4>
                <p className="text-white/60 text-sm">{action.subtitle}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Journey Tracker Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <button
            onClick={() => navigate('/journey')}
            className="px-8 py-3 rounded-full glow-button text-white"
          >
            View My Mindful Journey
          </button>
        </motion.div>
      </div>
    </div>
  );
}