import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { db } from '../firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import Spinner from '../components/Spinner';
import ListingItem from '../components/Listingitem';

function Gallery() {
  const colref = collection(db, 'cards');
  const [cards, setCards] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getDocs(colref)
      .then((snapshot) => {
        let cards = [];
        snapshot.docs.forEach((doc) => {
          cards.push({ ...doc.data(), id: doc.id });
        });
        setCards(cards);

        console.log(cards);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [colref]);

  return (
    <>
      <div className="container">
        <div className="gallery-header">
          <div className="gallery-heading">BALLERS CLUB</div>

          <form action="#">
            <div className="search-box">
              <button>
                <FaSearch
                  color="white"
                  fontSize="2rem"
                  className="search-icon"
                />
              </button>
              <input
                type="text"
                name=""
                id=""
                className="search"
                placeholder="Search for dicord id"
              />
            </div>
          </form>
        </div>
      </div>

      <section className="section-mirrors">
        <div className="container">
          <p className="section-subtext">Recent Uploads</p>
          <div className="grid--3--cols" id="image-container">
            {loading && <Spinner />}
            {cards && <ListingItem cards={cards} />}
          </div>
        </div>
      </section>

      <div className="text-center">
        <p className="rights">Powered by weirdstoner.eth & stanley</p>
      </div>
    </>
  );
}

export default Gallery;
