import { m, LazyMotion, domAnimation } from "framer-motion";
import { skills } from "../Constants/constants";

const SkillsCards = () => {
  return (
    <div className="flex">
      <LazyMotion features={domAnimation} strict>
        {skills.map((skill, index) => (
          <m.div
            key={index}
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.04,
              type: "spring",
              stiffness: 120,
              damping: 16,
            }}
            style={{ zIndex: `${index + 1}` }}
            className="skill-glass-card"
          >
            {/* Icon */}
            <div className="skill-icon-wrap">
              <img src={skill.icon} alt={skill.title} />
            </div>

            {/* Title */}
            <span className="skill-title">{skill.title}</span>

            {/* Description */}
            <span className="skill-desc">{skill.description}</span>
          </m.div>
        ))}
      </LazyMotion>
    </div>
  );
};

export default SkillsCards;