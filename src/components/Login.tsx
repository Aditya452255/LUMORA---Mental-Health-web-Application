import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      await login(email, password);
      const storedName = localStorage.getItem('userName');
      // `login` stores token and user; keep userName in localStorage for current UI
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if (user?.name) localStorage.setItem('userName', user.name);
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      alert(err?.message || err?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Decorative stars */}
      <div className="absolute top-20 right-20 w-12 h-12">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-full h-full"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" fill="rgba(93, 217, 193, 0.3)" />
          </svg>
        </motion.div>
      </div>

      <div className="absolute bottom-32 left-32 w-8 h-8">
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-full h-full"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" fill="rgba(167, 139, 250, 0.3)" />
          </svg>
        </motion.div>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-card-intense p-12 relative overflow-hidden"
      >
        {/* Glow effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-400/5 via-transparent to-purple-400/5 pointer-events-none" />

        <div className="relative z-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h2 className="mb-2">Welcome Back</h2>
            <p className="text-white/60">Your journey continues here.</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-20 h-20 rounded-full glass-card flex items-center justify-center mx-auto mb-8"
          >
            <User className="w-10 h-10 text-teal-400" />
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass-input"
                required
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass-input"
                required
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2"
            >
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-teal-400/30 bg-transparent"
              />
              <label htmlFor="remember" className="text-sm text-white/60 cursor-pointer">
                Forgot Password?
              </label>
            </motion.div>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              type="submit"
              className="w-full py-3 rounded-full glow-button text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Log In
            </motion.button>
          </form>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-6"
          >
            <p className="text-white/60 text-sm">
              Don't have your account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                Sign Up
              </button>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
