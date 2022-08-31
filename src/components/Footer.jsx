import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa';
function Footer() {
  const newDate = new Date();
  const year = newDate.getFullYear();

  return (
    <div className="section-footer">
      <div className="container">
        <div className="footer">
          <p className="copyright">
            Copyright bubblegoose all rights reserved....{year}
          </p>
          <span className="flex">
            <FaInstagram size={25} />
            <FaTwitter size={25} />
            <FaGithub size={25} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
