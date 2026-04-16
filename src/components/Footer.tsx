import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

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
  { name: "Home", href: "#home" },
  { name: "Works", href: "#works" },
  { name: "About", href: "#about" },
];

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/Vijayku6367",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/vijayeth",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://x.com/Lakieth0",
  },
];

export default function Footer() {
  return (
    <footer className="w-full pt-8 bg-[#f5f5f5]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-[430px] mx-auto bg-[#050813] rounded-t-[52px] px-5 pt-10 pb-8"
      >
        {/* Top Text */}
        <p className="text-center text-white/90 text-[14px] leading-[1.4] font-medium max-w-[280px] mx-auto">
          Available for freelance work, contracts, and full time
          opportunities.
        </p>

        {/* Heading */}
        <h2 className="text-center text-white font-bold text-[38px] leading-[1] mt-6 tracking-[-1px]">
          Let’s work together
        </h2>

        {/* Email */}
        <p className="text-center text-white font-semibold text-[16px] mt-6">
          vijayeth0@gmail.com
        </p>

        {/* Contact Button */}
        <a
          href="vijayeth0@gmail.com"
          className="mt-6 w-full h-[40px] bg-[#f4f4f4] rounded-full flex items-center px-5"
        >
          <span className="flex-1 text-center text-[#111111] font-semibold text-[16px]">
            Contact Me
          </span>

          <span className="w-[40px] h-[40px] rounded-full bg-[#2d3343] flex items-center justify-center text-white">
            <ArrowUpRight size={18} strokeWidth={2.4} />
          </span>
        </a>

        {/* Nav Links */}
        <div className="flex justify-center gap-7 mt-10">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-white text-[15px] font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Social Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          {socialLinks.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="w-full h-[62px] bg-[#2d3343] rounded-[20px] flex items-center px-5"
              >
                <div className="w-[28px] h-[26px] rounded-lg bg-white flex items-center justify-center text-[#2d3343]">
                  <Icon size={18} />
                </div>

                <span className="flex-1 text-center text-white font-semibold text-[12px] pr-6">
                  {item.name}
                </span>
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </footer>
  );
}
