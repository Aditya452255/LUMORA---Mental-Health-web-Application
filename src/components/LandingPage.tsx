import { motion } from 'framer-motion';
import { Sparkles, Brain, Music, Info, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    { icon: Sparkles, label: 'Breathing', description: 'Guided breathing exercises' },
    { icon: Brain, label: 'Meditation', description: 'Mindful meditation sessions' },
    { icon: Music, label: 'Soundscapes', description: 'Calming ambient sounds' },
    { icon: Info, label: 'Insights', description: 'Learn and grow' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between px-8 py-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-teal-400" />
          </div>
          <span className="text-xl tracking-wide">LUMORA</span>
        </div>
        <div className="flex items-center gap-8">
          <nav className="flex gap-6">
            <button className="text-white/70 hover:text-white transition-colors">
              Features
            </button>
            <button 
              onClick={() => navigate('/mini-games')}
              className="text-white/70 hover:text-white transition-colors"
            >
              Mini-Games
            </button>
            <button className="text-white/70 hover:text-white transition-colors">
              Knowledge
            </button>
          </nav>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 rounded-full glass-card text-white/90 hover:text-white transition-all"
            >
              Log In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-2 rounded-full glow-button text-white"
            >
              Sign Up
            </button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] w-full min-h-[520px] md:min-h-[600px] lg:min-h-[640px] xl:min-h-[680px] 2xl:min-h-[720px] glass-card-intense p-20 md:p-24 text-center relative overflow-hidden rounded-[28px]"
        >
          {/* Glow effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-6 text-5xl md:text-6xl lg:text-7xl"
            >
              Unlock Your
              <br />
              Inner Peace
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-white/70 mb-8 text-lg"
            >
              Meditate, play, and learn on your journey to clarity
            </motion.p>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={() => navigate('/signup')}
              className="px-10 py-4 rounded-full glow-button text-white text-lg mb-16"
            >
              Start Free Trial
            </motion.button>

            {/* Feature Icons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex justify-center gap-12"
            >
              {features.map((feature, index) => {
                const onClick = () => {
                  // route to relaxation with tab param for those three features
                  if (feature.label === 'Breathing') return navigate('/relaxation?tab=breathing');
                  if (feature.label === 'Meditation') return navigate('/relaxation?tab=meditation');
                  if (feature.label === 'Soundscapes') return navigate('/relaxation?tab=soundscapes');
                  // fallback: go to dashboard for other features
                  return navigate('/dashboard');
                };

                return (
                  <motion.button
                    key={feature.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                    onClick={onClick}
                  >
                    <div className="w-14 h-14 rounded-full glass-card flex items-center justify-center group-hover:neon-glow transition-all">
                      <feature.icon className="w-6 h-6 text-teal-400" />
                    </div>
                    <span className="text-sm text-white/80">{feature.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* Carousel dots */}
          <div className="flex justify-center gap-2 mt-12">
            {[0, 1, 2, 3, 4].map((dot) => (
              <div
                key={dot}
                className={`w-2 h-2 rounded-full ${
                  dot === 0 ? 'bg-teal-400' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="py-8 px-8 text-center"
      >
        <div className="flex justify-center gap-6 mb-4">
          <button className="w-8 h-8 rounded-full glass-card flex items-center justify-center hover:neon-glow transition-all">
            <span className="text-sm">f</span>
          </button>
          <button className="w-8 h-8 rounded-full glass-card flex items-center justify-center hover:neon-glow transition-all">
            <span className="text-sm">in</span>
          </button>
          <button className="w-8 h-8 rounded-full glass-card flex items-center justify-center hover:neon-glow transition-all">
            <span className="text-sm">tw</span>
          </button>
          <button className="w-8 h-8 rounded-full glass-card flex items-center justify-center hover:neon-glow transition-all">
            <span className="text-sm">ig</span>
          </button>
        </div>
        <p className="text-white/40 text-sm">
          Calming and knwvian and lualebee wips laoter ccep
        </p>
      </motion.footer>
    </div>
  );
}