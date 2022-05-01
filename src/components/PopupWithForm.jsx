import React from "react";
import closeIcon from "../images/Close-Icon.svg";

function PopupWithForm(props) {
	return (
		<>
      <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
					<button onClick={props.onClose} type="button" className={`popup__close-button popup__close-button_type_${props.name}`}>
            <img
              className="popup__close popup__button-image"
              src={closeIcon}
              alt="закрыть"
            />
          </button>
          <h3 className={`popup__title popup__title_${props.name}`}>{props.title}</h3>
          <form
            method="get"
            name={props.name}
            className={`popup__form popup__form_type_${props.name}`}
            noValidate
					>
						{props.children}
					</form>
        </div>
			</div>
		</>
		);
}

export default PopupWithForm;

