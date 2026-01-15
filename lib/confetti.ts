import confetti from 'canvas-confetti';

export function triggerLikeConfetti() {
  const duration = 2000;
  const end = Date.now() + duration;

  const interval = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      return;
    }

    confetti({
      particleCount: 3,
      startVelocity: 30,
      spread: 60,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.5, // Top half of screen
      },
      colors: ['#22c55e', '#16a34a', '#15803d'], // Green shades
    });
  }, 200);

  // Fire a few bursts
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0.5, y: 0.3 },
      colors: ['#22c55e', '#16a34a'],
    });
  }, 100);

  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 0.5, y: 0.3 },
      colors: ['#22c55e', '#16a34a'],
    });
  }, 300);
}
