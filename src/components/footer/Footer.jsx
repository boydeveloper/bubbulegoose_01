import './footer.css';
import { FaEnvelope, FaTwitter, FaGithub } from 'react-icons/fa';
function Footer() {
  const date = new Date().getFullYear();
  return (
    <>
      <section className="section-footer">
        <div className="footer">
          <div className="copyright">
            <div className="text-center">
              <div className="ft-text">
                © {date} Bubblegoose All Rights Reserved
                <a
                  href="https://www.imdb.com/name/nm2092525/"
                  className="ft-link"
                >
                  carl jones.
                </a>
              </div>
              <div className="ft-links">
                <a href="mailto:daniel.onazi116@gmail.con" className="ft-link">
                  <FaEnvelope size={25} />
                </a>
                <a href="https://twitter.com/_danielvx" className="ft-link">
                  <FaTwitter size={25} />
                </a>

                <a href="https://github.com/boydeveloper" className="ft-link">
                  <FaGithub size={25} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
