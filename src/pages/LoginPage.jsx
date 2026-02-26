import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { HiShieldCheck, HiMoon, HiSun, HiEye, HiEyeOff, HiArrowRight } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const { darkMode, toggleTheme } = useTheme();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [role, setRole] = useState('user');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        login(email, password, role);
        toast.success(`Welcome! Logged in as ${role === 'admin' ? 'Administrator' : 'Professional'}`);
        navigate(role === 'admin' ? '/admin' : '/dashboard');
    };

    const inputClass = `w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all ${darkMode
        ? 'bg-slate-800/50 text-white border-2 border-slate-700 focus:border-purple-500 placeholder:text-slate-500'
        : 'bg-slate-50 text-slate-700 border-2 border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 placeholder:text-slate-400'
        }`;

    const labelClass = `text-sm font-semibold mb-2 block ${darkMode ? 'text-slate-300' : 'text-slate-700'}`;

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-slate-950' : 'bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50'}`}>
            {/* Blobs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
                <div className="blob" style={{ width: 500, height: 500, background: darkMode ? 'rgba(147,51,234,0.06)' : 'rgba(147,51,234,0.08)', top: '-10%', left: '-8%' }} />
                <div className="blob" style={{ width: 400, height: 400, background: darkMode ? 'rgba(37,99,235,0.04)' : 'rgba(37,99,235,0.06)', bottom: '5%', right: '-5%', animationDelay: '4s' }} />
            </div>

            {/* Top Navbar */}
            <nav className={`relative flex items-center justify-between px-6 lg:px-10 h-16 border-b ${darkMode ? 'border-white/5 bg-slate-950/80' : 'border-slate-100 bg-white/80'}`} style={{ backdropFilter: 'blur(12px)', zIndex: 10 }}>
                <Link to="/" className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #9333ea, #2563eb)' }}>
                        <HiShieldCheck size={18} className="text-white" />
                    </div>
                    <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-purple-600'}`}>CertiHub</span>
                </Link>
                <div className="flex items-center gap-3">
                    <Link to="/login" className={`px-4 py-2 text-sm font-medium ${darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-800'}`}>Login</Link>
                    <Link to="/signup" className="px-5 py-2 rounded-lg text-sm font-medium text-white" style={{ background: 'linear-gradient(135deg, #9333ea, #2563eb)' }}>Sign Up</Link>
                    <motion.button whileTap={{ scale: 0.95 }} onClick={toggleTheme} className={`p-2 rounded-lg ${darkMode ? 'text-amber-400 hover:bg-white/5' : 'text-slate-500 hover:bg-slate-100'}`}>
                        {darkMode ? <HiSun size={18} /> : <HiMoon size={18} />}
                    </motion.button>
                </div>
            </nav>

            {/* Content */}
            <div className="relative flex flex-col items-center px-4 pt-12 pb-16" style={{ zIndex: 1 }}>
                {/* Brand header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                    <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, #9333ea, #2563eb)', boxShadow: '0 8px 25px rgba(147,51,234,0.3)' }}>
                        <HiShieldCheck size={28} className="text-white" />
                    </div>
                    <h1 className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>CertiHub</h1>
                    <p className={`text-sm mt-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Discover your certification path</p>
                </motion.div>

                {/* Login Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="w-full max-w-md rounded-2xl px-8 py-8"
                    style={{
                        background: darkMode ? 'rgba(15,23,42,0.7)' : '#ffffff',
                        border: `1px solid ${darkMode ? 'rgba(147,51,234,0.12)' : '#e2e8f0'}`,
                        boxShadow: darkMode ? '0 20px 50px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.05)',
                    }}>

                    <h2 className={`text-xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Welcome Back</h2>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className={labelClass}>Email Address</label>
                            <input type="email" className={inputClass} placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>

                        {/* Password */}
                        <div>
                            <label className={labelClass}>Password</label>
                            <div className="relative">
                                <input type={showPassword ? 'text' : 'password'} className={inputClass} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-slate-500 hover:text-slate-400' : 'text-slate-400 hover:text-slate-600'}`}>
                                    {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Demo hint */}
                        <div className={`flex items-start gap-2 px-4 py-3 rounded-xl text-sm ${darkMode ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20' : 'bg-purple-50 text-purple-700 border border-purple-100'}`}>
                            <span>💡</span>
                            <span>Demo: Use any email ending with "@admin.com" for admin role</span>
                        </div>

                        {/* Submit */}
                        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit"
                            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white"
                            style={{ background: 'linear-gradient(135deg, #9333ea, #2563eb)', boxShadow: '0 4px 15px rgba(147,51,234,0.3)' }}>
                            Sign In
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className={`flex-1 h-px ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
                        <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Don't have an account?</span>
                        <div className={`flex-1 h-px ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
                    </div>

                    {/* Create Account link */}
                    <Link to="/signup">
                        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="button"
                            className={`w-full py-3.5 rounded-xl text-sm font-semibold border-2 ${darkMode ? 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10' : 'border-purple-300 text-purple-600 hover:bg-purple-50'
                                }`}>
                            Create Account
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
