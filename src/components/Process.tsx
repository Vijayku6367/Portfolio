import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    title: 'Research',
    description: 'Deep dive into understanding your business, users, and competitors to inform strategic decisions.',
    image: '', // Placeholder for future use
    color: '#ff3d00',
  },
  {
    id: 2,
    title: 'Design',
    description: 'Creating wireframes, prototypes, and high-fidelity designs that align with your brand vision.',
    image: '', // Placeholder for future use
    color: '#00ff88',
  },
  {
    id: 3,
    title: 'Develop',
    description: 'Building robust, scalable solutions using cutting-edge technologies and best practices.',
    image: '', // Placeholder for future use
    color: '#7c3aed',
  },
  {
    id: 4,
    title: 'Launch',
    description: 'Deploying your product with comprehensive testing, optimization, and ongoing support.',
    image: '', // Placeholder for future use
    color: '#f59e0b',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title animation
      const titles = section.querySelectorAll('.process-title');
      gsap.fromTo(titles,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
          onComplete: () => {
            titles.forEach(el => {
              (el as HTMLElement).style.opacity = '1';
              (el as HTMLElement).style.transform = 'translateY(0)';
            });
          }
        }
      );

      // Process cards animation
      const cards = section.querySelectorAll('.process-card');
      gsap.fromTo(cards,
        { y: 48, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 88%',
          },
          onComplete: () => {
            cards.forEach(el => {
              (el as HTMLElement).style.opacity = '1';
              (el as HTMLElement).style.transform = 'translateY(0) scale(1)';
              (el as HTMLElement).style.visibility = 'visible';
            });
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-20 md:py-32 bg-secondary"
      style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="mb-12 md:mb-20 text-center">
          <p className="process-title text-primary font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm mb-4">
            How I Work
          </p>
          <h2 className="process-title font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            My Process
          </h2>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative" style={{ zIndex: 1 }}>
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={cardVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                }}
                className="process-card glass rounded-2xl md:rounded-3xl p-8 relative flex flex-col items-center text-center"
                style={{ visibility: 'visible', opacity: 1 }}
              >
                {/* Step Number Background */}
                <div
                  className="absolute top-4 right-4 font-display text-4xl md:text-5xl leading-none opacity-10"
                  style={{ color: step.color }}
                >
                  {step.id}
                </div>

                {/* Image Placeholder - On Top */}
                <motion.div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 relative z-10"
                  style={{ backgroundColor: `${step.color}20` }}
                  whileHover={{ rotate: 8, scale: 1.05 }}
                >
                  <img
                    src={step.image || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
                    alt={step.title}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'contain',
                    }}
                  />
                </motion.div>

                {/* Content - Below Image */}
                <h3 className="font-display text-2xl md:text-3xl mb-3 relative z-10">{step.title}</h3>
                <p className="text-muted text-sm md:text-base leading-relaxed relative z-10">
                  {step.description}
                </p>

                {/* Step indicator dot */}
                <div
                  className="absolute bottom-4 right-4 w-3 h-3 rounded-full"
                  style={{ backgroundColor: step.color }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
