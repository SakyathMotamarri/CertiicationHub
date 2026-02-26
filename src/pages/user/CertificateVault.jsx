import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArchive, HiDownload, HiEye, HiSearch, HiDocumentText, HiUpload, HiPlus } from 'react-icons/hi';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth, useCerts } from '../../contexts/AuthContext';
import Modal from '../../components/ui/Modal';
import StatusBadge from '../../components/ui/StatusBadge';
import toast from 'react-hot-toast';

export default function CertificateVault() {
    const { darkMode } = useTheme();
    const { user } = useAuth();
    const { certs, setCerts } = useCerts();
    const [search, setSearch] = useState('');
    const [preview, setPreview] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const baseCerts = certs.filter(c => c.userId === (user?.id || 1) && (c.document || c.fileUrl));
    const allCerts = [...baseCerts, ...uploadedFiles];
    const filtered = allCerts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    const getFileIcon = (n) => n?.endsWith('.pdf') ? '📄' : '🖼️';

    const cardBg = {
        background: darkMode ? 'rgba(15,23,42,0.6)' : '#ffffff',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${darkMode ? 'rgba(147,51,234,0.12)' : '#e2e8f0'}`,
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const newEntry = {
                    id: Date.now() + Math.random(),
                    name: file.name.replace(/\.[^.]+$/, ''),
                    authority: 'Uploaded Certificate',
                    document: file.name,
                    status: 'active',
                    category: 'Uploaded',
                    fileUrl: ev.target.result,
                    fileType: file.type,
                    fileSize: (file.size / 1024).toFixed(1) + ' KB',
                    uploadDate: new Date().toLocaleDateString(),
                };

                // Add to both local vault view AND global certifications store
                setUploadedFiles(prev => [newEntry, ...prev]);
                setCerts(prev => [newEntry, ...prev]);

                toast.success(`📁 "${file.name}" uploaded successfully!`);
            };
            reader.readAsDataURL(file);
        });
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
            toast.success(`⬇️ Downloading "${cert.document}"...`);
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
            toast.success(`⬇️ Downloaded "${cert.name}" certificate info`);
        }
    };

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Certificate Vault</h1>
                    <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Securely store, upload, and download your certification documents</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200'}`}>
                        <HiSearch size={18} className={darkMode ? 'text-slate-500' : 'text-slate-400'} />
                        <input type="text" placeholder="Search vault..." value={search} onChange={e => setSearch(e.target.value)}
                            className={`bg-transparent outline-none text-sm w-full ${darkMode ? 'text-white' : 'text-slate-800'}`} />
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf,.png,.jpg,.jpeg,.webp" multiple className="hidden" />
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
                        style={{ background: 'linear-gradient(135deg, #9333ea, #2563eb)' }}>
                        <HiUpload size={18} /> Upload
                    </motion.button>
                </div>
            </motion.div>

            {/* Upload Drop Zone */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                onClick={() => fileInputRef.current?.click()}
                className={`flex items-center justify-center p-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all hover:border-purple-500/50 ${darkMode ? 'border-white/10 bg-white/2 hover:bg-purple-500/5' : 'border-slate-200 bg-slate-50 hover:bg-purple-50/50'}`}>
                <div className="text-center">
                    <HiUpload className="mx-auto mb-2 text-purple-500" size={32} />
                    <p className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Click to upload or drag and drop</p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>PDF, PNG, JPG up to 10MB</p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                    {filtered.map((cert, i) => (
                        <motion.div key={cert.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: i * 0.05 }} whileHover={{ y: -6 }} className="rounded-2xl overflow-hidden group cursor-pointer" style={cardBg}>
                            <div className="relative h-36 flex items-center justify-center" style={{ background: darkMode ? 'rgba(147,51,234,0.05)' : 'rgba(147,51,234,0.03)' }}>
                                <span className="text-5xl">{getFileIcon(cert.document)}</span>
                                {cert.fileSize && (
                                    <span className={`absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full ${darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-50 text-purple-600'}`}>{cert.fileSize}</span>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,0,0,0.4)' }}>
                                    <motion.button whileTap={{ scale: 0.95 }} onClick={(e) => { e.stopPropagation(); setPreview(cert); }}
                                        className="px-3 py-2 rounded-xl text-xs font-medium text-white bg-purple-500"><HiEye size={14} /></motion.button>
                                    <motion.button whileTap={{ scale: 0.95 }} onClick={(e) => { e.stopPropagation(); handleDownload(cert); }}
                                        className="px-3 py-2 rounded-xl text-xs font-medium text-white bg-emerald-500"><HiDownload size={14} /></motion.button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className={`text-sm font-semibold truncate ${darkMode ? 'text-white' : 'text-slate-800'}`}>{cert.name}</h3>
                                <p className={`text-xs mt-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{cert.authority}</p>
                                <div className="flex items-center justify-between mt-3">
                                    <StatusBadge status={cert.status} />
                                    {cert.uploadDate && <span className={`text-[10px] ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>{cert.uploadDate}</span>}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filtered.length === 0 && <div className="text-center py-16"><HiArchive size={48} className="mx-auto mb-3 text-slate-500" /><p className="text-sm text-slate-400">No documents found.</p></div>}

            {/* Preview Modal */}
            <Modal isOpen={!!preview} onClose={() => setPreview(null)} title={preview?.name || 'Preview'} size="lg">
                <div className="space-y-4">
                    <div className="flex items-center justify-center min-h-[300px] rounded-xl overflow-hidden" style={{ background: darkMode ? 'rgba(147,51,234,0.05)' : 'rgba(147,51,234,0.03)' }}>
                        {preview?.fileUrl && preview?.fileType?.startsWith('image/') ? (
                            <img src={preview.fileUrl} alt={preview.name} className="max-w-full max-h-[400px] object-contain rounded-lg" />
                        ) : (
                            <div className="text-center">
                                <HiDocumentText className="mx-auto text-purple-400 mb-3" size={64} />
                                <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{preview?.document}</p>
                                <p className={`text-sm mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{preview?.name} · {preview?.authority}</p>
                                {preview?.fileSize && <p className={`text-xs mt-1 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>Size: {preview.fileSize}</p>}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleDownload(preview)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'linear-gradient(135deg, #9333ea, #2563eb)' }}>
                            <HiDownload size={16} /> Download
                        </motion.button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
