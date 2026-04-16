import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", damping: 15, stiffness: 100 },
  },
};

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);

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
    <section ref={sectionRef} id="testimonials" className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Big Quote Background Icon */}
      <div className="absolute top-10 right-[-50px] opacity-[0.03] pointer-events-none text-white">
        <Quote size={500} />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header Section */}
        <div className="mb-20 text-center md:text-left">
          <p className="testimonials-title text-primary font-medium tracking-[0.3em] uppercase text-xs mb-4">
            Testimonials
          </p>
          <h2 className="testimonials-title font-display text-5xl md:text-7xl lg:text-8xl text-white">
            Client <span className="text-outline">Reviews</span>
          </h2>
        </div>

        {/* --- GRID CARDS SECTION --- */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              // ✨ STONGER HOVER ANIMATION
              whileHover={{ 
                y: -15, 
                transition: { duration: 0.3, ease: "easeOut" } 
              }}
              className="glass rounded-[2rem] p-8 flex flex-col justify-between h-full relative"
              style={{
                background: "rgba(255, 255, 255, 0.05)", // Inline backup bg
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
            >
              <div>
                <div className="flex gap-1 mb-6 text-yellow-500">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-8 italic font-light">
                  "{testimonial.content}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <h4 className="text-white font-bold text-base">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-tighter">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- MAIN SLIDER SECTION --- */}
        <div className="relative max-w-4xl mx-auto pt-20 border-t border-white/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-2xl md:text-4xl text-white font-light leading-snug italic mb-10">
                "{testimonials[current].content}"
              </p>
              <div className="flex flex-col items-center">
                <img
                  src={testimonials[current].avatar}
                  alt={testimonials[current].name}
                  className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-primary"
                />
                <h4 className="text-2xl text-white font-bold">{testimonials[current].name}</h4>
                <p className="text-primary text-sm uppercase tracking-widest">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Navigation */}
          <div className="flex justify-center gap-6 mt-10">
            <button onClick={prev} className="p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all">
              <ChevronLeft size={24} />
            </button>
            <button onClick={next} className="p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
                  }
