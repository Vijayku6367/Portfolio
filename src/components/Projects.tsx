import { useEffect, useRef } from 'react';
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
    category: 'AI/ML Tool',
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
    category: 'UI/UX',
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
      const titleLines = title.querySelectorAll('.title-line');

      gsap.fromTo(
        titleLines,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.project-card',
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 85%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-background py-20 md:py-28"
    >
      {/* Title */}
      <div
        ref={titleRef}
        className="container mb-14 md:mb-20 text-center md:text-left"
      >
        <p className="title-line text-primary font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-4">
          Selected Works
        </p>

        <h2 className="title-line font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Featured Projects
        </h2>
      </div>

      {/* Grid */}
      <div className="container projects-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-card relative h-[420px] md:h-[460px] rounded-[2rem] overflow-hidden border border-white/10 bg-background"
          >
            {/* Image */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-105 hover:scale-110 transition-all duration-700"
              style={{
                backgroundImage: `url(${project.image})`,
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: project.color }}
                />

                <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/70">
                  {project.category}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3">
                {project.title}
              </h3>

              <p className="text-white/70 text-sm md:text-base leading-relaxed mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full text-[10px] md:text-xs uppercase tracking-wider border border-white/10 bg-white/5 text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Number */}
            <div className="absolute top-5 right-5 opacity-20">
              <span className="font-display text-5xl md:text-6xl">
                0{index + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
