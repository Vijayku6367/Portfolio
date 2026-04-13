import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Speed up marquee on scroll
      if (track1Ref.current) {
        gsap.to(track1Ref.current, {
          x: '-=200',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      if (track2Ref.current) {
        gsap.to(track2Ref.current, {
          x: '+=200',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const marqueeItems = [
    'FRONTEND',
    '•',
    'BACKEND',
    '•',
    'UI/UX',
    '•',
    'REACT',
    '•',
    'NODE.JS',
    '•',
    'TYPESCRIPT',
    '•',
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-12 md:py-20 bg-background relative"
      style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
    >
      {/* Floating 3D Cards - Hidden on mobile */}
      <div 
        className="absolute top-1/2 left-[10%] -translate-y-1/2 w-24 h-32 md:w-32 md:h-40 glass rounded-2xl rotate-12 animate-float opacity-30 md:opacity-50 hidden sm:block"
        style={{ zIndex: 5 }}
      >
        <div className="p-3 md:p-4">
          <div className="w-full h-1.5 md:h-2 bg-primary/30 rounded mb-2" />
          <div className="w-3/4 h-1.5 md:h-2 bg-foreground/20 rounded mb-2" />
          <div className="w-1/2 h-1.5 md:h-2 bg-foreground/10 rounded" />
        </div>
      </div>

      <div 
        className="absolute top-1/2 right-[15%] -translate-y-1/2 w-20 h-28 md:w-28 md:h-36 glass rounded-2xl -rotate-6 animate-float-delayed opacity-30 md:opacity-50 hidden sm:block"
        style={{ zIndex: 5 }}
      >
        <div className="p-3 md:p-4">
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-accent/30 mb-2 md:mb-3" />
          <div className="w-full h-1.5 md:h-2 bg-foreground/20 rounded mb-2" />
          <div className="w-2/3 h-1.5 md:h-2 bg-foreground/10 rounded" />
        </div>
      </div>

      {/* Marquee Track 1 */}
      <div className="mb-4 md:mb-8" style={{ overflow: 'hidden' }}>
        <div ref={track1Ref} className="flex whitespace-nowrap marquee-track">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className={`font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl mx-2 md:mx-4 ${
                item === '•' ? 'text-primary' : i % 4 === 0 ? 'text-outline' : 'text-foreground'
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Marquee Track 2 - Reverse */}
      <div style={{ overflow: 'hidden' }}>
        <div 
          ref={track2Ref} 
          className="flex whitespace-nowrap"
          style={{ animation: 'marquee 40s linear infinite reverse' }}
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className={`font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl mx-2 md:mx-4 ${
                item === '•' ? 'text-accent' : i % 3 === 0 ? 'text-outline' : 'text-foreground/50'
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
