import React from 'react'
import closeIcon from "../images/Close-Icon.svg";

export default function ImagePopup(props) {
	return (
	<>
    {/* <!-- popup просмотра фото--> */}
      <div className={`popup popup_type_loock-photo ${props.card ? 'popup_opened' : ''}`}>
        <figure className="popup__figure">
          <button onClick={props.onClose} type="button" className="popup__close popup__close-button">
            <img
              className="popup__close popup__button-image popup__button-image_loock-photo"
              src={closeIcon}
              alt="закрыть"
            />
          </button>
          <img className="popup__image" src={props.card.link} alt={props.card.name} />
          <figcaption className="popup__figcaption"></figcaption>
        </figure>
			</div>
			</>
  )
}
