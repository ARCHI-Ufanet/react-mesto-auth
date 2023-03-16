import React from 'react';
import statusOk from '../images/Rectangle.svg';
import statusFail from '../images/Union.svg';

export default function InfoTooltip({isOpen, onClose, isRegStatusOk}) {
    return (
        <section className={`popup popup_type_infoTooltip ${isOpen ? "popup_opened" : "" }`}>
            <div className="popup__container">
                <button onClick={onClose} className="popup__close-button" type="button"></button>
                <img src={isRegStatusOk ? statusOk : statusFail} alt={'Картинка-статуса'} className="popup__image-status"/>
                <h2 className="popup__title">
                    {isRegStatusOk ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h2>
            </div>
        </section>
    );
};