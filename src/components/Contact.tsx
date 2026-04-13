import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const titles = section.querySelectorAll('.contact-title');
      gsap.fromTo(titles,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );

      const items = section.querySelectorAll('.contact-item');
      gsap.fromTo(items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: items[0],
            start: 'top 85%',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormState({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 bg-secondary"
    >
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <h1 className="font-display text-[25vw] leading-none text-outline opacity-5 whitespace-nowrap">
          TALK
        </h1>
      </div>

      <div className="container relative" style={{ zIndex: 1 }}>
        {/* Section Header */}
        <div className="mb-20 md:mb-28 text-center md:text-left">
          <p className="contact-title text-primary font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-4">
            Get In Touch
          </p>
          <h2 className="contact-title font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-[0.85]">
            LET'S <span className="text-outline">TALK</span>
          </h2>
        </div>

        {/* Contact Content */}
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 max-w-7xl mx-auto">
          {/* Left - Info */}
          <div className="space-y-12 md:space-y-16">
            <div className="contact-item">
              <p className="text-xl md:text-2xl lg:text-3xl text-muted leading-relaxed font-light">
                Have a project in mind? Let's create something extraordinary together.
                I'm always open to discussing new opportunities.
              </p>
            </div>

            <div className="contact-item space-y-8 md:space-y-10">
              {[
                { icon: Mail, label: 'Email', value: 'vijayeth0@gmail.com' },
                { icon: Phone, label: 'Phone', value: '+916367487223' },
                { icon: MapPin, label: 'Location', value: 'India' },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href="#"
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-6 group"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 glass flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500">
                    <item.icon size={24} className="text-primary md:w-7 md:h-7" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-muted uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="font-medium text-lg md:text-xl lg:text-2xl">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="contact-item flex gap-5">
              {[
                { icon: Github, href: 'https://github.com/Vijayku6367', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/vijayeth', label: 'LinkedIn' },
                { icon: Twitter, href: 'https://x.com/Lakieth0', label: 'Twitter' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-500"
                >
                  <social.icon size={24} className="md:w-7 md:h-7" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-item space-y-10"
          >
            <div className="space-y-12">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="form-input w-full py-5 text-lg md:text-xl lg:text-2xl bg-transparent"
                  required
                />
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-700 group-focus-within:w-full" />
              </div>

              <div className="relative group">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="form-input w-full py-5 text-lg md:text-xl lg:text-2xl bg-transparent"
                  required
                />
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-700 group-focus-within:w-full" />
              </div>

              <div className="relative group">
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="form-input w-full py-5 text-lg md:text-xl lg:text-2xl bg-transparent resize-none"
                  required
                />
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-700 group-focus-within:w-full" />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-6 md:py-8 bg-primary text-background font-bold rounded-full tracking-widest uppercase text-sm md:text-base flex items-center justify-center gap-4 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-6 h-6 border-2 border-background border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={20} className="md:w-6 md:h-6" />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}
