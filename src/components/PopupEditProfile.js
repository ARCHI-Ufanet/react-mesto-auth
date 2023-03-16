import React, { useState, useEffect } from 'react';
import PopupWithForm from '../../src/components/PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function PopupEditProfile({isOpen, onClose,  onUpdateUser }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = React.useContext(CurrentUserContext);
    
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [isOpen, currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    return (
        <PopupWithForm 
            title = 'Редактировать'
            name = 'edit-profile'
            isOpen = {isOpen}
            onClose = {onClose}
            buttonSubmitText = 'Сохранить'
            onSubmit = {handleSubmit}
        >
            <input 
                onChange={handleChangeName}
                value={name || ''}
                className="popup__input popup__input_type_profile-name" 
                id="name" 
                name="name" 
                type="text" 
                placeholder="Имя" 
                required minLength="2" 
                maxLength="40"
            />
            <span className="popup__eror" id="name-error"></span>
            <input
                onChange={handleChangeDescription}
                value={description || ''}
                className="popup__input popup__input_type_profile-job" 
                id="job" 
                name="about" 
                type="text" 
                placeholder="О себе" 
                required minLength="2" 
                maxLength="200"
            />
            <span className="popup__eror" id="job-error"></span>
        </PopupWithForm>
    );
}