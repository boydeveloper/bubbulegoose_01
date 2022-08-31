import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useState, useEffect } from 'react';
import { db } from '../firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import carouselImg from '../img/crarouselimg.png';
import carouselImg2 from '../img/curry2.jpg';
import carouselImg3 from '../img/curry3.jpg';
import ListingItem from '../components/Listingitem';
import { getAuth } from 'firebase/auth';

function Home() {
  const [cards, setCards] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    const colref = collection(db, 'cards');
    getDocs(colref)
      .then((snapshot) => {
        let cards = [];
        snapshot.docs.forEach((doc) => {
          cards.push({ ...doc.data(), id: doc.id });
        });
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                <div>
                  <img
                    src={carouselImg3}
                    className="hero-image"
                    alt="carousel img"
                  />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </section>
      <section className="section-mirrors">
        <div className="container">
          <p className="section-subtext">Recent Uploads</p>
          {cards?.length > 0 ? (
            <>
              <div className="grid--3--cols" id="image-container">
                <ListingItem
                  cards={cards
                    .slice(0, 6)
                    .sort(
                      (a, b) => b.timestamp.toDate() - a.timestamp.toDate()
                    )}
                />
              </div>
              <div className="text-center">
                <button
                  className="viewMore"
                  onClick={() => navigate('/gallery')}
                >
                  View ballers mirror
                </button>
              </div>
            </>
          ) : (
            <div className="error">
              <h1>Arts not Found</h1>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
