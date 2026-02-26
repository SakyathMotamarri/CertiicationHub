import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

export default function StatCard({ icon, title, value, trend, color = 'purple', delay = 0 }) {
    const { darkMode } = useTheme();
    const colors = {
        purple: { icon: '#a855f7', trend: '#10b981' },
        indigo: { icon: '#818cf8', trend: '#10b981' },
        emerald: { icon: '#34d399', trend: '#10b981' },
        amber: { icon: '#fbbf24', trend: '#10b981' },
        red: { icon: '#f87171', trend: '#ef4444' },
        cyan: { icon: '#22d3ee', trend: '#10b981' },
        blue: { icon: '#60a5fa', trend: '#10b981' },
    };
    const c = colors[color] || colors.purple;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay * 0.1, duration: 0.5, ease: 'easeOut' }}
            whileHover={{ y: -4 }}
            className="rounded-2xl p-6 cursor-pointer transition-shadow"
            style={{
                background: darkMode ? 'rgba(15,23,42,0.6)' : '#ffffff',
                backdropFilter: darkMode ? 'blur(20px)' : 'none',
                border: `1px solid ${darkMode ? 'rgba(147,51,234,0.12)' : '#e2e8f0'}`,
                boxShadow: darkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.04)',
            }}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{title}</p>
                    <motion.p
                        className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ delay: delay * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                    >
                        {value}
                    </motion.p>
                    {trend && (
                        <p className="text-xs mt-2 font-medium text-emerald-500">
                            {trend} from last month
                        </p>
                    )}
                </div>
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl text-xl ${darkMode ? 'text-purple-400 bg-purple-500/10' : 'text-purple-500 bg-purple-50'}`}>
                    {icon}
                </div>
            </div>
        </motion.div>
    );
}
