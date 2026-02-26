import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { useTheme } from '../../contexts/ThemeContext';

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
    const { darkMode } = useTheme();
    const sizes = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl', xl: 'max-w-6xl' };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center p-4"
                    style={{ zIndex: 50 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0"
                        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Content */}
                    <motion.div
                        className={`relative w-full ${sizes[size]} rounded-2xl overflow-hidden`}
                        style={{
                            background: darkMode ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.98)',
                            border: `1px solid ${darkMode ? 'rgba(99,102,241,0.2)' : 'rgba(0,0,0,0.1)'}`,
                            boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                            maxHeight: '90vh',
                        }}
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                        {/* Header */}
                        <div
                            className="flex items-center justify-between px-6 py-4 border-b"
                            style={{ borderColor: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(0,0,0,0.08)' }}
                        >
                            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{title}</h2>
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                className={`p-2 rounded-xl transition-colors ${darkMode ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
                            >
                                <HiX size={20} />
                            </motion.button>
                        </div>

                        {/* Body */}
                        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
