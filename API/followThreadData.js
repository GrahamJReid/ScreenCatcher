import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createFollowThreadObj = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/followThread.json`, {
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
const updateFollowThreadObj = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/followThread/${payload.firebaseKey}.json`, {
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
const getFollowThreadObjectsByCurrentUserUid = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/followThread.json?orderBy="current_user"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
const deleteFollowThreadObj = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/followThread/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});
const getSingleFollowThreadObj = (currentUser, followedThread) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/followThread.json?orderBy="followed_thread"&equalTo="${followedThread}"`, {
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
const getAllFollowThreadObjbyThreadID = (threadId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/followThread.json?orderBy="followed_thread"&equalTo="${threadId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const arr = Object.values(data);
      resolve(arr);
    })
    .catch(reject);
});

export {
  createFollowThreadObj,
  updateFollowThreadObj,
  getFollowThreadObjectsByCurrentUserUid,
  deleteFollowThreadObj,
  getSingleFollowThreadObj,
  getAllFollowThreadObjbyThreadID,

};
