import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FloatingChatButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => navigate('/chatbot')}
      className="fixed bottom-8 right-8 w-16 h-16 rounded-full glow-button flex items-center justify-center shadow-2xl z-50 group"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      <span className="absolute right-full mr-4 px-4 py-2 rounded-xl glass-card whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with AI Companion
      </span>
    </motion.button>
  );
}
