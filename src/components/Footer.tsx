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
    <footer className="w-full px-0 pt-10 pb-0 bg-[#f5f5f5]">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-[420px] mx-auto bg-[#050813] rounded-t-[50px] px-5 pt-10 pb-8"
      >
        {/* Top Text */}
        <p className="text-center text-white/90 text-[18px] leading-[1.3] font-medium max-w-[320px] mx-auto">
          Available for freelance work, contracts, and full time
          opportunities.
        </p>

        {/* Heading */}
        <h2 className="text-center text-white font-bold text-[38px] leading-[0.95] mt-8 tracking-[-2px]">
          Let’s work together
        </h2>

        {/* Email */}
        <p className="text-center text-white font-semibold text-[20px] mt-8">
          vijayeth0@gmail.com
        </p>

        {/* Contact Button */}
        <a
          href="vijayeth0@gmail.com"
          className="mt-8 w-full h-[74px] bg-[#f4f4f4] rounded-full flex items-center px-6"
        >
          <span className="flex-1 text-center text-[#111111] font-semibold text-[22px]">
            Contact Me
          </span>

          <span className="w-[52px] h-[52px] rounded-full bg-[#2d3343] flex items-center justify-center text-white">
            <ArrowUpRight size={26} strokeWidth={2.3} />
          </span>
        </a>

        {/* Nav Links */}
        <div className="flex justify-center gap-10 mt-14">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-white text-[14px] font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Social Buttons */}
        <div className="mt-10 flex flex-col gap-4">
          {socialLinks.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                viewport={{ once: true }}
                className="w-full h-[82px] bg-[#2d3343] rounded-[24px] flex items-center px-7"
              >
                <div className="w-[44px] h-[44px] rounded-xl bg-white flex items-center justify-center text-[#2d3343]">
                  <Icon size={24} />
                </div>

                <span className="flex-1 text-center text-white font-semibold text-[22px] pr-10">
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
