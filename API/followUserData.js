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
const deleteFollowUserObj = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/followUser/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});
const getSingleFollowUserObj = (currentUser, followedUser) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/followUser.json?orderBy="followed_user"&equalTo="${followedUser}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const arr = Object.values(data).filter((item) => item.current_user === currentUser);
      resolve(arr[0]);
    })
    .catch(reject);
});

export {
  createFollowUserObj,
  updateFollowUserObj,
  getFollowUserObjectsByCurrentUserUid,
  deleteFollowUserObj,
  getSingleFollowUserObj,

};
