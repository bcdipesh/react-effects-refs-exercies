const Card = ({ code, image, value, suit }) => {
  return (
    <div className="Card">
      <img src={image} alt={`${value} of ${suit}`} />
    </div>
  );
};

export default Card;
