import axios from 'axios';

const userApi = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr',
});

async function requestSignup(id, password, nickname) {
  const newUser = { id, password, nickname };
  return await userApi.post('/register', newUser);
}

async function requestLogin() {}

async function requestLogout() {}

export { requestSignup, requestLogin, requestLogout };
