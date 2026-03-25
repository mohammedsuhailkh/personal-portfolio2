import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../Constants/constants";

const SocialLinks = () => {
  return (
    <div className="glass-footer">
      <div className="glass-footer__icons">
        <a
          href="https://github.com/mohammedsuhailkh"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-social-icon"
          aria-label="GitHub"
        >
          <FontAwesomeIcon icon={icons.faGithub} />
        </a>
        <a
          href="mailto:sarap.mohammadsuhailkh.com"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-social-icon"
          aria-label="Email"
        >
          <FontAwesomeIcon icon={icons.faEnvelope} />
        </a>
        <a
          href="https://in.linkedin.com/in/mohammed-suhail-k-h-133624231"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-social-icon"
          aria-label="LinkedIn"
        >
          <FontAwesomeIcon icon={icons.faLinkedin} />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
