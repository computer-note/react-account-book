import axios from 'axios';

const accountApi = axios.create({
  //배포시 baseURL 변경해야함
  baseURL: 'http://localhost:4000',
});

async function createAccount(account) {
  return await accountApi.post('/accountList', account);
}

async function readAllAccountList() {
  return await accountApi.get('/accountList');
}

async function readAccountById(accountId) {
  return await accountApi.get(`/accountList/${accountId}`);
}

async function updateAccount(updatedAccount) {
  const { id } = updatedAccount;
  return await accountApi.patch(`/accountList/${id}`, updatedAccount);
}

async function deleteAccountById(accountId) {
  return await accountApi.delete(`/accountList/${accountId}`);
}

export {
  createAccount,
  readAllAccountList,
  readAccountById,
  updateAccount,
  deleteAccountById,
};
