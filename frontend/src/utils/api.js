class Api {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Authorization' : `Bearer ${token}`,
      }
    })
    .then(this._checkResponse)
  };

  setUserInfo(data, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`,
      },
      body: JSON.stringify({
      name: data.username,
      about: data.userjob,
      })
    })
    .then(this._checkResponse)
  };

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'Authorization' : `Bearer ${token}`,
      }
    })
    .then(this._checkResponse)
  };

  createCard(data, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.title,
        link: data.link
      }),
    })
    .then(this._checkResponse)
  };

  setUpdateAvatar(data, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.linkupdateAvatar,
      })
    })
    .then(this._checkResponse)
  };

  deleteCard (cardId, token) {
    return fetch(`${this._baseUrl}/cards/` + cardId, {
      method: 'DELETE',
      headers: {
        'Authorization' : `Bearer ${token}`,
      },
    })
    .then(this._checkResponse)
  };

  plusLike (cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Authorization' : `Bearer ${token}`,
      },
    })
    .then(this._checkResponse)
  };

  minusLike (cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Authorization' : `Bearer ${token}`,
      },
    })
    .then(this._checkResponse)
  };
};

const api = new Api({
  baseUrl: 'http://api.mestoforever.nomoredomainsicu.ru',
});

export default api;