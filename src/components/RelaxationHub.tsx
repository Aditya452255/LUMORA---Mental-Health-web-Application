import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Wind, Brain, Music, Play, Pause, Volume2, Clock, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function RelaxationHub() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'breathing' | 'meditation' | 'soundscapes'>('breathing');
  const [isPlaying, setIsPlaying] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  const breathingExercises = [
    {
      name: '4-7-8 Breathing',
      description: 'Calming technique for stress relief',
      duration: '5 min',
      inhale: 4,
      hold: 7,
      exhale: 8,
    },
    {
      name: 'Box Breathing',
      description: 'Balance and focus',
      duration: '10 min',
      inhale: 4,
      hold: 4,
      exhale: 4,
    },
    {
      name: 'Deep Belly Breathing',
      description: 'Reduce anxiety',
      duration: '7 min',
      inhale: 5,
      hold: 2,
      exhale: 5,
    },
  ];

  const meditations = [
    {
      name: 'Morning Mindfulness',
      description: 'Start your day with clarity',
      duration: '10 min',
      difficulty: 'Beginner',
    },
    {
      name: 'Body Scan',
      description: 'Deep relaxation technique',
      duration: '20 min',
      difficulty: 'Intermediate',
    },
    {
      name: 'Loving Kindness',
      description: 'Cultivate compassion',
      duration: '15 min',
      difficulty: 'Beginner',
    },
    {
      name: 'Chakra Meditation',
      description: 'Energy alignment',
      duration: '30 min',
      difficulty: 'Advanced',
    },
  ];

  const soundscapes = [
    {
      name: 'Ocean Waves',
      description: 'Gentle coastal sounds',
      icon: '🌊',
    },
    {
      name: 'Rain Forest',
      description: 'Tropical rain ambience',
      icon: '🌧️',
    },
    {
      name: 'Mountain Wind',
      description: 'Peaceful breeze',
      icon: '🏔️',
    },
    {
      name: 'Tibetan Bowls',
      description: 'Healing frequencies',
      icon: '🔔',
    },
    {
      name: 'Night Crickets',
      description: 'Calming nature sounds',
      icon: '🦗',
    },
    {
      name: 'White Noise',
      description: 'Pure relaxation',
      icon: '☁️',
    },
  ];

  const tabs = [
    { id: 'breathing' as const, label: 'Breathing', icon: Wind },
    { id: 'meditation' as const, label: 'Meditation', icon: Brain },
    { id: 'soundscapes' as const, label: 'Soundscapes', icon: Music },
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
        <h2>Relaxation Hub</h2>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-4 mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 rounded-2xl transition-all ${
                activeTab === tab.id
                  ? 'glass-card-intense neon-glow'
                  : 'glass-card hover:neon-glow'
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <tab.icon className="w-5 h-5 text-teal-400" />
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Breathing Tab */}
          {activeTab === 'breathing' && (
            <motion.div
              key="breathing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Breathing Visualizer */}
              <div className="glass-card-intense p-12 mb-8 text-center">
                <h3 className="mb-8">Guided Breathing Exercise</h3>
                
                <div className="relative w-64 h-64 mx-auto mb-8">
                  <motion.div
                    animate={{
                      scale: breathingPhase === 'inhale' ? 1.5 : breathingPhase === 'hold' ? 1.5 : 1,
                    }}
                    transition={{
                      duration: breathingPhase === 'inhale' ? 4 : breathingPhase === 'exhale' ? 4 : 0,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400/30 to-purple-400/30 blur-xl"
                  />
                  <motion.div
                    animate={{
                      scale: breathingPhase === 'inhale' ? 1.3 : breathingPhase === 'hold' ? 1.3 : 1,
                    }}
                    transition={{
                      duration: breathingPhase === 'inhale' ? 4 : breathingPhase === 'exhale' ? 4 : 0,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-8 rounded-full glass-card-intense flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2 capitalize">{breathingPhase}</div>
                      <Sparkles className="w-8 h-8 mx-auto text-teal-400" />
                    </div>
                  </motion.div>
                </div>

                <button
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                    // In a real app, this would start the breathing cycle
                  }}
                  className="px-12 py-4 rounded-full glow-button flex items-center gap-3 mx-auto"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isPlaying ? 'Pause' : 'Start Session'}
                </button>
              </div>

              {/* Breathing Exercises List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {breathingExercises.map((exercise, index) => (
                  <motion.div
                    key={exercise.name}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="glass-card p-6 hover:neon-glow transition-all cursor-pointer"
                  >
                    <h4 className="mb-2">{exercise.name}</h4>
                    <p className="text-white/60 text-sm mb-4">{exercise.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-white/50">
                        <Clock className="w-4 h-4" />
                        {exercise.duration}
                      </div>
                      <button className="px-4 py-1.5 rounded-full glass-card text-sm hover:neon-glow transition-all">
                        Try
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Meditation Tab */}
          {activeTab === 'meditation' && (
            <motion.div
              key="meditation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {meditations.map((meditation, index) => (
                <motion.div
                  key={meditation.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass-card p-6 hover:neon-glow transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3>{meditation.name}</h3>
                    <span className="text-xs px-3 py-1 rounded-full glass-card text-teal-400">
                      {meditation.difficulty}
                    </span>
                  </div>
                  <p className="text-white/60 mb-4">{meditation.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-white/50">
                      <Clock className="w-4 h-4" />
                      {meditation.duration}
                    </div>
                    <button className="px-6 py-2 rounded-full glow-button flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Start
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Soundscapes Tab */}
          {activeTab === 'soundscapes' && (
            <motion.div
              key="soundscapes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Currently Playing */}
              <div className="glass-card-intense p-8 mb-8 text-center">
                <div className="text-6xl mb-4">🌊</div>
                <h3 className="mb-2">Ocean Waves</h3>
                <p className="text-white/60 mb-6">Gentle coastal sounds</p>
                
                <div className="flex items-center gap-4 justify-center mb-6">
                  <button className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:neon-glow transition-all">
                    <Play className="w-5 h-5 text-teal-400" />
                  </button>
                  <button className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:neon-glow transition-all">
                    <Pause className="w-5 h-5 text-teal-400" />
                  </button>
                  <button className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:neon-glow transition-all">
                    <Volume2 className="w-5 h-5 text-teal-400" />
                  </button>
                </div>

                {/* Volume Slider */}
                <div className="max-w-md mx-auto">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="70"
                    className="w-full h-2 rounded-full appearance-none bg-white/20 outline-none"
                    style={{
                      background: 'linear-gradient(to right, #5DD9C1 0%, #5DD9C1 70%, rgba(255,255,255,0.2) 70%, rgba(255,255,255,0.2) 100%)',
                    }}
                  />
                </div>
              </div>

              {/* Soundscapes Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {soundscapes.map((sound, index) => (
                  <motion.div
                    key={sound.name}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05 }}
                    className="glass-card p-6 text-center cursor-pointer hover:neon-glow transition-all"
                  >
                    <div className="text-5xl mb-3">{sound.icon}</div>
                    <h4 className="mb-1">{sound.name}</h4>
                    <p className="text-white/60 text-sm">{sound.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
