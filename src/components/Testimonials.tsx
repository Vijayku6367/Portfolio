import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CEO, TechStart",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    content: "Vijay transformed our vision into reality. His attention to detail and technical expertise are unmatched.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Product Lead, InnovateCo",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    content: "Working with Vijay was an absolute pleasure. Creative solutions to complex problems, delivered on time.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder, DesignHub",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    content: "Exceptional craftsmanship. He creates user experiences that people love, not just websites.",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // GSAP Title Animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const titles = section.querySelectorAll(".testimonials-title");
      gsap.fromTo(
        titles,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Infinite Marquee Animation (Auto-rotate)
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const ctx = gsap.context(() => {
      // Duplicate cards for seamless infinite loop
      const cards = marquee.querySelectorAll(".testimonial-card");
      
      // Animate from 0 to -50% width (3 cards width), then repeat
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
      
      tl.to(marquee, {
        xPercent: -100, // Move full width of duplicated cards
        duration: isHovered ? 0 : 20, // 20 seconds full cycle (pause on hover)
        paused: isHovered,
      });

      return tl;
    }, marquee);

    return () => ctx.revert();
  }, [isHovered]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 md:py-32 bg-gradient-to-b from-background to-black/50 overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 opacity-5 pointer-events-none">
        <Quote size={300} className="text-primary" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-5 pointer-events-none rotate-12">
        <Quote size={250} className="text-primary" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-24">
          <p className="testimonials-title text-primary font-medium tracking-[0.3em] uppercase text-sm mb-6">
            Testimonials
          </p>
          <h2 className="testimonials-title font-display text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Client Reviews
          </h2>
        </div>

        {/* ✨ AUTO-ROTATING 3 CARDS MARQUEE */}
        <div
          className="relative overflow-hidden rounded-3xl bg-black/20 backdrop-blur-xl border border-white/10 py-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            ref={marqueeRef}
            className="flex gap-8 whitespace-nowrap"
            style={{ width: "300%" }} // 3 sets of cards for infinite loop
          >
            {/* Original 3 Cards + Duplicated for Infinite Loop */}
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                className="testimonial-card inline-block flex-shrink-0 w-80 md:w-96 h-[380px] glass rounded-[2.5rem] p-8 flex flex-col justify-between"
                whileHover={{
                  y: -15,
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-yellow-400 text-yellow-400 drop-shadow-lg" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xl md:text-2xl leading-relaxed font-light text-gray-200 italic mb-8 flex-1">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/30 shadow-lg"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-white">{testimonial.name}</h4>
                    <p className="text-primary text-sm uppercase tracking-wider font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pause Indicator */}
          <div className="absolute top-4 right-4 text-xs text-white/70">
            {isHovered ? "⏸️ Paused" : "🔄 Auto"}
          </div>
        </div>

        {/* Subtle Dots (Optional - shows current position) */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                i === (Math.floor(Date.now() / 4000) % 3) ? "bg-primary scale-125 w-6" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
          }
