import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Gamepad, Grid3x3, Puzzle, Image, Bomb, X } from 'lucide-react';
import fetchGameConfig from '../config/games';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function MiniGamesHub() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const games = [
    {
      id: 1,
      title: 'Chess',
      description: 'Strategic board classic',
      icon: Gamepad,
      difficulty: 'Easy',
      players: '1.8K',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      id: 2,
      title: 'Sudoku',
      description: 'Number-placement logic puzzles',
      icon: Grid3x3,
      difficulty: 'Medium',
      players: '2.3K',
      gradient: 'from-teal-500/20 to-green-500/20',
    },
    {
      id: 3,
      title: 'Sliding Puzzle',
      description: 'Slide tiles to restore the image',
      icon: Puzzle,
      difficulty: 'Easy',
      players: '1.5K',
      gradient: 'from-blue-500/20 to-indigo-500/20',
    },
    {
      id: 4,
      title: 'Memory Card',
      description: 'Flip cards and find matching pairs',
      icon: Image,
      difficulty: 'Hard',
      players: '980',
      gradient: 'from-purple-500/20 to-blue-500/20',
    },
    {
      id: 5,
      title: 'Minesweeper',
      description: 'Uncover tiles and avoid mines',
      icon: Bomb,
      difficulty: 'Easy',
      players: '3.1K',
      gradient: 'from-teal-500/20 to-cyan-500/20',
    },
    {
      id: 6,
      title: 'Tic Tac Toe',
      description: 'Classic Xs and Os for quick matches',
      icon: X,
      difficulty: 'Medium',
      players: '1.2K',
      gradient: 'from-indigo-500/20 to-purple-500/20',
    },
  ];

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [remoteGames, setRemoteGames] = useState<Record<number, { endpoint: string }>>({});

  // Load game endpoints from backend on mount
  useEffect(() => {
    let mounted = true;
    fetchGameConfig()
      .then((g: any) => {
        if (!mounted) return;
        const mapping: Record<number, { endpoint: string }> = {};
        Object.keys(g).forEach((k) => {
          const id = Number(k);
          mapping[id] = { endpoint: g[k].endpoint };
        });
        setRemoteGames(mapping);
      })
      .catch((err) => {
        console.warn('Could not load remote game endpoints', err);
      });

    return () => { mounted = false; };
  }, []);

  const handlePlay = (game: typeof games[number]) => {
    const cfg = remoteGames?.[game.id];
    if (!cfg || !cfg.endpoint) {
      alert('Game URL not configured yet.');
      return;
    }

    try {
      window.open(cfg.endpoint, '_blank', 'noopener');
    } catch (err) {
      console.error('Failed to open game URL', err);
      alert('Unable to open the game.');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="glass-card px-6 py-2 flex items-center gap-2 hover:neon-glow transition-all">
            <span className="text-teal-400">←</span> Dashboard
          </button>
          <button onClick={() => navigate('/relaxation')} className="text-white/70 hover:text-white transition-colors px-4">Relaxation Hub</button>
          <button className="glass-card px-4 py-2 text-teal-400">Mini-Games</button>
          <button onClick={() => navigate('/knowledge')} className="text-white/70 hover:text-white transition-colors px-4">Knowledge</button>
        </div>

        <button onClick={() => navigate('/settings')} className="text-white/70 hover:text-white transition-colors">Settings</button>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="mb-8">
          <h2 className="mb-2">Play & Relax</h2>
          <p className="text-white/60">Engage your mind, find your calm.</p>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full glass-input pl-12" />
          </div>
          <button className="glass-card px-6 py-3 text-white/80 hover:text-white hover:neon-glow transition-all">Pixel</button>
          <button className="glass-card px-6 py-3 text-white/80 hover:text-white hover:neon-glow transition-all">Celer</button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h3 className="mb-4">Games</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game, index) => (
              <motion.div key={game.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 + index * 0.1 }} whileHover={{ scale: 1.03, y: -8 }} className="glass-card p-6 cursor-pointer group relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 neon-glow" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <game.icon className="w-8 h-8 text-teal-400" />
                  </div>
                  <h4 className="mb-1">{game.title}</h4>
                  <p className="text-white/60 text-sm mb-4">{game.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50">Players: {game.players}</span>
                    <button onClick={() => handlePlay(game)} className="px-4 py-1.5 rounded-full glow-button text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Play
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8 glass-card p-6">
          <h4 className="mb-4">Featured: Chess</h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="glass-card p-3">
              <div className="text-white/60 text-xs mb-1">Difficulty</div>
              <div className="text-sm">Easy</div>
            </div>
            <div className="glass-card p-3">
              <div className="text-white/60 text-xs mb-1">Players</div>
              <div className="text-sm">1.8K</div>
            </div>
          </div>
          <p className="text-white/60 text-sm mb-4">Match peaceful patterns and symbols in this calming puzzle game. Perfect for unwinding after a long day.</p>
          <button className="w-full py-3 rounded-full glow-button text-white">Start Game</button>
        </motion.div>
      </div>
    </div>
  );
}

export default MiniGamesHub;