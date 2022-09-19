import './header.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import carouselImg from '../../assets/img/crarouselimg.png';
import carouselImg2 from '../../assets/img/bubble1.jpeg';

function Header() {
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="hero-landing">
            <div className="text-box">
              <h1 className="heading-primary">Bubblegoose fan art platform</h1>
              <p className="hero-text">
                Updated collections of the BubbleGoose community
              </p>
              <Link to="/adding" className="addArt-btn">
                Add art
              </Link>
            </div>
            <div className="image-box">
              <Carousel>
                <div>
                  <img
                    src={carouselImg}
                    className="hero-image"
                    alt="carousel img"
                  />
                </div>
                <div>
                  <img
                    src={carouselImg2}
                    className="hero-image"
                    alt="carousel img"
                  />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;
