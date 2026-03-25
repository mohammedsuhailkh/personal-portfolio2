import { useState, useEffect } from "react";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import Typed from "./elements/Typed";

// tiny helper for stagger random rotations at module scope (pure fn, no hooks)
const rnd = (a, b) => Math.random() * (b - a) + a;

const HeroText = () => {
  const name = "suhail";
  const [timeUp, setTimeUp] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    const onTimeUp = () => setTimeUp(true);
    const onEnd = () => {
      setTimeUp(true);
      setGameEnded(true);
    };
    window.addEventListener("heroTimeUp", onTimeUp);
    window.addEventListener("heroGameEnd", onEnd);
    return () => {
      window.removeEventListener("heroTimeUp", onTimeUp);
      window.removeEventListener("heroGameEnd", onEnd);
    };
  }, []);

  return (
    <div
      className="noselect w-fit h-fit absolute z-10 flex flex-col justify-center items-center rounded-[50%]"
      id="repulse-div"
      style={{ color: "var(--text-primary)" }}
    >
      <LazyMotion features={domAnimation} strict>
        <AnimatePresence mode="wait">

          {/* ────────────────────────────────────────────────────────
              GAME ACTIVE STATE  →  "Let's SHOOT EM ALL!"
          ──────────────────────────────────────────────────────── */}
          {!timeUp && !gameEnded && (
            <m.div
              key="intro"
              initial="hidden"
              animate="visible"
              exit={{
                opacity: 0,
                scale: 0.65,
                filter: "blur(14px)",
                transition: { duration: 0.45 },
              }}
              className="text-center flex flex-col items-center cursor-default select-none"
            >
              {/* "Let's" */}
              <m.span
                variants={{
                  hidden:   { opacity: 0, y: -50 },
                  visible:  { opacity: 1, y:   0 },
                }}
                transition={{ delay: 0.10, duration: 0.7, type: "spring", bounce: 0.45 }}
                className="block text-5xl sm:text-7xl"
                style={{ fontFamily: "SuperMario" }}
              >
                Let's
              </m.span>

              {/* "SHOOT" */}
              <m.span
                variants={{
                  hidden:   { opacity: 0, scale: 0.35, rotate: -10 },
                  visible:  { opacity: 1, scale: 1,    rotate:   0 },
                }}
                transition={{ delay: 0.32, duration: 0.75, type: "spring", bounce: 0.5 }}
                className="block text-6xl sm:text-8xl font-black"
                style={{
                  fontFamily: "SuperMario",
                  color: "#f97316",
                  textShadow:
                    "0 0 28px rgba(249,115,22,0.65), 0 0 55px rgba(249,115,22,0.25)",
                  letterSpacing: "0.04em",
                }}
              >
                SHOOT
              </m.span>

              {/* "EM ALL!" — letter-by-letter stagger */}
              <m.div
                className="flex items-center"
                variants={{
                  hidden:   {},
                  visible:  {
                    transition: { staggerChildren: 0.075, delayChildren: 0.65 },
                  },
                }}
              >
                {"EM ALL!".split("").map((char, i) => (
                  <m.span
                    key={i}
                    variants={{
                      hidden:   { opacity: 0, y: 32, rotate: rnd(-18, 18) },
                      visible:  { opacity: 1, y:  0, rotate: 0 },
                    }}
                    transition={{ type: "spring", bounce: 0.6, duration: 0.55 }}
                    className="block text-5xl sm:text-7xl"
                    style={{
                      fontFamily: "SuperMario",
                      marginRight: char === " " ? "0.4em" : "0.02em",
                      color:
                        char === "!"
                          ? "#ef4444"
                          : char === " "
                          ? "transparent"
                          : "#facc15",
                      textShadow:
                        char === "!"
                          ? "0 0 22px rgba(239,68,68,0.75)"
                          : "0 0 18px rgba(250,204,21,0.5)",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </m.span>
                ))}
              </m.div>

              {/* Hint line */}
              <m.p
                variants={{
                  hidden:   { opacity: 0 },
                  visible:  { opacity: 1 },
                }}
                transition={{ delay: 1.35, duration: 0.9 }}
                style={{
                  marginTop: "1.1rem",
                  fontSize: "0.7rem",
                  fontFamily: "'Share Tech Mono', monospace",
                  color: "var(--text-secondary)",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                Click · Space · [1-5] Guns · [R] Reload
              </m.p>
            </m.div>
          )}

          {/* ────────────────────────────────────────────────────────
              GAME OVER STATE  →  "Hey I'm Suhail" + TypedText
          ──────────────────────────────────────────────────────── */}
          {gameEnded && (
            <m.div
              key="identity"
              initial="hidden"
              animate="visible"
              className="text-center flex flex-col justify-center items-center"
            >
              <m.h1
                variants={{
                  hidden:   {},
                  visible:  {
                    transition: { staggerChildren: 0.14, delayChildren: 0.15 },
                  },
                }}
                className="text-center flex justify-center items-center flex-col opacity-100 text-7xl sm:text-9xl cursor-default"
                style={{ fontFamily: "SuperMario" }}
              >
                <m.span
                  variants={{
                    hidden:   { opacity: 0, x: -90 },
                    visible:  { opacity: 1, x:   0 },
                  }}
                  transition={{ duration: 0.7, type: "spring" }}
                  className="bounce"
                >
                  Hey I'm{" "}
                </m.span>

                <m.div
                  variants={{
                    hidden:   { opacity: 0, x: 90 },
                    visible:  { opacity: 1, x:  0 },
                  }}
                  transition={{ duration: 0.7, type: "spring" }}
                >
                  {name.split("").map((char, index) => (
                    <span
                      key={index}
                      className="bounce"
                      style={{ fontSize: "1.2em", color: "var(--text-primary)" }}
                    >
                      {char}
                    </span>
                  ))}
                </m.div>
              </m.h1>

              {/* Typed component self-activates on heroGameEnd */}
              <Typed />
            </m.div>
          )}

        </AnimatePresence>
      </LazyMotion>
    </div>
  );
};

export default HeroText;
