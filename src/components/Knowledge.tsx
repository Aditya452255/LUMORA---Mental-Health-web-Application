import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Search, Clock, TrendingUp, Heart, Brain, Sparkles, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Knowledge() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Meditation', 'Mindfulness', 'Sleep', 'Anxiety', 'Stress'];

  const featuredArticle = {
    title: 'The Science Behind Meditation',
    description: 'Discover how meditation reshapes your brain and improves mental health',
    readTime: '8 min',
    category: 'Meditation',
    image: '🧘',
  };

  const articles = [
    {
      title: 'The Power of Mindfulness',
      description: 'Learn how being present can transform your daily life',
      readTime: '5 min',
      category: 'Mindfulness',
      icon: Brain,
    },
    {
      title: 'Better Sleep Through Meditation',
      description: 'Techniques to improve your sleep quality naturally',
      readTime: '6 min',
      category: 'Sleep',
      icon: Heart,
    },
    {
      title: 'Managing Anxiety with Breathing',
      description: 'Simple breathing exercises for instant calm',
      readTime: '4 min',
      category: 'Anxiety',
      icon: Sparkles,
    },
    {
      title: 'Understanding Stress Responses',
      description: 'How your body reacts to stress and how to manage it',
      readTime: '7 min',
      category: 'Stress',
      icon: TrendingUp,
    },
    {
      title: 'Building a Daily Practice',
      description: 'Tips for maintaining consistency in meditation',
      readTime: '5 min',
      category: 'Meditation',
      icon: Brain,
    },
    {
      title: 'Mindful Eating Guide',
      description: 'Transform your relationship with food',
      readTime: '6 min',
      category: 'Mindfulness',
      icon: Heart,
    },
  ];

  const videos = [
    {
      title: '10-Minute Morning Meditation',
      duration: '10:32',
      views: '125K',
    },
    {
      title: 'Stress Relief Techniques',
      duration: '15:20',
      views: '98K',
    },
    {
      title: 'Beginner\'s Guide to Mindfulness',
      duration: '12:45',
      views: '156K',
    },
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
        <h2>Knowledge Center</h2>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search articles, guides, and videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-input pl-12"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 mb-8 overflow-x-auto pb-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'glow-button'
                  : 'glass-card hover:neon-glow'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Featured Article */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card-intense p-8 mb-8 cursor-pointer hover:neon-glow transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs px-3 py-1 rounded-full glass-card text-teal-400">
              Featured
            </span>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Clock className="w-4 h-4" />
              {featuredArticle.readTime} read
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="mb-3">{featuredArticle.title}</h2>
              <p className="text-white/70 mb-6">{featuredArticle.description}</p>
              <button className="px-8 py-3 rounded-full glow-button flex items-center gap-2">
                Read Article
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-9xl">{featuredArticle.image}</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles Grid */}
          <div className="lg:col-span-2">
            <h3 className="mb-4">Latest Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.title}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="glass-card p-6 cursor-pointer hover:neon-glow transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center mb-4 group-hover:neon-glow transition-all">
                    <article.icon className="w-6 h-6 text-teal-400" />
                  </div>
                  <h4 className="mb-2">{article.title}</h4>
                  <p className="text-white/60 text-sm mb-4">{article.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-white/50">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </div>
                    <ChevronRight className="w-4 h-4 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Videos */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-teal-400" />
                <h4>Popular Videos</h4>
              </div>
              <div className="space-y-3">
                {videos.map((video, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl glass-card hover:neon-glow transition-all cursor-pointer"
                  >
                    <div className="text-sm mb-1">{video.title}</div>
                    <div className="flex items-center justify-between text-xs text-white/50">
                      <span>{video.duration}</span>
                      <span>{video.views} views</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Tips */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-teal-400" />
                <h4>Quick Tips</h4>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-xl glass-card">
                  <p className="text-sm text-white/80">Start with just 5 minutes of meditation daily</p>
                </div>
                <div className="p-3 rounded-xl glass-card">
                  <p className="text-sm text-white/80">Practice gratitude before bed</p>
                </div>
                <div className="p-3 rounded-xl glass-card">
                  <p className="text-sm text-white/80">Take deep breaths during stressful moments</p>
                </div>
              </div>
            </motion.div>

            {/* Progress Stats */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="glass-card p-6"
            >
              <h4 className="mb-4">Your Learning</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Articles Read</span>
                    <span className="text-teal-400">12</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-gradient-to-r from-teal-400 to-purple-400 w-3/5" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Videos Watched</span>
                    <span className="text-teal-400">8</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-gradient-to-r from-teal-400 to-purple-400 w-2/5" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
