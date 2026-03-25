import { m, LazyMotion, domAnimation } from "framer-motion";

const SectionTitle = ({ title, subtitle }) => {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial={{ x: -350, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.65, type: "spring", stiffness: 80, damping: 18 }}
        className="p-6 noselect"
      >
        {/* Subtitle pill */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <span
            style={{
              display: "inline-block",
              width: "28px",
              height: "1.5px",
              background: "linear-gradient(90deg, var(--accent-1), var(--accent-2))",
              borderRadius: "2px",
              flexShrink: 0,
            }}
          />
          <span className="section-subtitle">{subtitle}</span>
        </div>

        {/* Main title */}
        <h2 className="section-title tracking-wider">
          {title.split("").map((char, index) => {
            if (char === " ") return " ";
            return (
              <span key={index} className="bounce">
                {char}
              </span>
            );
          })}
        </h2>
      </m.div>
    </LazyMotion>
  );
};

export default SectionTitle;
