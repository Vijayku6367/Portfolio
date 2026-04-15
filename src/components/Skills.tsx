import { useEffect, useRef, useState, memo } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { id: 1, name: 'React', color: '#61DAFB', description: 'Building dynamic user interfaces with modern React patterns and hooks.', level: 95, image: '/1.png' },
  { id: 2, name: 'TypeScript', color: '#3178C6', description: 'Type-safe development for scalable and maintainable applications.', level: 90, image: '/2N.png' },
  { id: 3, name: 'Node.js', color: '#339933', description: 'Server-side JavaScript for fast and scalable backend services.', level: 88, image: '/Nj.png' },
  { id: 4, name: 'Next.js', color: '#ffffff', description: 'Full-stack React framework for production-grade applications.', level: 92, image: '/2N.png' },
  { id: 5, name: 'PostgreSQL', color: '#4169E1', description: 'Robust relational database design and optimization.', level: 85, image: '/3p.png' },
  { id: 6, name: 'Figma', color: '#F24E1E', description: 'UI/UX design, prototyping, and design system creation.', level: 88, image: '/4F.png' },
];

interface CounterProps { value: number; color: string; }
const Counter = memo(({ value, color }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20, mass: 0.8 });
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => { return spring.on('change', (v) => setDisplay(Math.round(v))); }, [spring]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        motionVal.set(value);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, motionVal]);

  return <span ref={ref} style={{ color }}>{display}%</span>;
});
Counter.displayName = 'Counter';

