import { authConfig } from './constants';

class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.json()
      .then(data => {
        return (res.ok) ? Promise.resolve(data) : Promise.reject(`Ошибка ${res.status}: ${data.message}`);
      });
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    })
      .then(this._checkResponse);
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    })
      .then(this._checkResponse);
  }
}

export default new Auth(authConfig);
