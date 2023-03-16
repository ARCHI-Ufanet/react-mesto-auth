import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'


export default function Card({card, onCardClick, onCardLike, onCardDel}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = ( 
        `cards__like-button ${isLiked && 'cards__like-button_active'}` 
    );

    function handleClick() {
        onCardClick(card);
    };

    function handleLikeClick() {
        onCardLike(card);
    };

    function handleDelClick() {
        onCardDel(card);
    };

    return (
        <article className="cards__container">
            <div onClick={handleClick} style={{ backgroundImage: `url(${card.link})` }} className="cards__image"></div>
            <button onClick={handleDelClick} type="button" className={isOwn ? `cards__del-button_active` : `cards__del-button`}></button>
            <div className="cards__description">
                <h2 className="cards__title">{card.name}</h2>
                <div className="likes">
                    <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"></button>
                    <p className="cards__likes">{card.likes.length}</p>
                </div> 
            </div>
        </article>
    )
}