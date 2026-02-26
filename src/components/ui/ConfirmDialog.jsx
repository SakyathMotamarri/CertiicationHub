import { motion, AnimatePresence } from 'framer-motion';
import { HiExclamation } from 'react-icons/hi';
import { useTheme } from '../../contexts/ThemeContext';

export default function ConfirmDialog({ isOpen, onConfirm, onCancel, title, message }) {
    const { darkMode } = useTheme();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center p-4"
                    style={{ zIndex: 60 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={onCancel} />
                    <motion.div
                        className="relative w-full max-w-md rounded-2xl p-6"
                        style={{
                            background: darkMode ? 'rgba(15,23,42,0.95)' : '#fff',
                            border: `1px solid ${darkMode ? 'rgba(239,68,68,0.2)' : 'rgba(0,0,0,0.1)'}`,
                            boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                        }}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full" style={{ background: 'rgba(239,68,68,0.15)' }}>
                                <HiExclamation className="text-red-400" size={20} />
                            </div>
                            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{title}</h3>
                        </div>
                        <p className={`text-sm mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{message}</p>
                        <div className="flex gap-3 justify-end">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onCancel}
                                className={`px-4 py-2 rounded-xl text-sm font-medium ${darkMode ? 'bg-white/5 text-slate-400 hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                            >
                                Cancel
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onConfirm}
                                className="px-4 py-2 rounded-xl text-sm font-medium text-white"
                                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
                            >
                                Confirm
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
