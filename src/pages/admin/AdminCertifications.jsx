import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiSearch, HiEye, HiCheckCircle, HiXCircle } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useTheme } from '../../contexts/ThemeContext';
import { mockCertifications } from '../../data/mockData';
import Modal from '../../components/ui/Modal';
import StatusBadge from '../../components/ui/StatusBadge';

export default function AdminCertifications() {
    const { darkMode } = useTheme();
    const [certs] = useState(mockCertifications);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [detail, setDetail] = useState(null);

    const filtered = certs.filter(c => {
        const match = c.name.toLowerCase().includes(search.toLowerCase()) || c.authority.toLowerCase().includes(search.toLowerCase());
        const status = filterStatus === 'all' || c.status === filterStatus;
        return match && status;
    });

    const cardBg = { background: darkMode ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', border: `1px solid ${darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(0,0,0,0.06)'}` };

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Certification Management</h1>
                <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>View and manage all certifications across users</p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className={`flex items-center gap-2 flex-1 px-4 py-2.5 rounded-xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200'}`}>
                    <HiSearch size={18} className={darkMode ? 'text-slate-500' : 'text-slate-400'} />
                    <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
                        className={`bg-transparent outline-none text-sm w-full ${darkMode ? 'text-white' : 'text-slate-800'}`} />
                </div>
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                    className={`px-4 py-2.5 rounded-xl text-sm outline-none ${darkMode ? 'bg-white/5 text-white border border-white/10' : 'bg-white text-slate-800 border border-slate-200'}`}>
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="expiring">Expiring</option>
                    <option value="expired">Expired</option>
                </select>
            </div>

            <div className="rounded-2xl overflow-hidden" style={cardBg}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className={`text-left text-xs uppercase tracking-wider ${darkMode ? 'text-slate-500 bg-white/3' : 'text-slate-400 bg-slate-50'}`}>
                                <th className="px-5 py-3 font-semibold">Certification</th>
                                <th className="px-5 py-3 font-semibold hidden md:table-cell">Authority</th>
                                <th className="px-5 py-3 font-semibold hidden lg:table-cell">User</th>
                                <th className="px-5 py-3 font-semibold">Status</th>
                                <th className="px-5 py-3 font-semibold hidden sm:table-cell">Expires</th>
                                <th className="px-5 py-3 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((cert, i) => (
                                <motion.tr key={cert.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                                    className={`border-t ${darkMode ? 'border-white/5 hover:bg-white/3' : 'border-slate-100 hover:bg-slate-50'} transition-colors`}>
                                    <td className={`px-5 py-3.5 text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>{cert.name}</td>
                                    <td className={`px-5 py-3.5 text-sm hidden md:table-cell ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{cert.authority}</td>
                                    <td className={`px-5 py-3.5 text-sm hidden lg:table-cell ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>User #{cert.userId}</td>
                                    <td className="px-5 py-3.5"><StatusBadge status={cert.status} /></td>
                                    <td className={`px-5 py-3.5 text-sm hidden sm:table-cell ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{cert.expiryDate}</td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex gap-1">
                                            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setDetail(cert)} className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}><HiEye size={16} /></motion.button>
                                            <motion.button whileTap={{ scale: 0.9 }} onClick={() => toast.success('Verified!')} className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-500/10"><HiCheckCircle size={16} /></motion.button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={!!detail} onClose={() => setDetail(null)} title={detail?.name || 'Details'}>
                {detail && (
                    <div className="space-y-3">
                        {[['Authority', detail.authority], ['Credential ID', detail.credentialId], ['Category', detail.category], ['Issued', detail.issueDate], ['Expires', detail.expiryDate], ['Status', detail.status], ['Verification', detail.verificationUrl]].map(([k, v]) => (
                            <div key={k} className="flex justify-between text-sm"><span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>{k}</span><span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>{v || '—'}</span></div>
                        ))}
                    </div>
                )}
            </Modal>
        </div>
    );
}
