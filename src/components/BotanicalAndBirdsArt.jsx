import React, { useEffect, useRef } from 'react';

export function LoveBirdsPair({ className = '', size = 'md', showHeart = true }) {
  const dimensions =
    size === 'lg'
      ? 'w-64 h-28'
      : size === 'sm'
      ? 'w-36 h-16'
      : 'w-52 h-24';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none pointer-events-none ${dimensions} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-[0_6px_14px_rgba(138,96,18,0.24)]"
      >
        <defs>
          <linearGradient id="goldBirdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#825910" />
            <stop offset="30%" stopColor="#B88A28" />
            <stop offset="55%" stopColor="#E6BD5A" />
            <stop offset="80%" stopColor="#A87B1E" />
            <stop offset="100%" stopColor="#7A530E" />
          </linearGradient>
          <linearGradient id="goldWingSoft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF9" stopOpacity="0.96" />
            <stop offset="50%" stopColor="#ECCB7C" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#B38728" stopOpacity="0.96" />
          </linearGradient>
        </defs>

        {/* Decorative Floral Garland Arch Connecting the Two Love Birds */}
        <path
          d="M 45 98 Q 160 128 275 98"
          stroke="url(#goldBirdGrad)"
          strokeWidth="1.6"
          strokeDasharray="3 3"
          fill="none"
          opacity="0.85"
        />
        <path
          d="M 70 102 Q 160 118 250 102"
          stroke="url(#goldBirdGrad)"
          strokeWidth="1.2"
          fill="none"
          opacity="0.65"
        />

        {/* Little Floral Leaves Along the Vine */}
        <g fill="url(#goldBirdGrad)" opacity="0.9">
          <ellipse cx="110" cy="108" rx="6" ry="2.5" transform="rotate(15 110 108)" />
          <ellipse cx="135" cy="111" rx="6" ry="2.5" transform="rotate(-12 135 111)" />
          <ellipse cx="185" cy="111" rx="6" ry="2.5" transform="rotate(12 185 111)" />
          <ellipse cx="210" cy="108" rx="6" ry="2.5" transform="rotate(-15 210 108)" />
          <circle cx="160" cy="112" r="4.2" />
        </g>

        {/* Left Love Bird (Facing Right) */}
        <g className="animate-bird-left">
          <path
            d="M 48 76 C 28 84, 18 96, 26 101 C 36 99, 48 90, 58 82 Z"
            fill="url(#goldWingSoft)"
            stroke="url(#goldBirdGrad)"
            strokeWidth="1.4"
          />
          <g className="animate-wing">
            <path
              d="M 74 58 C 52 24, 24 22, 32 48 C 38 62, 56 68, 72 68 Z"
              fill="url(#goldWingSoft)"
              stroke="url(#goldBirdGrad)"
              strokeWidth="1.5"
            />
            <path
              d="M 68 52 C 50 32, 34 34, 40 50"
              stroke="url(#goldBirdGrad)"
              strokeWidth="1.2"
              fill="none"
            />
          </g>
          <path
            d="M 52 78 C 62 88, 88 86, 102 72 C 110 64, 114 50, 108 42 C 103 36, 93 36, 89 43 C 85 50, 78 58, 64 62 C 56 64, 48 72, 52 78 Z"
            fill="url(#goldBirdGrad)"
          />
          <path
            d="M 64 66 C 50 42, 38 44, 48 64 C 54 72, 68 74, 78 70"
            fill="url(#goldWingSoft)"
            stroke="url(#goldBirdGrad)"
            strokeWidth="1.3"
          />
          <path
            d="M 96 37 Q 88 25 82 29 M 99 36 Q 94 22 88 24"
            stroke="url(#goldBirdGrad)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="103" cy="45" r="1.7" fill="#281D12" />
          <path d="M 111 46 L 122 49 L 111 51 Z" fill="#7A530E" />
          <path
            d="M 120 49 Q 134 56 142 68"
            stroke="url(#goldBirdGrad)"
            strokeWidth="1.4"
            fill="none"
          />
          <ellipse cx="131" cy="54" rx="4.5" ry="2" transform="rotate(-25 131 54)" fill="url(#goldBirdGrad)" />
          <ellipse cx="137" cy="61" rx="4.5" ry="2" transform="rotate(20 137 61)" fill="url(#goldBirdGrad)" />
        </g>

        {/* Center Floating Sacred Golden Heart & Starburst */}
        {showHeart && (
          <g className="animate-float-slow">
            <path
              d="M 160 56 C 160 50, 151 45, 146 50 C 141 55, 146 63, 160 72 C 174 63, 179 55, 174 50 C 169 45, 160 50, 160 56 Z"
              fill="url(#goldBirdGrad)"
            />
            <path
              d="M 160 22 L 162 30 L 170 32 L 162 34 L 160 42 L 158 34 L 150 32 L 158 30 Z"
              fill="url(#goldBirdGrad)"
              opacity="0.9"
            />
            <circle cx="160" cy="32" r="14" stroke="url(#goldBirdGrad)" strokeWidth="0.9" strokeDasharray="2 2" opacity="0.7" />
          </g>
        )}

        {/* Right Love Bird (Mirrored, Facing Left) */}
        <g className="animate-bird-right">
          <g transform="translate(320, 0) scale(-1, 1)">
            <path
              d="M 48 76 C 28 84, 18 96, 26 101 C 36 99, 48 90, 58 82 Z"
              fill="url(#goldWingSoft)"
              stroke="url(#goldBirdGrad)"
              strokeWidth="1.4"
            />
            <g className="animate-wing">
              <path
                d="M 74 58 C 52 24, 24 22, 32 48 C 38 62, 56 68, 72 68 Z"
                fill="url(#goldWingSoft)"
                stroke="url(#goldBirdGrad)"
                strokeWidth="1.5"
              />
              <path
                d="M 68 52 C 50 32, 34 34, 40 50"
                stroke="url(#goldBirdGrad)"
                strokeWidth="1.2"
                fill="none"
              />
            </g>
            <path
              d="M 52 78 C 62 88, 88 86, 102 72 C 110 64, 114 50, 108 42 C 103 36, 93 36, 89 43 C 85 50, 78 58, 64 62 C 56 64, 48 72, 52 78 Z"
              fill="url(#goldBirdGrad)"
            />
            <path
              d="M 64 66 C 50 42, 38 44, 48 64 C 54 72, 68 74, 78 70"
              fill="url(#goldWingSoft)"
              stroke="url(#goldBirdGrad)"
              strokeWidth="1.3"
            />
            <path
              d="M 96 37 Q 88 25 82 29 M 99 36 Q 94 22 88 24"
              stroke="url(#goldBirdGrad)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx="103" cy="45" r="1.7" fill="#281D12" />
            <path d="M 111 46 L 122 49 L 111 51 Z" fill="#7A530E" />
            <path
              d="M 120 49 Q 134 56 142 68"
              stroke="url(#goldBirdGrad)"
              strokeWidth="1.4"
              fill="none"
            />
            <ellipse cx="131" cy="54" rx="4.5" ry="2" transform="rotate(-25 131 54)" fill="url(#goldBirdGrad)" />
            <ellipse cx="137" cy="61" rx="4.5" ry="2" transform="rotate(20 137 61)" fill="url(#goldBirdGrad)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export function FloralCornerOrnament({ position = 'top-left', size = 'lg', className = '' }) {
  const rotationMap = {
    'top-left': 'rotate-0',
    'top-right': 'scale-x-[-1]',
    'bottom-left': 'scale-y-[-1]',
    'bottom-right': 'scale-[-1]',
  };

  const sizeClasses =
    size === 'sm'
      ? 'w-14 h-14 sm:w-16 sm:h-16'
      : size === 'md'
      ? 'w-20 h-20 sm:w-24 sm:h-24'
      : 'w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44';

  return (
    <div
      className={`pointer-events-none select-none ${rotationMap[position] || ''} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses} opacity-95`}
      >
        <defs>
          <linearGradient id="cornerGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#825910" />
            <stop offset="40%" stopColor="#B88A28" />
            <stop offset="70%" stopColor="#E2B954" />
            <stop offset="100%" stopColor="#7A530E" />
          </linearGradient>
        </defs>

        {/* Outer Corner Filigree Frame Lines */}
        <path
          d="M 6 168 L 6 22 Q 6 6 22 6 L 168 6"
          stroke="url(#cornerGoldGrad)"
          strokeWidth="2.6"
          fill="none"
        />
        <path
          d="M 15 148 L 15 28 Q 15 15 28 15 L 148 15"
          stroke="url(#cornerGoldGrad)"
          strokeWidth="1.3"
          strokeDasharray="4 3"
          fill="none"
        />

        {/* Corner Royal Arch Medallion */}
        <path
          d="M 6 58 Q 32 32 58 6"
          stroke="url(#cornerGoldGrad)"
          strokeWidth="1.6"
          fill="none"
        />

        {/* Blooming Corner Rose */}
        <g transform="translate(34, 34)">
          <circle cx="0" cy="0" r="16" fill="#FFFDF9" stroke="url(#cornerGoldGrad)" strokeWidth="1.8" />
          <path
            d="M -10 -4 C -4 -14, 8 -14, 11 -3 C 14 7, 3 14, -7 10 C -14 6, -12 -6, -3 -8 C 4 -10, 8 -2, 3 4 C -1 8, -6 4, -4 -1"
            stroke="url(#cornerGoldGrad)"
            strokeWidth="1.7"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="0" cy="0" r="2.8" fill="url(#cornerGoldGrad)" />
        </g>

        {/* Botanical Sweeping Vines Horizontal */}
        <path
          d="M 50 32 C 78 18, 108 42, 152 22"
          stroke="url(#cornerGoldGrad)"
          strokeWidth="1.7"
          fill="none"
        />
        {/* Botanical Sweeping Vines Vertical */}
        <path
          d="M 32 50 C 18 78, 42 108, 22 152"
          stroke="url(#cornerGoldGrad)"
          strokeWidth="1.7"
          fill="none"
        />
        {/* Diagonal Inner Vine Tendril */}
        <path
          d="M 46 46 C 66 66, 72 86, 92 92"
          stroke="url(#cornerGoldGrad)"
          strokeWidth="1.3"
          strokeDasharray="2 2"
          fill="none"
        />

        {/* Golden Leaves & Jasmine Buds */}
        <g fill="url(#cornerGoldGrad)">
          <ellipse cx="75" cy="24" rx="8" ry="3.4" transform="rotate(-18 75 24)" />
          <ellipse cx="102" cy="33" rx="7" ry="3" transform="rotate(22 102 33)" />
          <ellipse cx="128" cy="23" rx="6.5" ry="2.6" transform="rotate(-15 128 23)" />

          <ellipse cx="24" cy="75" rx="3.4" ry="8" transform="rotate(18 24 75)" />
          <ellipse cx="33" cy="102" rx="3" ry="7" transform="rotate(-22 33 102)" />
          <ellipse cx="23" cy="128" rx="2.6" ry="6.5" transform="rotate(15 23 128)" />

          <circle cx="64" cy="64" r="3.8" />
          <circle cx="92" cy="92" r="2.8" />
        </g>
      </svg>
    </div>
  );
}

