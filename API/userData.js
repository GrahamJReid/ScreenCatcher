import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data) {
        console.warn('no user detected');
      } else {
        resolve(Object.values(data)[0]);
      }
    })
    .catch(reject);
});
const getAllUsers = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data) {
        console.warn('no user detected');
      } else {
        resolve(Object.values(data));
      }
    })
    .catch(reject);
});

const createUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const updateUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});
const getAllUsersExcludeCurrentUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data) {
        console.warn('no data');
      } else {
        const threads = Object.values(data).filter((item) => item.uid !== uid);
        resolve(threads);
      }
    })
    .catch(reject);
});
export {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  getAllUsersExcludeCurrentUser,
};
