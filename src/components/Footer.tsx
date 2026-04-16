import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, type LucideIcon } from 'lucide-react';

interface NavLink {
  name: string;
  href: string;
}

interface SocialLink {
  name: string;
  icon: LucideIcon;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'Works', href: '#projects' },
  { name: 'About', href: '#about' },
];

const socialLinks: SocialLink[] = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/Vijayku6367' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/vijayeth' },
  { name: 'Twitter', icon: Twitter, href: 'https://x.com/Lakieth0' },
];

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="px-4 pb-6 pt-0 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-[2rem] bg-secondary px-6 py-14 flex flex-col items-center gap-8 max-w-2xl mx-auto"
      >
        <p className="text-muted text-sm text-center leading-relaxed">
          Available for freelance work, contracts, and full time opportunities.
        </p>

        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground text-center leading-tight">
          {"Let\u2019s work together"}
        </h2>

        <p className="text-foreground font-semibold text-base tracking-wide">
          vijay.developer@gmail.com
        </p>

        <a
          href="mailto:vijay.developer@gmail.com"
          className="flex items-center w-full bg-foreground text-background rounded-full px-6 py-4 font-semibold text-base hover:opacity-90 transition-opacity"
        >
          <span className="flex-1 text-center">Contact Me</span>
          <span className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 text-foreground">
            <ArrowIcon />
          </span>
        </a>

        <div className="flex items-center gap-8 mt-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-foreground text-sm font-medium hover:text-muted transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex flex-col w-full gap-3">
          {socialLinks.map((social, i) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 bg-card rounded-2xl px-5 py-4 hover:opacity-80 transition-opacity"
              >
                <span className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-foreground" />
                </span>
                <span className="flex-1 text-center font-bold text-foreground text-base">
                  {social.name}
                </span>
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </footer>
  );
}
