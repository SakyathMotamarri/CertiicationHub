import { useTheme } from '../../contexts/ThemeContext';

export default function StatusBadge({ status }) {
    const { darkMode } = useTheme();
    const config = {
        active: { label: 'Active', bg: 'rgba(16,185,129,0.15)', text: '#34d399', border: 'rgba(16,185,129,0.3)', glow: '0 0 10px rgba(16,185,129,0.3)' },
        expiring: { label: 'Expiring Soon', bg: 'rgba(245,158,11,0.15)', text: '#fbbf24', border: 'rgba(245,158,11,0.3)', glow: '0 0 10px rgba(245,158,11,0.3)' },
        expired: { label: 'Expired', bg: 'rgba(239,68,68,0.15)', text: '#f87171', border: 'rgba(239,68,68,0.3)', glow: '0 0 10px rgba(239,68,68,0.3)' },
        pending: { label: 'Pending', bg: 'rgba(99,102,241,0.15)', text: '#818cf8', border: 'rgba(99,102,241,0.3)', glow: '0 0 10px rgba(99,102,241,0.3)' },
        approved: { label: 'Approved', bg: 'rgba(16,185,129,0.15)', text: '#34d399', border: 'rgba(16,185,129,0.3)', glow: '0 0 10px rgba(16,185,129,0.3)' },
        rejected: { label: 'Rejected', bg: 'rgba(239,68,68,0.15)', text: '#f87171', border: 'rgba(239,68,68,0.3)', glow: '0 0 10px rgba(239,68,68,0.3)' },
    };
    const c = config[status] || config.active;

    return (
        <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{
                background: c.bg,
                color: c.text,
                border: `1px solid ${c.border}`,
                boxShadow: c.glow,
            }}
        >
            <span className="w-1.5 h-1.5 rounded-full pulse-ring" style={{ background: c.text }} />
            {c.label}
        </span>
    );
}
