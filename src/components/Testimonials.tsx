import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    role: "CEO, TECHSTART",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    content:
      "Vijay transformed our vision into reality. His attention to detail and technical expertise are unmatched.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "PRODUCT LEAD, INNOVATECO",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    content:
      "Working with Vijay was an absolute pleasure. He brought creative solutions to complex problems.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "FOUNDER, DESIGNHUB",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    content:
      "The level of craftsmanship in Vijay's work is exceptional. He creates experiences users love.",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".title-anim",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
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

  /* Auto Rotate */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const next = () =>
    setCurrent((prev) => (prev + 1) % testimonials.length);

  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  const left =
    (current - 1 + testimonials.length) % testimonials.length;

  const right =
    (current + 1) % testimonials.length;

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 md:py-32 bg-[#f3f0e9] overflow-hidden"
    >
      {/* Quote BG */}
      <div className="absolute top-10 right-[-60px] opacity-[0.03] text-black pointer-events-none">
        <Quote size={420} />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Heading */}
        <div className="mb-20 text-center">
          <p className="title-anim text-sm tracking-[0.35em] uppercase text-gray-500 mb-4">
            Testimonials
          </p>

          <h2 className="title-anim text-5xl md:text-7xl font-semibold text-black">
            Client Reviews
          </h2>
        </div>

        {/* ONLY Bottom Section Kept */}
        <div className="relative max-w-6xl mx-auto h-[520px] flex items-center justify-center perspective-[2000px]">

          {/* Left Card */}
          <motion.div
            animate={{
              x: -320,
              scale: 0.82,
              rotateY: 45,
              opacity: 0.55,
            }}
            transition={{ duration: 0.8 }}
            className="absolute w-[290px] md:w-[320px] rounded-[2rem] bg-white shadow-xl p-8"
          >
            <div className="flex gap-1 text-yellow-500 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>

            <p className="text-gray-500 italic leading-relaxed mb-8 line-clamp-4">
              "{testimonials[left].content}"
            </p>

            <div className="flex items-center gap-4">
              <img
                src={testimonials[left].avatar}
                className="w-14 h-14 rounded-full object-cover border-2 border-black"
              />

              <div>
                <h4 className="font-bold text-black">
                  {testimonials[left].name}
                </h4>
                <p className="text-xs text-gray-500">
                  {testimonials[left].role}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main Center Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{
                opacity: 0,
                scale: 0.8,
                rotateY: -25,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateY: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                rotateY: 25,
              }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
              }}
              className="absolute z-20 w-[340px] md:w-[520px] rounded-[2rem] bg-white shadow-2xl p-10"
            >
              <div className="flex justify-center gap-1 text-yellow-500 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="text-gray-700 text-xl md:text-2xl italic text-center leading-relaxed mb-10">
                "{testimonials[current].content}"
              </p>

              <div className="flex flex-col items-center">
                <img
                  src={testimonials[current].avatar}
                  className="w-20 h-20 rounded-full object-cover border-2 border-black mb-4"
                />

                <h4 className="text-2xl font-bold text-black">
                  {testimonials[current].name}
                </h4>

                <p className="text-sm text-gray-500 tracking-widest uppercase">
                  {testimonials[current].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right Card */}
          <motion.div
            animate={{
              x: 320,
              scale: 0.82,
              rotateY: -45,
              opacity: 0.55,
            }}
            transition={{ duration: 0.8 }}
            className="absolute w-[290px] md:w-[320px] rounded-[2rem] bg-white shadow-xl p-8"
          >
            <div className="flex gap-1 text-yellow-500 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>

            <p className="text-gray-500 italic leading-relaxed mb-8 line-clamp-4">
              "{testimonials[right].content}"
            </p>

            <div className="flex items-center gap-4">
              <img
                src={testimonials[right].avatar}
                className="w-14 h-14 rounded-full object-cover border-2 border-black"
              />

              <div>
                <h4 className="font-bold text-black">
                  {testimonials[right].name}
                </h4>
                <p className="text-xs text-gray-500">
                  {testimonials[right].role}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Manual Controls */}
        <div className="flex justify-center gap-5 mt-14">
          <button
            onClick={prev}
            className="p-3 rounded-full bg-white shadow-lg hover:scale-110 transition"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={next}
            className="p-3 rounded-full bg-white shadow-lg hover:scale-110 transition"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
                }
