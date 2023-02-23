import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getImages = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/images.json`, {
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
const createImage = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/images.json`, {
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
const updateImage = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/images/${payload.firebaseKey}.json`, {
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
const getUserImages = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/images.json?orderBy="uid"&equalTo="${uid}"`, {
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
const getUserGalleryImages = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/images.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const homeFilterVideos = Object.values(data).filter((item) => item.gallery === true);
      resolve(homeFilterVideos);
    })
    .catch(reject);
});
const getPublicImages = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/images.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const homeFilterVideos = Object.values(data).filter((item) => item.public === true);
      resolve(homeFilterVideos);
    })
    .catch(reject);
});
const getSingleImage = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/images/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});
const deleteImage = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/images/${firebaseKey}.json`, {
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
  getImages,
  createImage,
  updateImage,
  getUserImages,
  getUserGalleryImages,
  getSingleImage,
  deleteImage,
  getPublicImages,

};
