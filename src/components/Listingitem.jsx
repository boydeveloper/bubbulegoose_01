import { FaTwitter } from 'react-icons/fa';
import { updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
function ListingItem({ cards }) {
  const [discordId, setDiscordId] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setDiscordId(user.displayName);
    });
  });
  const auth = getAuth();

  return (
    <>
      {cards.map((card) => {
        return (
          <div className="image-boxes" key={card.id}>
            <img src={card.image} alt={`art${card.id}`} className="card-img" />
            <div className="id">
              <Link to="/" className="discord">
                {discordId}
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
