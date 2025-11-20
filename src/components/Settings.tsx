import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, Bell, Moon, Volume2, Lock, Globe, Palette, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Settings() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');
  const [email, setEmail] = useState('user@example.com');
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('English');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('userName', userName);
    alert('Settings saved successfully!');
  };

  const settingsSections = [
    {
      title: 'Profile',
      icon: User,
      items: [
        {
          label: 'Name',
          type: 'input',
          value: userName,
          onChange: setUserName,
        },
        {
          label: 'Email',
          type: 'input',
          value: email,
          onChange: setEmail,
        },
      ],
    },
    {
      title: 'Preferences',
      icon: Palette,
      items: [
        {
          label: 'Dark Mode',
          type: 'toggle',
          value: darkMode,
          onChange: setDarkMode,
        },
        {
          label: 'Sound Effects',
          type: 'toggle',
          value: soundEffects,
          onChange: setSoundEffects,
        },
        {
          label: 'Language',
          type: 'select',
          value: language,
          onChange: setLanguage,
          options: ['English', 'Spanish', 'French', 'German', 'Japanese'],
        },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        {
          label: 'Push Notifications',
          type: 'toggle',
          value: notifications,
          onChange: setNotifications,
        },
        {
          label: 'Daily Reminders',
          type: 'toggle',
          value: true,
          onChange: () => {},
        },
        {
          label: 'Weekly Reports',
          type: 'toggle',
          value: false,
          onChange: () => {},
        },
      ],
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
        <h2>Settings</h2>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card-intense p-8 mb-8 text-center"
        >
          <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center mx-auto mb-4 neon-glow">
            <User className="w-12 h-12 text-teal-400" />
          </div>
          <h3 className="mb-1">{userName}</h3>
          <p className="text-white/60">{email}</p>
          <button className="mt-4 px-6 py-2 rounded-full glass-card hover:neon-glow transition-all text-sm">
            Change Avatar
          </button>
        </motion.div>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + sectionIndex * 0.1 }}
            className="glass-card p-6 mb-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
                <section.icon className="w-5 h-5 text-teal-400" />
              </div>
              <h3>{section.title}</h3>
            </div>

            <div className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between">
                  <span className="text-white/80">{item.label}</span>
                  
                  {item.type === 'input' && (
                    <input
                      type="text"
                      value={item.value as string}
                      onChange={(e) => item.onChange(e.target.value)}
                      className="glass-input w-64"
                    />
                  )}

                  {item.type === 'toggle' && (
                    <button
                      onClick={() => item.onChange(!item.value)}
                      className={`w-14 h-7 rounded-full transition-all ${
                        item.value ? 'bg-gradient-to-r from-teal-400 to-purple-400' : 'bg-white/20'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          item.value ? 'translate-x-8' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  )}

                  {item.type === 'select' && (
                    <select
                      value={item.value as string}
                      onChange={(e) => item.onChange(e.target.value)}
                      className="glass-input w-64"
                    >
                      {item.options?.map((option) => (
                        <option key={option} value={option} className="bg-[#1A102C]">
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Privacy & Security */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
              <Lock className="w-5 h-5 text-teal-400" />
            </div>
            <h3>Privacy & Security</h3>
          </div>

          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-xl glass-card hover:neon-glow transition-all">
              Change Password
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl glass-card hover:neon-glow transition-all">
              Two-Factor Authentication
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl glass-card hover:neon-glow transition-all">
              Privacy Policy
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl glass-card hover:neon-glow transition-all text-red-400">
              Delete Account
            </button>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 rounded-full glass-card hover:neon-glow transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-3 rounded-full glow-button flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </motion.div>
      </div>
    </div>
  );
}
