import MarqueeCards from "../Components/MarqueeCards";
import SectionTitle from "../Components/SectionTitle";
import SkillsCards from "../Components/SkillsCards";

const Skills = () => {
  return (
    <div id="skills" className="w-full overflow-hidden-web flex justify-center">
      <div className="w-full min-h-[800px] flex flex-col xl:w-[70%]">

        {/* Section heading */}
        <div className="w-full">
          <SectionTitle title="SKILLS" subtitle="WHAT I DO" />
        </div>

        {/* Marquee container with glass side borders */}
        <div className="skills-container-border h-full">

          {/* Row 1 — left */}
          <div className="relative">
            <div className="skills-track-line" />
            <MarqueeCards direction="left">
              <SkillsCards />
            </MarqueeCards>
          </div>

          {/* Spacer glow divider */}
          <div
            style={{
              height: "1px",
              margin: "0 24px",
              background:
                "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), rgba(34,211,238,0.2), transparent)",
            }}
          />

          {/* Row 2 — right */}
          <div className="relative">
            <div className="skills-track-line" />
            <MarqueeCards direction="right">
              <SkillsCards />
            </MarqueeCards>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Skills;
