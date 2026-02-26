import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChat, HiX, HiPaperAirplane } from 'react-icons/hi';
import { useTheme } from '../../contexts/ThemeContext';

const botResponses = [
    "I can help you track your certification deadlines! 📅",
    "Need help finding the right certification path? Let me guide you! 🎯",
    "Pro tip: Set renewal reminders 3 months before expiry to stay ahead! ⏰",
    "Your AWS Solutions Architect cert is expiring soon — want me to help schedule a renewal? 🔄",
    "I can analyze your certification portfolio and suggest what to pursue next! 📊",
    "Looking to advance your career? CompTIA Security+ is trending in your field! 🚀",
    "Did you know? CertiHub tracks all major certification providers including AWS, Azure, Google Cloud, and more! ☁️",
    "I can generate a PDF report of your certification portfolio anytime! 📄",
];

export default function FloatingChatbot() {
    const { darkMode } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: "Hi! 👋 I'm CertiBot, your AI certification assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => { scrollToBottom(); }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        const userMsg = { id: Date.now(), type: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const response = botResponses[Math.floor(Math.random() * botResponses.length)];
            setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: response }]);
            setIsTyping(false);
        }, 1200 + Math.random() * 800);
    };

    return (
        <div className="fixed bottom-6 right-6" style={{ zIndex: 9998 }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="mb-4 w-80 sm:w-96 rounded-2xl overflow-hidden flex flex-col"
                        style={{
                            height: 460,
                            background: darkMode ? 'rgba(15,23,42,0.95)' : '#ffffff',
                            border: `1px solid ${darkMode ? 'rgba(147,51,234,0.2)' : '#e2e8f0'}`,
                            boxShadow: darkMode ? '0 20px 60px rgba(0,0,0,0.5)' : '0 20px 60px rgba(0,0,0,0.12)',
                            backdropFilter: 'blur(20px)',
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4" style={{ background: 'linear-gradient(135deg, #9333ea, #2563eb)' }}>
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                                    <span className="text-lg">🤖</span>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white">CertiBot AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-xs text-white/70">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10">
                                <HiX size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ scrollbarWidth: 'thin' }}>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.type === 'user'
                                            ? 'text-white rounded-br-md'
                                            : darkMode
                                                ? 'bg-slate-800 text-slate-200 rounded-bl-md'
                                                : 'bg-slate-100 text-slate-700 rounded-bl-md'
                                        }`}
                                        style={msg.type === 'user' ? { background: 'linear-gradient(135deg, #9333ea, #2563eb)' } : {}}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                    <div className={`px-4 py-3 rounded-2xl rounded-bl-md ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                                        <div className="flex gap-1.5">
                                            {[0, 1, 2].map(i => (
                                                <motion.div key={i}
                                                    animate={{ y: [0, -6, 0] }}
                                                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                                                    className="w-2 h-2 rounded-full"
                                                    style={{ background: 'linear-gradient(135deg, #9333ea, #2563eb)' }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className={`px-4 py-3 border-t ${darkMode ? 'border-white/5' : 'border-slate-100'}`}>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask CertiBot anything..."
                                    className={`flex-1 px-4 py-2.5 rounded-xl text-sm outline-none transition-all ${darkMode
                                            ? 'bg-slate-800 text-white placeholder:text-slate-500 focus:ring-1 focus:ring-purple-500'
                                            : 'bg-slate-50 text-slate-700 placeholder:text-slate-400 focus:ring-1 focus:ring-purple-500'
                                        }`}
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSend}
                                    className="p-2.5 rounded-xl text-white"
                                    style={{ background: 'linear-gradient(135deg, #9333ea, #2563eb)' }}
                                >
                                    <HiPaperAirplane size={16} className="rotate-90" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FAB Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg relative"
                style={{
                    background: 'linear-gradient(135deg, #9333ea, #2563eb)',
                    boxShadow: '0 8px 30px rgba(147,51,234,0.4)',
                }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <HiX size={22} />
                        </motion.div>
                    ) : (
                        <motion.div key="chat" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <HiChat size={22} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pulse ring */}
                {!isOpen && (
                    <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full"
                        style={{ border: '2px solid rgba(147,51,234,0.5)' }}
                    />
                )}
            </motion.button>
        </div>
    );
}
