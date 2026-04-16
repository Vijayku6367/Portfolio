import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      const heroElements = content.querySelectorAll('.hero-stagger');

      gsap.fromTo(
        heroElements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
        }
      );

      gsap.to('.hero-image', {
        y: -30,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-background pt-32 pb-24 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] opacity-20 bg-primary pointer-events-none" />

      {/* Content */}
      <div
        ref={contentRef}
        className="container relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16"
      >
        {/* Left Side */}
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          <p className="hero-stagger text-primary uppercase tracking-[0.4em] text-xs md:text-sm mb-5">
            Since 2005
          </p>

          <h1 className="hero-stagger font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] mb-6">
            I'm Vijay
          </h1>

          <p className="hero-stagger text-lg md:text-xl text-muted opacity-70 mb-8">
            Full Stack Developer — UI Engineer — Problem Solver
          </p>

          <h2 className="hero-stagger font-display text-3xl sm:text-4xl md:text-5xl leading-tight mb-10">
            I Build Scalable
            <br />
            <span className="text-outline-primary">
              Digital Experiences
            </span>
          </h2>

          <div className="hero-stagger flex flex-wrap justify-center lg:justify-start gap-5">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-background font-bold rounded-full uppercase text-sm"
            >
              View Work
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white text-white rounded-full uppercase text-sm hover:bg-white hover:text-black transition"
            >
              Hire Me
            </motion.a>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="hero-image relative w-[300px] h-[400px] sm:w-[360px] sm:h-[480px] md:w-[420px] md:h-[560px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="/upload_1.png"
              alt="Vijay"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
