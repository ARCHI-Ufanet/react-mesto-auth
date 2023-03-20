import React from 'react';
import PopupWithForm from '../../src/components/PopupWithForm.js';

export default function PopupWithConfirm({isOpen, onClose, onConFirm }) {
    function handleSubmit() {
        
    }
    return (
        <PopupWithForm 
            title = 'Вы уверены?'
            name = 'confirm'
            isOpen = {isOpen}
            onClose = {onClose}
            buttonSubmitText = 'Да'
            onSubmit = {handleSubmit}
        />
    );
}