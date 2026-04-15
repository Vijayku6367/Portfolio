import { useEffect, useRef, useState, memo } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────

const skills = [
  {
    id: 1,
    name: 'React',
    color: '#61DAFB',
    description: 'Building dynamic user interfaces with modern React patterns and hooks.',
    level: 95,
    image: '/1.png',
  },
  {
    id: 2,
    name: 'TypeScript',
    color: '#3178C6',
    description: 'Type-safe development for scalable and maintainable applications.',
    level: 90,
    image: '/2N.png',
  },
  {
    id: 3,
    name: 'Node.js',
    color: '#339933',
    description: 'Server-side JavaScript for fast and scalable backend services.',
    level: 88,
    image: '/Nj.png',
  },
  {
    id: 4,
    name: 'Next.js',
    color: '#ffffff',
    description: 'Full-stack React framework for production-grade applications.',
    level: 92,
    image: '/2N.png',
  },
  {
    id: 5,
    name: 'PostgreSQL',
    color: '#4169E1',
    description: 'Robust relational database design and optimization.',
    level: 85,
    image: '/3p.png',
  },
  {
    id: 6,
    name: 'Figma',
    color: '#F24E1E',
    description: 'UI/UX design, prototyping, and design system creation.',
    level: 88,
    image: '/4F.png',
  },
];

// ─── Counter ─────────────────────────────────────────────────────────────────
// Animates from 0 → value exactly once when the element enters the viewport.

interface CounterProps {
  value: number;
  color: string;
}

const Counter = memo(({ value, color }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  // Spring gives a natural deceleration without heavy frame budgets.
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20, mass: 0.8 });
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  // Subscribe to spring output → integer display value
  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);

  // Trigger once on first intersection
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          motionVal.set(value);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, motionVal]);

  return (
    <span ref={ref} style={{ color }} aria-label={`${value}%`}>
      {display}%
    </span>
  );
});

Counter.displayName = 'Counter';

// ─── Progress Bar ─────────────────────────────────────────────────────────────

interface ProgressBarProps {
  level: number;
  color: string;
}

const ProgressBar = memo(({ level, color }: ProgressBarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="progress-track" role="progressbar" aria-valuenow={level} aria-valuemin={0} aria-valuemax={100}>
      <motion.div
        className="progress-fill"
        style={{ backgroundColor: color }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: level / 100 } : { scaleX: 0 }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

// ─── Skill Card ───────────────────────────────────────────────────────────────

interface SkillCardProps {
  skill: typeof skills[number];
  index: number;
}

const SkillCard = memo(({ skill, index }: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.15 });

  return (
    <div className="skill-card-wrapper" data-index={index}>
      <motion.div
        ref={cardRef}
        className="skill-card"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Ambient glow — GPU-composited, no blur */}
        <div
          className="card-glow"
          style={{
            background: `radial-gradient(ellipse 60% 55% at 50% 50%, ${skill.color}18 0%, transparent 75%)`,
          }}
        />

        {/* Side accent bar */}
        <div className="card-accent" style={{ backgroundColor: skill.color }} />

        {/* ── Interior layout ── */}
        <div className="card-inner">
          {/* Left: Icon */}
          <div className="card-icon-col">
            <div
              className="icon-ring"
              style={{
                boxShadow: `0 0 0 1px ${skill.color}30, 0 8px 40px ${skill.color}25`,
              }}
            >
              <div
                className="icon-bg"
                style={{ backgroundColor: `${skill.color}12` }}
              >
                <img
                  src={skill.image}
                  alt={skill.name}
                  className="skill-icon"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </div>
            {/* Index number */}
            <span className="skill-index" style={{ color: `${skill.color}50` }}>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Right: Content */}
          <div className="card-content">
            <div className="card-header">
              <h3 className="skill-name" style={{ color: skill.color }}>
                {skill.name}
              </h3>
              <div className="skill-badge" style={{ borderColor: `${skill.color}40`, color: `${skill.color}` }}>
                <span className="badge-dot" style={{ backgroundColor: skill.color }} />
                Active
              </div>
            </div>

            <p className="skill-description">{skill.description}</p>

            {/* Proficiency row */}
            <div className="proficiency-row">
              <div className="proficiency-label">
                <span className="label-text">Proficiency</span>
                <span className="label-value">
                  <Counter value={skill.level} color={skill.color} />
                </span>
              </div>
              <ProgressBar level={skill.level} color={skill.color} />
            </div>
          </div>
        </div>

        {/* Hover shimmer — opacity only, no blur */}
        <div className="card-shimmer" />
      </motion.div>
    </div>
  );
});

