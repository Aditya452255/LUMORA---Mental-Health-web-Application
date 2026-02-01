import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export function JourneyTracker() {
  const navigate = useNavigate();

  // Mock data for journey timeline (2022-2026)
  const journeyData = [
    { year: '2022', stress: 85, happiness: 45 },
    { year: '2023', stress: 70, happiness: 58 },
    { year: '2024', stress: 48, happiness: 72 },
    { year: '2025', stress: 32, happiness: 85 },
    { year: '2026', stress: 28, happiness: 90 },
  ];

  const milestones = [
    {
      date: 'January 2023',
      title: 'Started Meditation Journey',
      description: 'Completed first 7-day streak',
    },
    {
      date: 'June 2023',
      title: 'Consistent Practice',
      description: '100 sessions milestone reached',
    },
    {
      date: 'March 2024',
      title: 'Stress Breakthrough',
      description: '50% stress reduction achieved',
    },
    {
      date: 'November 2024',
      title: 'Inner Peace',
      description: '62% overall stress reduction',
    },
  ];

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-4 mb-8"
      >
        <button
          onClick={() => navigate('/dashboard')}
          className="glass-card w-10 h-10 flex items-center justify-center hover:neon-glow transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-teal-400" />
        </button>
        <h2>My Mindful Journey</h2>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Main Stats Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card-intense p-8 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Key Metric */}
            <div className="lg:col-span-1">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h3 className="mb-1">62%</h3>
                  <p className="text-white/60">Stress Reduction</p>
                </div>
              </div>
              <p className="text-white/50 text-sm mb-4">
                Your mindfulness practice has significantly reduced your stress levels over the past years.
              </p>
              <div className="space-y-3">
                <div className="glass-card p-3">
                  <div className="text-xs text-white/50 mb-1">Total Sessions</div>
                  <div className="text-xl">284</div>
                </div>
                <div className="glass-card p-3">
                  <div className="text-xs text-white/50 mb-1">Total Hours</div>
                  <div className="text-xl">47.3</div>
                </div>
                <div className="glass-card p-3">
                  <div className="text-xs text-white/50 mb-1">Current Streak</div>
                  <div className="text-xl">🔥 28 Days</div>
                </div>
              </div>
            </div>

            {/* Journey Chart */}
            <div className="lg:col-span-2">
              <h4 className="mb-4">Progress Over Time</h4>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={journeyData}>
                  <defs>
                    <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#A78BFA" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorHappiness" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5DD9C1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#5DD9C1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="year" 
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
                  <Area
                    type="monotone"
                    dataKey="stress"
                    stroke="#A78BFA"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorStress)"
                    name="Stress Level"
                  />
                  <Area
                    type="monotone"
                    dataKey="happiness"
                    stroke="#5DD9C1"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorHappiness)"
                    name="Happiness"
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-400" />
                  <span className="text-sm text-white/60">Stress Level</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-teal-400" />
                  <span className="text-sm text-white/60">Happiness</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Milestones Timeline */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="mb-6">Key Milestones</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 to-purple-400" />

            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex gap-6 relative"
                >
                  {/* Timeline dot */}
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center neon-glow">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-br from-teal-400 to-purple-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 glass-card p-6 hover:neon-glow transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <h4>{milestone.title}</h4>
                      <span className="text-xs text-white/50">{milestone.date}</span>
                    </div>
                    <p className="text-white/60 text-sm">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Insights Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="glass-card p-6">
            <h4 className="mb-2">Best Streak</h4>
            <div className="text-3xl mb-1">42 Days</div>
            <p className="text-white/60 text-sm">Your longest meditation streak</p>
          </div>

          <div className="glass-card p-6">
            <h4 className="mb-2">Favorite Time</h4>
            <div className="text-3xl mb-1">7:00 AM</div>
            <p className="text-white/60 text-sm">You meditate most at this time</p>
          </div>

          <div className="glass-card p-6">
            <h4 className="mb-2">Top Practice</h4>
            <div className="text-3xl mb-1">Breathing</div>
            <p className="text-white/60 text-sm">Your most used feature</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
