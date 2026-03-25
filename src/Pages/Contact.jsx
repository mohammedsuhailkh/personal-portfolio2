import SocialLinks from "../Components/SocialLinks";

const Contact = () => {
  return (
    <div
      id="contact"
      className="w-full overflow-hidden-web flex flex-col items-center"
    >
      <div className="w-full flex flex-col">

        {/* Glass social icons row */}
        <SocialLinks />

        {/* Copyright bar */}
        <div className="glass-footer__copy">
          Made by <em>@mohammedsuhailkh</em>
        </div>

      </div>
    </div>
  );
};

export default Contact;
