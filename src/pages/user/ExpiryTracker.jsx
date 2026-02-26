import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiClock, HiSortDescending } from 'react-icons/hi';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth, useCerts } from '../../contexts/AuthContext';
import StatusBadge from '../../components/ui/StatusBadge';
import CountdownTimer from '../../components/ui/CountdownTimer';
import ProgressRing from '../../components/ui/ProgressRing';

export default function ExpiryTracker() {
    const { darkMode } = useTheme();
    const { user } = useAuth();
    const { certs } = useCerts();
    const [sortBy, setSortBy] = useState('urgency');
    const userCerts = certs.filter(c => c.userId === (user?.id || 1));

    const sorted = [...userCerts].sort((a, b) => {
        if (sortBy === 'urgency') {
            const daysA = Math.ceil((new Date(a.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
            const daysB = Math.ceil((new Date(b.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
            return daysA - daysB;
        }
        return a.name.localeCompare(b.name);
    });

    const getDaysLeft = (d) => Math.ceil((new Date(d) - new Date()) / (1000 * 60 * 60 * 24));
    const getLifePercent = (issue, expiry) => {
        const total = new Date(expiry) - new Date(issue);
        const elapsed = new Date() - new Date(issue);
        return Math.max(0, Math.min(100, ((total - elapsed) / total) * 100));
    };

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Expiry Tracker</h1>
                    <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Monitor certification expiration dates with live countdowns</p>
                </div>
                <div className="flex gap-2">
                    {['urgency', 'name'].map(s => (
                        <motion.button key={s} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            onClick={() => setSortBy(s)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${sortBy === s
                                ? 'text-white' : darkMode ? 'bg-white/5 text-slate-400' : 'bg-white text-slate-600'}`}
                            style={sortBy === s ? { background: 'linear-gradient(135deg, #6366f1, #4f46e5)' } : {}}>
                            {s === 'urgency' ? '⏱ Urgency' : '🔤 Name'}
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            <div className="space-y-4">
                {sorted.map((cert, i) => {
                    const days = getDaysLeft(cert.expiryDate);
                    const lifePercent = getLifePercent(cert.issueDate, cert.expiryDate);
                    const ringColor = days <= 0 ? '#ef4444' : days <= 90 ? '#f59e0b' : '#10b981';

                    return (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            whileHover={{ x: 4 }}
                            className="rounded-2xl p-5"
                            style={{
                                background: darkMode ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.8)',
                                backdropFilter: 'blur(20px)',
                                border: `1px solid ${darkMode
                                    ? days <= 0 ? 'rgba(239,68,68,0.2)' : days <= 90 ? 'rgba(245,158,11,0.2)' : 'rgba(99,102,241,0.15)'
                                    : 'rgba(0,0,0,0.06)'}`,
                            }}
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                                {/* Progress Ring */}
                                <div className="flex-shrink-0">
                                    <ProgressRing value={lifePercent} size={72} color={ringColor} />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className={`text-base font-semibold truncate ${darkMode ? 'text-white' : 'text-slate-800'}`}>{cert.name}</h3>
                                        <StatusBadge status={cert.status} />
                                    </div>
                                    <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{cert.authority} · {cert.credentialId}</p>
                                    <div className={`flex items-center gap-4 mt-2 text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                        <span>Issued: {cert.issueDate}</span>
                                        <span>Expires: {cert.expiryDate}</span>
                                        <span className={`font-semibold ${days <= 0 ? 'text-red-400' : days <= 90 ? 'text-amber-400' : 'text-emerald-400'}`}>
                                            {days <= 0 ? `Expired ${Math.abs(days)} days ago` : `${days} days remaining`}
                                        </span>
                                    </div>
                                </div>

                                {/* Countdown */}
                                <div className="flex-shrink-0">
                                    <CountdownTimer targetDate={cert.expiryDate} />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
