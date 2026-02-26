import { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export default function ParticleField() {
    const canvasRef = useRef(null);
    const { darkMode } = useTheme();
    const animFrameRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        resize();
        window.addEventListener('resize', resize);

        // Create particles
        const particleCount = Math.min(60, Math.floor(width * height / 25000));
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.1,
            hue: Math.random() > 0.5 ? 270 : 220, // purple or blue
        }));

        let mouseX = -1000;
        let mouseY = -1000;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        window.addEventListener('mousemove', onMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            const particles = particlesRef.current;
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Mouse interaction - gentle repulsion
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const force = (150 - dist) / 150 * 0.5;
                    p.vx += (dx / dist) * force * 0.1;
                    p.vy += (dy / dist) * force * 0.1;
                }

                // Damping
                p.vx *= 0.99;
                p.vy *= 0.99;

                // Draw particle
                const alpha = darkMode ? p.opacity * 0.6 : p.opacity * 0.4;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 70%, ${darkMode ? 70 : 50}%, ${alpha})`;
                ctx.fill();

                // Connect nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
                    if (d < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        const lineAlpha = (1 - d / 120) * (darkMode ? 0.12 : 0.06);
                        ctx.strokeStyle = `hsla(${p.hue}, 60%, ${darkMode ? 60 : 40}%, ${lineAlpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, [darkMode]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
}
