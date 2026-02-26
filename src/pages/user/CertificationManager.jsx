import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash, HiSearch, HiFilter, HiExternalLink, HiDocumentText, HiDownload } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth, useCerts } from '../../contexts/AuthContext';
import { certCategories } from '../../data/mockData';
import Modal from '../../components/ui/Modal';
import StatusBadge from '../../components/ui/StatusBadge';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { fireCertificationConfetti } from '../../utils/confetti';

export default function CertificationManager() {
    const { darkMode } = useTheme();
    const { user } = useAuth();
    const { certs, setCerts } = useCerts();
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCert, setEditingCert] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setForm(prev => ({ ...prev, document: file.name, fileUrl: ev.target.result }));
                toast.success(`Attached "${file.name}"`);
            };
            reader.readAsDataURL(file);
        }
        e.target.value = '';
    };

    const handleDownload = (cert) => {
        if (cert.fileUrl) {
            const link = document.createElement('a');
            link.href = cert.fileUrl;
            link.download = cert.document || 'certificate';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success(`⬇️ Certificate "${cert.name}" is successfully downloaded!`);
        } else {
            // Mock download for demo certificates
            const blob = new Blob([`Certificate: ${cert.name}\nAuthority: ${cert.authority}\nCredential ID: ${cert.credentialId || 'N/A'}\nIssue Date: ${cert.issueDate || 'N/A'}\nExpiry Date: ${cert.expiryDate || 'N/A'}`], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${cert.name.replace(/\s+/g, '_')}_certificate.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            toast.success(`⬇️ Certificate "${cert.name}" is successfully downloaded!`);
        }
    };

    const [form, setForm] = useState({ name: '', authority: '', credentialId: '', category: 'Cloud Computing', issueDate: '', expiryDate: '', verificationUrl: '', document: '' });

    const filtered = certs.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.authority.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === 'all' || c.status === filterStatus;
        const matchCategory = filterCategory === 'all' || c.category === filterCategory;
        return matchSearch && matchStatus && matchCategory;
    });

    const openAdd = () => { setEditingCert(null); setForm({ name: '', authority: '', credentialId: '', category: 'Cloud Computing', issueDate: '', expiryDate: '', verificationUrl: '', document: '' }); setIsModalOpen(true); };
    const openEdit = (cert) => { setEditingCert(cert); setForm({ ...cert }); setIsModalOpen(true); };

    const handleSave = () => {
        if (!form.name || !form.authority || !form.issueDate || !form.expiryDate) { toast.error('Please fill all required fields'); return; }
        if (editingCert) {
            setCerts(certs.map(c => c.id === editingCert.id ? { ...c, ...form } : c));
            toast.success('Certification updated globally');
        } else {
            const newCert = {
                id: Date.now(),
                userId: user?.id || 1,
                ...form,
                status: 'Active'
            };
            setCerts([newCert, ...certs]);
            toast.success('Certification added globally');
            fireCertificationConfetti();
        }
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        setCerts(prev => prev.filter(c => c.id !== deleteConfirm.id));
        toast.success('Certification deleted');
        setDeleteConfirm(null);
    };

    const inputClass = `w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-colors ${darkMode ? 'bg-white/5 text-white border border-white/10 focus:border-indigo-500' : 'bg-slate-50 text-slate-800 border border-slate-200 focus:border-indigo-500'}`;

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Certification Manager</h1>
                    <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{certs.length} certifications recorded</p>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={openAdd}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
                    style={{ background: 'linear-gradient(135deg, #9333ea, #2563eb)' }}>
                    <HiPlus size={18} /> Add Certification
                </motion.button>
            </motion.div>

            {/* Filters */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="flex flex-col sm:flex-row gap-3">
                <div className={`flex items-center gap-2 flex-1 px-4 py-2.5 rounded-xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200'}`}>
                    <HiSearch size={18} className={darkMode ? 'text-slate-500' : 'text-slate-400'} />
                    <input type="text" placeholder="Search certifications..." value={search} onChange={e => setSearch(e.target.value)}
                        className={`bg-transparent outline-none text-sm w-full ${darkMode ? 'text-white placeholder:text-slate-500' : 'text-slate-800 placeholder:text-slate-400'}`} />
                </div>
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                    className={`px-4 py-2.5 rounded-xl text-sm outline-none ${darkMode ? 'bg-white/5 text-white border border-white/10' : 'bg-white text-slate-800 border border-slate-200'}`}>
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="expiring">Expiring</option>
                    <option value="expired">Expired</option>
                </select>
                <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
                    className={`px-4 py-2.5 rounded-xl text-sm outline-none ${darkMode ? 'bg-white/5 text-white border border-white/10' : 'bg-white text-slate-800 border border-slate-200'}`}>
                    <option value="all">All Categories</option>
                    {certCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </motion.div>

            {/* Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                    {filtered.map((cert, i) => (
                        <motion.div
                            key={cert.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -4 }}
                            className="rounded-2xl p-5 relative group"
                            style={{
                                background: darkMode ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.8)',
                                backdropFilter: 'blur(20px)',
                                border: `1px solid ${darkMode ? 'rgba(147,51,234,0.12)' : '#e2e8f0'}`,
                            }}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <StatusBadge status={cert.status} />
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => openEdit(cert)}
                                        className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}>
                                        <HiPencil size={16} />
                                    </motion.button>
                                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setDeleteConfirm(cert)}
                                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10">
                                        <HiTrash size={16} />
                                    </motion.button>
                                </div>
                            </div>
                            <h3 className={`text-base font-semibold mb-1 ${darkMode ? 'text-white' : 'text-slate-800'}`}>{cert.name}</h3>
                            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{cert.authority}</p>
                            <div className={`mt-3 text-xs space-y-1.5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                <div className="flex justify-between"><span>Credential ID</span><span className="font-mono">{cert.credentialId}</span></div>
                                <div className="flex justify-between"><span>Category</span><span>{cert.category}</span></div>
                                <div className="flex justify-between"><span>Issued</span><span>{cert.issueDate}</span></div>
                                <div className="flex justify-between"><span>Expires</span><span className={cert.status === 'expired' ? 'text-red-400' : ''}>{cert.expiryDate}</span></div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                {cert.verificationUrl && (
                                    <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300">
                                        <HiExternalLink size={14} /> Verify
                                    </a>
                                )}
                                {cert.document && (
                                    <button onClick={() => handleDownload(cert)}
                                        className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                                        <HiDownload size={14} /> Download {cert.document}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-16">
                    <HiAcademicCap size={48} className={`mx-auto mb-3 ${darkMode ? 'text-slate-600' : 'text-slate-300'}`} />
                    <p className={`text-sm ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>No certifications found matching your filters.</p>
                </div>
            )}

            {/* Add / Edit Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingCert ? 'Edit Certification' : 'Add New Certification'}>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Certification Name *</label>
                            <input className={inputClass} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. AWS Solutions Architect" />
                        </div>
                        <div>
                            <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Issuing Authority *</label>
                            <input className={inputClass} value={form.authority} onChange={e => setForm({ ...form, authority: e.target.value })} placeholder="e.g. Amazon Web Services" />
                        </div>
                        <div>
                            <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Credential ID</label>
                            <input className={inputClass} value={form.credentialId} onChange={e => setForm({ ...form, credentialId: e.target.value })} placeholder="e.g. AWS-SAA-2024-78901" />
                        </div>
                        <div>
                            <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Category</label>
                            <select className={inputClass} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                {certCategories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Issue Date *</label>
                            <input type="date" className={inputClass} value={form.issueDate} onChange={e => setForm({ ...form, issueDate: e.target.value })} />
                        </div>
                        <div>
                            <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Expiration Date *</label>
                            <input type="date" className={inputClass} value={form.expiryDate} onChange={e => setForm({ ...form, expiryDate: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Verification URL</label>
                        <input className={inputClass} value={form.verificationUrl} onChange={e => setForm({ ...form, verificationUrl: e.target.value })} placeholder="https://..." />
                    </div>
                    <div>
                        <label className={`text-sm font-medium mb-1.5 block ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Upload Certificate (PDF/Image)</label>
                        <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf,.png,.jpg,.jpeg,.webp" className="hidden" />
                        <div onClick={() => fileInputRef.current?.click()} className={`flex items-center justify-center p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${darkMode ? 'border-white/10 hover:border-purple-500/50 bg-white/2 hover:bg-white/5' : 'border-slate-200 hover:border-purple-300 bg-slate-50 hover:bg-slate-100'} ${form.document ? (darkMode ? 'border-purple-500/50 bg-purple-500/10' : 'border-purple-400 bg-purple-50') : ''}`}>
                            <div className="text-center">
                                {form.document ? (
                                    <>
                                        <HiDocumentText className="mx-auto text-purple-500 mb-2" size={32} />
                                        <p className={`text-sm font-semibold max-w-[200px] truncate mx-auto ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{form.document}</p>
                                        <p className="text-xs mt-1 text-slate-500">Click to change file</p>
                                    </>
                                ) : (
                                    <>
                                        <HiDocumentText className={`mx-auto mb-2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} size={28} />
                                        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Click to upload or drag and drop</p>
                                        <p className={`text-xs mt-1 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>PDF, PNG, JPG up to 10MB</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 justify-end pt-2">
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setIsModalOpen(false)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-medium ${darkMode ? 'bg-white/5 text-slate-400 hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                            Cancel
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave}
                            className="px-5 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'linear-gradient(135deg, #9333ea, #2563eb)' }}>
                            {editingCert ? 'Update' : 'Add'} Certification
                        </motion.button>
                    </div>
                </div>
            </Modal>

            <ConfirmDialog isOpen={!!deleteConfirm} onConfirm={handleDelete} onCancel={() => setDeleteConfirm(null)}
                title="Delete Certification" message={`Are you sure you want to delete "${deleteConfirm?.name}"? This action cannot be undone.`} />
        </div>
    );
}
