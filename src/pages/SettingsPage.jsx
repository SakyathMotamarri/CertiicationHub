import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiCog, HiUser, HiBell, HiColorSwatch, HiShieldCheck } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function SettingsPage() {
    const { darkMode, toggleTheme } = useTheme();
    const { user, updateProfile } = useAuth();
    const [tab, setTab] = useState('profile');

    // Local state for profile form
    const [profileForm, setProfileForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        title: user?.title || 'Software Engineer'
    });

    const cardBg = { background: darkMode ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', border: `1px solid ${darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(0,0,0,0.06)'}` };
    const inputClass = `w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors ${darkMode ? 'bg-white/5 text-white border border-white/10 focus:border-indigo-500' : 'bg-slate-50 text-slate-800 border border-slate-200 focus:border-indigo-500'}`;

    const tabs = [
        { id: 'profile', label: 'Profile', icon: <HiUser /> },
        { id: 'notifications', label: 'Notifications', icon: <HiBell /> },
        { id: 'appearance', label: 'Appearance', icon: <HiColorSwatch /> },
        { id: 'security', label: 'Security', icon: <HiShieldCheck /> },
    ];

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Settings</h1>
                <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Manage your account and preferences</p>
            </motion.div>

            <div className="flex gap-2 overflow-x-auto pb-2">
                {tabs.map(t => (
                    <motion.button key={t.id} whileTap={{ scale: 0.98 }} onClick={() => setTab(t.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap ${tab === t.id ? 'text-white' : darkMode ? 'bg-white/5 text-slate-400' : 'bg-white text-slate-600'}`}
                        style={tab === t.id ? { background: 'linear-gradient(135deg, #6366f1, #4f46e5)' } : {}}>
                        {t.icon} {t.label}
                    </motion.button>
                ))}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl p-6" style={cardBg}>
                {tab === 'profile' && (
                    <div className="space-y-4 max-w-lg">
                        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Profile Information</h2>
                        <div>
                            <label className={`text-sm font-medium mb-1 block ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Full Name</label>
                            <input className={inputClass} value={profileForm.name} onChange={e => setProfileForm({ ...profileForm, name: e.target.value })} />
                        </div>
                        <div>
                            <label className={`text-sm font-medium mb-1 block ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Email</label>
                            <input className={inputClass} value={profileForm.email} onChange={e => setProfileForm({ ...profileForm, email: e.target.value })} />
                        </div>
                        <div>
                            <label className={`text-sm font-medium mb-1 block ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Job Title</label>
                            <input className={inputClass} value={profileForm.title} onChange={e => setProfileForm({ ...profileForm, title: e.target.value })} />
                        </div>
                        <motion.button whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                updateProfile(profileForm);
                                toast.success('Profile updated globally!');
                            }}
                            className="px-5 py-2.5 rounded-xl text-sm font-medium text-white shadow-lg shadow-indigo-500/20"
                            style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
                            Save Changes
                        </motion.button>
                    </div>
                )}
                {tab === 'appearance' && (
                    <div className="space-y-4 max-w-lg">
                        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Appearance</h2>
                        <div className="flex items-center justify-between p-4 rounded-xl" style={cardBg}>
                            <div><p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>Dark Mode</p><p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Toggle dark/light theme</p></div>
                            <motion.button whileTap={{ scale: 0.95 }} onClick={toggleTheme} className={`w-12 h-6 rounded-full p-0.5 transition-colors ${darkMode ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                                <motion.div className="w-5 h-5 bg-white rounded-full" animate={{ x: darkMode ? 24 : 0 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
                            </motion.button>
                        </div>
                    </div>
                )}
                {tab === 'notifications' && (
                    <div className="space-y-4 max-w-lg">
                        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Notification Preferences</h2>
                        {['Expiry Reminders', 'Renewal Updates', 'System Notifications'].map(n => (
                            <div key={n} className="flex items-center justify-between p-4 rounded-xl" style={cardBg}>
                                <p className={`font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>{n}</p>
                                <motion.button whileTap={{ scale: 0.95 }} className="w-12 h-6 rounded-full p-0.5 bg-indigo-500">
                                    <motion.div className="w-5 h-5 bg-white rounded-full" animate={{ x: 24 }} />
                                </motion.button>
                            </div>
                        ))}
                    </div>
                )}
                {tab === 'security' && (
                    <div className="space-y-4 max-w-lg">
                        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Security</h2>
                        <div><label className={`text-sm font-medium mb-1 block ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Current Password</label><input type="password" className={inputClass} /></div>
                        <div><label className={`text-sm font-medium mb-1 block ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>New Password</label><input type="password" className={inputClass} /></div>
                        <motion.button whileTap={{ scale: 0.98 }} onClick={() => toast.success('Password updated!')}
                            className="px-5 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>Update Password</motion.button>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
