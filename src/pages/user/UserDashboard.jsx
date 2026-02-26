import { motion } from 'framer-motion';
import { HiAcademicCap, HiCheckCircle, HiClock, HiExclamationCircle, HiArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth, useCerts } from '../../contexts/AuthContext';
import { monthlyStats } from '../../data/mockData';
import StatCard from '../../components/ui/StatCard';
import StatusBadge from '../../components/ui/StatusBadge';
import CountdownTimer from '../../components/ui/CountdownTimer';

export default function UserDashboard() {
    const { darkMode } = useTheme();
    const { user } = useAuth();
    const { certs } = useCerts();
    const navigate = useNavigate();
    const userCerts = certs.filter(c => c.userId === (user?.id || 1));
    const active = userCerts.filter(c => c.status === 'active').length;
    const expiring = userCerts.filter(c => c.status === 'expiring').length;
    const expired = userCerts.filter(c => c.status === 'expired').length;

    const stats = [
        { icon: <HiAcademicCap />, title: 'Total Certifications', value: userCerts.length, trend: '+2', color: 'indigo' },
        { icon: <HiCheckCircle />, title: 'Active', value: active, trend: '+1', color: 'emerald' },
        { icon: <HiClock />, title: 'Expiring Soon', value: expiring, color: 'amber' },
        { icon: <HiExclamationCircle />, title: 'Expired', value: expired, color: 'red' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className={`text-2xl lg:text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    Welcome back! 👋
                </h1>
                <p className={`mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Here's an overview of your professional certifications
                </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => <StatCard key={i} {...s} delay={i} />)}
            </div>

            {/* Chart + Upcoming */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 rounded-2xl p-6"
                    style={{
                        background: darkMode ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(20px)',
                        border: `1px solid ${darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(0,0,0,0.06)'}`,
                    }}
                >
                    <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Certification Activity</h3>
                    <ResponsiveContainer width="100%" height={260}>
                        <AreaChart data={monthlyStats}>
                            <defs>
                                <linearGradient id="certGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="month" tick={{ fill: darkMode ? '#64748b' : '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: darkMode ? '#64748b' : '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{
                                    background: darkMode ? 'rgba(15,23,42,0.9)' : '#fff',
                                    border: '1px solid rgba(99,102,241,0.2)',
                                    borderRadius: 12,
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                                    color: darkMode ? '#fff' : '#1e293b',
                                }}
                            />
                            <Area type="monotone" dataKey="certifications" stroke="#6366f1" strokeWidth={2} fill="url(#certGrad)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Expiring Soon */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="rounded-2xl p-6"
                    style={{
                        background: darkMode ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(20px)',
                        border: `1px solid ${darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(0,0,0,0.06)'}`,
                    }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Expiring Soon</h3>
                        <motion.button whileHover={{ x: 4 }} onClick={() => navigate('/expiry-tracker')} className="text-indigo-400 text-sm font-medium flex items-center gap-1">
                            View all <HiArrowRight size={14} />
                        </motion.button>
                    </div>
                    <div className="space-y-4">
                        {userCerts.filter(c => c.status === 'expiring' || c.status === 'expired').slice(0, 3).map(cert => (
                            <div key={cert.id} className={`p-3 rounded-xl ${darkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>{cert.name}</p>
                                        <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{cert.authority}</p>
                                    </div>
                                    <StatusBadge status={cert.status} />
                                </div>
                                <div className="mt-2">
                                    <CountdownTimer targetDate={cert.expiryDate} compact />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Recent Certifications */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="rounded-2xl p-6"
                style={{
                    background: darkMode ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(0,0,0,0.06)'}`,
                }}
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Recent Certifications</h3>
                    <motion.button whileHover={{ x: 4 }} onClick={() => navigate('/certifications')} className="text-indigo-400 text-sm font-medium flex items-center gap-1">
                        Manage all <HiArrowRight size={14} />
                    </motion.button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className={`text-left text-xs uppercase tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                <th className="pb-3 font-semibold">Certification</th>
                                <th className="pb-3 font-semibold hidden md:table-cell">Authority</th>
                                <th className="pb-3 font-semibold hidden lg:table-cell">Credential ID</th>
                                <th className="pb-3 font-semibold">Status</th>
                                <th className="pb-3 font-semibold hidden sm:table-cell">Expires</th>
                            </tr>
                        </thead>
                        <tbody className="space-y-2">
                            {userCerts.slice(0, 5).map((cert, i) => (
                                <motion.tr
                                    key={cert.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + i * 0.05 }}
                                    className={`border-t ${darkMode ? 'border-white/5' : 'border-slate-100'}`}
                                >
                                    <td className={`py-3 text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>{cert.name}</td>
                                    <td className={`py-3 text-sm hidden md:table-cell ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{cert.authority}</td>
                                    <td className={`py-3 text-sm font-mono hidden lg:table-cell ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{cert.credentialId}</td>
                                    <td className="py-3"><StatusBadge status={cert.status} /></td>
                                    <td className={`py-3 text-sm hidden sm:table-cell ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{cert.expiryDate}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
