import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t: number) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time: number) => {
      lenisRef.current?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(refreshTimeout);
      window.removeEventListener("resize", handleResize);
      lenisRef.current?.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen">
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Marquee />
        <Projects />
        <About />
        <Skills />
        <Services />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}

export default App;
