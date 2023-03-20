class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    };

    _checkRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    _request(url, {options}) {
        return fetch(url, {options}).then(this._checkRes);
    };

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers,
        })
        .then(this._checkRes);
    };

    postCard({name, link}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link,
            }),
        })
        .then(this._checkRes);
    };

    likeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        })
        .then(this._checkRes);
    };

    unlikeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
        })
        .then(this._checkRes);
    };

    delCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
        .then(this._checkRes);
    };

    patchUserAvatar({avatar}) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then(this._checkRes);
    };

    patchUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._checkRes);
    };

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers,
        })
        .then(this._checkRes);
    };
};

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-57',
    headers: {
        authorization: '44c72f53-2df0-43de-8667-2616f7533408',
        'Content-Type': 'application/json'
    }
});