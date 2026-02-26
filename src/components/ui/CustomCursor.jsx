import { useEffect, useRef, useCallback } from 'react';

export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const glowRef = useRef(null);
    const trailRefs = useRef([]);
    const mouse = useRef({ x: -100, y: -100 });
    const pos = useRef({ x: -100, y: -100 });
    const glowPos = useRef({ x: -100, y: -100 });
    const trailPositions = useRef([]);
    const hovering = useRef(false);
    const clicking = useRef(false);
    const visible = useRef(false);
    const animId = useRef(null);

    const TRAIL_COUNT = 6;

    useEffect(() => {
        // Hide on touch devices
        if (window.matchMedia('(pointer: coarse)').matches) return;

        // Create trail dots
        trailPositions.current = Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }));

        const style = document.createElement('style');
        style.textContent = '*, *::before, *::after { cursor: none !important; }';
        document.head.appendChild(style);

        const onMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            visible.current = true;
        };
        const onDown = () => { clicking.current = true; };
        const onUp = () => { clicking.current = false; };
        const onLeave = () => { visible.current = false; };
        const onEnter = () => { visible.current = true; };

        const hoverIn = () => { hovering.current = true; };
        const hoverOut = () => { hovering.current = false; };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);
        document.addEventListener('mouseleave', onLeave);
        document.addEventListener('mouseenter', onEnter);

        const attachHover = () => {
            document.querySelectorAll('a, button, [role="button"], input, textarea, select, .cursor-pointer, [onclick]').forEach(el => {
                el.removeEventListener('mouseenter', hoverIn);
                el.removeEventListener('mouseleave', hoverOut);
                el.addEventListener('mouseenter', hoverIn);
                el.addEventListener('mouseleave', hoverOut);
            });
        };
        attachHover();
        const observer = new MutationObserver(attachHover);
        observer.observe(document.body, { childList: true, subtree: true });

        // Animation loop
        const animate = () => {
            // Lerp main ring position
            pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
            pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

            // Lerp glow position even slower
            glowPos.current.x += (mouse.current.x - glowPos.current.x) * 0.08;
            glowPos.current.y += (mouse.current.y - glowPos.current.y) * 0.08;

            // Update trail positions (each follows the previous)
            for (let i = 0; i < TRAIL_COUNT; i++) {
                const target = i === 0 ? pos.current : trailPositions.current[i - 1];
                trailPositions.current[i].x += (target.x - trailPositions.current[i].x) * (0.3 - i * 0.03);
                trailPositions.current[i].y += (target.y - trailPositions.current[i].y) * (0.3 - i * 0.03);
            }

            const show = visible.current;
            const hover = hovering.current;
            const click = clicking.current;

            // Dot (follows mouse directly — snappy)
            if (dotRef.current) {
                const d = dotRef.current;
                d.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%) scale(${click ? 1.8 : 1})`;
                d.style.opacity = show ? '1' : '0';
                d.style.width = d.style.height = hover ? '6px' : '5px';
            }

            // Ring (follows with lag — smooth)
            if (ringRef.current) {
                const r = ringRef.current;
                const size = hover ? 52 : click ? 24 : 36;
                r.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
                r.style.width = r.style.height = `${size}px`;
                r.style.opacity = show ? '1' : '0';
                r.style.borderColor = hover ? 'rgba(147, 51, 234, 0.8)' : 'rgba(147, 51, 234, 0.35)';
                r.style.background = hover ? 'radial-gradient(circle, rgba(147,51,234,0.08) 0%, transparent 70%)' : 'transparent';
            }

            // Glow Aura (massive soft blur tracking cursor)
            if (glowRef.current) {
                glowRef.current.style.transform = `translate(${glowPos.current.x}px, ${glowPos.current.y}px) translate(-50%, -50%) scale(${click ? 0.8 : hover ? 1.2 : 1})`;
                glowRef.current.style.opacity = show ? '1' : '0';
            }

            // Trail dots
            trailRefs.current.forEach((el, i) => {
                if (!el) return;
                const tp = trailPositions.current[i];
                const opacity = show ? (1 - (i + 1) / (TRAIL_COUNT + 1)) * 0.5 : 0;
                const sz = Math.max(2, 4 - i * 0.4);
                el.style.transform = `translate(${tp.x}px, ${tp.y}px) translate(-50%, -50%)`;
                el.style.width = el.style.height = `${sz}px`;
                el.style.opacity = `${opacity}`;
            });

            animId.current = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animId.current);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
            document.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('mouseenter', onEnter);
            observer.disconnect();
            style.remove();
        };
    }, []);

    // Don't render on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    const baseStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        transition: 'width 0.2s, height 0.2s, border-color 0.2s, opacity 0.2s, background 0.2s',
    };

    return (
        <>
            {/* Main Glowing Aura (Lowest z-index) */}
            <div ref={glowRef} style={{
                ...baseStyle,
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(99,102,241,0.1) 40%, rgba(99,102,241,0) 70%)',
                filter: 'blur(20px)',
                zIndex: 99990,
                willChange: 'transform, opacity, scale',
            }} />

            {/* Ring */}
            <div ref={ringRef} style={{
                ...baseStyle,
                borderRadius: '50%',
                border: '1.5px solid rgba(147,51,234,0.35)',
                boxShadow: '0 0 12px rgba(147,51,234,0.1)',
                willChange: 'transform, width, height',
            }} />

            {/* Trail dots */}
            {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
                <div key={i} ref={el => trailRefs.current[i] = el} style={{
                    ...baseStyle,
                    borderRadius: '50%',
                    background: `rgba(147, 51, 234, ${0.6 - i * 0.08})`,
                    zIndex: 99998 - i,
                    willChange: 'transform',
                }} />
            ))}

            {/* Dot */}
            <div ref={dotRef} style={{
                ...baseStyle,
                zIndex: 100000,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #9333ea, #2563eb)',
                boxShadow: '0 0 6px rgba(147,51,234,0.5)',
                willChange: 'transform',
            }} />
        </>
    );
}
