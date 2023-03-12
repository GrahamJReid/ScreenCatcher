import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createFollowUserObj = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/followUser.json`, {
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
const updateFollowUserObj = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/followUser/${payload.firebaseKey}.json`, {
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
const getFollowUserObjectsByCurrentUserUid = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/followUser.json?orderBy="current_user"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  createFollowUserObj,
  updateFollowUserObj,
  getFollowUserObjectsByCurrentUserUid,

};
