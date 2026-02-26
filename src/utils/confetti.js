import confetti from 'canvas-confetti';

export function fireCertificationConfetti() {
    // First burst
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#9333ea', '#2563eb', '#06b6d4', '#10b981', '#f59e0b'],
    });

    // Side shots
    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#9333ea', '#2563eb', '#06b6d4'],
        });
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#9333ea', '#2563eb', '#10b981'],
        });
    }, 250);
}

export function fireStarsConfetti() {
    const defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['star'],
        colors: ['#9333ea', '#2563eb', '#06b6d4', '#f59e0b'],
    };

    confetti({ ...defaults, particleCount: 40, scalar: 1.2 });
    confetti({ ...defaults, particleCount: 20, scalar: 0.75 });
}
