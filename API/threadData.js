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

export {
  createThread,
  updateThread,
};
