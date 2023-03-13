import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createThread = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/threads.json`, {
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
const updateThread = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/threads/${payload.firebaseKey}.json`, {
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
const getUserThreads = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/threads.json?orderBy="uid"&equalTo="${uid}"`, {
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
const getThreads = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/threads.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data) {
        console.warn('no non user threads');
      } else {
        const threads = Object.values(data).filter((item) => item.uid !== uid);
        resolve(threads);
      }
    })
    .catch(reject);
});
const getAllThreads = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/threads.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data) {
        console.warn('no threads');
      } else {
        const threads = Object.values(data);
        resolve(threads);
      }
    })
    .catch(reject);
});
const getSingleThread = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/threads/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});
const deleteThread = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/threads/${firebaseKey}.json`, {
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
  createThread,
  updateThread,
  getUserThreads,
  getThreads,
  getSingleThread,
  getAllThreads,
  deleteThread,
};
