import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

// GSAP Plugin ko register karein
gsap.registerPlugin(ScrollTrigger);

// Testimonial data (same as before)
const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CEO, TechStart",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    content: "Vijay transformed our vision into reality. His attention to detail and technical expertise are unmatched. The final product exceeded all our expectations.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Product Lead, InnovateCo",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    content: "Working with Vijay was an absolute pleasure. He brought creative solutions to complex problems and delivered on time. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder, DesignHub",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    content: "The level of craftsmanship in Vijay's work is exceptional. He doesn't just build websites—he creates experiences that users love.",
    rating: 5,
  },
];

// Framer Motion Variants for Staggered Entrance
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);

  // GSAP animation for titles (no changes needed here, it's great!)
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

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-24 md:py-32 bg-background">
      <div className="absolute top-24 left-10 opacity-5 pointer-events-none">
        <Quote size={400} />
      </div>

      <div className="container relative z-10">
        <div className="mb-20 md:mb-28 text-center md:text-left">
          <p className="testimonials-title text-primary font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-4">
            Testimonials
          </p>
          <h2 className="testimonials-title font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            Client <span className="text-outline">Reviews</span>
          </h2>
        </div>

        {/* --- MODIFIED CARDS GRID --- */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-20 md:mb-28"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              // ✨ NEW: Enhanced Hover Animation
              whileHover={{
                y: -8, // Subtle lift effect
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
              }}
              // ✨ NEW: Smooth transition for hover-off
              transition={{ 
                duration: 0.3, 
                ease: "easeInOut" 
              }}
              className="glass rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between h-full border border-transparent hover:border-primary/20"
            >
              <div>
                <div className="flex gap-1 mb-8">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-lg md:text-xl leading-relaxed mb-10 font-light">
                  "{testimonial.content}"
                </p>
              </div>
              <div className="flex items-center gap-5">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl object-cover border-2 border-primary/20"
                />
                <div>
                  <h4 className="font-bold text-base md:text-lg">{testimonial.name}</h4>
                  <p className="text-xs md:text-sm text-muted uppercase tracking-widest">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* --- SLIDER SECTION (No changes needed) --- */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6 }}
              className="glass rounded-[3rem] p-10 md:p-20 text-center"
            >
              <img
                src={testimonials[current].avatar}
                alt={testimonials[current].name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] object-cover mx-auto mb-10 border-4 border-primary/20"
              />
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-10 max-w-3xl mx-auto italic">
                "{testimonials[current].content}"
              </p>
              <h4 className="font-display text-2xl md:text-3xl mb-2">{testimonials[current].name}</h4>
              <p className="text-muted text-sm md:text-base uppercase tracking-widest">{testimonials[current].role}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center items-center gap-8 mt-12">
            <motion.button onClick={prev} whileHover={{ scale: 1.1, x: -5 }} whileTap={{ scale: 0.9 }} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500">
              <ChevronLeft size={24} />
            </motion.button>
            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "bg-primary w-12" : "bg-white/10 w-3"}`} />
              ))}
            </div>
            <motion.button onClick={next} whileHover={{ scale: 1.1, x: 5 }} whileTap={{ scale: 0.9 }} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500">
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
