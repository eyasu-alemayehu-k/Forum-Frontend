import "./Footer.css";
import { Link } from "react-router-dom";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
          <div className="footer__row">
            <div className="footer__col--social">
              <div className="logo-footer">
                <Link className="navbar-brand" to="/">
                  <img src="/evangadi-logo-footer.png" alt="" />
                </Link>
              </div>
              <ul className="footer-social-list">
                <li>
                  <Link
                    to="https://www.facebook.com/evangaditech"
                    target="_blank"
                  >
                    <i className="social_facebook ">
                      <FacebookIcon />
                    </i>
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://www.instagram.com/evangaditech/"
                    target="_blank"
                  >
                    <i className="social_instagram ">
                      <InstagramIcon />
                    </i>
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://www.youtube.com/c/weareethiopians"
                    target="_blank"
                  >
                    <i className="social_youtube ">
                      <YouTubeIcon />
                    </i>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer__col--link">
              <h5>Useful Link</h5>
              <ul className="list-menu">
                <li>
                  <Link to="/explained">How it works </Link>
                </li>
                <li>
                  <Link to="/legal/terms/">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/legal/privacy/">Privacy policy</Link>
                </li>
              </ul>
            </div>
            <div className="footer__col--contact">
              <h5>Contact Info</h5>
              <ul className="list-menu contact-list">
                <li>Evangadi Networks</li>
                <li>support@evangadi.com</li>
                <li>+1-202-386-2702</li>
              </ul>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
