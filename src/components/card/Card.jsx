import './card.css';
import { FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function Card({ cards }) {
  return (
    <>
      {cards.map((card) => {
        return (
          <div className="image-boxes" key={card.id}>
            <img src={card.image} alt={`art${card.id}`} className="card-img" />
            <div className="id">
              <Link to={`/profile/${card.discordId}`} className="discord">
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

export default Card;
