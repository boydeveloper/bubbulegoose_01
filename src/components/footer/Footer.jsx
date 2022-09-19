import './footer.css';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
function Footer() {
  const date = new Date().getFullYear();
  return (
    <>
      <div className="container">
        <div className="grid-4-cols footer">
          <div className="ft-box ft-box-1">
            bubblegoose💎
            <p className="ft-text">
              There are many variations of passages of Lorem the Ipsum available
              it majority.
            </p>
            <p className="ft-text">Check website url</p>
          </div>

          <div className="ft-box ft-box-4">
            <h2 className="ft-heading">Contact</h2>

            <div className="ft-details ft-margin">
              <FaPhone className="ft-icon" />
              <p>+088 (246) 642-27-10</p>
            </div>
            <div className="ft-details">
              <FaEnvelope className="ft-icon" />
              <p>Daniel.onazi116@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="copyright">
          <div className="text-center">
            © {date} Bubblegoose All Rights Reserved
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
