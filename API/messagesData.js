import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createMessages = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/messages.json`, {
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
const updateMessages = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/messages/${payload.firebaseKey}.json`, {
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
const getUserMessages = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/messages.json?orderBy="user_1"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});
const getUserSecondaryMessages = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/messages.json?orderBy="user_2"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export {
  updateMessages,
  createMessages,
  getUserMessages,
  getUserSecondaryMessages,
};