SkillCard.displayName = 'SkillCard';

// ─── Section Header ───────────────────────────────────────────────────────────

const SectionHeader = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="skills-header">
      <motion.p
        className="header-eyebrow"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Tech Stack
      </motion.p>
      <motion.h2
        className="header-title"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        Skills &amp; Expertise
      </motion.h2>
      <motion.div
        className="header-divider"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
});

SectionHeader.displayName = 'SectionHeader';

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  // Stacked-card pin with GPU-only transforms (no blur, no filter)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Only engage stacking on screens wide enough & motion allowed
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const wrappers = gsap.utils.toArray<HTMLElement>('.skill-card-wrapper');
      const PEEK_OFFSET = 16; // px stack peek gap

      wrappers.forEach((wrapper, i) => {
        if (i === wrappers.length - 1) return; // last card never pins

        // Pin each card when it hits 8% from top (leaving a sliver visible).
        ScrollTrigger.create({
          trigger: wrapper,
          start: 'top 8%',
          pin: true,
          pinSpacing: false,
          endTrigger: section,
          end: 'bottom bottom',
          invalidateOnRefresh: true,
        });

        // As the NEXT card approaches, scale + translate the current one back.
        // Uses only transform (GPU-composited). No blur, no filter.
        const nextWrapper = wrappers[i + 1];
        if (nextWrapper) {
          gsap.to(wrapper.querySelector('.skill-card'), {
            scrollTrigger: {
              trigger: nextWrapper,
              start: 'top 85%',
              end: 'top 8%',
              scrub: 0.4,
            },
            scale: 1 - (i + 1) * 0.025,
            y: -(i + 1) * PEEK_OFFSET * 0.5,
            opacity: 0.72,
            ease: 'none',
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Scoped styles — keeps the component self-contained */}
      <style>{`
        /* ── Layout ── */
        #skills {
          position: relative;
          padding: clamp(5rem, 10vw, 9rem) 0 clamp(5rem, 10vw, 9rem);
          background: var(--color-secondary, #0a0a0f);
          overflow: hidden;
        }

        #skills .container {
          width: 100%;
          max-width: 860px;
          margin-inline: auto;
          padding-inline: clamp(1.25rem, 5vw, 2.5rem);
        }

        /* ── Header ── */
        .skills-header {
          text-align: center;
          margin-bottom: clamp(3rem, 6vw, 5rem);
        }

        .header-eyebrow {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--color-primary, #a78bfa);
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .header-title {
          font-family: var(--font-display, 'Georgia', serif);
          font-size: clamp(2.5rem, 7vw, 5.5rem);
          font-weight: 700;
          line-height: 1.05;
          color: var(--color-foreground, #f0f0f0);
          margin: 0 0 1.5rem;
          letter-spacing: -0.02em;
        }

        .header-divider {
          width: 3rem;
          height: 2px;
          background: var(--color-primary, #a78bfa);
          margin-inline: auto;
          transform-origin: left;
          border-radius: 99px;
        }

        /* ── Card Wrapper (stacking context) ── */
        .skill-card-wrapper {
          width: 100%;
          /* Height gives scroll distance for pinning */
          /* Cards are naturally sized; GSAP will pin the wrapper */
        }

        /* ── Card ── */
        .skill-card {
          position: relative;
          width: 100%;
          background: var(--color-background, #111118);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 1.5rem;
          overflow: hidden;
          /* GPU compositing layer — avoids repaints during scroll */
          will-change: transform, opacity;
          transform-origin: center top;
          transition: border-color 0.3s ease;
          cursor: default;
        }

        .skill-card:hover {
          border-color: rgba(255, 255, 255, 0.14);
        }

        /* Ambient glow overlay */
        .card-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .skill-card:hover .card-glow {
          opacity: 1;
        }

        /* Left accent bar */
        .card-accent {
          position: absolute;
          left: 0;
          top: 1.5rem;
          bottom: 1.5rem;
          width: 3px;
          border-radius: 0 3px 3px 0;
          opacity: 0.85;
        }

        /* Shimmer on hover — opacity only, composited */
        .card-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.03) 0%,
            transparent 60%
          );
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .skill-card:hover .card-shimmer {
          opacity: 1;
        }

        /* ── Card inner layout ── */
        .card-inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: clamp(1.5rem, 4vw, 2.5rem);
          padding: clamp(1.5rem, 4vw, 2.25rem) clamp(1.5rem, 4vw, 2.5rem)
                   clamp(1.5rem, 4vw, 2.25rem) clamp(2rem, 5vw, 3rem);
        }

        /* ── Icon column ── */
        .card-icon-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .icon-ring {
          border-radius: 1.125rem;
          padding: 3px;
        }

        .icon-bg {
          width: clamp(60px, 10vw, 82px);
          height: clamp(60px, 10vw, 82px);
          border-radius: 0.875rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(10px, 1.5vw, 14px);
        }

        .skill-icon {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          /* Crisp icons */
          image-rendering: -webkit-optimize-contrast;
        }

        .skill-index {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          font-variant-numeric: tabular-nums;
        }

        /* ── Content column ── */
        .card-content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .skill-name {
          font-family: var(--font-display, 'Georgia', serif);
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .skill-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: 1px solid;
          padding: 0.3rem 0.65rem;
          border-radius: 999px;
          white-space: nowrap;
          opacity: 0.85;
        }

        .badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
          animation: pulse-dot 2.4s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.75); }
        }

        .skill-description {
          font-size: clamp(0.85rem, 1.8vw, 0.975rem);
          line-height: 1.65;
          color: var(--color-muted, rgba(255,255,255,0.5));
          margin: 0;
        }

        /* ── Proficiency ── */
        .proficiency-row {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          margin-top: 0.25rem;
        }

        .proficiency-label {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .label-text {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-muted, rgba(255,255,255,0.35));
        }

        .label-value {
          font-family: var(--font-display, 'Georgia', serif);
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }

        /* ── Progress track ── */
        .progress-track {
          height: 3px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 99px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 99px;
          transform-origin: left center;
        }

        /* ── Cards stack (vertical list) ── */
        .skills-stack {
          display: flex;
          flex-direction: column;
          gap: clamp(1rem, 2.5vw, 1.5rem);
        }

        /* ── Mobile adjustments ── */
        @media (max-width: 480px) {
          .card-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
          }

          .card-icon-col {
            flex-direction: row;
            align-items: center;
            gap: 1rem;
          }

          .skill-index {
            font-size: 0.7rem;
          }

          .card-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        /* ── Reduced motion — disable all animation ── */
        @media (prefers-reduced-motion: reduce) {
          .skill-card,
          .card-glow,
          .card-shimmer,
          .progress-fill,
          .badge-dot {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <section ref={sectionRef} id="skills" aria-label="Skills and Expertise">
        <div className="container">
          <SectionHeader />

          <div className="skills-stack">
            {skills.map((skill, index) => (
              <SkillCard key={skill.id} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
