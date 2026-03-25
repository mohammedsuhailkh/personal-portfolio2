import { m, LazyMotion, domAnimation } from "framer-motion";
import SectionTitle from "../Components/SectionTitle";
import { memoji } from "../Constants/constants";
import { introduction } from "../Constants/constants";
import ImageSlider from "../Components/elements/ImageSlider";

const About = () => {
  return (
    <div id="about" className="w-full flex justify-center overflow-hidden-web">
      <div className="w-full xl:w-[70%] flex flex-col pb-16">

        {/* Section heading */}
        <div className="w-full">
          <SectionTitle title="ABOUT ME" subtitle="Introduction" />
        </div>

        <div className="w-full flex flex-col-reverse sm:flex-row px-6 gap-6">

          {/* ── Text panel ── */}
          <div className="w-full md:w-[50%] md:h-full flex items-center mt-10">
            <LazyMotion features={domAnimation} strict>
              <m.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.65,
                  type: "spring",
                  stiffness: 90,
                  damping: 18,
                }}
                className="about-glass-panel w-full"
              >
                <m.p
                  style={{ fontFamily: "Inter, Poppins, sans-serif" }}
                  className="flex flex-col gap-5"
                >
                  <span className="about-text-chunk about-text-chunk--accent">
                    {introduction.text[0]}
                  </span>
                  <span className="about-text-chunk">{introduction.text[1]}</span>
                  <span className="about-text-chunk">{introduction.text[2]}</span>
                  <span className="about-text-chunk">{introduction.text[3]}</span>
                </m.p>
              </m.div>
            </LazyMotion>
          </div>

          {/* ── Image slider ── */}
          <div className="w-full md:w-[50%] flex h-full items-center justify-center">
            <div className="w-[80%] lg:w-[50%] h-[300px] sm:h-[350px] flex justify-center items-center">
              <ImageSlider images={memoji.image} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
