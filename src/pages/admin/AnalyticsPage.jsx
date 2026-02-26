import { motion } from 'framer-motion';
import { HiChartBar } from 'react-icons/hi';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';
import { monthlyStats, categoryDistribution } from '../../data/mockData';

export default function AnalyticsPage() {
    const { darkMode } = useTheme();
    const cardBg = { background: darkMode ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', border: `1px solid ${darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(0,0,0,0.06)'}` };
    const tt = { background: darkMode ? 'rgba(15,23,42,0.9)' : '#fff', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 12, color: darkMode ? '#fff' : '#1e293b' };
    const tickFill = darkMode ? '#64748b' : '#94a3b8';

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Analytics</h1>
                <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>In-depth certification and usage analytics</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl p-6" style={cardBg}>
                    <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Certification Registrations</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={monthlyStats}>
                            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                            <XAxis dataKey="month" tick={{ fill: tickFill, fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: tickFill, fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={tt} />
                            <Bar dataKey="certifications" fill="#6366f1" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl p-6" style={cardBg}>
                    <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>User Growth</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={monthlyStats}>
                            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                            <XAxis dataKey="month" tick={{ fill: tickFill, fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: tickFill, fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={tt} />
                            <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl p-6" style={cardBg}>
                    <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Category Breakdown</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie data={categoryDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={3} dataKey="value">
                                {categoryDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                            </Pie>
                            <Tooltip contentStyle={tt} />
                            <Legend formatter={(v) => <span style={{ color: tickFill, fontSize: 12 }}>{v}</span>} />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl p-6" style={cardBg}>
                    <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Renewal Activity</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={monthlyStats}>
                            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                            <XAxis dataKey="month" tick={{ fill: tickFill, fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: tickFill, fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={tt} />
                            <Bar dataKey="renewals" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </div>
    );
}
