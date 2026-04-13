import { useEffect, useRef, useState } from 'react';
import { motion, animate } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

const Counter = ({ value, color }: { value: number, color: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const controls = animate(0, value, {
            duration: 2,
            ease: "easeOut",
            onUpdate: (latest) => setDisplayValue(Math.round(latest)),
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref} style={{ color }}>{displayValue}%</span>;
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const titles = section.querySelectorAll('.skills-title');
      gsap.fromTo(titles,
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
          }
        }
      );

      // Stacked Scroll Animation for Skills
      const skillCards = gsap.utils.toArray<HTMLElement>('.skill-card-wrapper');
      
      skillCards.forEach((card, i) => {
        if (i === skillCards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: 'top 10%',
          pin: true,
          pinSpacing: false,
          endTrigger: section,
          end: 'bottom bottom',
          invalidateOnRefresh: true,
        });

        gsap.to(card, {
          scrollTrigger: {
            trigger: skillCards[i + 1],
            start: 'top 80%',
            end: 'top 10%',
            scrub: true,
          },
          scale: 0.98,
          opacity: 0.8,
          filter: 'blur(1px)',
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 md:py-32 bg-secondary overflow-hidden"
    >
      <div className="container">
        <div className="mb-16 md:mb-24 text-center">
          <p className="skills-title text-primary font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-4">
            Tech Stack
          </p>
          <h2 className="skills-title font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            Skills & Expertise
          </h2>
        </div>

        <div className="flex flex-col gap-10 md:gap-20">
          {skills.map((skill) => (
            <div key={skill.id} className="skill-card-wrapper w-full h-[50vh] md:h-[60vh] min-h-[350px]">
              <div 
                className="relative h-full w-full rounded-3xl overflow-hidden p-8 md:p-16 flex flex-col items-center justify-center text-center bg-background border border-white/10 group"
              >
                {/* Morphing Highlight Effect */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${skill.color}15 0%, transparent 70%)`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="relative z-10 flex flex-col items-center max-w-2xl">
                  {/* Icon Placeholder */}
                   <motion.div
  className="mb-8 relative flex items-center justify-center"
  animate={{ rotate: 360 }}
  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
>
  <div
    className="w-32 h-32 md:w-36 md:h-36 rounded-3xl flex items-center justify-center"
    style={{ 
      backgroundColor: `${skill.color}15`,
      boxShadow: `0 0 60px ${skill.color}50`
    }}
  >
    <img
      src={skill.image}
      alt={skill.name}
      className="w-full h-full object-contain p-4"
    />
  </div>
</motion.div>
                  
                  {/* Skill Name */}
                  <h3 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6" style={{ color: skill.color }}>
                    {skill.name}
                  </h3>

                  <p className="text-muted text-lg md:text-xl lg:text-2xl mb-10 leading-relaxed">
                    {skill.description}
                  </p>

                  <div className="w-full max-w-md">
                    <div className="flex justify-between mb-4 items-end">
                      <span className="text-xs text-muted uppercase tracking-[0.2em]">Proficiency</span>
                      <span className="font-display text-3xl"><Counter value={skill.level} color={skill.color} /></span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: 0.3, ease: "circOut" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: skill.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
