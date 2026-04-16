import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [10, -10]),
    springConfig
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
    springConfig
  );

  const lightX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [30, 70]),
    springConfig
  );

  const lightY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [30, 70]),
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          y: 100,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      const heroElements = content.querySelectorAll('.hero-stagger');

      gsap.fromTo(
        heroElements,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.1,
          delay: 0.3,
        }
      );

      const floatingElements = section.querySelectorAll('.floating-element');

      floatingElements.forEach((el, i) => {
        gsap.to(el, {
          y: -40 * (i + 1),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-background pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden"
    >
      {/* Slight Dark Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255,61,0,0.4) 0%, rgba(0,255,136,0.2) 50%, transparent 70%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="container relative flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24"
        style={{ zIndex: 10 }}
      >
        {/* Left */}
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          <p className="hero-stagger text-primary font-medium tracking-[0.4em] uppercase text-xs md:text-sm mb-6">
            Since 2005
          </p>

          <h1 className="hero-stagger font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tight mb-6">
            I'm Vijay
          </h1>

          <p className="hero-stagger text-lg md:text-xl lg:text-2xl text-muted font-light tracking-wide opacity-70 mb-8">
            Full Stack Developer — UI Engineer — Problem Solver
          </p>

          <h2 className="hero-stagger font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-12">
            I Build Scalable
            <br />
            <span className="text-outline-primary">
              Digital Experiences
            </span>
          </h2>

          <div className="hero-stagger flex flex-wrap justify-center lg:justify-start gap-6">
            <motion.a
              href="#projects"
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.85 }}
              className="px-10 py-5 bg-primary text-background font-bold rounded-full tracking-widest uppercase text-xs md:text-sm"
            >
              View Work
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border-2 border-foreground text-foreground font-bold rounded-full tracking-widest uppercase text-xs md:text-sm hover:bg-foreground hover:text-background transition-all"
            >
              Hire Me
            </motion.a>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div
            ref={imageContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            className="relative"
            style={{ perspective: '2000px' }}
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-10 rounded-[3rem] opacity-30 blur-3xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${lightX}% ${lightY}%, ${
                    isHovering ? '#ff3d00' : '#00ff88'
                  } 0%, transparent 70%)`,
                }}
              />

              <div
                className="relative w-[300px] h-[400px] sm:w-[340px] sm:h-[460px] md:w-[400px] md:h-[540px] rounded-[3rem] overflow-hidden border border-white/10"
                style={{ transform: 'translateZ(50px)' }}
              >
                <img
                  src="/upload_1.png"
                  alt="Vijay"
                  className="w-full h-80px object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
