import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { db } from '../firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import Spinner from '../components/Spinner';
import ListingItem from '../components/Listingitem';

function Gallery() {
  const [cards, setCards] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log('hi');
    const colref = collection(db, 'cards');
    getDocs(colref)
      .then((snapshot) => {
        let cards = [];
        snapshot.docs.forEach((doc) => {
          cards.push({ ...doc.data(), id: doc.id });
        });

        setCards(
          cards.sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate())
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="gallery-header">
          <div className="gallery-heading">BALLERS CLUB</div>

          <form>
            <div className="search-box">
              <FaSearch fontSize="2rem" color="#fff" />

              <input
                type="text"
                name=""
                id=""
                value={search}
                disabled
                onChange={(e) => setSearch(e.target.value)}
                className="search"
                placeholder="Search for dicord id"
              />
            </div>
          </form>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : cards && cards.length > 0 ? (
        <>
          <section className="section-mirrors">
            <div className="container">
              <p className="section-subtext">Recent Uploads</p>
              <div className="grid--3--cols" id="image-container">
                <ListingItem cards={cards} />
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="error">
          <h1>Arts not Found</h1>
        </div>
      )}

      <div className="text-center">
        <p className="rights">Powered by weirdstoner.eth & stanley</p>
      </div>
    </>
  );
}

export default Gallery;
