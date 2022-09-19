import './gallery.css';
import { FaPlusCircle } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import Card from '../../components/card/Card';
import Spinner from '../../utils/Preloader';
import useGetData from '../../hooks/useGetData';
import { useEffect, useLayoutEffect } from 'react';

function Gallery() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  const { cards, loading } = useGetData();

  return (
    <>
      <div className="section-gallery">
        <div className="container">
          <div className="gallery">
            <div className="gallery-header">
              <div className="gallery-form">
                <div className="gallery-heading">BALLERS CLUB</div>
              </div>
              <Link to="/adding" className="logout">
                Add art
                <FaPlusCircle />
              </Link>
            </div>
            <section className="section-mirrors">
              <p className="section-subtext">Baller's drop</p>
              {loading ? (
                <Spinner />
              ) : cards && cards.length > 0 ? (
                <div className="grid--3--cols" id="image-container">
                  <Card
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
        </div>
      </div>
    </>
  );
}

export default Gallery;
