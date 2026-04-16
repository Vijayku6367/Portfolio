import { useState } from "react";
import BubbleMenu from "./BubbleMenu.tsx";

const navItems = [
  {
    label: "home",
    href: "#",
    ariaLabel: "Home",
    rotation: -8,
    hoverStyles: { bgColor: "#ff6b00", textColor: "#ffffff" },
  },
  {
    label: "projects",
    href: "#projects",
    ariaLabel: "Projects",
    rotation: 8,
    hoverStyles: { bgColor: "#2563eb", textColor: "#ffffff" },
  },
  {
    label: "about",
    href: "#about",
    ariaLabel: "About",
    rotation: -8,
    hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" },
  },
  {
    label: "skills",
    href: "#skills",
    ariaLabel: "Skills",
    rotation: 8,
    hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" },
  },
  {
    label: "services",
    href: "#services",
    ariaLabel: "Services",
    rotation: -8,
    hoverStyles: { bgColor: "#ef4444", textColor: "#ffffff" },
  },
  {
    label: "contact",
    href: "#footer",
    ariaLabel: "Contact",
    rotation: 8,
    hoverStyles: { bgColor: "#14b8a6", textColor: "#ffffff" },
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <BubbleMenu
        logo={
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-auto object-contain brightness-0 contrast-200"
          />
        }
        items={navItems}
        onMenuClick={setOpen}
        menuAriaLabel="Toggle navigation"
        menuBg="#ffffff"
        menuContentColor="#111111"
        useFixedPosition={true}
        animationEase="back.out(1.5)"
        animationDuration={0.55}
        staggerDelay={0.12}
        className="z-[999]"
        style={{
          top: "20px",
          left: "0",
          right: "0",
          padding: "0 20px",
        }}
      />

      {/* Blur Background While Open */}
      <div
        className={`fixed inset-0 z-[90] transition-all duration-500 pointer-events-none ${
          open ? "bg-black/20 backdrop-blur-md opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
