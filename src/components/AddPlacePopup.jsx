import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentAddPlaceContext } from "../contexts/CurrentAddPlaceContext.js";

export default function AddPlacePopup(props) {
  // Подписка на контекст
  const currentAddPlace = useContext(CurrentAddPlaceContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setNameCard(currentAddPlace.name);
    setLink(currentAddPlace.link);
  }, [currentAddPlace]);

  const [nameCard, setNameCard] = useState("");
  const [link, setLink] = useState(" ");

  function handleChangeName(e) {
    setNameCard(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: nameCard,
      link,
    });
  }
  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      name="add-photo"
      title="Новое место"
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__item popup__item_add"
          name="name"
          type="text"
          id="name-img"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={nameCard || ""}
          onChange={handleChangeName}
        />
        <span className="popup__message name-img-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__item popup__item_add"
          name="about"
          type="url"
          id="link-img"
          placeholder="Ссылка на картинку"
          required
          value={link || ""}
          onChange={handleChangeLink}
        />
        <span className="popup__message link-img-error"></span>
      </label>
    </PopupWithForm>
  );
}