/**
 * Reusable 4-Corner Premium Royal Filigree Wrapper for all section boxes and inner cards
 */
export function PremiumBoxCorners({ size = 'md', offset = 'inset-1.5' }) {
  return (
    <div className={`absolute ${offset} pointer-events-none select-none z-10`} aria-hidden="true">
      <FloralCornerOrnament position="top-left" size={size} className="absolute top-0 left-0" />
      <FloralCornerOrnament position="top-right" size={size} className="absolute top-0 right-0" />
      <FloralCornerOrnament position="bottom-left" size={size} className="absolute bottom-0 left-0" />
      <FloralCornerOrnament position="bottom-right" size={size} className="absolute bottom-0 right-0" />
    </div>
  );
}

export function RoyalDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center my-6 select-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 420 36" fill="none" className="w-64 sm:w-80 h-8">
        <defs>
          <linearGradient id="divGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B88A28" stopOpacity="0" />
            <stop offset="25%" stopColor="#B88A28" />
            <stop offset="50%" stopColor="#825910" />
            <stop offset="75%" stopColor="#B88A28" />
            <stop offset="100%" stopColor="#B88A28" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="10" y1="18" x2="165" y2="18" stroke="url(#divGold)" strokeWidth="1.5" />
        <line x1="255" y1="18" x2="410" y2="18" stroke="url(#divGold)" strokeWidth="1.5" />
        <path
          d="M 175 18 C 185 8, 195 8, 210 18 C 225 8, 235 8, 245 18 C 235 28, 225 28, 210 18 C 195 28, 185 28, 175 18 Z"
          stroke="#9E711B"
          strokeWidth="1.5"
          fill="#FFFDF9"
        />
        <circle cx="210" cy="18" r="4.2" fill="#B88A28" />
        <circle cx="165" cy="18" r="2.8" fill="#9E711B" />
        <circle cx="255" cy="18" r="2.8" fill="#9E711B" />
      </svg>
    </div>
  );
}

