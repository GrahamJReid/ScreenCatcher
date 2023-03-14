import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createLike = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/likes.json`, {
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
const updateLike = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/likes/${payload.firebaseKey}.json`, {
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
const getLikesByThreadId = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/likes.json?orderBy="thread_id"&equalTo="${firebaseKey}"`, {
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
const getLikesByThreadIdandUid = (firebaseKey, uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/likes.json?orderBy="thread_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data).filter((item) => item.uid === uid));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});
const deleteLike = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/likes/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  updateLike,
  createLike,
  getLikesByThreadId,
  deleteLike,
  getLikesByThreadIdandUid,
};
