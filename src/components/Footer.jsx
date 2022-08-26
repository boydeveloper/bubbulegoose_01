import React from 'react';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div className="section-footer">
      <div className="container">
        <div className="footer">
          <div className="grid--4--cols">
            <ul className="ft-box">
              <p className="ft-heading">Bubblegoose💎</p>
              <Link to="/" className="ft-links">
                Music
              </Link>
              <Link to="/" className="ft-links">
                WAGMI
              </Link>
            </ul>
            <ul className="ft-box">
              <p className="ft-heading">Legal</p>
              <Link to="/" className="ft-links">
                policy
              </Link>
              <Link to="/" className="ft-links">
                Terms of service
              </Link>
              <Link to="/" className="ft-links">
                Owners
              </Link>
            </ul>
            <ul className="ft-box">
              <p className="ft-heading">About us</p>
              <Link to="/" className="ft-links">
                Twitter
              </Link>
              <Link to="/" className="ft-links">
                WAGMI
              </Link>
              <Link to="/" className="ft-links">
                Careers
              </Link>
            </ul>
            <ul className="ft-box">
              <p className="ft-heading">My profile</p>
              <Link to="/" className="ft-links">
                Favorites
              </Link>
              <Link to="/" className="ft-links">
                WAGMI
              </Link>
              <Link to="/" className="ft-links">
                Careers
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
