import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { navLinks } from "../../Constants/constants";
import { bl33hIcon, menu, close } from "../../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [toggle]);

  return (
    <LazyMotion features={domAnimation} strict>
      <nav
        className="glass-nav"
        style={{
          background: scrolled || toggle
            ? "rgba(242, 245, 250, 0.85)"
            : "rgba(242, 245, 250, 0.45)",
          transition: "background 0.4s ease",
          borderBottom: toggle ? "1px solid transparent" : undefined
        }}
      >
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
          {/* ── Logo ── */}
          <Link
            to="/"
            className="glass-nav__logo"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
              setToggle(false);
            }}
          >
            <img
              src={bl33hIcon}
              alt="logo"
              className="w-18 h-9 object-contain"
              style={{ filter: "drop-shadow(0 4px 6px rgba(163,177,198,0.5))" }}
            />
          </Link>

          {/* ── Desktop links ── */}
          <ul className="glass-nav__links hidden sm:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="glass-nav__link"
                  style={{
                    color: active === link.title ? "var(--accent-1)" : undefined,
                  }}
                  onClick={() => setActive(link.title)}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Mobile hamburger ── */}
          <div className="sm:hidden flex flex-1 justify-end items-center relative z-50">
            <button
              className="glass-nav__hamburger"
              onClick={() => setToggle(!toggle)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <m.img
                  key={toggle ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="w-7 h-7 object-contain"
                  src={toggle ? close : menu}
                  alt="menu"
                  style={{ filter: "brightness(0) saturate(100%) invert(32%) sepia(16%) saturate(674%) hue-rotate(181deg) brightness(94%) contrast(85%)" }} // Approx hex #4a5568
                />
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Apple-style Fullscreen Mobile Menu ── */}
      <AnimatePresence>
        {toggle && (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 sm:hidden flex flex-col justify-center items-center"
            style={{
              background: "rgba(242, 245, 250, 0.95)",
              backdropFilter: "blur(30px) saturate(1.5)",
              WebkitBackdropFilter: "blur(30px) saturate(1.5)",
            }}
          >
            <ul className="list-none flex flex-col gap-8 text-center">
              {navLinks.map((link, index) => (
                <m.li
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <a
                    href={`#${link.id}`}
                    className="text-3xl font-semibold tracking-wide"
                    style={{
                      fontFamily: "var(--font-system)",
                      color: active === link.title ? "var(--accent-1)" : "var(--text-secondary)",
                      transition: "color 0.2s ease"
                    }}
                    onClick={() => {
                      setActive(link.title);
                      setToggle(false);
                    }}
                  >
                    {link.title}
                  </a>
                </m.li>
              ))}
            </ul>

            {/* Subtle decorative blob inside mobile menu */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,138,0,0.15) 0%, transparent 70%)",
                bottom: "-50px",
                right: "-50px",
                filter: "blur(40px)"
              }}
            />
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

export default Navbar;