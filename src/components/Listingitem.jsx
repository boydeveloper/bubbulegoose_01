import { FaTwitter } from 'react-icons/fa';
import { updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import { updateCurrentUser } from 'firebase/auth';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
function ListingItem({ cards, profile }) {
  const auth = getAuth();
  const [discordId, setDiscordId] = useState(null);

  return (
    <>
      {cards.map((card) => {
        return (
          <div className="image-boxes" key={card.id}>
            <img src={card.image} alt={`art${card.id}`} className="card-img" />
            <div className="id">
              <Link to="/" className="discord">
                {updateCurrentUser
                  ? auth.currentUser.displayName
                  : card.discordId}
              </Link>
              <a
                href={'https://twitter.com/_danielvx'}
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
