import { updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import { FaTwitter } from 'react-icons/fa';
import { updateCurrentUser } from 'firebase/auth';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
function ListingItem({ cards }) {
  return (
    <>
      {cards.map((card) => {
        return (
          <div className="image-boxes" key={card.id}>
            <img src={card.image} alt={`art${card.id}`} className="card-img" />
            <div className="id">
              <Link to="/" className="discord">
                {card.discordId}
              </Link>
              <a
                href={`https://twitter.com/${card.handle}`}
                className="twitter-details"
              >
                <FaTwitter color="var(--primary-color)" /> {card.handle}
              </a>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ListingItem;
