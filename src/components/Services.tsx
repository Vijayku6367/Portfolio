import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    title: 'Web Development',
    description:
      'Building fast, scalable, and maintainable web applications using modern frameworks and best practices.',
    image: '/web.png',
    color: '#ff3d00',
  },
  {
    id: '02',
    title: 'UI/UX Design',
    description:
      'Creating intuitive and visually stunning interfaces that delight users and drive engagement.',
    image: '/ui.png',
    color: '#00ff88',
  },
  {
    id: '03',
    title: 'Performance Optimization',
    description:
      'Analyzing and improving application performance for lightning-fast load times and smooth interactions.',
    image: '/per.png',
    color: '#7c3aed',
  },
  {
    id: '04',
    title: 'Animation & Interactions',
    description:
      'Crafting premium motion design and micro-interactions that bring interfaces to life.',
    image: '/ani.png',
    color: '#f59e0b',
  },
];

type ServiceType = (typeof services)[0];

const TiltCard = ({ service }: { service: ServiceType }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 180, damping: 18 });
  const mouseY = useSpring(y, { stiffness: 180, damping: 18 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="service-card relative h-full w-full rounded-[2rem] border border-white/10 bg-black/35 backdrop-blur-xl overflow-hidden flex items-center justify-center p-6 md:p-10 group"
    >
      {/* Card Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
        style={{
          boxShadow: `inset 0 0 80px ${service.color}25`,
        }}
      />

      {/* Number */}
      <div className="absolute top-5 right-5 opacity-10 z-20">
        <span className="font-display text-5xl md:text-7xl text-outline">
          {service.id}
        </span>
      </div>

      {/* Content */}
      <div
        className="relative z-20 flex flex-col items-center text-center max-w-2xl"
        style={{ transform: 'translateZ(50px)' }}
      >
        <div
          className="mb-6 rounded-3xl flex items-center justify-center"
          style={{
            width: '180px',
            height: '180px',
            backgroundColor: `${service.color}20`,
            boxShadow: `0 20px 40px ${service.color}25`,
          }}
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-contain p-4"
          />
        </div>

        <h3 className="font-display text-3xl md:text-5xl mb-4 text-white group-hover:text-primary transition-all duration-500">
          {service.title}
        </h3>

        <p className="text-white/75 text-base md:text-xl leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Bottom Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-700"
        style={{ background: service.color }}
      />
    </motion.div>
  );
};

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services-title',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );

      const cards =
        gsap.utils.toArray<HTMLElement>('.service-card-wrapper');

      cards.forEach((card, i) => {
        gsap.set(card, {
          zIndex: cards.length - i,
        });

        if (i === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: 'top 10%',
          pin: true,
          pinSpacing: false,
          endTrigger: cards[i + 1],
          end: 'top top',
        });

        gsap.to(card, {
          y: -120,
          scale: 0.9,
          opacity: 0,
          filter: 'blur(8px)',
          ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top 85%',
            end: 'top 20%',
            scrub: true,
          },
        });
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-20 md:py-28 overflow-hidden"
     > 

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Section Glow */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-black/30" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center">
          <p className="services-title text-primary tracking-[0.3em] uppercase text-xs mb-3">
            What I Do
          </p>

          <h2 className="services-title font-display text-4xl md:text-6xl lg:text-7xl text-white">
            Services Offered
          </h2>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-10 md:gap-16">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card-wrapper w-full h-[62vh] md:h-[58vh] min-h-[380px]"
            >
              <TiltCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
