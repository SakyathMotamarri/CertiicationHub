import { motion } from 'framer-motion';

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-950" style={{ zIndex: 99999 }}>
            <div className="text-center">
                {/* Animated logo rings */}
                <div className="relative w-24 h-24 mx-auto mb-6">
                    {[0, 1, 2].map(i => (
                        <motion.div
                            key={i}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0 rounded-full"
                            style={{
                                border: `2px solid transparent`,
                                borderTopColor: i === 0 ? '#9333ea' : i === 1 ? '#2563eb' : '#06b6d4',
                                transform: `scale(${1 - i * 0.15})`,
                                opacity: 1 - i * 0.2,
                            }}
                        />
                    ))}
                    <motion.div
                        animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <span className="text-2xl">🛡️</span>
                    </motion.div>
                </div>

                {/* Brand name */}
                <motion.h2
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-xl font-bold text-white mb-2"
                >
                    CertiHub
                </motion.h2>
                <p className="text-sm text-slate-500">Loading your certifications...</p>

                {/* Progress bar */}
                <div className="w-48 h-1 mx-auto mt-4 rounded-full overflow-hidden bg-slate-800">
                    <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-full h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, transparent, #9333ea, #2563eb, transparent)' }}
                    />
                </div>
            </div>
        </div>
    );
}
