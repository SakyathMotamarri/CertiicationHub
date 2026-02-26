import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiShieldCheck, HiMoon, HiSun, HiArrowRight, HiAcademicCap, HiClock, HiRefresh, HiArchive, HiChartBar, HiBell, HiLockClosed, HiGlobe, HiStar, HiCheck } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';
import ParticleField from '../components/ui/ParticleField';

const features = [
    {
        icon: HiAcademicCap,
        title: 'Certification Manager',
        desc: 'Add, edit, and organize all your professional certifications in one place. Track credential IDs, issuing authorities, categories, and verification URLs with a beautiful card-based interface.',
        color: '#9333ea',
        gradient: 'from-purple-500 to-indigo-500',
    },
    {
        icon: HiClock,
        title: 'Expiry Tracker',
        desc: 'Never miss a renewal deadline again. Visual countdown timers and smart alerts notify you before your certifications expire, with color-coded urgency indicators.',
        color: '#2563eb',
        gradient: 'from-blue-500 to-cyan-500',
    },
    {
        icon: HiRefresh,
        title: 'Renewal Center',
        desc: 'Submit renewal requests with one click. Upload updated documents, track approval status, and keep your certifications current with our streamlined renewal workflow.',
        color: '#059669',
        gradient: 'from-emerald-500 to-teal-500',
    },
    {
        icon: HiArchive,
        title: 'Certificate Vault',
        desc: 'Securely upload and store your certificate PDFs and images. Access, preview, and download your credentials anytime from our encrypted digital vault.',
        color: '#d97706',
        gradient: 'from-amber-500 to-orange-500',
    },
    {
        icon: HiChartBar,
        title: 'Analytics Dashboard',
        desc: 'Visualize your certification journey with interactive charts. Track activity trends, completion rates, and portfolio growth at a glance.',
        color: '#dc2626',
        gradient: 'from-red-500 to-pink-500',
    },
    {
        icon: HiBell,
        title: 'Smart Notifications',
        desc: 'Receive real-time alerts for expiring certifications, approved renewals, and system updates. Stay informed with our intelligent notification system.',
        color: '#7c3aed',
        gradient: 'from-violet-500 to-purple-500',
    },
];

const stats = [
    { value: '10,000+', label: 'Certifications Tracked' },
    { value: '5,000+', label: 'Professionals' },
    { value: '99.9%', label: 'Uptime' },
    { value: '50+', label: 'Cert Providers' },
];

const testimonials = [
    { name: 'Sarah Chen', role: 'Cloud Architect', text: 'CertiHub helped me track all my AWS and Azure certs in one place. The expiry alerts saved me from missing a critical renewal!', avatar: '👩‍💻' },
    { name: 'James Wilson', role: 'Security Analyst', text: 'The certificate vault is a game-changer. I can upload, store, and share my credentials instantly with recruiters.', avatar: '👨‍💼' },
    { name: 'Priya Sharma', role: 'DevOps Engineer', text: 'Best certification management tool I\'ve used. The analytics dashboard gives me a clear picture of my professional growth.', avatar: '👩‍🔬' },
];

