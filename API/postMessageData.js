import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createPostMessage = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/postMessages.json`, {
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
const updatePostMessage = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/postMessages/${payload.firebaseKey}.json`, {
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
const deletePostMessage = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/postMessages/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});
const getPostMessagesByMessagesId = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/postMessages.json?orderBy="messages_id"&equalTo="${firebaseKey}"`, {
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
const getPostMessagesByUID = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/postMessages.json?orderBy="uid"&equalTo="${uid}"`, {
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
const getPostMessagesImageByImageFirebaseKey = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/postMessages.json?orderBy="image_firebaseKey"&equalTo="${firebaseKey}"`, {
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
  updatePostMessage,
  createPostMessage,
  deletePostMessage,
  getPostMessagesByMessagesId,
  getPostMessagesByUID,
  getPostMessagesImageByImageFirebaseKey,
};
