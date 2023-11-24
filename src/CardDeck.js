import axios from "axios";
import { useState, useEffect } from "react";
import Alert from "./Alert";
import Card from "./Card";

const CardDeck = () => {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [remaining, setRemaining] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const getBrandNewDeck = async () => {
      const resp = await axios.get("https://deckofcardsapi.com/api/deck/new/");
      setDeck(resp.data);
    };

    getBrandNewDeck();
  }, []);

  const drawCard = async () => {
    if (remaining !== 0) {
      const resp = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/`
      );

      setCards((cards) => [
        ...cards,
        {
          code: resp.data.cards[0].code,
          image: resp.data.cards[0].image,
          value: resp.data.cards[0].value,
          suit: resp.data.cards[0].suit,
        },
      ]);
      setRemaining(resp.data.remaining);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <div className="CardDeck">
      <button type="button" onClick={drawCard}>
        Gimme A Card!
      </button>

      {showAlert && <Alert type="Error" message="Error: no cards remaining!" />}

      <div className="cards">
        {cards &&
          cards.map(({ code, image, value, suit }) => (
            <Card
              key={code}
              code={code}
              image={image}
              value={value}
              suit={suit}
            />
          ))}
      </div>
    </div>
  );
};

export default CardDeck;
