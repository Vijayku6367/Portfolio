import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    title: 'Web Development',
    description: 'Building fast, scalable, and maintainable web applications using modern frameworks and best practices.',
    image: '/web.png',
    color: '#ff3d00',
  },
  {
    id: '02',
    title: 'UI/UX Design',
    description: 'Creating intuitive and visually stunning interfaces that delight users and drive engagement.',
    image: '/ui.png',
    color: '#00ff88',
  },
  {
    id: '03',
    title: 'Performance Optimization',
    description: 'Analyzing and improving application performance for lightning-fast load times and smooth interactions.',
    image: '/per.png',
    color: '#7c3aed',
  },
 { 
    id: '04',
    title: 'Animation & Interactions',
    description: 'Crafting premium motion design and micro-interactions that bring interfaces to life.',
    image: 'ani.png',
    color: '#f59e0b',
  },
];

const TiltCard = ({ service }: { service: typeof services[0] }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="service-card relative h-full glass p-6 md:p-10 rounded-[2rem] flex flex-col items-center justify-center text-center transition-all duration-500 hover:border-white/20 group bg-background"
    >
      {/* Border Glow */}
      <div
        className="absolute inset-0 rounded-[2rem] p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `linear-gradient(45deg, transparent, ${service.color}, transparent)`,
          maskImage: 'linear-gradient(#fff, #fff), linear-gradient(#fff, #fff)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />

      <div style={{ transform: "translateZ(50px)" }} className="flex flex-col items-center max-w-xl">

        {/* 🔥 Bigger Image */}
        <div
          className="mb-6 flex items-center justify-center rounded-2xl"
          style={{
            width: '180px',
            height: '180px',
            backgroundColor: `${service.color}15`,
            boxShadow: `0 20px 40px -10px ${service.color}20`,
          }}
        >
          <img
            src={service.image || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
            alt={service.title}
           className="w-full h-full object-contain block mx-auto"
          />-
        </div>

        {/* Title */}
        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4 group-hover:text-primary transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-white/80 text-base md:text-lg lg:text-xl leading-relaxed font-light">
          {service.description}
        </p>
      </div>

      {/* Background Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-[2rem]"
        style={{ background: service.color }}
      />

      {/* Number */}
      <div className="absolute top-6 right-6 opacity-10">
        <span className="font-display text-5xl md:text-7xl text-outline">{service.id}</span>
      </div>
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
        section.querySelectorAll('.services-title'),
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

      const cards = gsap.utils.toArray<HTMLElement>('.service-card-wrapper');

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: 'top 10%',
          pin: true,
          pinSpacing: false,
          endTrigger: section,
          end: 'bottom bottom',
        });

        gsap.to(card, {
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top 80%',
            end: 'top 10%',
            scrub: true,
          },
          scale: 0.95,
          opacity: 0.5,
          filter: 'blur(4px)',
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-20 md:py-24 bg-background overflow-hidden"
    >
      <div className="container">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="services-title text-primary tracking-[0.3em] uppercase text-xs mb-3">
            What I Do
          </p>
          <h2 className="services-title font-display text-4xl md:text-6xl lg:text-7xl">
            Services Offered
          </h2>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-10 md:gap-16">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card-wrapper w-full h-[50vh] md:h-[55vh] min-h-[350px]"
            >
              <TiltCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
