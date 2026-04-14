import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const aboutLines = section.querySelectorAll('.about-line');
      gsap.fromTo(
        aboutLines,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );

      const cards = section.querySelectorAll('.stat-card');
      gsap.fromTo(
        cards,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 85%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: '5', suffix: '+', label: 'Projects Completed'},
    { number: '3', suffix: '+', label: 'Years Experience'},
    { number: '20', suffix: '+', label: 'Happy Clients'},
    { number: '99', suffix: '%', label: 'Client Satisfaction'},
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-secondary py-24 md:py-32"
    >
      <div className="container">
        {/* Section Header */}
        <div className="mb-20 md:mb-28 text-center md:text-left">
          <p className="about-line text-primary font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-4">
            About Me
          </p>
          <h2 className="about-line font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            Crafting Digital Excellence
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div className="lg:col-span-3 space-y-8 md:space-y-10">
            <p className="about-line text-2xl sm:text-3xl md:text-4xl font-light leading-tight">
              I design and develop{' '}
              <span className="text-primary font-medium">high-performance</span>{' '}
              digital products that blend stunning aesthetics with seamless functionality.
            </p>

            <p className="about-line text-base md:text-lg text-muted leading-relaxed">
              With over 5 years of experience in full-stack development and UI/UX design,
              I've helped startups and enterprises build products that users love.
            </p>

            <p className="about-line text-base md:text-lg text-muted leading-relaxed">
              When I'm not coding, you'll find me exploring new design trends,
              contributing to open-source projects, or mentoring developers.
            </p>

            <div className="about-line pt-6">
              <motion.a
                href="#contact"
                whileHover={{ x: 10 }}
                className="inline-flex items-center gap-4 group"
              >
                <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
                  Read Full Story
                </span>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </motion.a>
            </div>
          </div>

          {/* Right Cards */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -8, scale: 1.05 }}
                className="stat-card glass rounded-[2rem] p-6 md:p-8 text-center"
              >
                <span className="text-3xl md:text-4xl mb-4 block">
                  {stat.icon}
                </span>

                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display text-4xl sm:text-5xl md:text-6xl text-primary">
                    {stat.number}
                  </span>
                  <span className="font-display text-2xl md:text-3xl text-primary">
                    {stat.suffix}
                  </span>
                </div>

                <p className="text-[10px] md:text-xs text-muted mt-2 uppercase tracking-widest">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
