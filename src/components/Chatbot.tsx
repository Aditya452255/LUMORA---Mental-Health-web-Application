import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Sparkles, User, Bot, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

export function Chatbot() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'Managing Stress',
      messages: [],
    },
  ]);
  const [activeConversationId, setActiveConversationId] = useState('1');
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  const suggestedPrompts = [
    "How can I reduce my anxiety?",
    "What are the benefits of meditation?",
    "Tips for better sleep",
    "How to start a mindfulness practice?",
  ];

  const handleSend = async () => {
    if (!input.trim() || !activeConversation) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    // Add user message
    setConversations(prev => prev.map(conv => {
      if (conv.id === activeConversationId) {
        return {
          ...conv,
          messages: [...conv.messages, userMessage],
          title: conv.messages.length === 0 ? input.slice(0, 30) + '...' : conv.title,
        };
      }
      return conv;
    }));

    setInput('');
    setIsTyping(true);
    try {
      const base = import.meta.env.VITE_API_URL || '';
      const url = base ? `${base.replace(/\/$/, '')}/api/chat` : '/api/chat';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, userId: activeConversationId }),
      });

      const data = await res.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'Sorry, I could not get a response.',
        timestamp: new Date(),
      };

      setConversations(prev => prev.map(conv => {
        if (conv.id === activeConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, assistantMessage],
            title: conv.messages.length === 0 ? assistantMessage.content.slice(0, 30) + '...' : conv.title,
          };
        }
        return conv;
      }));
    } catch (err) {
      console.error('Chat error', err);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, something went wrong connecting to the AI companion.',
        timestamp: new Date(),
      };
      setConversations(prev => prev.map(conv => {
        if (conv.id === activeConversationId) {
          return { ...conv, messages: [...conv.messages, assistantMessage] };
        }
        return conv;
      }));
    } finally {
      setIsTyping(false);
    }
  };

  const getAIResponse = (userInput: string): string => {
    // Mock AI responses based on keywords
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('anxiety') || lowerInput.includes('anxious')) {
      return "Anxiety is a natural response, but there are effective ways to manage it:\n\n1. **Deep Breathing**: Try the 4-7-8 technique - inhale for 4 seconds, hold for 7, exhale for 8.\n\n2. **Grounding Technique**: Use the 5-4-3-2-1 method - identify 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste.\n\n3. **Regular Practice**: Daily meditation, even just 5-10 minutes, can significantly reduce anxiety over time.\n\nWould you like me to guide you through a specific exercise?";
    }

    if (lowerInput.includes('sleep') || lowerInput.includes('insomnia')) {
      return "Better sleep starts with good habits:\n\n1. **Wind-Down Routine**: Create a 30-minute pre-sleep ritual with dim lights and calming activities.\n\n2. **Breathing for Sleep**: Try the 4-7-8 breathing technique or body scan meditation.\n\n3. **Environment**: Keep your bedroom cool, dark, and quiet.\n\n4. **Consistency**: Go to bed and wake up at the same time daily.\n\nOur Sleep Meditation section has guided sessions specifically designed to help you fall asleep naturally. Would you like to try one?";
    }

    if (lowerInput.includes('meditation') || lowerInput.includes('meditate')) {
      return "Meditation is a powerful tool for mental wellness:\n\n**Benefits:**\n- Reduces stress and anxiety\n- Improves focus and clarity\n- Enhances emotional regulation\n- Better sleep quality\n\n**Getting Started:**\n1. Start with just 5 minutes daily\n2. Find a quiet, comfortable space\n3. Focus on your breath\n4. Be patient with yourself\n\nI recommend starting with our 'Morning Mindfulness' session in the Relaxation Hub. It's perfect for beginners!";
    }

    if (lowerInput.includes('stress')) {
      return "Stress management is crucial for your wellbeing:\n\n**Quick Relief:**\n- Take 3 deep breaths right now\n- Step outside for fresh air\n- Do a 2-minute body scan\n\n**Long-term Strategies:**\n- Regular meditation practice\n- Physical exercise\n- Healthy sleep schedule\n- Setting boundaries\n\nYour dashboard shows you've reduced stress by 62% - that's amazing progress! Would you like to explore specific stress-relief techniques?";
    }

    if (lowerInput.includes('start') || lowerInput.includes('begin') || lowerInput.includes('practice')) {
      return "Starting your mindfulness journey is exciting! Here's your roadmap:\n\n**Week 1-2:**\n- 5 minutes of meditation daily\n- Use guided sessions from our app\n- Focus on breathing exercises\n\n**Week 3-4:**\n- Increase to 10 minutes\n- Try different meditation styles\n- Add evening reflection\n\n**Beyond:**\n- Build to 15-20 minutes\n- Explore advanced techniques\n- Track your progress\n\n**Pro Tip:** Consistency matters more than duration. Would you like me to help you set up a daily reminder?";
    }

    return "Thank you for sharing. Mental wellness is a journey, and I'm here to support you.\n\nI can help you with:\n- Anxiety and stress management\n- Meditation guidance\n- Sleep improvement\n- Breathing exercises\n- Building healthy habits\n\nWhat specific area would you like to explore today?";
  };

  const createNewConversation = () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [],
    };
    setConversations([...conversations, newConv]);
    setActiveConversationId(newConv.id);
  };

  const deleteConversation = (id: string) => {
    if (conversations.length === 1) return; // Keep at least one conversation
    setConversations(prev => prev.filter(c => c.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(conversations[0].id);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-80 glass-card-intense p-4 flex flex-col"
      >
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="glass-card w-10 h-10 flex items-center justify-center hover:neon-glow transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-teal-400" />
          </button>
          <h3>AI Companion</h3>
        </div>

        <button
          onClick={createNewConversation}
          className="w-full py-3 rounded-xl glow-button flex items-center justify-center gap-2 mb-4"
        >
          <Plus className="w-5 h-5" />
          New Chat
        </button>

        <div className="flex-1 overflow-y-auto space-y-2">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`p-3 rounded-xl cursor-pointer transition-all group flex items-center justify-between ${activeConversationId === conv.id
                  ? 'glass-card-intense neon-glow'
                  : 'glass-card hover:neon-glow'
                }`}
              onClick={() => setActiveConversationId(conv.id)}
            >
              <span className="text-sm truncate flex-1">{conv.title}</span>
              {conversations.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(conv.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-xl glass-card">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-sm">AI Wellness Coach</span>
          </div>
          <p className="text-xs text-white/60">
            Available 24/7 to support your mental health journey
          </p>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col p-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6"
        >
          <h2>Wellness Companion</h2>
          <p className="text-white/60">Your personal AI guide for mental health and mindfulness</p>
        </motion.div>

        {/* Messages Area */}
        <div className="flex-1 glass-card-intense p-6 mb-6 overflow-y-auto">
          {activeConversation?.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 rounded-full glass-card flex items-center justify-center mb-6 neon-glow"
              >
                <Bot className="w-10 h-10 text-teal-400" />
              </motion.div>
              <h3 className="mb-2">How can I help you today?</h3>
              <p className="text-white/60 mb-8 text-center max-w-md">
                I'm here to support your mental wellness journey. Ask me anything about meditation, stress, anxiety, or mindfulness.
              </p>

              <div className="grid grid-cols-2 gap-3 max-w-2xl">
                {suggestedPrompts.map((prompt, index) => (
                  <motion.button
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setInput(prompt)}
                    className="p-4 rounded-xl glass-card hover:neon-glow transition-all text-left text-sm"
                  >
                    {prompt}
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence>
                {activeConversation?.messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-teal-400" />
                      </div>
                    )}
                    <div
                      className={`max-w-2xl p-4 rounded-2xl ${message.role === 'user'
                          ? 'glow-button'
                          : 'glass-card'
                        }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <span className="text-xs text-white/40 mt-2 block">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-purple-400" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
                    <Bot className="w-5 h-5 text-teal-400" />
                  </div>
                  <div className="glass-card p-4 rounded-2xl">
                    <div className="flex gap-2">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        className="w-2 h-2 rounded-full bg-teal-400"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        className="w-2 h-2 rounded-full bg-teal-400"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        className="w-2 h-2 rounded-full bg-teal-400"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4"
        >
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Share your thoughts or ask a question..."
              className="flex-1 glass-input"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-6 py-3 rounded-full glow-button flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-white/40 mt-2">
            This AI companion provides general wellness guidance. For serious concerns, please consult a healthcare professional.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
