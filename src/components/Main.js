import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Main({cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDel}) {
    const currentUser = React.useContext(CurrentUserContext);
    const cardsElements = cards.map((card, _id) => (  
                            <Card
                                key = {card._id}
                                card = {card}
                                onCardClick = {onCardClick}
                                onCardLike = {onCardLike}
                                onCardDel = {onCardDel}
                            />
                        ))
    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-box">
                    <div onClick={onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }}  className="profile__avatar"/>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <p className="profile__job">{currentUser.about}</p>
                    <button onClick={onEditProfile} className="profile__edit-button"  type="button"></button>
                </div>
                <button onClick={onAddPlace} className="profile__add-card-button" type="button"></button>
            </section>
            <section className="cards">
                {cardsElements}
            </section>
        </main>
    );
};