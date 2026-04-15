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
    description:
      'Real-time analytics platform with advanced data visualization and comprehensive reporting tools.',
    tech: ['React', 'Node.js', 'D3.js', 'PostgreSQL'],
    color: '#ff3d00',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    description:
      'High-performance shopping experience with AI-powered recommendations and seamless checkout.',
    tech: ['Next.js', 'Stripe', 'MongoDB', 'AWS'],
    color: '#00ff88',
    image:
      'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&q=80',
  },
  {
    id: 3,
    title: 'AI Content Generator',
    category: 'AI / ML Tool',
    description:
      'GPT-powered content creation platform with custom fine-tuning and brand voice adaptation.',
    tech: ['Python', 'FastAPI', 'OpenAI', 'React'],
    color: '#7c3aed',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
  },
  {
    id: 4,
    title: 'Design System',
    category: 'UI / UX',
    description:
      'Comprehensive component library for enterprise applications with accessibility-first approach.',
    tech: ['Figma', 'Storybook', 'TypeScript', 'CSS'],
    color: '#f59e0b',
    image:
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;

    if (!section || !title) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.title-line',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
          },
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>('.project-card');

      cards.forEach((card, i) => {
        gsap.set(card, { zIndex: cards.length - i });

        if (i === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: 'top 10%',
          pin: true,
          pinSpacing: false,
          endTrigger: cards[i + 1],
          end: 'top top',
          invalidateOnRefresh: true,
        });

        gsap.to(card, {
          y: -100,
          scale: 0.92,
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
      id="projects"
      className="relative py-20 md:py-28 overflow-hidden bg-background"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Smooth dark overlay */}
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* Glow layer */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* Title */}
      <div
        ref={titleRef}
        className="container relative z-10 mb-16 md:mb-24 text-center md:text-left"
      >
        <p className="title-line text-primary tracking-[0.3em] uppercase text-xs md:text-sm mb-4">
          Selected Works
        </p>

        <h2 className="title-line font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white">
          Featured Projects
        </h2>
      </div>

      {/* Cards */}
      <div className="container relative z-10 flex flex-col gap-8 md:gap-14">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-card relative w-full h-[58vh] md:h-[65vh] min-h-[420px] rounded-[2rem] overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-105"
              style={{
                backgroundImage: `url(${project.image})`,
              }}
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-black/65" />

            {/* Color Glow */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle at top right, ${project.color}, transparent 45%)`,
              }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-14 z-10">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: project.color }}
                />

                <span className="text-[10px] md:text-xs text-white/70 uppercase tracking-[0.3em]">
                  {project.category}
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                {project.title}
              </h3>

              <p className="text-white/70 text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-7">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/80 text-[10px] md:text-xs uppercase tracking-[0.2em]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-7 md:px-8 py-3 rounded-full bg-white text-black text-[11px] md:text-xs font-bold uppercase tracking-[0.25em]"
                >
                  View Project
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-7 md:px-8 py-3 rounded-full border border-white/20 text-white text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] hover:bg-white/10 transition-all"
                >
                  GitHub
                </motion.button>
              </div>
            </div>

            {/* Number */}
            <div className="absolute top-5 right-5 md:top-10 md:right-10 opacity-10 z-10">
              <span className="font-display text-6xl md:text-8xl text-outline">
                0{index + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
