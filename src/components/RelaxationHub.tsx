import { useEffect, useRef, useState } from 'react';
import { useMeditationSession } from '../hooks/useMeditationSession';
import { useSoundscapePlayer } from '../hooks/useSoundscapePlayer';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Wind, Brain, Music, Play, Pause, Volume2, Clock, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function formatTime(secs: number | undefined | null) {
  if (!secs || isNaN(secs)) return '00:00';
  const s = Math.floor(secs);
  const mm = Math.floor(s / 60)
    .toString()
    .padStart(2, '0');
  const ss = (s % 60).toString().padStart(2, '0');
  return `${mm}:${ss}`;
}

export function RelaxationHub() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'breathing' | 'meditation' | 'soundscapes'>('breathing');
  const [isPlaying, setIsPlaying] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [animDuration, setAnimDuration] = useState<number>(4);
  const intervalRef = useRef<number | null>(null);
  const patternRef = useRef<Array<{ label: 'Inhale' | 'Hold' | 'Exhale'; duration: number }>>([]);
  const stepIndexRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const stepStartRef = useRef<number>(0);
  const stepDurationRef = useRef<number>(4000);
  const [outerScale, setOuterScale] = useState<number>(1);
  const [innerScale, setInnerScale] = useState<number>(1);
  const startOuterRef = useRef<number>(1);
  const startInnerRef = useRef<number>(1);
  const targetOuterRef = useRef<number>(1.5);
  const targetInnerRef = useRef<number>(1.3);

  // Start a breathing session given a pattern (array of {label, duration}).
  const startBreathingSession = (pattern: Array<{ label: 'Inhale' | 'Hold' | 'Exhale'; duration: number }>) => {
    // stop any existing session first
    stopBreathingSession();
    patternRef.current = pattern;
    stepIndexRef.current = 0;
    setIsPlaying(true);
    // initialize first step and start the ticking loop
    const first = patternRef.current[0];
    setBreathingPhase(first.label.toLowerCase() as 'inhale' | 'hold' | 'exhale');
    setTimeLeft(first.duration);
    setAnimDuration(first.duration);
    // initialize animation refs
    stepStartRef.current = Date.now();
    stepDurationRef.current = first.duration * 1000;
    // targets depend on phase
    if (first.label === 'Exhale') {
      targetOuterRef.current = 1;
      targetInnerRef.current = 1;
    } else {
      targetOuterRef.current = 1.5;
      targetInnerRef.current = 1.3;
    }
    startOuterRef.current = outerScale;
    startInnerRef.current = innerScale;
    // run the interval loop
    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          // advance step
          stepIndexRef.current = (stepIndexRef.current + 1) % patternRef.current.length;
          const next = patternRef.current[stepIndexRef.current];
          setBreathingPhase(next.label.toLowerCase() as 'inhale' | 'hold' | 'exhale');
          setAnimDuration(next.duration);
          // reset animation refs for the new step
          stepStartRef.current = Date.now();
          stepDurationRef.current = next.duration * 1000;
          startOuterRef.current = outerScale;
          startInnerRef.current = innerScale;
          if (next.label === 'Exhale') {
            targetOuterRef.current = 1;
            targetInnerRef.current = 1;
          } else {
            targetOuterRef.current = 1.5;
            targetInnerRef.current = 1.3;
          }
          return next.duration;
        }
        return prev - 1;
      });
    }, 1000) as unknown as number;

    // start rAF animation loop for smooth scaling
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t); // easeInOut approximation
    const rafTick = () => {
      const now = Date.now();
      const elapsed = now - stepStartRef.current;
      const dur = stepDurationRef.current || 1000;
      const t = Math.max(0, Math.min(1, elapsed / dur));
      const e = ease(t);
      const o = startOuterRef.current + (targetOuterRef.current - startOuterRef.current) * e;
      const i = startInnerRef.current + (targetInnerRef.current - startInnerRef.current) * e;
      setOuterScale(o);
      setInnerScale(i);
      rafRef.current = requestAnimationFrame(rafTick);
    };
    rafRef.current = requestAnimationFrame(rafTick);
  };

  // Backwards-compatible API name requested: runBreathingSession
  const runBreathingSession = (pattern: Array<{ label: 'Inhale' | 'Hold' | 'Exhale'; duration: number }>) => {
    startBreathingSession(pattern);
  };

  const stopBreathingSession = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsPlaying(false);
    setTimeLeft(null);
    setAnimDuration(4);
    patternRef.current = [];
    stepIndexRef.current = 0;
    setBreathingPhase('inhale');
    setOuterScale(1);
    setInnerScale(1);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Stop session automatically when navigating away from the Breathing tab
  useEffect(() => {
    if (activeTab !== 'breathing') {
      stopBreathingSession();
    }
    // Auto-stop meditation when leaving meditation tab
    if (activeTab !== 'meditation') {
      stopMeditationSession();
    }
    // Auto-stop soundscapes when leaving soundscapes tab
    if (activeTab !== 'soundscapes') {
      try {
        stopSound();
      } catch (e) {}
    }
  }, [activeTab]);

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

  // Meditation session hook
  // Lazy import hook from hooks file
  // (placed here so whole feature is contained within RelaxationHub scope)
  // eslint-disable-next-line import/no-unresolved
  // We'll import normally
  
  // Hook will be used below
  const {
    activeSession: activeMeditation,
    remainingSeconds: meditationRemaining,
    isComplete: meditationComplete,
    isRunning: meditationRunning,
    startMeditationSession,
    stopMeditationSession,
  } = useMeditationSession();

  // Read ?tab= from URL so external navigation can open a specific tab
  const location = useLocation();
  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const t = params.get('tab');
      if (t === 'breathing' || t === 'meditation' || t === 'soundscapes') {
        setActiveTab(t);
      }
    } catch (e) {
      // ignore
    }
    // only run when location.search changes
  }, [location.search]);
  

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

  // Soundscape player hook
  const {
    activeSound: activeSoundKey,
    isPlaying: soundPlaying,
    volume: soundVolume,
    playSound,
    pauseSound,
    stopSound,
    setVolume: setSoundVolume,
    duration: soundDuration,
    currentTime: soundCurrentTime,
    isLoaded: soundIsLoaded,
    seek: seekSound,
    isActive,
  } = useSoundscapePlayer();

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
                    style={{ transform: `scale(${outerScale})` }}
                    transition={{
                      duration: 0,
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400/30 to-purple-400/30 blur-xl"
                  />
                  <motion.div
                    style={{ transform: `scale(${innerScale})` }}
                    transition={{
                      duration: 0,
                    }}
                    className="absolute inset-8 rounded-full glass-card-intense flex items-center justify-center"
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* Flex row with three identical boxes spaced out */}
                      <div className="flex items-center justify-center gap-6 w-full px-6">
                        <div className={`w-28 h-28 rounded-lg glass-card-intense flex flex-col items-start justify-center px-4 transition-opacity duration-300 ${breathingPhase === 'inhale' ? 'opacity-100' : 'opacity-30'}`}>
                          <div className="text-lg font-medium capitalize">Inhale</div>
                          {timeLeft !== null && breathingPhase === 'inhale' && (
                            <div className="text-sm text-white/60 mt-1">{timeLeft}s</div>
                          )}
                        </div>

                        <div className={`w-28 h-28 rounded-lg glass-card-intense flex flex-col items-center justify-center px-4 transition-opacity duration-300 ${breathingPhase === 'hold' ? 'opacity-100' : 'opacity-30'}`}>
                          <div className="text-lg font-medium capitalize">Hold</div>
                          {timeLeft !== null && breathingPhase === 'hold' && (
                            <div className="text-sm text-white/60 mt-1">{timeLeft}s</div>
                          )}
                        </div>

                        <div className={`w-28 h-28 rounded-lg glass-card-intense flex flex-col items-end justify-center px-4 transition-opacity duration-300 ${breathingPhase === 'exhale' ? 'opacity-100' : 'opacity-30'}`}>
                          <div className="text-lg font-medium capitalize">Exhale</div>
                          {timeLeft !== null && breathingPhase === 'exhale' && (
                            <div className="text-sm text-white/60 mt-1">{timeLeft}s</div>
                          )}
                        </div>
                      </div>

                      {/* Circular progress ring centered */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <svg width="140" height="140" viewBox="0 0 140 140">
                          <circle cx="70" cy="70" r="60" stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
                          {(() => {
                            const dur = (stepDurationRef.current || animDuration * 1000) / 1000;
                            const remaining = timeLeft ?? 0;
                            const progress = dur > 0 ? Math.max(0, Math.min(1, remaining / dur)) : 0;
                            const radius = 60;
                            const circumference = 2 * Math.PI * radius;
                            const dash = circumference * progress;
                            const offset = circumference - dash;
                            return (
                              <circle
                                cx="70"
                                cy="70"
                                r={radius}
                                stroke="#5dd9c1"
                                strokeWidth="8"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={`${circumference}`}
                                strokeDashoffset={offset}
                                transform="rotate(-90 70 70)"
                              />
                            );
                          })()}
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      if (isPlaying) {
                        // stop
                        stopBreathingSession();
                      } else {
                        // start default 4-7-8
                        const pattern = [
                          { label: 'Inhale', duration: 4 },
                          { label: 'Hold', duration: 7 },
                          { label: 'Exhale', duration: 8 },
                        ];
                        startBreathingSession(pattern);
                      }
                    }}
                    className="px-12 py-4 rounded-full glow-button flex items-center gap-3 mx-auto"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    {isPlaying ? 'Pause' : 'Start Session'}
                  </button>

                  <button
                    onClick={() => {
                      // play all three patterns concatenated in order
                      const p1 = [
                        { label: 'Inhale', duration: 4 },
                        { label: 'Hold', duration: 7 },
                        { label: 'Exhale', duration: 8 },
                      ];
                      const p2 = [
                        { label: 'Inhale', duration: 4 },
                        { label: 'Hold', duration: 4 },
                        { label: 'Exhale', duration: 4 },
                        { label: 'Hold', duration: 4 },
                      ];
                      const p3 = [
                        { label: 'Inhale', duration: 4 },
                        { label: 'Exhale', duration: 6 },
                      ];
                      startBreathingSession([...p1, ...p2, ...p3]);
                    }}
                    className="px-6 py-3 rounded-full glass-card hover:neon-glow transition-all"
                    title="Play all patterns in sequence"
                  >
                    Play All
                  </button>
                </div>
              </div>

              {/* Breathing Exercises List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {breathingExercises.map((exercise, index) => {
                  // Build a normalized pattern for this exercise
                  const buildPattern = () => {
                    if (exercise.name === '4-7-8 Breathing') {
                      return [
                        { label: 'Inhale', duration: 4 },
                        { label: 'Hold', duration: 7 },
                        { label: 'Exhale', duration: 8 },
                      ];
                    }
                    if (exercise.name === 'Box Breathing') {
                      return [
                        { label: 'Inhale', duration: 4 },
                        { label: 'Hold', duration: 4 },
                        { label: 'Exhale', duration: 4 },
                        { label: 'Hold', duration: 4 },
                      ];
                    }
                    // Deep Belly default pattern (as requested in requirements)
                    return [
                      { label: 'Inhale', duration: 4 },
                      { label: 'Exhale', duration: 6 },
                    ];
                  };

                  const onTry = (e?: any) => {
                    e?.stopPropagation();
                    const pattern = buildPattern();
                    startBreathingSession(pattern);
                  };

                  return (
                    <motion.div
                      key={exercise.name}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                      className="glass-card p-6 hover:neon-glow transition-all cursor-pointer"
                      onClick={() => startBreathingSession(buildPattern())}
                    >
                      <h4 className="mb-2">{exercise.name}</h4>
                      <p className="text-white/60 text-sm mb-4">{exercise.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-white/50">
                          <Clock className="w-4 h-4" />
                          {exercise.duration}
                        </div>
                        <button onClick={onTry} className="px-4 py-1.5 rounded-full glass-card text-sm hover:neon-glow transition-all">
                          Try
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
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
                    <button
                      onClick={() => {
                        // Build script and pass to session starter
                        const scripts: string[] = [];
                        if (meditation.name === 'Morning Mindfulness') {
                          scripts.push('Settle into a comfortable position.');
                          scripts.push('Take a slow breath in… and release.');
                          scripts.push('Notice sensations in your body.');
                          scripts.push('Let thoughts come and go without holding them.');
                          scripts.push('Bring attention to your breath — soft and natural.');
                          scripts.push('Invite calm clarity for the day.');
                        } else if (meditation.name === 'Loving Kindness') {
                          scripts.push('Begin with a deep breath.');
                          scripts.push('Feel warmth in the chest like soft expanding light.');
                          scripts.push('Repeat internally: May I be happy, May I be safe, May I be peaceful.');
                          scripts.push('Bring someone you care about into your mind and repeat wishes for them.');
                          scripts.push('Let the warmth expand outward to all.');
                        } else if (meditation.name === 'Body Scan') {
                          scripts.push('Deep breath… soften face and jaw.');
                          scripts.push('Forehead… cheeks… lips.');
                          scripts.push('Neck… shoulders… arms… hands.');
                          scripts.push('Torso… hips… legs… feet.');
                          scripts.push('Release tension and feel the body grow heavy.');
                        } else if (meditation.name === 'Chakra Meditation') {
                          scripts.push('Sit comfortably. Slow breath.');
                          scripts.push('Visualize chakras in order from base to crown.');
                          scripts.push('Let the centers align and balance.');
                        }

                        // placeholder audio urls (optional)
                        const audioMap: Record<string, string> = {
                          'Morning Mindfulness': '/audio/morning-mindfulness.mp3',
                          'Loving Kindness': '/audio/loving-kindness.mp3',
                          'Body Scan': '/audio/body-scan.mp3',
                          'Chakra Meditation': '/audio/chakra-meditation.mp3',
                        };

                        startMeditationSession({
                          title: meditation.name,
                          description: meditation.description,
                          script: scripts,
                          duration: Number(meditation.duration.split(' ')[0]) || 10,
                          audioUrl: audioMap[meditation.name],
                        });
                      }}
                      className="px-6 py-2 rounded-full glow-button flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Start
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Meditation session overlay */}
              {activeMeditation && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-6"
                >
                  <div className="glass-card-intense max-w-3xl w-full p-8 relative">
                    <h2 className="mb-2">{activeMeditation.title}</h2>
                    <p className="text-white/60 mb-4">{activeMeditation.description}</p>

                    <div className="flex items-start gap-6">
                      <div className="flex-1">
                        <div className="text-sm text-white/60 mb-4">
                          {activeMeditation.script.map((s, i) => (
                            <p key={i} className="mb-2">{s}</p>
                          ))}
                        </div>
                        <div className="text-lg font-mono mb-4">
                          {Math.floor((meditationRemaining || 0) / 60)
                            .toString()
                            .padStart(2, '0')}
                          :{((meditationRemaining || 0) % 60).toString().padStart(2, '0')}
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => stopMeditationSession()}
                            className="px-4 py-2 rounded-full glass-card"
                          >
                            Stop
                          </button>
                          {meditationComplete && (
                            <button
                              onClick={() => {
                                // return to meditation tab
                                stopMeditationSession();
                                setActiveTab('meditation');
                              }}
                              className="px-4 py-2 rounded-full glow-button"
                            >
                              Session Complete — Return
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="w-64">
                        <div className="text-sm text-white/60 mb-2">Duration</div>
                        <div className="text-lg font-medium mb-4">{activeMeditation.duration} min</div>
                        <div className="text-sm text-white/60 mb-2">Audio</div>
                        <div className="text-sm">{activeMeditation.audioUrl ? 'Guided audio playing' : 'No audio'}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
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
              <div className="glass-card-intense p-8 mb-8 flex flex-col md:flex-row items-stretch gap-6">
                <div className="flex-1 text-center">
                  <div className="text-6xl mb-4">{
                    (function () {
                      switch (activeSoundKey) {
                        case 'ocean':
                          return '🌊';
                        case 'rain':
                          return '🌧️';
                        case 'wind':
                          return '🏔️';
                        case 'bowls':
                          return '🔔';
                        case 'crickets':
                          return '🦗';
                        case 'white':
                          return '☁️';
                        default:
                          return '🌊';
                      }
                    })()
                  }</div>
                  <h3 className="mb-2">{(function () {
                    switch (activeSoundKey) {
                      case 'ocean':
                        return 'Ocean Waves';
                      case 'rain':
                        return 'Rain Forest';
                      case 'wind':
                        return 'Mounatain Wind';
                      case 'bowls':
                        return 'Tibetan Bowls';
                      case 'crickets':
                        return 'Night Crickets';
                      case 'white':
                        return 'White Noise';
                      default:
                        return 'Ocean Waves';
                    }
                  })()}</h3>
                  <p className="text-white/60 mb-6">{(function () {
                    switch (activeSoundKey) {
                      case 'ocean':
                        return 'Gentle coastal sounds';
                      case 'rain':
                        return 'Tropical rain ambience';
                      case 'wind':
                        return 'Peaceful breeze';
                      case 'bowls':
                        return 'Healing frequencies';
                      case 'crickets':
                        return 'Calming nature sounds';
                      case 'white':
                        return 'Pure relaxation';
                      default:
                        return 'Gentle coastal sounds';
                    }
                  })()}</p>

                  <div className="flex items-center gap-4 justify-center mb-6">
                    <button
                      onClick={() => {
                        if (soundPlaying) pauseSound();
                        else {
                          playSound((activeSoundKey as any) || 'ocean');
                        }
                      }}
                      className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:neon-glow transition-all"
                    >
                      {soundPlaying ? <Pause className="w-5 h-5 text-teal-400" /> : <Play className="w-5 h-5 text-teal-400" />}
                    </button>
                    <button
                      onClick={() => stopSound()}
                      className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:neon-glow transition-all"
                    >
                      <Volume2 className="w-5 h-5 text-teal-400" />
                    </button>
                  </div>

                  {/* Volume Slider (with +/- controls) */}
                  <div className="max-w-md mx-auto">
                    <div className="flex items-center gap-3">
                      <button
                        aria-label="Decrease volume"
                        title="Decrease volume"
                        onClick={() => setSoundVolume(Math.max(0, Number((soundVolume - 0.05).toFixed(2))))}
                        className="w-8 h-8 rounded-full glass-card flex items-center justify-center hover:neon-glow transition-all"
                      >
                        -
                      </button>

                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={soundVolume}
                        onChange={(e) => setSoundVolume(Number(e.target.value))}
                        className="flex-1 h-2 rounded-full appearance-none bg-white/20 outline-none"
                        style={{
                          background: `linear-gradient(to right, #5DD9C1 0%, #5DD9C1 ${Math.round(soundVolume*100)}%, rgba(255,255,255,0.2) ${Math.round(soundVolume*100)}%, rgba(255,255,255,0.2) 100%)`,
                        }}
                      />

                      <button
                        aria-label="Increase volume"
                        title="Increase volume"
                        onClick={() => setSoundVolume(Math.min(1, Number((soundVolume + 0.05).toFixed(2))))}
                        className="w-8 h-8 rounded-full glass-card flex items-center justify-center hover:neon-glow transition-all"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-xs text-white/60 mt-2">Volume: {Math.round(soundVolume * 100)}%</div>
                  </div>
                </div>

                {/* Timeline on the right side */}
                <div className="w-full md:w-72 flex-shrink-0 flex flex-col justify-center">
                  <div className="text-sm text-white/60 mb-2">Timeline</div>
                  <div className="glass-card p-4">
                    <div className="text-xs text-white/60 mb-2 flex items-center justify-between">
                      <div>{formatTime(soundCurrentTime)}</div>
                      <div>{soundIsLoaded ? formatTime(soundDuration) : '--:--'}</div>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={Math.max(0, soundDuration || 0)}
                      step={0.1}
                      value={Math.max(0, soundCurrentTime || 0)}
                      onChange={(e) => seekSound(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none bg-white/10 outline-none"
                      style={{
                        background: `linear-gradient(to right, #5DD9C1 0%, #5DD9C1 ${Math.round((soundCurrentTime / Math.max(1, soundDuration || 1)) * 100)}%, rgba(255,255,255,0.15) ${Math.round((soundCurrentTime / Math.max(1, soundDuration || 1)) * 100)}%, rgba(255,255,255,0.15) 100%)`,
                      }}
                    />
                    <div className="flex items-center justify-between mt-3">
                      <button
                        onClick={() => seekSound(Math.max(0, (soundCurrentTime || 0) - 10))}
                        className="px-3 py-1 rounded-full glass-card text-sm"
                      >
                        -10s
                      </button>
                      <button
                        onClick={() => seekSound(Math.min((soundDuration || 0), (soundCurrentTime || 0) + 10))}
                        className="px-3 py-1 rounded-full glass-card text-sm"
                      >
                        +10s
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Soundscapes Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {soundscapes.map((sound, index) => {
                  const keyMap: Record<string, any> = {
                    'Ocean Waves': 'ocean',
                    'Rain Forest': 'rain',
                    'Mountain Wind': 'wind',
                    'Tibetan Bowls': 'bowls',
                    'Night Crickets': 'crickets',
                    'White Noise': 'white',
                  };
                  const soundKey = keyMap[sound.name] as any;
                  return (
                    <motion.div
                      key={sound.name}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.05 }}
                      className={`glass-card p-6 text-center cursor-pointer transition-all ${isActive(soundKey) ? 'neon-glow glass-card-intense' : 'hover:neon-glow'}`}
                      onClick={() => playSound(soundKey)}
                    >
                      <div className="text-5xl mb-3">{sound.icon}</div>
                      <h4 className="mb-1">{sound.name}</h4>
                      <p className="text-white/60 text-sm">{sound.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
