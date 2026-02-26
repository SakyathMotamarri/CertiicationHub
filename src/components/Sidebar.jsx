import { NavLink, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiHome, HiAcademicCap, HiClock, HiRefresh, HiArchive, HiBell, HiCog, HiChartBar, HiUsers, HiClipboardCheck, HiDocumentReport, HiShieldCheck } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const userLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: HiHome },
    { to: '/certifications', label: 'Certifications', icon: HiAcademicCap },
    { to: '/expiry-tracker', label: 'Expiry Tracker', icon: HiClock },
    { to: '/renewals', label: 'Renewal Center', icon: HiRefresh },
    { to: '/vault', label: 'Certificate Vault', icon: HiArchive },
    { to: '/notifications', label: 'Notifications', icon: HiBell },
    { to: '/settings', label: 'Settings', icon: HiCog },
];

const adminLinks = [
    { to: '/admin', label: 'Dashboard', icon: HiHome },
    { to: '/admin/users', label: 'User Management', icon: HiUsers },
    { to: '/admin/certifications', label: 'Manage Certifications', icon: HiDocumentReport },
    { to: '/admin/vault', label: 'Certificate Management', icon: HiArchive },
    { to: '/admin/notifications', label: 'Send Notifications', icon: HiBell },
    { to: '/admin/settings', label: 'System Config', icon: HiCog },
    { to: '/admin/analytics', label: 'Analytics & Reports', icon: HiChartBar },
];

export default function Sidebar({ isOpen, onClose }) {
    const { darkMode } = useTheme();
    const { user } = useAuth();
    const location = useLocation();
    const links = user?.role === 'admin' ? adminLinks : userLinks;

    const sidebarContent = (
        <div className="flex flex-col h-full">
            {/* Brand header with gradient */}
            <Link to="/" className="block mx-3 mt-4 mb-2 px-4 py-3 rounded-2xl text-center hover:opacity-90 transition-opacity" style={{ background: 'linear-gradient(135deg, #9333ea, #2563eb)', boxShadow: '0 4px 20px rgba(147,51,234,0.3)' }}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-200 tracking-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                            Certification-Hub
                        </h1>
                    </div>
                    <button onClick={(e) => { e.preventDefault(); onClose(); }} className="lg:hidden p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10">
                        <HiX size={18} />
                    </button>
                </div>
            </Link>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {links.map((link) => {
                    const isActive = location.pathname === link.to;
                    return (
                        <NavLink key={link.to} to={link.to} onClick={onClose}>
                            <motion.div
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                                    ? 'text-white'
                                    : darkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                                    }`}
                                style={isActive ? {
                                    background: 'linear-gradient(135deg, #9333ea, #2563eb)',
                                    boxShadow: '0 4px 15px rgba(147,51,234,0.3)',
                                } : {}}
                            >
                                <link.icon size={18} />
                                {link.label}
                            </motion.div>
                        </NavLink>
                    );
                })}
            </nav>

            {/* Footer Logout Button */}
            <div className={`px-4 py-4 border-t ${darkMode ? 'border-white/5' : 'border-slate-100'}`}>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { /* Handle logout */ }}
                    className="w-full py-3 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                >
                    Logout
                </motion.button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop sidebar */}
            <aside
                className="hidden lg:block fixed left-0 top-0 bottom-0 w-64"
                style={{
                    zIndex: 40,
                    background: darkMode ? 'rgba(15,23,42,0.95)' : '#ffffff',
                    borderRight: `1px solid ${darkMode ? 'rgba(147,51,234,0.1)' : 'rgba(0,0,0,0.06)'}`,
                }}
            >
                {sidebarContent}
            </aside>

            {/* Mobile sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 lg:hidden"
                            style={{ zIndex: 40, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
                            onClick={onClose}
                        />
                        <motion.aside
                            initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed left-0 top-0 bottom-0 w-64 lg:hidden"
                            style={{
                                zIndex: 50,
                                background: darkMode ? 'rgba(15,23,42,0.98)' : '#fff',
                                borderRight: `1px solid ${darkMode ? 'rgba(147,51,234,0.15)' : 'rgba(0,0,0,0.08)'}`,
                            }}
                        >
                            {sidebarContent}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
