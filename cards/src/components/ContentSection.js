import { useEffect, useState } from "react";
import Card from "./Card";
import api from "../utils/api";

export default function ContentSection({ currentUser }) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getCardList()
        .then(response => {
            console.log(response.data);
            
            setCards(response.data);
        })
    }, []);

    function onCardClick(card) {
        console.log(card);
    }

    function onCardLike(card) {
        console.log(card);
    }

    function onCardDelete(card) {
        console.log(card);
    }

    return <section className="places page__section">
    <ul className="places__list">
      {cards.map((card) => (
        <Card
          key={card._id}
          card={card}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
          currentUser={currentUser}
        />
      ))}
    </ul>
  </section>;
}