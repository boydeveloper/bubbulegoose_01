function ListingItem({ cards }) {
  return (
    <>
      {cards.map((card) => {
        return (
          <div className="image-boxes" key={card.id}>
            <img src={card.image} alt={`art${card.id}`} className="card-img" />
            <div className="id">
              <h3>{card.discordId}</h3>
              <p>{card.handle}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ListingItem;
