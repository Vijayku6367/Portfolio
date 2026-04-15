import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'SaaS Dashboard',
    category: 'Web Application',
    description: 'Real-time analytics platform with advanced data visualization and comprehensive reporting tools.',
    tech: ['React', 'Node.js', 'D3.js', 'PostgreSQL'],
    color: '#ff3d00',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    description: 'High-performance shopping experience with AI-powered recommendations and seamless checkout.',
    tech: ['Next.js', 'Stripe', 'MongoDB', 'AWS'],
    color: '#00ff88',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&q=80',
  },
  {
    id: 3,
    title: 'AI Content Generator',
    category: 'AI/ML Tool',
    description: 'GPT-powered content creation platform with custom fine-tuning and brand voice adaptation.',
    tech: ['Python', 'FastAPI', 'OpenAI', 'React'],
    color: '#7c3aed',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
  },
  {
    id: 4,
    title: 'Design System',
    category: 'UI/UX',
    description: 'Comprehensive component library for enterprise applications with accessibility-first approach.',
    tech: ['Figma', 'Storybook', 'TypeScript', 'CSS'],
    color: '#f59e0b',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;
    
    if (!section || !title || !cards) return;

    const ctx = gsap.context(() => {
      // Title animation
      const titleLines = title.querySelectorAll('.title-line');
      gsap.fromTo(titleLines, 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
          }
        }
      );

      // Stacked Scroll Animation for Projects
      const projectCards = gsap.utils.toArray<HTMLElement>('.project-card');
      
      projectCards.forEach((card, i) => {
        if (i === projectCards.length - 1) return; // Last card doesn't pin

        ScrollTrigger.create({
          trigger: card,
          start: 'top 10%',
          pin: true,
          pinSpacing: false,
          endTrigger: section,
          end: 'bottom bottom',
          invalidateOnRefresh: true,
        });

        // Add a slight darkening/scaling effect as cards stack
        gsap.to(card, {
          scrollTrigger: {
            trigger: projectCards[i + 1],
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
      id="projects"
      className="relative bg-background py-24 md:py-32"
    >
      {/* Section Title */}
      <div ref={titleRef} className="container mb-20 md:mb-28 text-center md:text-left">
        <p className="title-line text-primary font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-4">
          Selected Works
        </p>
        <h2 className="title-line font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          Featured Projects
        </h2>
      </div>
      
      {/* Cards Container */}
      <div ref={cardsRef} className="container flex flex-col gap-10 md:gap-20">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-card relative w-full h-[70vh] md:h-[80vh] min-h-[500px] rounded-[2.5rem] overflow-hidden border border-white/5 bg-background"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000"
              style={{
                backgroundImage: `url(${project.image})`,
              }}
            />

            {/* Gradient Overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.2) 100%)',
              }}
            />

            {/* Project Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
                <span className="text-xs text-white/70 uppercase tracking-widest font-medium">
                  {project.category}
                </span>
              </div>

              <h3 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
                {project.title}
              </h3>

              <p className="text-white/70 text-base md:text-lg lg:text-xl mb-8 max-w-2xl leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-5 py-2.5 text-[10px] md:text-xs uppercase tracking-widest rounded-full border border-white/10 text-white/80 bg-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest transition-all"
                >
                  View Project
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  GitHub
                </motion.button>
              </div>
            </div>

            {/* Project Number */}
            <div className="absolute top-8 right-8 md:top-16 md:right-16 opacity-20">
              <span className="font-display text-7xl md:text-9xl text-outline">0{index + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
