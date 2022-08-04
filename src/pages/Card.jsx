import { useParams } from 'react-router-dom';
function Card() {
  const { id } = useParams();
  return (
    <div>
      <div className="card">
        <h1>card details {id}</h1>
      </div>
    </div>
  );
}

export default Card;
