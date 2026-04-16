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
      "Working with Vijay was an absolute pleasure. He brought creative solutions to complex problems.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder, DesignHub",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    content:
      "The level of craftsmanship in Vijay's work is exceptional. He creates experiences users love.",
    rating: 5,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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
      gsap.fromTo(
        ".testimonials-title",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const next = () =>
    setCurrent((prev) => (prev + 1) % testimonials.length);

  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  const getIndex = (offset: number) =>
    (current + offset + testimonials.length) % testimonials.length;

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
      {/* Background Quote */}
      <div className="absolute top-10 right-[-50px] opacity-[0.03] text-white pointer-events-none">
        <Quote size={500} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-20 text-center md:text-left">
          <p className="testimonials-title text-primary tracking-[0.3em] uppercase text-xs mb-4">
            Testimonials
          </p>

          <h2 className="testimonials-title text-5xl md:text-7xl lg:text-8xl text-white font-bold">
            Client Reviews
          </h2>
        </div>

        {/* Top Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{
                y: -12,
                scale: 1.02,
              }}
              className="rounded-3xl p-8 border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <div className="flex gap-1 text-yellow-500 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="currentColor"
                  />
                ))}
              </div>

              <p className="text-gray-300 italic leading-relaxed mb-8">
                "{item.content}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />

                <div>
                  <h4 className="text-white font-semibold">
                    {item.name}
                  </h4>
                  <p className="text-gray-400 text-xs uppercase">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 3D Coverflow Slider */}
        <div className="relative max-w-6xl mx-auto pt-20 border-t border-white/10">
          <div className="relative h-[420px] flex items-center justify-center perspective-[2000px]">

            {/* Left Card */}
            <motion.div
              key={`left-${current}`}
              initial={{ opacity: 0, x: -120 }}
              animate={{
                opacity: 0.45,
                x: -260,
                rotateY: 45,
                scale: 0.82,
              }}
              transition={{ duration: 0.6 }}
              className="absolute w-[280px] md:w-[320px] rounded-3xl p-8 bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <img
                src={testimonials[getIndex(-1)].avatar}
                className="w-14 h-14 rounded-full mb-5 object-cover"
              />
              <p className="text-gray-400 line-clamp-4">
                "{testimonials[getIndex(-1)].content}"
              </p>
            </motion.div>

            {/* Center Main Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  rotateY: -20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateY: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.85,
                  rotateY: 20,
                }}
                transition={{
                  duration: 0.65,
                  ease: "easeInOut",
                }}
                className="absolute z-20 w-[340px] md:w-[500px] rounded-[2rem] p-10 bg-white/10 border border-white/15 backdrop-blur-2xl shadow-2xl text-center"
              >
                <div className="flex justify-center gap-1 text-yellow-500 mb-5">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill="currentColor"
                    />
                  ))}
                </div>

                <p className="text-white text-xl md:text-2xl italic leading-relaxed mb-8">
                  "{testimonials[current].content}"
                </p>

                <img
                  src={testimonials[current].avatar}
                  alt={testimonials[current].name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-primary"
                />

                <h4 className="text-white text-2xl font-bold">
                  {testimonials[current].name}
                </h4>

                <p className="text-primary uppercase tracking-widest text-sm">
                  {testimonials[current].role}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Right Card */}
            <motion.div
              key={`right-${current}`}
              initial={{ opacity: 0, x: 120 }}
              animate={{
                opacity: 0.45,
                x: 260,
                rotateY: -45,
                scale: 0.82,
              }}
              transition={{ duration: 0.6 }}
              className="absolute w-[280px] md:w-[320px] rounded-3xl p-8 bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <img
                src={testimonials[getIndex(1)].avatar}
                className="w-14 h-14 rounded-full mb-5 object-cover"
              />
              <p className="text-gray-400 line-clamp-4">
                "{testimonials[getIndex(1)].content}"
              </p>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-6 mt-14">
            <button
              onClick={prev}
              className="p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={next}
              className="p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
                }
