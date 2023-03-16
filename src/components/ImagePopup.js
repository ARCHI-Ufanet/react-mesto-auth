import React from 'react';

export default function ImagePopup({isOpen, card, onClose}) {
    return (
        <section className={`popup popup_type_show-image ${isOpen ? "popup_opened" : "" }`}>
            <div className="popup__container popup__container_type_show-image">
                <button onClick={onClose} className="popup__close-button" type="button"></button>
                <img src={card.link} alt={card.name} className="popup__image"/>
                <h2 className="popup__image-title">{card.name}</h2>
            </div>
        </section>
    );
};