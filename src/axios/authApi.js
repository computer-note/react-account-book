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

async function requestUserInfo(accessToken) {
  return await authApi.get('/user', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

//logout을 서버에게 알리는 API가 없다
async function requestLogout() {}

export {
  requestSignup,
  requestLogin,
  requestLogout,
  requestUserInfo,
};
