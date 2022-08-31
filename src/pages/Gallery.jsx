import { FaPlusCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { db } from '../firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import ListingItem from '../components/Listingitem';
import Spinner from '../components/Spinner';

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

        setCards(cards);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="container gallery">
        <div className="gallery-header">
          <div className="gallery-form">
            <div className="gallery-heading">BALLERS CLUB</div>
          </div>
          <Link to="/adding" className="logout">
            <div className="flex">
              Add art
              <FaPlusCircle />
            </div>
          </Link>
        </div>

        <section className="section-mirrors">
          <p className="section-subtext">Baller's drop</p>
          {loading ? (
            <Spinner />
          ) : cards && cards.length > 0 ? (
            <div className="grid--3--cols" id="image-container">
              <ListingItem
                cards={cards.sort(
                  (a, b) => b.timestamp.toDate() - a.timestamp.toDate()
                )}
              />
            </div>
          ) : (
            <div className="error">
              <h1>Arts not Found</h1>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default Gallery;
