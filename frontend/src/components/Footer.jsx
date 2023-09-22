// import imgEmail from "../../src/images/email2.png";
// import githubImg from "../../src/images/github2.png";
// import inImg from "../../src/images/in.png";
import { AiFillGithub, AiFillLinkedin, AiOutlineMail} from "react-icons/ai";


const Footer = () => (
  <div className="footer-container">
    <div id="contact-section" className="contact-section">
      <hr className="hr"></hr>
      <h4>Desarrollado por Agustin Nazer 👨🏽‍💻</h4>
      <div id="contact" className="contact">
        <a
          href="https://www.linkedin.com/in/agust%C3%ADnnazer/"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillLinkedin className="img-footer"/>
          <h2>LinkedIn</h2>
        </a>
        <a href="https://github.com/AgusNazer" target="_blank" rel="noreferrer">
          <AiFillGithub className="img-footer" />
          <h2>Github</h2>
        </a>
        <a
          href="mailto:Agustin.nazer@hotmail.com "
          target="_blank"
          rel="noreferrer"
        >
          <AiOutlineMail className="img-footer" />
          <h2>Email</h2>
        </a>
      </div>
    </div>
  </div>
);

export default Footer;
