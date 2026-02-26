import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

export default function FloatingBackground() {
    const { darkMode } = useTheme();

    if (darkMode) {
        return (
            <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
                <div className="blob" style={{ width: 400, height: 400, background: 'rgba(147,51,234,0.08)', top: '-5%', left: '-5%' }} />
                <div className="blob" style={{ width: 350, height: 350, background: 'rgba(37,99,235,0.06)', bottom: '10%', right: '-5%', animationDelay: '4s' }} />
                <div className="blob" style={{ width: 250, height: 250, background: 'rgba(147,51,234,0.05)', top: '40%', right: '20%', animationDelay: '8s' }} />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
            <div className="blob" style={{ width: 500, height: 500, background: 'rgba(147,51,234,0.08)', top: '-10%', left: '-8%' }} />
            <div className="blob" style={{ width: 400, height: 400, background: 'rgba(37,99,235,0.06)', bottom: '5%', right: '-5%', animationDelay: '4s' }} />
            <div className="blob" style={{ width: 300, height: 300, background: 'rgba(147,51,234,0.04)', top: '30%', right: '15%', animationDelay: '8s' }} />
        </div>
    );
}
