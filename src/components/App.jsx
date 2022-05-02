import { useState } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  // const [inputValue, setInputValue] = useState("text");
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setisEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setisEditAvatarPopupOpen(false);
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  return (
    <div className="page">
      <Header />

      <Main
        onCardClick={handleCardClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      />

      <Footer />

      {/* <!-- popup просмотра фото--> */}
      <ImagePopup onClose={closeAllPopups} card={selectedCard} />

      {/* popup редактирования профиля */}
      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        name="profil-edit"
        title="Редактировать профиль"
        buttonText="Сохранить"
      >
        <label className="popup__label">
          <input
            className="popup__item popup__item_name"
            name="name"
            type="text"
            id="first-name"
            placeholder="Ваше имя"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="popup__message first-name-error"></span>
        </label>
        <label className="popup__label">
          <input
            className="popup__item popup__item_job"
            name="job"
            type="text"
            id="prof"
            placeholder="Ваша деятельность"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="popup__message prof-error"></span>
        </label>
      </PopupWithForm>

      {/* popup удаление карточки */}
      <PopupWithForm
        onClose={closeAllPopups}
        name="delete-photo"
        title="Вы уверены?"
        buttonText="Дa"
      ></PopupWithForm>

      {/* popup редактирования аватара */}
      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
      >
        <label className="popup__label">
          <input
            className="popup__item popup__item_add"
            name="link"
            type="url"
            id="link-avatar"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__message link-avatar-error"></span>
        </label>
      </PopupWithForm>

      {/* popup форма добавления фото */}
      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        name="add-photo"
        title="Новое место"
        buttonText="Создать"
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
          />
          <span className="popup__message name-img-error"></span>
        </label>
        <label className="popup__label">
          <input
            className="popup__item popup__item_add"
            name="job"
            type="url"
            id="link-img"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__message link-img-error"></span>
        </label>
      </PopupWithForm>
    </div>
  );
}

export default App;
