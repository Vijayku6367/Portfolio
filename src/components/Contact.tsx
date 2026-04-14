import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
      className="relative py-24 md:py-32 bg-secondary"
    >
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h1 className="font-display text-[25vw] leading-none text-outline opacity-5 whitespace-nowrap">
          TALK
        </h1>
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-20 text-center md:text-left">
          <p className="contact-title text-primary uppercase tracking-[0.3em] text-xs mb-4">
            Get In Touch
          </p>

          <h2 className="contact-title font-display text-6xl md:text-8xl leading-[0.85]">
            LET'S <span className="text-outline">TALK</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 max-w-7xl mx-auto">
          {/* LEFT */}
          <div className="space-y-12">
            <p className="contact-item text-xl text-muted leading-relaxed">
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
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition">
                    <item.icon className="text-primary w-6 h-6" />
                  </div>

                  <div>
                    <p className="text-xs text-muted uppercase">{item.label}</p>
                    <p className="font-medium text-lg">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social */}
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
                  whileHover={{ y: -5 }}
                  className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-primary transition"
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* RIGHT FORM */}
          <form onSubmit={handleSubmit} className="contact-item space-y-10">
            <input
              type="text"
              placeholder="Your Name"
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
              className="w-full py-4 bg-transparent border-b border-white/20"
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
              className="w-full py-4 bg-transparent border-b border-white/20"
              required
            />

            <textarea
              placeholder="Your Message"
              rows={4}
              value={formState.message}
              onChange={(e) =>
                setFormState({ ...formState, message: e.target.value })
              }
              className="w-full py-4 bg-transparent border-b border-white/20"
              required
            />

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-primary rounded-full font-bold flex justify-center items-center gap-3"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <Send size={18} />
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}
