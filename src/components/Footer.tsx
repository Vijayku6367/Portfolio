import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/Vijayku6367', label: 'GitHub Profile' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/vijayeth', label: 'LinkedIn Profile' },
  { name: 'Twitter', icon: Twitter, href: 'https://x.com/Lakieth0', label: 'Twitter Profile' },
];

export default function Footer() {
  return (
    <footer className="py-8 md:py-12 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          <div className="flex flex-col items-center md:items-start gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <span className="font-display text-2xl md:text-3xl tracking-tight">VIJAY</span>
              <span className="text-primary text-2xl md:text-3xl">.</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted text-sm"
            >
              © 2024 All rights reserved.
            </motion.p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-6">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.2, color: 'var(--primary)' }}
                  className="text-muted hover:text-primary transition-colors p-2"
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted text-sm flex items-center gap-2"
            >
              Made with <span className="text-primary">❤️</span> by Vijay
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}
