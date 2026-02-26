import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiXCircle, HiEye, HiDocumentText } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useTheme } from '../../contexts/ThemeContext';
import { mockRenewalRequests } from '../../data/mockData';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';

export default function RenewalApprovals() {
    const { darkMode } = useTheme();
    const [renewals, setRenewals] = useState(mockRenewalRequests);
    const [preview, setPreview] = useState(null);
    const [rejectConfirm, setRejectConfirm] = useState(null);
    const cardBg = { background: darkMode ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', border: `1px solid ${darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(0,0,0,0.06)'}` };

    const handleApprove = (id) => { setRenewals(p => p.map(r => r.id === id ? { ...r, status: 'approved' } : r)); toast.success('Renewal approved!'); };
    const handleReject = () => { setRenewals(p => p.map(r => r.id === rejectConfirm.id ? { ...r, status: 'rejected' } : r)); toast.success('Renewal rejected'); setRejectConfirm(null); };

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Renewal Approvals</h1>
                <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Review and process certification renewal requests</p>
            </motion.div>

            <div className="space-y-4">
                {renewals.map((r, i) => (
                    <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="rounded-2xl p-5" style={cardBg}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{r.certName}</h3>
                                    <StatusBadge status={r.status} />
                                </div>
                                <div className={`text-sm space-y-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                    <p>Submitted by: <span className="font-medium">{r.userName}</span></p>
                                    <p>Date: {r.submittedDate}</p>
                                    {r.notes && <p className="italic">"{r.notes}"</p>}
                                </div>
                                {r.document && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <HiDocumentText className="text-indigo-400" size={16} />
                                        <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{r.document}</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <motion.button whileTap={{ scale: 0.95 }} onClick={() => setPreview(r)}
                                    className={`px-3 py-2 rounded-xl text-sm font-medium ${darkMode ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                                    <HiEye size={16} />
                                </motion.button>
                                {r.status === 'pending' && (
                                    <>
                                        <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleApprove(r.id)}
                                            className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 flex items-center gap-1">
                                            <HiCheckCircle size={16} /> Approve
                                        </motion.button>
                                        <motion.button whileTap={{ scale: 0.95 }} onClick={() => setRejectConfirm(r)}
                                            className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 flex items-center gap-1">
                                            <HiXCircle size={16} /> Reject
                                        </motion.button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <Modal isOpen={!!preview} onClose={() => setPreview(null)} title="Renewal Request Details">
                {preview && (
                    <div className="space-y-3">{[['Certification', preview.certName], ['User', preview.userName], ['Submitted', preview.submittedDate], ['Status', preview.status], ['Document', preview.document], ['Notes', preview.notes]].map(([k, v]) => (
                        <div key={k} className="flex justify-between text-sm"><span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>{k}</span><span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>{v || '—'}</span></div>
                    ))}</div>
                )}
            </Modal>

            <ConfirmDialog isOpen={!!rejectConfirm} onConfirm={handleReject} onCancel={() => setRejectConfirm(null)}
                title="Reject Renewal" message={`Reject the renewal request for "${rejectConfirm?.certName}" from ${rejectConfirm?.userName}?`} />
        </div>
    );
}
