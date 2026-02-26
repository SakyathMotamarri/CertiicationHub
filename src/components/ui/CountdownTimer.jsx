import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

export default function CountdownTimer({ targetDate, compact = false }) {
    const { darkMode } = useTheme();
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft(targetDate)), 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    const isExpired = timeLeft.total <= 0;
    const isUrgent = timeLeft.days <= 30 && !isExpired;

    if (compact) {
        return (
            <span className={`text-sm font-mono font-semibold ${isExpired ? 'text-red-400' : isUrgent ? 'text-amber-400' : 'text-emerald-400'}`}>
                {isExpired ? 'Expired' : `${timeLeft.days}d ${timeLeft.hours}h`}
            </span>
        );
    }

    return (
        <div className="flex gap-2">
            {isExpired ? (
                <div className="px-3 py-2 rounded-xl text-sm font-semibold text-red-400"
                    style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                    Expired
                </div>
            ) : (
                ['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                    <motion.div
                        key={unit}
                        className="flex flex-col items-center rounded-xl px-3 py-2 min-w-[52px]"
                        style={{
                            background: darkMode ? 'rgba(15,23,42,0.5)' : 'rgba(255,255,255,0.6)',
                            border: `1px solid ${isUrgent ? 'rgba(245,158,11,0.3)' : 'rgba(99,102,241,0.2)'}`,
                        }}
                        animate={{ scale: unit === 'seconds' ? [1, 1.05, 1] : 1 }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        <span className={`text-lg font-bold font-mono ${isUrgent ? 'text-amber-400' : darkMode ? 'text-white' : 'text-slate-800'}`}>
                            {String(timeLeft[unit]).padStart(2, '0')}
                        </span>
                        <span className={`text-[10px] uppercase tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                            {unit.slice(0, 3)}
                        </span>
                    </motion.div>
                ))
            )}
        </div>
    );
}

function calculateTimeLeft(targetDate) {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
        total: diff,
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}
