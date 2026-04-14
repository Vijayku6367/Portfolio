import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const titles = section.querySelectorAll('.contact-title');

      gsap.fromTo(
        titles,
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
          },
        }
      );

      const items = section.querySelectorAll('.contact-item');

      if (items.length > 0) {
        gsap.fromTo(
          items,
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
            },
          }
        );
      }
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

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: 'vijayeth0@gmail.com',
      href: 'mailto:vijayeth0@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+916367487223',
      href: 'tel:+916367487223',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'India',
      href: '#',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 bg-secondary overflow-hidden"
    >
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="font-display text-[25vw] text-outline opacity-5 whitespace-nowrap">
          TALK
        </h1>
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-20 text-center md:text-left">
          <p className="contact-title text-primary uppercase tracking-[0.3em] text-xs mb-4">
            Get In Touch
          </p>

          <h2 className="contact-title font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85]">
            LET'S <span className="text-outline">TALK</span>
          </h2>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-20 max-w-7xl mx-auto">
          
          {/* LEFT */}
          <div className="space-y-12">
            <p className="contact-item text-xl md:text-2xl text-muted leading-relaxed font-light">
              Have a project in mind? Let's create something extraordinary together.
            </p>

            {/* Contact Info */}
            <div className="space-y-8">
              {contactItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ x: 10 }}
                  className="contact-item flex items-center gap-6 group"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500">
                    <item.icon className="text-primary w-6 h-6 md:w-7 md:h-7" />
                  </div>

                  <div>
                    <p className="text-xs md:text-sm text-muted uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
                    <p className="font-medium text-lg md:text-xl">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="contact-item flex gap-5">
              {[
                { icon: Github, href: 'https://github.com/Vijayku6367' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/vijayeth' },
                { icon: Twitter, href: 'https://x.com/Lakieth0' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-500"
                >
                  <social.icon className="w-6 h-6 md:w-7 md:h-7" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* RIGHT FORM */}
          <form onSubmit={handleSubmit} className="contact-item space-y-10">
            <div className="space-y-12">

              <input
                type="text"
                placeholder="Your Name"
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                className="w-full py-5 text-lg md:text-xl bg-transparent border-b border-white/20 focus:border-primary outline-none transition"
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                className="w-full py-5 text-lg md:text-xl bg-transparent border-b border-white/20 focus:border-primary outline-none transition"
                required
              />

              <textarea
                placeholder="Your Message"
                rows={4}
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                className="w-full py-5 text-lg md:text-xl bg-transparent border-b border-white/20 focus:border-primary outline-none resize-none transition"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-6 bg-primary text-background font-bold rounded-full tracking-widest uppercase text-sm md:text-base flex items-center justify-center gap-4 hover:bg-primary/90 transition-all shadow-lg disabled:opacity-50"
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
                  <Send size={20} />
                </>
              )}
            </motion.button>
          </form>

        </div>
      </div>
    </section>
  );
}