/**
 * Full-screen Flower Sprinkle + Royal Fireworks Celebration Canvas
 * Runs when the curtains open, then triggers the Quranic Tilawat after fireworks finish.
 */
export function FlowerSprinkleAndFireworksOverlay({ active, showFireworksBanner }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const flowerColors = [
      { fill: '#FFFDF9', stroke: '#B38728' }, // Ivory Jasmine
      { fill: '#FAD2CC', stroke: '#B84A39' }, // Soft Blush Rose
      { fill: '#F0C45D', stroke: '#8A6012' }, // Marigold Gold
      { fill: '#E3A83B', stroke: '#7A530E' }, // Royal Amber Petal
    ];

    const flowers = Array.from({ length: 85 }, () => {
      const palette = flowerColors[Math.floor(Math.random() * flowerColors.length)];
      return {
        x: Math.random() * canvas.width,
        y: -Math.random() * canvas.height * 0.85 - 20,
        size: Math.random() * 9 + 6,
        speedY: Math.random() * 3.2 + 2.0,
        speedX: (Math.random() - 0.5) * 2.2,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.06,
        isFullFlower: Math.random() > 0.45,
        fill: palette.fill,
        stroke: palette.stroke,
        opacity: 0.95,
      };
    });

    const sparks = [];
    const fireworkPalettes = [
      ['#FFD700', '#D4A942', '#FFF3B0', '#B38728'],
      ['#FFB703', '#FB8500', '#FFFDF9', '#C69A32'],
      ['#E63946', '#FFB703', '#FFFDF9', '#D4AF37'],
      ['#F4A261', '#E9C46A', '#FFFDF9', '#B38728'],
    ];

    const spawnFireworkBurst = (cx, cy) => {
      const colors = fireworkPalettes[Math.floor(Math.random() * fireworkPalettes.length)];
      const count = 68;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.1;
        const speed = Math.random() * 6.5 + 2.2;
        sparks.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[i % colors.length],
          alpha: 1,
          decay: Math.random() * 0.014 + 0.011,
          size: Math.random() * 2.8 + 1.5,
        });
      }
    };

    const burstSchedule = [
      { delay: 200, xRatio: 0.5, yRatio: 0.28 },
      { delay: 650, xRatio: 0.26, yRatio: 0.34 },
      { delay: 1100, xRatio: 0.74, yRatio: 0.32 },
      { delay: 1550, xRatio: 0.38, yRatio: 0.24 },
      { delay: 2000, xRatio: 0.64, yRatio: 0.26 },
      { delay: 2450, xRatio: 0.22, yRatio: 0.40 },
      { delay: 2850, xRatio: 0.78, yRatio: 0.38 },
      { delay: 3200, xRatio: 0.5, yRatio: 0.22 },
    ];

    const timers = burstSchedule.map((b) =>
      setTimeout(() => {
        spawnFireworkBurst(canvas.width * b.xRatio, canvas.height * b.yRatio);
      }, b.delay)
    );

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      flowers.forEach((f) => {
        f.y += f.speedY;
        f.x += f.speedX + Math.sin(f.angle) * 0.8;
        f.angle += f.spin;

        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.angle);
        ctx.globalAlpha = f.opacity;

        if (f.isFullFlower) {
          for (let p = 0; p < 5; p++) {
            ctx.save();
            ctx.rotate((Math.PI * 2 * p) / 5);
            ctx.beginPath();
            ctx.ellipse(0, -f.size * 0.65, f.size * 0.42, f.size * 0.68, 0, 0, Math.PI * 2);
            ctx.fillStyle = f.fill;
            ctx.fill();
            ctx.strokeStyle = f.stroke;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.restore();
          }
          ctx.beginPath();
          ctx.arc(0, 0, f.size * 0.28, 0, Math.PI * 2);
          ctx.fillStyle = '#B38728';
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(f.size, -f.size, f.size * 1.4, f.size * 0.6, 0, f.size * 1.4);
          ctx.bezierCurveTo(-f.size * 1.4, f.size * 0.6, -f.size, -f.size, 0, 0);
          ctx.fillStyle = f.fill;
          ctx.fill();
          ctx.strokeStyle = f.stroke;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        ctx.restore();
      });

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.065;
        s.vx *= 0.985;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
      timers.forEach(clearTimeout);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
      {showFireworksBanner && (
        <div className="absolute top-8 inset-x-0 flex justify-center px-4 animate-bounce">
          <div className="px-6 py-2.5 rounded-full gold-foil-bg text-ivory-pearl font-display text-xs sm:text-sm uppercase tracking-[0.22em] shadow-royal-lg border-2 border-ivory-pearl">
            ✨ Royal Fireworks &amp; Floral Shower — Preparing Sacred Tilawat ✨
          </div>
        </div>
      )}
    </div>
  );
}

export function AmbientGoldPetalCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 34 }, (_, idx) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: idx % 3 === 0 ? Math.random() * 5 + 4 : Math.random() * 2.5 + 1.2,
      isPetal: idx % 3 === 0,
      speedY: Math.random() * 0.45 + 0.18,
      speedX: (Math.random() - 0.5) * 0.35,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.015,
      opacity: Math.random() * 0.45 + 0.25,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.angle) * 0.22;
        p.angle += p.spin;

        if (p.y > canvas.height + 20) {
          p.y = -15;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 20) p.x = -15;
        if (p.x < -20) p.x = canvas.width + 15;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.opacity;

        if (p.isPetal) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(p.size, -p.size, p.size * 1.6, p.size * 0.6, 0, p.size * 1.5);
          ctx.bezierCurveTo(-p.size * 1.6, p.size * 0.6, -p.size, -p.size, 0, 0);
          const grad = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
          grad.addColorStop(0, '#FFFDF9');
          grad.addColorStop(0.5, '#E8C574');
          grad.addColorStop(1, '#B38728');
          ctx.fillStyle = grad;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = '#C69A32';
          ctx.shadowColor = '#C69A32';
          ctx.shadowBlur = 6;
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden="true"
    />
  );
}
