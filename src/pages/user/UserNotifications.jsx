import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiBell, HiClock, HiRefresh, HiInformationCircle, HiCheck } from 'react-icons/hi';
import { useTheme } from '../../contexts/ThemeContext';
import { mockNotifications } from '../../data/mockData';

export default function UserNotifications() {
    const { darkMode } = useTheme();
    const [notifications, setNotifications] = useState(mockNotifications.filter(n => n.userId === 1));
    const [filter, setFilter] = useState('all');

    const filtered = filter === 'all' ? notifications : notifications.filter(n => n.type === filter);
    const typeIcon = { expiry: <HiClock className="text-amber-400" />, renewal: <HiRefresh className="text-indigo-400" />, system: <HiInformationCircle className="text-cyan-400" /> };
    const markRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Notifications</h1>
                    <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{notifications.filter(n => !n.read).length} unread</p>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={markAllRead}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${darkMode ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                    <HiCheck size={16} /> Mark all read
                </motion.button>
            </motion.div>

            <div className="flex gap-2">
                {['all', 'expiry', 'renewal', 'system'].map(f => (
                    <motion.button key={f} whileTap={{ scale: 0.98 }} onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium capitalize ${filter === f ? 'text-white' : darkMode ? 'bg-white/5 text-slate-400' : 'bg-white text-slate-600'}`}
                        style={filter === f ? { background: 'linear-gradient(135deg, #6366f1, #4f46e5)' } : {}}>
                        {f}
                    </motion.button>
                ))}
            </div>

            <div className="space-y-3">
                {filtered.map((n, i) => (
                    <motion.div key={n.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                        onClick={() => markRead(n.id)}
                        className={`rounded-2xl p-4 cursor-pointer transition-all ${!n.read ? (darkMode ? 'border-l-4 border-l-indigo-500' : 'border-l-4 border-l-indigo-500') : ''}`}
                        style={{ background: darkMode ? (n.read ? 'rgba(15,23,42,0.4)' : 'rgba(15,23,42,0.7)') : (n.read ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.9)'), backdropFilter: 'blur(20px)', border: `1px solid ${darkMode ? 'rgba(99,102,241,0.1)' : 'rgba(0,0,0,0.06)'}` }}>
                        <div className="flex items-start gap-3">
                            <div className="text-xl mt-0.5">{typeIcon[n.type]}</div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-slate-800'} ${n.read ? 'opacity-70' : ''}`}>{n.title}</h3>
                                    {!n.read && <span className="w-2 h-2 rounded-full bg-indigo-500" />}
                                </div>
                                <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'} ${n.read ? 'opacity-70' : ''}`}>{n.message}</p>
                                <p className={`text-xs mt-2 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>{n.date}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
