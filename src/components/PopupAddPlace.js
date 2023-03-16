import React, { useRef, useEffect } from 'react';
import PopupWithForm from '../../src/components/PopupWithForm.js';

export default function PopupAddPlace({isOpen, onClose, onAddPlace}) {
    const placeNameRef = useRef();
    const placeLinkRef = useRef();

    useEffect(() => {
        placeNameRef.current.value = '';
        placeLinkRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: placeNameRef.current.value,
            link: placeLinkRef.current.value
        });
    };

    return (
        <PopupWithForm 
            title = 'Новое место'
            name = 'add-card'
            isOpen = {isOpen}
            onClose = {onClose}
            buttonSubmitText = 'Сохранить'
            onSubmit = {handleSubmit}
        >
            <input 
                ref={placeNameRef}
                className="popup__input popup__input_type_title" 
                id="title" 
                name="name" 
                type="text" 
                placeholder="Название" 
                required minLength="2" 
                maxLength="30"
            />
            <span className="popup__eror" id="title-error"></span>
            <input 
                ref={placeLinkRef}
                className="popup__input popup__input_type_link" 
                name="link" 
                id="link" 
                type="url" 
                placeholder="Ссылка на картинку" 
                required
            />
            <span className="popup__eror" id="link-error"></span>
        </PopupWithForm>
    );
}