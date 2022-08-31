import React from 'react';
import { useParams } from 'react-router-dom';
import useGetData from '../hooks/useGetData';
import ListingItem from '../components/Listingitem';
import Spinner from '../components/Spinner';

function ViewProfile() {
  const { id } = useParams();
  const { cards, loading } = useGetData();

  return (
    <div className="container">
      <div className="viewPro-header">
        <div className="gallery-heading">Baller💎 {id}!</div>
      </div>

      <section className="section-mirrors">
        <p className="section-subtext">Baller's drop</p>
        {loading ? (
          <Spinner />
        ) : cards && cards.length > 0 ? (
          <div className="grid--3--cols" id="image-container">
            <ListingItem
              cards={cards
                .filter((card) => card.discordId === id)
                .sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate())}
            />
          </div>
        ) : (
          <div className="error">
            <h1>Arts not Found</h1>
          </div>
        )}
      </section>
    </div>
  );
}

export default ViewProfile;
