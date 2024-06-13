import axios from 'axios';

const authApi = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr',
});

async function requestSignup(id, password, nickname) {
  return await authApi.post('/register', { id, password, nickname });
}

async function requestLogin(id, password) {
  return await authApi.post('/login', { id, password });
}

async function requestLogout() {}

export { requestSignup, requestLogin, requestLogout };
