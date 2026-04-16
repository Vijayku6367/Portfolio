import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CEO, TechStart",
    content:
      "Vijay transformed our vision into reality. His attention to detail and technical expertise are unmatched.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Product Lead, InnovateCo",
    content:
      "Working with Vijay was an absolute pleasure. Creative solutions to complex problems, delivered on time.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder, DesignHub",
    content:
      "Exceptional craftsmanship. He creates user experiences that people love, not just websites.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const next = () =>
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];
  const left =
    testimonials[(index - 1 + testimonials.length) % testimonials.length];
  const right = testimonials[(index + 1) % testimonials.length];

  return (
    <section
      id="testimonials"
      className="relative h-screen min-h-[900px] bg-[#f4f4f4] overflow-hidden flex flex-col items-center justify-center px-4"
    >
      {/* Top Badge */}
      <div className="mb-8">
        <div className="px-8 py-3 rounded-full border border-sky-400 text-sky-500 text-lg flex items-center gap-3">
          <span className="w-3 h-3 bg-sky-400 rounded-full" />
          Testimonials
        </div>
      </div>

      {/* Heading */}
      <h2 className="max-w-4xl text-center text-black text-4xl md:text-6xl font-bold leading-tight mb-20">
        A few words from people I’ve worked with on different projects.
      </h2>

      {/* Cards Area */}
      <div className="relative w-full max-w-6xl h-[420px] flex items-center justify-center">
        {/* Left Card */}
        <motion.div
          key={left.id}
          className="hidden md:block absolute left-12 w-[230px] h-[320px] rounded-[28px] bg-white shadow-xl p-6 opacity-70"
          initial={{ opacity: 0, x: -80 }}
          animate={{
            opacity: 0.65,
            x: 0,
            rotateY: 28,
            scale: 0.88,
          }}
        >
          <p className="text-zinc-500 text-sm leading-relaxed line-clamp-6">
            "{left.content}"
          </p>

          <div className="absolute bottom-6 left-6">
            <h4 className="font-semibold text-zinc-900 text-sm">{left.name}</h4>
            <p className="text-xs text-zinc-500">{left.role}</p>
          </div>
        </motion.div>

        {/* Main Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.55 }}
            className="absolute z-20 w-[320px] md:w-[620px] h-[360px] md:h-[380px] rounded-[34px] bg-white shadow-2xl px-8 md:px-14 py-10"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            {/* Text */}
            <p className="text-zinc-700 text-base md:text-3xl leading-snug md:leading-snug mb-10">
              “{current.content}”
            </p>

            {/* Footer */}
            <div className="absolute bottom-10 left-8 md:left-14">
              <h3 className="font-bold text-xl md:text-4xl text-zinc-900">
                {current.name}
              </h3>
              <p className="text-zinc-500 text-sm md:text-lg">{current.role}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right Card */}
        <motion.div
          key={right.id}
          className="hidden md:block absolute right-12 w-[230px] h-[320px] rounded-[28px] bg-white shadow-xl p-6 opacity-70"
          initial={{ opacity: 0, x: 80 }}
          animate={{
            opacity: 0.65,
            x: 0,
            rotateY: -28,
            scale: 0.88,
          }}
        >
          <p className="text-zinc-500 text-sm leading-relaxed line-clamp-6">
            "{right.content}"
          </p>

          <div className="absolute bottom-6 left-6">
            <h4 className="font-semibold text-zinc-900 text-sm">
              {right.name}
            </h4>
            <p className="text-xs text-zinc-500">{right.role}</p>
          </div>
        </motion.div>

        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute left-0 md:left-2 z-30 w-14 h-14 rounded-full bg-zinc-400/80 hover:bg-zinc-500 text-white flex items-center justify-center"
        >
          <ChevronLeft size={26} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute right-0 md:right-2 z-30 w-14 h-14 rounded-full bg-zinc-400/80 hover:bg-zinc-500 text-white flex items-center justify-center"
        >
          <ChevronRight size={26} />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-14 bg-zinc-600 rounded-full px-5 py-3 flex gap-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "bg-white scale-110" : "bg-zinc-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
            }
