import { useEffect, useRef, useState, useMemo } from 'react';
import aboutBg from '../assets/images/Main shot.jpg';

/**
 * Generate an organic wave SVG path using the parametric equation:
 * y(x) = A * sin(B * x) * (1 + C * sin(D * x))
 *
 * This produces variable-amplitude peaks — stronger in the middle, organic feel.
 */
/**
 * Catmull-Rom spline interpolation for smooth envelope.
 * controlPoints: array of [t, multiplier] pairs, sorted by t.
 */
function interpolateEnvelope(t: number, controlPoints: [number, number][]): number {
  const n = controlPoints.length;
  if (t <= controlPoints[0][0]) return controlPoints[0][1];
  if (t >= controlPoints[n - 1][0]) return controlPoints[n - 1][1];

  // Find the segment
  let idx = 0;
  for (let i = 0; i < n - 1; i++) {
    if (t >= controlPoints[i][0] && t <= controlPoints[i + 1][0]) {
      idx = i;
      break;
    }
  }

  // Four points for Catmull-Rom: p0, p1, p2, p3
  const p0 = controlPoints[Math.max(0, idx - 1)][1];
  const p1 = controlPoints[idx][1];
  const p2 = controlPoints[Math.min(n - 1, idx + 1)][1];
  const p3 = controlPoints[Math.min(n - 1, idx + 2)][1];

  const t0 = controlPoints[idx][0];
  const t1 = controlPoints[Math.min(n - 1, idx + 1)][0];
  const ratio = (t - t0) / (t1 - t0);
  const r2 = ratio * ratio;
  const r3 = r2 * ratio;

  // Catmull-Rom formula
  return 0.5 * (
    (2 * p1) +
    (-p0 + p2) * ratio +
    (2 * p0 - 5 * p1 + 4 * p2 - p3) * r2 +
    (-p0 + 3 * p1 - 3 * p2 + p3) * r3
  );
}

