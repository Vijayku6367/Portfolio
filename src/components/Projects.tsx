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
      'Real-time analytics platform with advanced data visualization and reporting tools.',
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
      'High-performance shopping experience with AI-powered recommendations.',
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
      'GPT-powered content creation platform with custom brand voice tuning.',
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
      'Reusable enterprise component system with accessibility-first design.',
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
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
          },
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>('.project-card');

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: 'top 12%',
          pin: true,
          pinSpacing: false,
          endTrigger: section,
          end: 'bottom bottom',
          invalidateOnRefresh: true,
        });

        gsap.to(card, {
          scale: 0.94,
          opacity: 0.45,
          filter: 'blur(4px)',
          ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top 78%',
            end: 'top 12%',
            scrub: true,
          },
        });
      });
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

      {/* Cards */}
      <div className="container flex flex-col gap-8 md:gap-10">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-card relative w-full h-[420px] md:h-[470px] rounded-[2rem] overflow-hidden border border-white/10 bg-background"
          >
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 scale-105 hover:scale-110"
              style={{
                backgroundImage: `url(${project.image})`,
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: project.color }}
                />

                <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/70">
                  {project.category}
                </span>
              </div>

              <h3 className="font-display text-3xl md:text-5xl mb-4">
                {project.title}
              </h3>

              <p className="text-white/70 text-sm md:text-base max-w-2xl leading-relaxed mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-[10px] md:text-xs uppercase tracking-widest rounded-full border border-white/10 bg-white/5 text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Number */}
            <div className="absolute top-5 right-5 md:top-8 md:right-8 opacity-20">
              <span className="font-display text-5xl md:text-7xl">
                0{index + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
