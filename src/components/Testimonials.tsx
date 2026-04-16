import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CEO, TechStart",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    content:
      "Vijay transformed our vision into reality. His attention to detail and technical expertise are unmatched.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Product Lead, InnovateCo",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    content:
      "Working with Vijay was an absolute pleasure. Creative solutions to complex problems, delivered on time.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder, DesignHub",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
    content:
      "Exceptional craftsmanship. He creates user experiences that people love, not just websites.",
    rating: 5,
  },
];

export default function Testimonials() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let angle = 0;
    let frame: number;

    const animate = () => {
      if (!paused && carouselRef.current) {
        angle += 0.35;
        carouselRef.current.style.transform = `rotateY(${angle}deg)`;
      }

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, [paused]);

  return (
    <section
      id="testimonials"
      className="relative min-h-screen overflow-hidden bg-black py-24 px-4 flex flex-col items-center justify-center"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />

      {/* Quote Icon */}
      <Quote
        size={240}
        className="absolute top-10 left-10 text-white/5 pointer-events-none"
      />

      {/* Heading */}
      <div className="text-center mb-20 z-10">
        <p className="uppercase tracking-[0.35em] text-sm text-zinc-400 mb-4">
          Testimonials
        </p>

        <h2 className="text-5xl md:text-7xl font-bold text-white">
          Client Reviews
        </h2>
      </div>

      {/* 3D Carousel */}
      <div
        className="relative w-full max-w-[1100px] h-[500px] flex items-center justify-center z-10"
        style={{ perspective: "1800px" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={carouselRef}
          className="relative w-[340px] h-[420px]"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {testimonials.map((item, i) => {
            const rotate = i * 120;
            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.04, y: -10 }}
                transition={{ duration: 0.4 }}
                className="absolute top-0 left-0 w-[340px] h-[420px] rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
                style={{
                  transform: `rotateY(${rotate}deg) translateZ(420px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(item.rating)].map((_, index) => (
                    <Star
                      key={index}
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-zinc-300 leading-relaxed text-lg italic mb-8 min-h-[150px]">
                  "{item.content}"
                </p>

                {/* User */}
                <div className="mt-auto border-t border-white/10 pt-5 flex items-center gap-4">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-14 h-14 rounded-2xl object-cover"
                  />

                  <div>
                    <h4 className="text-white font-semibold">{item.name}</h4>
                    <p className="text-zinc-400 text-sm">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Text */}
      <p className="mt-12 text-sm text-zinc-500 z-10">
        {paused ? "⏸ Paused" : "🔄 Auto Rotating"}
      </p>
    </section>
  );
}
