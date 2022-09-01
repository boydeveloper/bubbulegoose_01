import { FaPlusCircle } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import ListingItem from '../components/Listingitem';
import Spinner from '../components/Spinner';
import useGetData from '../hooks/useGetData';

function Gallery() {
  const { cards, loading } = useGetData();

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