export default function LandingPage() {
    const { darkMode, toggleTheme } = useTheme();
    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

    const fadeUp = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-50px' },
        transition: { duration: 0.6, ease: 'easeOut' },
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-800'}`}>
            <ParticleField />

            {/* ===== NAVBAR ===== */}
            <nav className={`fixed top-0 w-full h-16 flex items-center justify-between px-6 lg:px-12 ${darkMode ? 'bg-slate-950/80' : 'bg-white/80'}`}
                style={{ backdropFilter: 'blur(20px)', zIndex: 100, borderBottom: `1px solid ${darkMode ? 'rgba(147,51,234,0.1)' : 'rgba(0,0,0,0.05)'}` }}>
                <Link to="/" className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #9333ea, #2563eb)' }}>
                        <HiShieldCheck size={20} className="text-white" />
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">CertiHub</span>
                </Link>
                <div className="flex items-center gap-3">
                    <motion.button whileTap={{ scale: 0.95 }} onClick={toggleTheme} className={`p-2 rounded-lg ${darkMode ? 'text-amber-400 hover:bg-white/5' : 'text-slate-500 hover:bg-slate-100'}`}>
                        {darkMode ? <HiSun size={18} /> : <HiMoon size={18} />}
                    </motion.button>
                    <Link to="/login" className={`px-4 py-2 text-sm font-medium rounded-lg ${darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-800'}`}>Login</Link>
                    <Link to="/signup">
                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                            className="px-5 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg, #9333ea, #2563eb)' }}>
                            Sign Up
                        </motion.button>
                    </Link>
                </div>
            </nav>

            {/* ===== HERO ===== */}
            <motion.section style={{ opacity: heroOpacity, scale: heroScale }} className="relative pt-32 pb-20 px-6 lg:px-12 text-center overflow-hidden">
                <div className="max-w-4xl mx-auto relative" style={{ zIndex: 1 }}>
                    <motion.div {...fadeUp}>
                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6 ${darkMode ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-purple-50 text-purple-600 border border-purple-100'}`}>
                            <HiStar size={14} /> The Future of Certification Management
                        </span>
                    </motion.div>
                    <motion.h1 {...fadeUp} transition={{ delay: 0.1, duration: 0.6 }}
                        className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
                        <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">Manage Your</span>
                        <br />
                        <span className={darkMode ? 'text-white' : 'text-slate-900'}>Certifications with AI</span>
                    </motion.h1>
                    <motion.p {...fadeUp} transition={{ delay: 0.2, duration: 0.6 }}
                        className={`text-lg sm:text-xl max-w-2xl mx-auto mb-10 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        CertiHub combines intelligent tracking, secure storage, and smart reminders to help professionals
                        manage certifications effortlessly and never miss a renewal deadline.
                    </motion.p>
                    <motion.div {...fadeUp} transition={{ delay: 0.3, duration: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/signup">
                            <motion.button whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(147,51,234,0.4)' }} whileTap={{ scale: 0.97 }}
                                className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white"
                                style={{ background: 'linear-gradient(135deg, #9333ea, #2563eb)' }}>
                                Start Free Trial <HiArrowRight size={18} />
                            </motion.button>
                        </Link>
                        <Link to="/login">
                            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                className={`px-8 py-4 rounded-xl text-base font-semibold border-2 ${darkMode ? 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10' : 'border-purple-300 text-purple-600 hover:bg-purple-50'}`}>
                                Explore Demo
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
                {/* Gradient blobs */}
                <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{ background: '#9333ea' }} />
                <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: '#2563eb' }} />
            </motion.section>

            {/* ===== STATS ===== */}
            <section className={`py-12 border-y ${darkMode ? 'border-white/5 bg-slate-900/30' : 'border-slate-100 bg-slate-50/50'}`}>
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((s, i) => (
                        <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="text-center">
                            <p className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{s.value}</p>
                            <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{s.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ===== FEATURES ===== */}
            <section className="py-24 px-6 lg:px-12">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <span className={`inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 ${darkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                            Platform Features
                        </span>
                        <h2 className={`text-3xl sm:text-4xl font-extrabold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                            Everything You Need to <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Stay Certified</span>
                        </h2>
                        <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            From tracking to renewal, CertiHub provides a complete toolkit for managing your professional certifications.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -8, boxShadow: `0 20px 40px ${f.color}15` }}
                                className="rounded-2xl p-6 transition-all"
                                style={{
                                    background: darkMode ? 'rgba(15,23,42,0.6)' : '#ffffff',
                                    border: `1px solid ${darkMode ? 'rgba(147,51,234,0.1)' : '#e2e8f0'}`,
                                    backdropFilter: 'blur(10px)',
                                }}>
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${f.gradient}`}>
                                    <f.icon size={22} className="text-white" />
                                </div>
                                <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>{f.title}</h3>
                                <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== HOW IT WORKS ===== */}
            <section className={`py-24 px-6 lg:px-12 ${darkMode ? 'bg-slate-900/30' : 'bg-gradient-to-b from-purple-50/30 to-transparent'}`}>
                <div className="max-w-5xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <span className={`inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 ${darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                            How It Works
                        </span>
                        <h2 className={`text-3xl sm:text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                            Get Started in <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">3 Simple Steps</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: '01', title: 'Create Account', desc: 'Sign up for free and set up your professional profile in under a minute.', icon: '🚀' },
                            { step: '02', title: 'Upload Certifications', desc: 'Add your certificates with details, upload PDFs, and organize by category.', icon: '📄' },
                            { step: '03', title: 'Stay on Track', desc: 'Get smart reminders, track expirations, and manage renewals effortlessly.', icon: '✅' },
                        ].map((s, i) => (
                            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.15 }} className="text-center">
                                <div className="text-5xl mb-4">{s.icon}</div>
                                <span className="text-xs font-bold text-purple-500 uppercase tracking-widest">Step {s.step}</span>
                                <h3 className={`text-xl font-bold mt-2 mb-3 ${darkMode ? 'text-white' : 'text-slate-800'}`}>{s.title}</h3>
                                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== SECURITY ===== */}
            <section className="py-24 px-6 lg:px-12">
                <div className="max-w-5xl mx-auto">
                    <motion.div {...fadeUp} className="rounded-3xl p-8 sm:p-12 relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #9333ea, #2563eb)', boxShadow: '0 20px 60px rgba(147,51,234,0.3)' }}>
                        <div className="relative" style={{ zIndex: 1 }}>
                            <div className="flex items-center gap-3 mb-4">
                                <HiLockClosed size={28} className="text-white/80" />
                                <HiGlobe size={28} className="text-white/80" />
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Enterprise-Grade Security</h2>
                            <p className="text-white/70 text-lg max-w-xl mb-8">
                                Your certificates are encrypted at rest, backed up daily, and accessible only by you.
                                SOC 2 compliant with 256-bit AES encryption.
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {['End-to-End Encryption', 'SOC 2 Compliant', 'Daily Backups', 'GDPR Ready'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-white/90 text-sm">
                                        <HiCheck size={16} className="text-emerald-300" /> {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: '#06b6d4' }} />
                    </motion.div>
                </div>
            </section>

            {/* ===== TESTIMONIALS ===== */}
            <section className={`py-24 px-6 lg:px-12 ${darkMode ? 'bg-slate-900/30' : 'bg-slate-50/50'}`}>
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <span className={`inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 ${darkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                            Testimonials
                        </span>
                        <h2 className={`text-3xl sm:text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                            Loved by <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Professionals</span>
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                                className="rounded-2xl p-6" style={{
                                    background: darkMode ? 'rgba(15,23,42,0.6)' : '#ffffff',
                                    border: `1px solid ${darkMode ? 'rgba(147,51,234,0.1)' : '#e2e8f0'}`,
                                }}>
                                <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>"{t.text}"</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{t.avatar}</span>
                                    <div>
                                        <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{t.name}</p>
                                        <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{t.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="py-24 px-6 lg:px-12">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div {...fadeUp}>
                        <h2 className={`text-3xl sm:text-4xl font-extrabold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                            Ready to Take Control of Your Certifications?
                        </h2>
                        <p className={`text-lg mb-10 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            Join thousands of professionals who trust CertiHub to manage their certification journey.
                        </p>
                        <Link to="/signup">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(147,51,234,0.5)' }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-bold text-white"
                                style={{ background: 'linear-gradient(135deg, #9333ea, #2563eb)' }}>
                                🚀 Start Free Trial <HiArrowRight size={20} />
                            </motion.button>
                        </Link>
                        <p className={`text-xs mt-4 ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>No credit card required · Free forever plan available</p>
                    </motion.div>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className={`py-8 px-6 text-center border-t ${darkMode ? 'border-white/5 text-slate-500' : 'border-slate-100 text-slate-400'}`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #9333ea, #2563eb)' }}>
                        <HiShieldCheck size={14} className="text-white" />
                    </div>
                    <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">CertiHub</span>
                </div>
                <p className="text-xs">© 2026 CertiHub. All rights reserved.</p>
            </footer>
        </div>
    );
}
