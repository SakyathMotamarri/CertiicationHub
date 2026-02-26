import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiSearch, HiUsers, HiEye, HiMail } from 'react-icons/hi';
import { useTheme } from '../../contexts/ThemeContext';
import { mockUsers, mockCertifications } from '../../data/mockData';
import Modal from '../../components/ui/Modal';

export default function UserManagement() {
    const { darkMode } = useTheme();
    const [search, setSearch] = useState('');
    const [detail, setDetail] = useState(null);
    const users = mockUsers.filter(u => u.role === 'user');
    const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
    const cardBg = { background: darkMode ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', border: `1px solid ${darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(0,0,0,0.06)'}` };

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>User Management</h1>
                <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Manage registered professionals</p>
            </motion.div>

            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl max-w-md ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200'}`}>
                <HiSearch size={18} className={darkMode ? 'text-slate-500' : 'text-slate-400'} />
                <input type="text" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)}
                    className={`bg-transparent outline-none text-sm w-full ${darkMode ? 'text-white' : 'text-slate-800'}`} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((user, i) => {
                    const userCerts = mockCertifications.filter(c => c.userId === user.id);
                    return (
                        <motion.div key={user.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                            whileHover={{ y: -4 }} className="rounded-2xl p-5" style={cardBg}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white"
                                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{user.name}</h3>
                                    <p className={`text-sm flex items-center gap-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}><HiMail size={14} />{user.email}</p>
                                </div>
                            </div>
                            <div className={`text-sm space-y-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                <div className="flex justify-between"><span>Joined</span><span>{user.joinDate}</span></div>
                                <div className="flex justify-between"><span>Total Certs</span><span className="font-semibold text-indigo-400">{userCerts.length}</span></div>
                                <div className="flex justify-between"><span>Active</span><span className="font-semibold text-emerald-400">{userCerts.filter(c => c.status === 'active').length}</span></div>
                            </div>
                            <motion.button whileTap={{ scale: 0.95 }} onClick={() => setDetail(user)}
                                className={`w-full mt-4 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium ${darkMode ? 'bg-white/5 text-slate-400 hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                <HiEye size={16} /> View Details
                            </motion.button>
                        </motion.div>
                    );
                })}
            </div>

            <Modal isOpen={!!detail} onClose={() => setDetail(null)} title={detail?.name || 'User Details'}>
                {detail && (
                    <div className="space-y-3">{[['Email', detail.email], ['Joined', detail.joinDate], ['Total Certs', detail.totalCerts], ['Active Certs', detail.activeCerts]].map(([k, v]) => (
                        <div key={k} className="flex justify-between text-sm"><span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>{k}</span><span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>{v}</span></div>
                    ))}</div>
                )}
            </Modal>
        </div>
    );
}