function generateWavePath(
  width: number,
  centerY: number,
  baseAmp: number,
  steps: number,
  flip: boolean = false
): string {
  const points: string[] = [];

  // 4.5 cycles
  const freq = (9 * Math.PI) / 1000;

  // PeakPoints — center peak dominates, Catmull-Rom makes it smooth
  const peakPoints: [number, number][] = [
    [25, 0.6],      // بداية
    [55.6, 1],     // قمة 1
    [166.7, 1],  // قاع 1
    [277.8, 1.3],  // قمة 2
    [388.9, 2.4],  // قاع 2
    [500, 9.75],   // قمة 3 (المنتصف — أعلى قمة × 1.5)
    [611.1, 2.4],  // قاع 3
    [722.2, 1.3],  // قمة 4
    [833.3, 1],  // قاع 4
    [944.4, 1],    // قمة 5
    [1000, 0.6],   // نهاية
  ];

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 1000;
    const x = (i / steps) * width;

    const envelope = interpolateEnvelope(t, peakPoints);
    const wave = baseAmp * envelope * Math.sin(freq * t);
    const y = flip ? centerY + wave : centerY - wave;

    points.push(i === 0 ? `M${x.toFixed(2)} ${y.toFixed(2)}` : `L${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return points.join(' ');
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Generate wave path data — memoized so it doesn't recalculate on every render
  const { topWavePath, bottomWavePath, outerTopPath, outerBottomPath } = useMemo(() => {
    const W = 800;
    const CENTER = 80;
    const BASE_AMP = 15;
    const STEPS = 3000;

    const top = generateWavePath(W, CENTER, BASE_AMP, STEPS, false);
    const bottom = generateWavePath(W, CENTER, BASE_AMP, STEPS, true);

    // Outer wave: 1.5 cycles, only center peak + 2 tiny troughs, wider
    const outerFreq = (3 * Math.PI) / 1000; // 1.5 cycles — much wider
    const outerPeakPoints: [number, number][] = [
      [0, 0],
      [100, 0],
      [250, 0.3],   // قاع صغير يسار
      [500, 6],     // قمة عريضة في النص
      [750, 0.3],   // قاع صغير يمين
      [900, 0],
      [1000, 0],
    ];
    const outerSteps = 2000;

    // Generate outer wave paths — only center portion (t: 200-800)
    const outerTopPts: string[] = [];
    const outerBotPts: string[] = [];
    const tStart = 200;
    const tEnd = 800;
    let started = false;
    for (let i = 0; i <= outerSteps; i++) {
      const t = (i / outerSteps) * 1000;
      if (t < tStart || t > tEnd) continue;
      const x = (i / outerSteps) * W;
      const envelope = interpolateEnvelope(t, outerPeakPoints);
      const wave = BASE_AMP * envelope * Math.sin(outerFreq * t);
      const yTop = CENTER - wave;
      const yBot = CENTER + wave;
      if (!started) {
        outerTopPts.push(`M${x.toFixed(2)} ${yTop.toFixed(2)}`);
        outerBotPts.push(`M${x.toFixed(2)} ${yBot.toFixed(2)}`);
        started = true;
      } else {
        outerTopPts.push(`L${x.toFixed(2)} ${yTop.toFixed(2)}`);
        outerBotPts.push(`L${x.toFixed(2)} ${yBot.toFixed(2)}`);
      }
    }

    return {
      topWavePath: top,
      bottomWavePath: bottom,
      outerTopPath: outerTopPts.join(' '),
      outerBottomPath: outerBotPts.join(' '),
    };
  }, []);

  // Repeating text for the wave paths
  const journeyText = 'a self-expression journey – '.repeat(12);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={aboutBg}
          alt="About background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 w-full max-w-6xl mx-auto px-8 py-24 md:py-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
      >
        {/* ─── Top: Outer Wave + Wave + "About Us" + Mirrored Wave + Outer Wave ─── */}
        <div className="flex flex-col items-center mb-20 md:mb-28">

          {/* Outer upper wave — wider, just center peak */}
          <div className="w-full max-w-lg mb-2">
            <svg
              viewBox="0 0 800 160"
              className="w-full overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <path id="outerWaveTop" d={outerBottomPath} fill="none" />
              </defs>
              <text
                fill="#FFFFFF"
                opacity="1"
                style={{
                  fontFamily: "'Gambetta', serif",
                  fontWeight: 700,
                  fontStyle: 'italic',
                  fontSize: '22px',
                  letterSpacing: '0.05em',
                }}
              >
                <textPath href="#outerWaveTop" startOffset="0%">
                  {journeyText}
                </textPath>
              </text>
            </svg>
          </div>

          {/* Upper wave — text along path */}
          <div className="w-full max-w-lg">
            <svg
              viewBox="0 0 800 160"
              className="w-full overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <path id="waveTop" d={topWavePath} fill="none" />
              </defs>
              <text
                fill="#FFFFFF"
                opacity="1"
                style={{
                  fontFamily: "'Gambetta', serif",
                  fontWeight: 700,
                  fontStyle: 'italic',
                  fontSize: '22px',
                  letterSpacing: '0.05em',
                }}
              >
                <textPath href="#waveTop" startOffset="0%">
                  {journeyText}
                </textPath>
              </text>
            </svg>
          </div>

          {/* "About Us" title */}
          <h2
            className="text-center text-5xl md:text-6xl lg:text-7xl text-[#E6F0F0] font-light tracking-wider my-4"
            style={{ fontFamily: "'Gambarino', serif" }}
          >
            About Us
          </h2>

          {/* Lower wave (mirrored) — text along path */}
          <div className="w-full max-w-lg">
            <svg
              viewBox="0 0 800 160"
              className="w-full overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <path id="waveBottom" d={bottomWavePath} fill="none" />
              </defs>
              <text
                fill="#FFFFFF"
                opacity="1"
                style={{
                  fontFamily: "'Gambetta', serif",
                  fontWeight: 700,
                  fontStyle: 'italic',
                  fontSize: '22px',
                  letterSpacing: '0.05em',
                }}
              >
                <textPath href="#waveBottom" startOffset="0%">
                  {journeyText}
                </textPath>
              </text>
            </svg>
          </div>

          {/* Outer lower wave — wider, just center peak, mirrored */}
          <div className="w-full max-w-lg mt-2">
            <svg
              viewBox="0 0 800 160"
              className="w-full overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <path id="outerWaveBottom" d={outerTopPath} fill="none" />
              </defs>
              <text
                fill="#FFFFFF"
                opacity="1"
                style={{
                  fontFamily: "'Gambetta', serif",
                  fontWeight: 700,
                  fontStyle: 'italic',
                  fontSize: '22px',
                  letterSpacing: '0.05em',
                }}
              >
                <textPath href="#outerWaveBottom" startOffset="0%">
                  {journeyText}
                </textPath>
              </text>
            </svg>
          </div>
        </div>

        {/* ─── Bottom: Two-column paragraphs ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-5xl mx-auto">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <p
              className="text-[#E6F0F0]/90 text-sm md:text-base leading-relaxed text-justify"
              style={{ fontFamily: "'Gambetta', serif", fontWeight: 300 }}
            >
              At the heart of BeFound lies the belief that a space is never just
              a structure; it is a living extension of the soul.
            </p>

            <p
              className="text-[#E6F0F0]/90 text-sm md:text-base leading-relaxed text-justify"
              style={{ fontFamily: "'Gambetta', serif", fontWeight: 400 }}
            >
              Our philosophy is rooted in Artistic Intentionality, the idea that
              every architectural line and interior detail should serve a dual
              purpose: to function flawlessly and to inspire deeply.
            </p>

            <p
              className="text-[#E6F0F0]/90 text-sm md:text-base leading-relaxed text-justify"
              style={{ fontFamily: "'Gambetta', serif", fontWeight: 300 }}
            >
              We reject the "one-size-fits-all" approach, choosing instead to
              view each project as a narrative canvas.
            </p>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <p
              className="text-[#E6F0F0]/90 text-sm md:text-base leading-relaxed text-justify"
              style={{ fontFamily: "'Gambetta', serif", fontWeight: 400 }}
            >
              In a world of constant noise, we strive to design "quiet"
              environments that invite inhabitants to pause, breathe, and
              reclaim their peace of mind.
            </p>

            <p
              className="text-[#E6F0F0]/90 text-sm md:text-base leading-relaxed text-justify"
              style={{ fontFamily: "'Gambetta', serif", fontWeight: 300 }}
            >
              For us, successful design is found at the intersection of human
              aspiration and artistic exploration, creating harmonious
              sanctuaries where individuality is celebrated and where you can
              finally feel a true sense of belonging.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
