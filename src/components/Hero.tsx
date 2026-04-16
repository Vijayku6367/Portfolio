import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const bgTextRef = useRef(null);
  const imageContainerRef = useRef(null);
  const contentRef = useRef(null);

  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 140 };

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [8, -8]),
    springConfig
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    springConfig
  );

  const lightX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [35, 65]),
    springConfig
  );

  const lightY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [35, 65]),
    springConfig
  );

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovering(false);
  };

  useEffect(() => {
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Entry animation
      gsap.fromTo(
        ".hero-stagger",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.08,
          ease: "power4.out",
          delay: 0.2,
        }
      );

      // Smooth parallax
      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      // Floating elements smoother
      gsap.utils.toArray(".floating-element").forEach((el, i) => {
        gsap.to(el, {
          y: -20 * (i + 1),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen h-auto flex items-center justify-center overflow-hidden bg-background pt-28 pb-20 md:pt-36 md:pb-28"
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-[90px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,61,0,.35) 0%, rgba(0,255,136,.15) 45%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="container relative z-10 flex flex-col lg:flex-row items-center justify-between gap-14 lg:gap-20 px-4"
      >
        {/* Left */}
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          <p className="hero-stagger text-primary uppercase tracking-[0.35em] text-xs md:text-sm mb-5">
            Since 2005
          </p>

          <h1 className="hero-stagger text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] font-bold mb-6">
            I'm Vijay
          </h1>

          <p className="hero-stagger text-lg md:text-xl text-white/70 mb-8">
            Full Stack Developer — UI Engineer — Problem Solver
          </p>

          <h2 className="hero-stagger text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-10">
            I Build Scalable
            <br />
            <span className="text-primary">Digital Experiences</span>
          </h2>

          <div className="hero-stagger flex flex-wrap justify-center lg:justify-start gap-5">
            <motion.a
              href="#projects"
              whileTap={{ scale: 0.94 }}
              whileHover={{ scale: 1.03 }}
              className="px-9 py-4 rounded-full bg-primary text-black font-semibold uppercase text-sm"
            >
              View Work
            </motion.a>

            <motion.a
              href="#contact"
              whileTap={{ scale: 0.94 }}
              whileHover={{ scale: 1.03 }}
              className="px-9 py-4 rounded-full border border-white text-white font-semibold uppercase text-sm hover:bg-white hover:text-black transition-all"
            >
              Hire Me
            </motion.a>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div
            ref={imageContainerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={resetMouse}
            className="relative"
            style={{ perspective: "1800px" }}
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              <motion.div
                className="absolute -inset-8 rounded-[3rem] opacity-25 blur-2xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${lightX}% ${lightY}%, ${
                    isHovering ? "#ff3d00" : "#00ff88"
                  } 0%, transparent 70%)`,
                }}
              />

              <div
                className="relative w-[300px] h-[400px] sm:w-[340px] sm:h-[460px] md:w-[390px] md:h-[520px] rounded-[3rem] overflow-hidden border border-white/10"
                style={{ transform: "translateZ(40px)" }}
              >
                <img
                  src="/upload_1.png"
                  alt="Vijay"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading="eager"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
          }
