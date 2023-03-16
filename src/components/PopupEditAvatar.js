import React, { useRef, useEffect } from 'react';
import PopupWithForm from '../../src/components/PopupWithForm.js';

export default function PopupEditAvatar({isOpen, onClose, onUpdateAvatar}) {
    const avatarLinkRef = useRef()
    
    useEffect(() => {
        avatarLinkRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
    
        onUpdateAvatar({
            avatar: avatarLinkRef.current.value
        });

        
    };

    return (
        <PopupWithForm 
            title = 'Обновить аватар'
            name = 'change-avatar'
            isOpen = {isOpen}
            onClose = {onClose}
            buttonSubmitText = 'Сохранить'
            onSubmit = {handleSubmit}
        >
            <input
                ref={avatarLinkRef}
                className="popup__input popup__input_type_link-avatar" 
                name="avatar" 
                id="avatarLink" 
                type="url" 
                placeholder="Ссылка на аватар" 
                required
            />
            <span className="popup__eror" id="avatarLink-error"></span>
        </PopupWithForm>
    );
}