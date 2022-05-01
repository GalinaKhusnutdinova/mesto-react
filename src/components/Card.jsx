import React from "react";

function Card(props) {
	function handleClick() {
  props.onCardClick(props.card);
	}  
	
  return (
    <div className="elements__element" onClick={handleClick}>
							<button
								type="button"
								className="popup__delete-button"
								aria-label="удалить"
								></button>
								<img className="elements__image" src={props.card.link} alt={props.card.name} />
								<div className="elements__content">
									<h2 className="elements__title">{props.card.name}</h2>
									<div className="elements__like-content">
										<button
											type="button"
											className="elements__group"
											aria-label="поставить лайк"
										></button>
										<span className="elements__like-number">{props.card.likes.length}</span>
									</div>
								</div>
					</ div>
  );
}

export default Card;
