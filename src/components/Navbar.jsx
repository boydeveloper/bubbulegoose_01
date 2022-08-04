import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
function Navbar() {
  const navigate = useNavigate();
  const [openNav, setOpenav] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <nav className={openNav ? 'nav nav-open' : 'nav'}>
          <div className="nav-brand" onClick={() => navigate('/')}>
            BubbleGoose 💎
          </div>

          <ul className="nav-links">
            <li className="nav-link margin">
              <Link
                to="https://twitter.com/BubblegooseXYZ?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                className="nav-item"
              >
                Twitter
              </Link>
            </li>
            <li className="nav-link margin">
              <Link
                to="https://www.magiceden.io/marketplace/bubblegoose_ballers"
                className="nav-item"
              >
                Official Website
              </Link>
            </li>
            <li className="nav-link margin">
              <Link to="/gallery" className="nav-item">
                Art Gallery
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/profile" className="nav-item">
                Profile
              </Link>
            </li>
          </ul>
          <button className="menu-btn" onClick={() => setOpenav(!openNav)}>
            <FaBars className="bar-btn" />
            <FaTimes className="close-btn" />
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
