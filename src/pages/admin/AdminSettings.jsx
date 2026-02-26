import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineDatabase, HiOutlineDownload, HiOutlineSave, HiOutlineRefresh } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useTheme } from '../../contexts/ThemeContext';

export default function AdminSettings() {
    const { darkMode } = useTheme();
    const [loginAttempts, setLoginAttempts] = useState('5');
    const [sessionTimeout, setSessionTimeout] = useState('30');
    const [backupFreq, setBackupFreq] = useState('Weekly');

    // Matching screenshot colors
    const bgDark = darkMode ? '#0f172a' : '#f8fafc';
    const cardBg = darkMode ? '#1e293b' : '#ffffff';
    const inputBg = darkMode ? '#0f172a' : '#f1f5f9';
    const borderColor = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
    const textLabel = darkMode ? '#e2e8f0' : '#334155';
    const textSub = darkMode ? '#64748b' : '#94a3b8';

    const handleSave = () => toast.success('Configuration saved successfully!');
    const handleReset = () => {
        setLoginAttempts('5');
        setSessionTimeout('30');
        setBackupFreq('Weekly');
        toast.success('Reset to defaults');
    };

    return (
        <div className="max-w-4xl space-y-6">
            {/* Header Area matching screenshot */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
                <h1 className={`text-2xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>System-Config</h1>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                {/* General Settings Card */}
                <div style={{ backgroundColor: cardBg, borderColor }} className="rounded-2xl p-6 sm:p-8 border mb-6 shadow-sm">
                    <div className="space-y-6">
                        {/* Login Attempts */}
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: textLabel }}>Maximum Login Attempts</label>
                            <input
                                type="number"
                                value={loginAttempts}
                                onChange={(e) => setLoginAttempts(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border outline-none transition-colors text-sm font-medium"
                                style={{ backgroundColor: inputBg, borderColor, color: darkMode ? '#fff' : '#000' }}
                            />
                            <p className="text-xs mt-2" style={{ color: textSub }}>Lock account after this many failed login attempts</p>
                        </div>

                        {/* Session Timeout */}
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: textLabel }}>Session Timeout (minutes)</label>
                            <input
                                type="number"
                                value={sessionTimeout}
                                onChange={(e) => setSessionTimeout(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border outline-none transition-colors text-sm font-medium"
                                style={{ backgroundColor: inputBg, borderColor, color: darkMode ? '#fff' : '#000' }}
                            />
                            <p className="text-xs mt-2" style={{ color: textSub }}>Automatically logout users after inactivity</p>
                        </div>
                    </div>
                </div>

                {/* Data Management Card */}
                <div style={{ backgroundColor: cardBg, borderColor }} className="rounded-2xl p-6 sm:p-8 border mb-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <HiOutlineDatabase className={darkMode ? 'text-white' : 'text-slate-800'} size={24} />
                        <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Data Management</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: textLabel }}>Backup Frequency</label>
                            <select
                                value={backupFreq}
                                onChange={(e) => setBackupFreq(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border outline-none appearance-none text-sm font-medium"
                                style={{ backgroundColor: inputBg, borderColor, color: darkMode ? '#fff' : '#000' }}
                            >
                                <option>Daily</option>
                                <option>Weekly</option>
                                <option>Monthly</option>
                            </select>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                onClick={() => toast.success('Initiating backup...')}
                                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-opacity hover:opacity-90"
                                style={{ backgroundColor: '#10b981' }}> {/* Emerald Green */}
                                <HiOutlineDownload size={18} /> Backup Now
                            </motion.button>

                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                onClick={() => toast.success('Exporting logs...')}
                                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-opacity hover:opacity-90"
                                style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}> {/* Purple/Indigo gradient */}
                                <HiOutlineDownload size={18} /> Export Logs
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                        onClick={handleSave}
                        className="flex-[3] flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white transition-opacity hover:opacity-90 shadow-lg shadow-purple-500/20"
                        style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}> {/* Violet/Blue gradient matching screenshot */}
                        <HiOutlineSave size={20} /> Save Configuration
                    </motion.button>

                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={handleReset}
                        className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-colors"
                        style={{ backgroundColor: darkMode ? 'rgba(153,27,27,0.2)' : 'rgba(220,38,38,0.1)', color: darkMode ? '#fca5a5' : '#dc2626' }}>
                        <HiOutlineRefresh size={18} /> Reset to Defaults
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
