import { useEffect } from "react";
import NavBar from "../Components/nav/NavBar";
import Hero from "../Pages/Hero";
import About from "../Pages/About";
import ProjectCards from "../Components/ProjectCards";
import Skills from "../Pages/Skills";
import Contact from "../Pages/Contact";

/* ── Cursor glow + scroll-reveal helper ────────────────── */
function useGlassEffects() {
  useEffect(() => {
    // Cursor glow
    const glow = document.getElementById("cursor-glow");
    const onMove = (e) => {
      if (glow) {
        glow.style.left = `${e.clientX}px`;
        glow.style.top  = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", onMove);

    // Scroll-reveal via IntersectionObserver
    const targets = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((t) => io.observe(t));

    return () => {
      window.removeEventListener("mousemove", onMove);
      io.disconnect();
    };
  }, []);
}

function App() {
  useGlassEffects();

  return (
    <>
      {/* ── Cursor glow ── */}
      <div id="cursor-glow" aria-hidden="true" />

      {/* ── Animated gradient blobs ── */}
      <div className="glass-bg" aria-hidden="true">
        <div className="glass-bg__blob glass-bg__blob--1" />
        <div className="glass-bg__blob glass-bg__blob--2" />
        <div className="glass-bg__blob glass-bg__blob--3" />
        <div className="glass-bg__blob glass-bg__blob--4" />
      </div>

      {/* ── App content ── */}
      <NavBar />
      <Hero />
      <About />
      <ProjectCards />
      <Skills />
      <Contact />
    </>
  );
}

export default App;