interface ProgressBarProps { level: number; color: string; }
const ProgressBar = memo(({ level, color }: ProgressBarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref} className="s-progress-track" role="progressbar" aria-valuenow={level} aria-valuemin={0} aria-valuemax={100}>
      <motion.div
        className="s-progress-fill"
        style={{ backgroundColor: color }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: level / 100 } : { scaleX: 0 }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
});
ProgressBar.displayName = 'ProgressBar';

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rafId = requestAnimationFrame(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.s-header-eyebrow, .s-header-title, .s-header-divider',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.12,
            scrollTrigger: { trigger: '.s-header', start: 'top 85%', once: true } }
        );

        if (prefersReducedMotion) return;

        const wrappers = gsap.utils.toArray<HTMLElement>('.s-card-wrapper');

        wrappers.forEach((wrapper, i) => {
          const card = wrapper.querySelector<HTMLElement>('.s-card');
          if (!card) return;
          const isLast = i === wrappers.length - 1;

          // Pin each card (except last) at 8% from viewport top
          if (!isLast) {
            ScrollTrigger.create({
              trigger: wrapper,
              start: 'top 8%',
              pin: true,
              pinSpacing: false,
              endTrigger: section,
              end: 'bottom bottom',
              invalidateOnRefresh: true,
            });
          }

          // Fade + scale OUT as next card scrolls over it
          const nextWrapper = wrappers[i + 1];
          if (nextWrapper) {
            gsap.to(card, {
              scrollTrigger: {
                trigger: nextWrapper,
                start: 'top 70%',
                end: 'top 8%',
                scrub: 0.5,
              },
              opacity: 0,
              scale: 0.90,
              y: -30,
              ease: 'none',
            });
          }
        });
      }, section);

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      <style>{`
        #skills {
          position: relative;
          background: var(--color-secondary, #0a0a0f);
          padding-top: clamp(4rem, 8vw, 7rem);
          padding-bottom: 10rem;
          overflow: hidden;
        }
        #skills .s-container {
          width: 100%;
          max-width: 800px;
          margin-inline: auto;
          padding-inline: clamp(1.25rem, 5vw, 2rem);
        }
        .s-header {
          text-align: center;
          margin-bottom: clamp(3rem, 6vw, 5rem);
        }
        .s-header-eyebrow {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--color-primary, #a78bfa);
          margin-bottom: 1rem;
        }
        .s-header-title {
          font-family: var(--font-display, serif);
          font-size: clamp(2.4rem, 7vw, 5.5rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--color-foreground, #f0f0f0);
          margin: 0 0 1.5rem;
        }
        .s-header-divider {
          width: 2.5rem;
          height: 2px;
          border-radius: 99px;
          background: var(--color-primary, #a78bfa);
          margin-inline: auto;
          transform-origin: left;
        }
        .s-stack {
          position: relative;
          display: flex;
          flex-direction: column;
        }
        /* Each wrapper = scroll distance. pinSpacing:false means wrappers
           collapse onto each other; GSAP floats the card at the top. */
        .s-card-wrapper {
          height: 65vh;
          min-height: 300px;
          position: relative;
        }
        /* Last card: no extra scroll distance */
        .s-card-wrapper:last-child {
          height: auto;
          min-height: 0;
        }
        .s-card {
          position: relative;
          width: 100%;
          background: var(--color-background, #111118);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1.5rem;
          overflow: hidden;
          will-change: transform, opacity;
          transform-origin: center top;
          transition: border-color 0.3s ease;
        }
        .s-card:hover { border-color: rgba(255,255,255,0.16); }
        .s-card-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.45s ease;
        }
        .s-card:hover .s-card-glow { opacity: 1; }
        .s-card-accent {
          position: absolute;
          left: 0;
          top: 1.5rem;
          bottom: 1.5rem;
          width: 3px;
          border-radius: 0 3px 3px 0;
        }
        .s-card-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 55%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .s-card:hover .s-card-shimmer { opacity: 1; }
        .s-card-inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: clamp(1.25rem, 3.5vw, 2rem);
          padding: clamp(1.5rem, 3.5vw, 2rem) clamp(1.5rem, 3.5vw, 2rem) clamp(1.5rem, 3.5vw, 2rem) clamp(2rem, 4vw, 2.5rem);
        }
        .s-icon-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          flex-shrink: 0;
        }
        .s-icon-ring { border-radius: 1rem; padding: 2px; }
        .s-icon-bg {
          width: clamp(58px, 9vw, 80px);
          height: clamp(58px, 9vw, 80px);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(10px, 1.5vw, 14px);
        }
        .s-icon-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          image-rendering: -webkit-optimize-contrast;
          user-select: none;
          pointer-events: none;
        }
        .s-card-index {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          font-variant-numeric: tabular-nums;
        }
        .s-card-content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .s-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .s-skill-name {
          font-family: var(--font-display, serif);
          font-size: clamp(1.5rem, 4vw, 2.25rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.02em;
          margin: 0;
        }
        .s-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: 1px solid;
          padding: 0.28rem 0.6rem;
          border-radius: 999px;
          white-space: nowrap;
        }
        .s-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
          animation: s-pulse 2.4s ease-in-out infinite;
        }
        @keyframes s-pulse {
          0%, 100% { opacity: 1;   transform: scale(1);    }
          50%       { opacity: 0.4; transform: scale(0.65); }
        }
        .s-skill-desc {
          font-size: clamp(0.82rem, 1.8vw, 0.93rem);
          line-height: 1.65;
          color: var(--color-muted, rgba(255,255,255,0.48));
          margin: 0;
        }
        .s-proficiency {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 0.2rem;
        }
        .s-proficiency-labels {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .s-label-text {
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        .s-label-value {
          font-family: var(--font-display, serif);
          font-size: 1.45rem;
          font-weight: 700;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .s-progress-track {
          height: 3px;
          background: rgba(255,255,255,0.06);
          border-radius: 99px;
          overflow: hidden;
        }
        .s-progress-fill {
          height: 100%;
          border-radius: 99px;
          transform-origin: left center;
          will-change: transform;
        }
        @media (max-width: 520px) {
          .s-card-inner { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .s-icon-col { flex-direction: row; align-items: center; gap: 0.75rem; }
          .s-card-header { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
          .s-card-wrapper { height: 70vh; }
        }
        @media (prefers-reduced-motion: reduce) {
          .s-card, .s-card-glow, .s-card-shimmer, .s-progress-fill, .s-badge-dot {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <section ref={sectionRef} id="skills" aria-label="Skills and Expertise">
        <div className="s-container">

          <div className="s-header">
            <p className="s-header-eyebrow">Tech Stack</p>
            <h2 className="s-header-title">Skills &amp; Expertise</h2>
            <div className="s-header-divider" />
          </div>

          <div className="s-stack">
            {skills.map((skill, index) => (
              <div key={skill.id} className="s-card-wrapper">
                <div className="s-card">
                  <div className="s-card-glow" style={{ background: `radial-gradient(ellipse 65% 60% at 50% 50%, ${skill.color}18 0%, transparent 75%)` }} />
                  <div className="s-card-accent" style={{ backgroundColor: skill.color }} />
                  <div className="s-card-shimmer" />
                  <div className="s-card-inner">
                    <div className="s-icon-col">
                      <div className="s-icon-ring" style={{ boxShadow: `0 0 0 1px ${skill.color}30, 0 6px 32px ${skill.color}22` }}>
                        <div className="s-icon-bg" style={{ backgroundColor: `${skill.color}12` }}>
                          <img src={skill.image} alt={skill.name} className="s-icon-img" loading="lazy" />
                        </div>
                      </div>
                      <span className="s-card-index" style={{ color: `${skill.color}55` }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="s-card-content">
                      <div className="s-card-header">
                        <h3 className="s-skill-name" style={{ color: skill.color }}>{skill.name}</h3>
                        <div className="s-badge" style={{ borderColor: `${skill.color}40`, color: skill.color }}>
                          <span className="s-badge-dot" style={{ backgroundColor: skill.color }} />
                          Active
                        </div>
                      </div>
                      <p className="s-skill-desc">{skill.description}</p>
                      <div className="s-proficiency">
                        <div className="s-proficiency-labels">
                          <span className="s-label-text">Proficiency</span>
                          <span className="s-label-value"><Counter value={skill.level} color={skill.color} /></span>
                        </div>
                        <ProgressBar level={skill.level} color={skill.color} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
