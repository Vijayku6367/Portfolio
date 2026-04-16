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
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    content:
      "Vijay transformed our vision into reality. His attention to detail and technical expertise are unmatched.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Product Lead, InnovateCo",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    content:
      "Working with Vijay was an absolute pleasure. Creative solutions to complex problems, delivered on time.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder, DesignHub",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    content:
      "Exceptional craftsmanship. He creates user experiences that people love, not just websites.",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const [isHovered, setIsHovered] = useState(false);

  // Title animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonials-title",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Slider animation
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    animationRef.current = gsap.to(marquee, {
      xPercent: -50,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    return () => {
      animationRef.current?.kill();
      animationRef.current = null;
    };
  }, []);

  // Pause / Resume
  useEffect(() => {
    if (!animationRef.current) return;

    if (isHovered) {
      animationRef.current.pause();
    } else {
      animationRef.current.play();
    }
  }, [isHovered]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 md:py-32 bg-gradient-to-b from-background to-black/50 overflow-hidden"
    >
      <div className="absolute top-20 left-10 opacity-5 pointer-events-none">
        <Quote size={260} className="text-primary" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-20">
          <p className="testimonials-title text-primary uppercase tracking-[0.3em] text-sm mb-5">
            Testimonials
          </p>

          <h2 className="testimonials-title text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Client Reviews
          </h2>
        </div>

        {/* Slider */}
        <div
          className="overflow-hidden rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl py-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            ref={marqueeRef}
            className="flex gap-8"
            style={{ width: "max-content" }}
          >
            {[...testimonials, ...testimonials].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 250 }}
                className="w-80 md:w-96 flex-shrink-0 rounded-[2rem] p-8 bg-white/5 border border-white/10"
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-gray-300 leading-relaxed text-lg mb-8 italic min-h-[140px]">
                  "{item.content}"
                </p>

                <div className="flex items-center gap-4 border-t border-white/10 pt-5">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />

                  <div>
                    <h4 className="text-white font-semibold">{item.name}</h4>
                    <p className="text-primary text-sm">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-right text-xs text-white/60 px-6 pt-5">
            {isHovered ? "⏸️ Paused" : "🔄 Auto Sliding"}
          </div>
        </div>
      </div>
    </section>
  );
      }
