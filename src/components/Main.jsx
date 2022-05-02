import { useEffect, useState } from "react";
import Card from "./Card.jsx";
import { api } from "../utils/api";
import vectorEdit from "../images/Vector-edit.svg";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  let [userName, setUserName] = useState("");
  let [userDescription, setUserDescription] = useState("");
  let [userAvatar, setUserAvatar] = useState("");
  let [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([useData, card]) => {
        setUserName(useData.name);
        setUserAvatar(useData.avatar);
        setUserDescription(useData.about);

        setCards(card);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__block-avatar">
          <img className="profile__avatar" src={userAvatar} alt="Аватарка" />
          <button
            onClick={onEditAvatar}
            type="button"
            className="profile__photo"
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <button
            onClick={onEditProfile}
            type="button"
            className="profile__edit-button"
          >
            <img
              className="profile__img"
              src={vectorEdit}
              alt="Кнопка реактирования"
            />
          </button>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          aria-label="плюс"
          onClick={onAddPlace}
          type="button"
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card card={card} key={card._id} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
