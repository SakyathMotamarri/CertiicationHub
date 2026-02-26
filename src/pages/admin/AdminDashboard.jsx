import { motion } from 'framer-motion';
import { HiUsers, HiAcademicCap, HiClock, HiClipboardCheck, HiTrendingUp } from 'react-icons/hi';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';
import { mockCertifications, mockUsers, mockRenewalRequests, monthlyStats, categoryDistribution } from '../../data/mockData';
import StatCard from '../../components/ui/StatCard';

export default function AdminDashboard() {
    const { darkMode } = useTheme();
    const totalUsers = mockUsers.filter(u => u.role === 'user').length;
    const totalCerts = mockCertifications.length;
    const expiring = mockCertifications.filter(c => c.status === 'expiring').length;
    const pendingRenewals = mockRenewalRequests.filter(r => r.status === 'pending').length;
    const approvedRate = Math.round((mockRenewalRequests.filter(r => r.status === 'approved').length / Math.max(mockRenewalRequests.length, 1)) * 100);

    const stats = [
        { icon: <HiUsers />, title: 'Total Users', value: totalUsers, trend: '+12', color: 'indigo' },
        { icon: <HiAcademicCap />, title: 'Total Certifications', value: totalCerts, trend: '+8', color: 'emerald' },
        { icon: <HiClock />, title: 'Expiring Soon', value: expiring, color: 'amber' },
        { icon: <HiClipboardCheck />, title: 'Pending Renewals', value: pendingRenewals, color: 'purple' },
        { icon: <HiTrendingUp />, title: 'Approval Rate', value: `${approvedRate}%`, color: 'cyan' },
    ];

    const cardStyle = { background: darkMode ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', border: `1px solid ${darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(0,0,0,0.06)'}` };
    const tooltipStyle = { background: darkMode ? 'rgba(15,23,42,0.9)' : '#fff', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 12, color: darkMode ? '#fff' : '#1e293b' };

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className={`text-2xl lg:text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Admin Dashboard</h1>
                <p className={`mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Platform overview and analytics</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((s, i) => <StatCard key={i} {...s} delay={i} />)}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Trends */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl p-6" style={cardStyle}>
                    <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Monthly Trends</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={monthlyStats}>
                            <defs>
                                <linearGradient id="areaGrad1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient>
                                <linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                            </defs>
                            <XAxis dataKey="month" tick={{ fill: darkMode ? '#64748b' : '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: darkMode ? '#64748b' : '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Legend />
                            <Area type="monotone" dataKey="certifications" stroke="#6366f1" strokeWidth={2} fill="url(#areaGrad1)" />
                            <Area type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} fill="url(#areaGrad2)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Category Distribution */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-2xl p-6" style={cardStyle}>
                    <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Certification Categories</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie data={categoryDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                                {categoryDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                            </Pie>
                            <Tooltip contentStyle={tooltipStyle} />
                            <Legend formatter={(value) => <span style={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: 12 }}>{value}</span>} />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Renewals Bar Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="rounded-2xl p-6" style={cardStyle}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Renewal Requests Over Time</h3>
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={monthlyStats}>
                        <XAxis dataKey="month" tick={{ fill: darkMode ? '#64748b' : '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: darkMode ? '#64748b' : '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={tooltipStyle} />
                        <Bar dataKey="renewals" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
}
