import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export default function NotFoundPage() {
    const { darkMode } = useTheme();
    const navigate = useNavigate();

    return (
        <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'animated-gradient' : 'animated-gradient-light'}`}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <motion.h1 className="text-8xl font-black gradient-text" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                    404
                </motion.h1>
                <p className={`text-xl mt-4 font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Page Not Found</p>
                <p className={`text-sm mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>The page you're looking for doesn't exist.</p>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/dashboard')}
                    className="mt-6 px-6 py-3 rounded-xl text-sm font-medium text-white" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
                    Go Home
                </motion.button>
            </motion.div>
        </div>
    );
}
