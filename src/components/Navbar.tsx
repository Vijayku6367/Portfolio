import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#footer" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pillsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (open) {
      gsap.fromTo(
        pillsRef.current,
        {
          scale: 0,
          y: 30,
          opacity: 0,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.08,
        }
      );
    }
  }, [open]);

  return (
    <>
      {/* Top Navbar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 pt-5"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Bubble */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            className="h-14 px-6 rounded-full bg-white shadow-xl flex items-center justify-center"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="h-9 w-auto object-contain brightness-0"
            />
          </motion.a>

          {/* Toggle Bubble */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setOpen(!open)}
            className="w-14 h-14 rounded-full bg-white shadow-xl flex flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`w-6 h-[2px] bg-black rounded transition-all ${
                open ? "rotate-45 translate-y-[4px]" : ""
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-black rounded transition-all ${
                open ? "-rotate-45 -translate-y-[4px]" : ""
              }`}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Bubble Overlay Menu */}
      {open && (
        <div className="fixed inset-0 z-[90] bg-black/25 backdrop-blur-md flex items-center justify-center px-4">
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-5">
            {navLinks.map((item, i) => (
              <a
                key={item.name}
                href={item.href}
                ref={(el) => (pillsRef.current[i] = el)}
                onClick={() => setOpen(false)}
                className="h-24 md:h-28 rounded-full bg-white text-black text-xl md:text-2xl font-semibold flex items-center justify-center shadow-2xl hover:scale-105 transition-all"
                style={{
                  transform:
                    i % 2 === 0 ? "rotate(-7deg)" : "rotate(7deg)",
                }}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
