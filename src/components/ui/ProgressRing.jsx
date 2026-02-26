import { motion } from 'framer-motion';

export default function ProgressRing({ value, max = 100, size = 80, strokeWidth = 6, color = '#6366f1' }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const percent = Math.min((value / max) * 100, 100);
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth={strokeWidth} />
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                />
            </svg>
            <div className="absolute text-sm font-bold" style={{ color }}>
                {Math.round(percent)}%
            </div>
        </div>
    );
}
