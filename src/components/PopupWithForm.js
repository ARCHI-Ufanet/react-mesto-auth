import React from 'react';

export default function PopupWithForm({isOpen, name, title, onClose, children, buttonSubmitText, onSubmit}) {
    return (
        <section className={isOpen ? `popup popup_opened popup_type_${name}` : `popup popup_type_${name}`}>
            <div className="popup__container">
                <button onClick={onClose} type="button" className="popup__close-button"></button>
                <h2 className="popup__title">{title}</h2>
                <form onSubmit={onSubmit} className={`popup__form popup__form_type_${name}`} name={name} noValidate>
                    {children}
                    <button className="popup__submit-button" type="submit">{buttonSubmitText}</button>
                </form>
            </div>
        </section>
    );
}