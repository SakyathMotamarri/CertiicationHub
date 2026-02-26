import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiUpload, HiDocumentText, HiRefresh, HiCheckCircle, HiXCircle, HiClock } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useTheme } from '../../contexts/ThemeContext';
import { mockCertifications, mockRenewalRequests } from '../../data/mockData';
import Modal from '../../components/ui/Modal';
import StatusBadge from '../../components/ui/StatusBadge';

export default function RenewalCenter() {
    const { darkMode } = useTheme();
    const [renewals, setRenewals] = useState(mockRenewalRequests.filter(r => r.userId === 1));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const expiringCerts = mockCertifications.filter(c => c.userId === 1 && (c.status === 'expiring' || c.status === 'expired'));

    const [form, setForm] = useState({ certId: '', notes: '', document: '' });

    const handleSubmit = () => {
        if (!form.certId) { toast.error('Please select a certification'); return; }
        const cert = mockCertifications.find(c => c.id === Number(form.certId));
        const newRenewal = {
            id: Date.now(), certId: Number(form.certId), userId: 1, userName: 'Sakya Agrawal',
            certName: cert?.name || '', submittedDate: new Date().toISOString().split('T')[0],
            status: 'pending', document: form.document || 'renewal-doc.pdf', notes: form.notes,
        };
        setRenewals(prev => [newRenewal, ...prev]);
        toast.success('Renewal request submitted!');
        setIsModalOpen(false);
        setForm({ certId: '', notes: '', document: '' });
    };

    const statusIcon = { pending: <HiClock className="text-amber-400" />, approved: <HiCheckCircle className="text-emerald-400" />, rejected: <HiXCircle className="text-red-400" /> };

    const inputClass = `w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors ${darkMode ? 'bg-white/5 text-white border border-white/10 focus:border-indigo-500' : 'bg-slate-50 text-slate-800 border border-slate-200 focus:border-indigo-500'}`;

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Renewal Center</h1>
                    <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Submit and track certification renewal requests</p>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                    <HiRefresh size={18} /> New Renewal Request
                </motion.button>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: 'Pending', count: renewals.filter(r => r.status === 'pending').length, icon: <HiClock />, color: 'amber' },
                    { label: 'Approved', count: renewals.filter(r => r.status === 'approved').length, icon: <HiCheckCircle />, color: 'emerald' },
                    { label: 'Rejected', count: renewals.filter(r => r.status === 'rejected').length, icon: <HiXCircle />, color: 'red' },
                ].map((s, i) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className="rounded-2xl p-5 flex items-center gap-4"
                        style={{ background: darkMode ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', border: `1px solid ${darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(0,0,0,0.06)'}` }}>
                        <div className={`text-2xl p-3 rounded-xl`} style={{ background: `rgba(${s.color === 'amber' ? '245,158,11' : s.color === 'emerald' ? '16,185,129' : '239,68,68'},0.15)` }}>
                            {s.icon}
                        </div>
                        <div>
                            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{s.count}</p>
                            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{s.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Renewal List */}
            <div className="space-y-4">
                {renewals.map((r, i) => (
                    <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="rounded-2xl p-5"
                        style={{ background: darkMode ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', border: `1px solid ${darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(0,0,0,0.06)'}` }}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="text-xl">{statusIcon[r.status]}</div>
                                <div>
                                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{r.certName}</h3>
                                    <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Submitted: {r.submittedDate}</p>
                                </div>
                            </div>
                            <StatusBadge status={r.status} />
                        </div>
                        {r.notes && <p className={`mt-3 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{r.notes}</p>}
                        {r.document && (
                            <div className="flex items-center gap-2 mt-3">
                                <HiDocumentText className="text-indigo-400" size={16} />
                                <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{r.document}</span>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* New Renewal Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Renewal Request">
                <div className="space-y-4">
                    <div>
                        <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Select Certification *</label>
                        <select className={inputClass} value={form.certId} onChange={e => setForm({ ...form, certId: e.target.value })}>
                            <option value="">-- Select --</option>
                            {expiringCerts.map(c => <option key={c.id} value={c.id}>{c.name} ({c.status})</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Notes</label>
                        <textarea className={`${inputClass} h-24 resize-none`} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Add any notes about your renewal..." />
                    </div>
                    <div>
                        <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Upload Renewed Certificate</label>
                        <div className={`flex items-center justify-center p-6 rounded-xl border-2 border-dashed cursor-pointer ${darkMode ? 'border-white/10 hover:border-emerald-500/50' : 'border-slate-200 hover:border-emerald-300'}`}>
                            <div className="text-center">
                                <HiUpload className={`mx-auto mb-2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} size={24} />
                                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Upload renewed certificate</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 justify-end pt-2">
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setIsModalOpen(false)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-medium ${darkMode ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>Cancel</motion.button>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit}
                            className="px-5 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>Submit Request</motion.button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
