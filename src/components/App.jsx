import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import ImagePopup from "./ImagePopup.jsx";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([useData, card]) => {
        setCurrentUser(useData);
        setCards(card);

        console.log("card", card);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, []);

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

  function chandleUpdateUser(data) {
    api
      .editProfile(data)
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }
  function handleUpdateAvatar(avatar) {
    api
      .editAvatarProfile(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  //card

  let [cards, setCards] = useState([]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    const request = isLiked ? api.deleteLike(card._id) : api.addLike(card._id);
    request.then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((res) => {
        console.log(res);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          onCardClick={handleCardClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />

        {/* <!-- popup просмотра фото--> */}
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />

        {/* popup редактирования профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={chandleUpdateUser}
        />

        {/* popup удаление карточки */}
        <PopupWithForm
          onClose={closeAllPopups}
          name="delete-photo"
          title="Вы уверены?"
          buttonText="Дa"
        ></PopupWithForm>

        {/* popup редактирования аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

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
              name="about"
              type="url"
              id="link-img"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__message link-img-error"></span>
          </label>
        </PopupWithForm>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
