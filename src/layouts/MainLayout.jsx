import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import FloatingBackground from '../components/ui/FloatingBackground';
import ParticleField from '../components/ui/ParticleField';
import FloatingChatbot from '../components/ui/FloatingChatbot';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
};

export default function MainLayout() {
    const { darkMode } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-800'}`}>
            <FloatingBackground />
            <ParticleField />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="lg:ml-64 relative" style={{ zIndex: 1 }}>
                <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <AnimatePresence mode="wait">
                    <motion.main
                        key={location.pathname}
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="p-4 lg:p-6"
                    >
                        <Outlet />
                    </motion.main>
                </AnimatePresence>
            </div>
            <FloatingChatbot />
        </div>
    );
}
