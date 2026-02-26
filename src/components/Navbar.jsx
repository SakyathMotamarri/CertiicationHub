import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiSearch, HiBell, HiMoon, HiSun, HiChevronDown, HiLogout, HiCog, HiSwitchVertical } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { mockNotifications } from '../data/mockData';

export default function Navbar({ onToggleSidebar }) {
    const { darkMode, toggleTheme } = useTheme();
    const { user, logout, switchRole } = useAuth();
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const unreadCount = mockNotifications.filter(n => !n.read).length;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleRoleToggle = () => {
        if (user?.role === 'admin') {
            switchRole('user');
            navigate('/dashboard');
            toast.success('Switched to Professional User View');
        } else {
            switchRole('admin');
            navigate('/admin');
            toast.success('Switched to Admin Panel View');
        }
    };

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 h-16 flex items-center justify-between px-4 lg:px-6"
            style={{
                zIndex: 30,
                background: darkMode ? 'rgba(15,23,42,0.8)' : 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(20px)',
                borderBottom: `1px solid ${darkMode ? 'rgba(147,51,234,0.1)' : 'rgba(0,0,0,0.06)'}`,
            }}
        >
            {/* Left */}
            <div className="flex items-center gap-4">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onToggleSidebar}
                    className={`p-2 rounded-xl lg:hidden ${darkMode ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}>
                    <HiMenu size={22} />
                </motion.button>

                {/* Welcome text removed to match screenshot style */}
                <div className="hidden md:flex items-center">
                    {/* Empty placeholder to ensure spacing if needed */}
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
                {/* Search Box */}
                <div className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors ${darkMode ? 'bg-slate-800/50 border-white/5 text-slate-300 focus-within:border-purple-500/50' : 'bg-slate-100 border-slate-200 text-slate-600 focus-within:border-purple-300'}`}>
                    <HiSearch size={16} />
                    <input type="text" placeholder="Search..." className={`bg-transparent outline-none text-sm w-32 xl:w-48 ${darkMode ? 'placeholder:text-slate-500' : 'placeholder:text-slate-400'}`} />
                </div>

                {/* Role Switcher (Demo) */}
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleRoleToggle}
                    className={`hidden sm:flex p-2.5 rounded-xl border transition-colors ${darkMode ? 'hover:bg-white/10 text-emerald-400 bg-slate-800/30 border-white/5' : 'hover:bg-slate-200 text-emerald-600 bg-slate-100 border-slate-200'}`}
                    title="Toggle between Admin and User views">
                    <HiSwitchVertical size={18} />
                </motion.button>

                {/* Theme toggle */}
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleTheme}
                    className={`p-2.5 rounded-xl border transition-colors ${darkMode ? 'hover:bg-white/10 text-slate-300 bg-slate-800/30 border-white/5' : 'hover:bg-slate-200 text-slate-600 bg-slate-100 border-slate-200'}`}>
                    {darkMode ? <HiSun size={18} /> : <HiMoon size={18} />}
                </motion.button>

                {/* Profile Badge */}
                <div className="flex items-center gap-3 ml-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}>
                        {user?.name?.charAt(0) || (user?.role === 'admin' ? 'A' : 'U')}
                    </div>
                    <span className={`text-sm font-semibold hidden md:block ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                        {user?.role === 'admin' ? 'Admin' : user?.name || 'User'}
                    </span>
                </div>

                {/* Notifications */}
                <div className="relative">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
                        className={`relative p-2.5 rounded-xl transition-colors ${darkMode ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}>
                        <HiBell size={20} />
                        {unreadCount > 0 && (
                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold text-white"
                                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
                                {unreadCount}
                            </motion.span>
                        )}
                    </motion.button>

                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 mt-2 w-80 rounded-2xl overflow-hidden"
                                style={{
                                    background: darkMode ? 'rgba(15,23,42,0.98)' : '#fff',
                                    border: `1px solid ${darkMode ? 'rgba(147,51,234,0.15)' : 'rgba(0,0,0,0.08)'}`,
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                    zIndex: 50,
                                }}>
                                <div className={`px-4 py-3 border-b ${darkMode ? 'border-white/5' : 'border-slate-100'}`}>
                                    <h3 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Notifications</h3>
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    {mockNotifications.slice(0, 4).map(n => (
                                        <div key={n.id} className={`px-4 py-3 border-b transition-colors cursor-pointer ${darkMode ? 'border-white/5 hover:bg-white/5' : 'border-slate-50 hover:bg-slate-50'} ${!n.read ? (darkMode ? 'bg-purple-500/5' : 'bg-purple-50/50') : ''}`}>
                                            <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>{n.title}</p>
                                            <p className={`text-xs mt-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{n.date}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className={`px-4 py-2 text-center ${darkMode ? 'border-t border-white/5' : 'border-t border-slate-100'}`}>
                                    <button onClick={() => { navigate(user?.role === 'admin' ? '/admin' : '/notifications'); setShowNotifications(false); }} className="text-xs font-medium text-purple-500 hover:text-purple-400">View all notifications</button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Logout removed, placed in Sidebar footer */}
            </div>
        </motion.nav>
    );
}
