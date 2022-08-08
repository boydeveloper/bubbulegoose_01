import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useState, useEffect } from 'react';
import { db } from '../firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import art2 from '../img/art2.png';
import art1 from '../img/art1.png';
import art3 from '../img/art3.png';
import carouselImg from '../img/crarouselimg.png';
import carouselImg2 from '../img/curry2.jpg';
import carouselImg3 from '../img/curry3.jpg';
import ListingItem from '../components/Listingitem';

function Home() {
  // const colref = collection(db, 'cards');
  // const [cards, setCards] = useState(null);

  // useEffect(() => {
  //   getDocs(colref)
  //     .then((snapshot) => {
  //       let cards = [];
  //       snapshot.docs.forEach((doc) => {
  //         cards.push({ ...doc.data(), id: doc.id });
  //       });
  //       setCards(cards);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [colref, cards]);

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="hero-landing">
            <div className="text-box">
              <h1 className="heading-primary">Bubblegoose Fan Art Shop</h1>
              <p className="hero-text">
                Updated collections of the BubbleGoose community
              </p>
              <Link to="/adding" className="hero-btn">
                ADD ART
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
          <div className="grid--3--cols" id="image-container">
            {/* <ListingItem card={cards} /> */}
            <div className="image-boxes">
              <img src={art1} alt="art 1" className="card-img" />
              <div className="id">
                <h3>ALLMIGHTO#2879</h3>
                <p>@weirdstoner_eth</p>
              </div>
            </div>
            <div className="image-boxes">
              <img src={art2} alt="" className="card-img" />
              <div className="id">
                <h3>ALLMIGHTO#2879</h3>
                <p>@weirdstoner_eth</p>
              </div>
            </div>
            <div className="image-boxes">
              <img src={art3} alt="art image" className="card-img" />
              <div className="id">
                <h3>ALLMIGHTO#2879</h3>
                <p>@weirdstoner_eth</p>
              </div>
            </div>
            <div className="image-boxes">
              <img src={art1} alt="art image" className="card-img" />
              <div className="id">
                <h3>ALLMIGHTO#2879</h3>
                <p>@weirdstoner_eth</p>
              </div>
            </div>
            <div className="image-boxes">
              <img src={art2} alt="art 1" className="card-img" />
              <div className="id">
                <h3>ALLMIGHTO#2879</h3>
                <p>@weirdstoner_eth</p>
              </div>
            </div>
            <div className="image-boxes">
              <img src={art3} alt="" className="card-img" />
              <div className="id">
                <h3>ALLMIGHTO#2879</h3>
                <p>@weirdstoner_eth</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
