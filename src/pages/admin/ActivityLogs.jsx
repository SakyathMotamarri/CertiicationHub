import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiSearch, HiDocumentReport } from 'react-icons/hi';
import { useTheme } from '../../contexts/ThemeContext';
import { mockActivityLogs } from '../../data/mockData';

export default function ActivityLogs() {
    const { darkMode } = useTheme();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const perPage = 6;

    const filtered = mockActivityLogs.filter(l => l.userName.toLowerCase().includes(search.toLowerCase()) || l.action.toLowerCase().includes(search.toLowerCase()) || l.detail.toLowerCase().includes(search.toLowerCase()));
    const totalPages = Math.ceil(filtered.length / perPage);
    const paged = filtered.slice((page - 1) * perPage, page * perPage);
    const cardBg = { background: darkMode ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', border: `1px solid ${darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(0,0,0,0.06)'}` };

    const actionColor = (a) => { if (a.includes('Added')) return 'text-emerald-400'; if (a.includes('Submitted') || a.includes('Uploaded')) return 'text-indigo-400'; if (a.includes('Downloaded')) return 'text-cyan-400'; return 'text-amber-400'; };

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Activity Logs</h1>
                <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Monitor user activity across the platform</p>
            </motion.div>

            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl max-w-md ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200'}`}>
                <HiSearch size={18} className={darkMode ? 'text-slate-500' : 'text-slate-400'} />
                <input type="text" placeholder="Search logs..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                    className={`bg-transparent outline-none text-sm w-full ${darkMode ? 'text-white' : 'text-slate-800'}`} />
            </div>

            <div className="rounded-2xl overflow-hidden" style={cardBg}>
                <table className="w-full">
                    <thead>
                        <tr className={`text-left text-xs uppercase tracking-wider ${darkMode ? 'text-slate-500 bg-white/3' : 'text-slate-400 bg-slate-50'}`}>
                            <th className="px-5 py-3 font-semibold">User</th>
                            <th className="px-5 py-3 font-semibold">Action</th>
                            <th className="px-5 py-3 font-semibold hidden md:table-cell">Detail</th>
                            <th className="px-5 py-3 font-semibold">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paged.map((log, i) => (
                            <motion.tr key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                                className={`border-t ${darkMode ? 'border-white/5' : 'border-slate-100'}`}>
                                <td className={`px-5 py-3.5 text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>{log.userName}</td>
                                <td className={`px-5 py-3.5 text-sm font-medium ${actionColor(log.action)}`}>{log.action}</td>
                                <td className={`px-5 py-3.5 text-sm hidden md:table-cell ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{log.detail}</td>
                                <td className={`px-5 py-3.5 text-xs font-mono ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{log.timestamp}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <motion.button key={i} whileTap={{ scale: 0.95 }} onClick={() => setPage(i + 1)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium ${page === i + 1 ? 'text-white' : darkMode ? 'bg-white/5 text-slate-400' : 'bg-white text-slate-600'}`}
                            style={page === i + 1 ? { background: 'linear-gradient(135deg, #6366f1, #4f46e5)' } : {}}>
                            {i + 1}
                        </motion.button>
                    ))}
                </div>
            )}
        </div>
    );
}
