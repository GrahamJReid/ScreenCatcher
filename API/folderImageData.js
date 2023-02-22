import { clientCredentials } from '../utils/client';
import { deleteFolder } from './folderData';

const endpoint = clientCredentials.databaseURL;
// Get All FolderImage Data Objects by the Folder ID
const getFolderImageObjectsByFolderId = (folderFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/folderimage.json?orderBy="folder_id"&equalTo="${folderFirebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
// Get SIngle FolderImage Object By FolderID and VideoID
const getSingleFolderImageObj = (folderFirebaseKey, imageFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/folderimage.json?orderBy="folder_id"&equalTo="${folderFirebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const arr = Object.values(data).filter((item) => item.image_id === imageFirebaseKey);
      resolve(arr[0]);
    })
    .catch(reject);
});
// Create FolderImage Object
const createFolderImageObj = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/folderimage.json`, {
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
// Patch FolderImage Object
const updateFolderImageObj = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/folderimage/${payload.firebaseKey}.json`, {
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
// Delete Single FolderImage Object
const deleteFolderImageObj = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/folderimage/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});
// Delete All Folder Data
const deleteFolderData = (firebaseKey) => new Promise((resolve, reject) => {
  getFolderImageObjectsByFolderId(firebaseKey).then((arr) => {
    const deleteFolderImageDataPromises = arr.map((obj) => deleteFolderImageObj(obj.firebaseKey));

    Promise.all(deleteFolderImageDataPromises).then(() => {
      deleteFolder(firebaseKey).then(resolve);
    });
  })
    .catch(reject);
});

export {
  getFolderImageObjectsByFolderId,
  createFolderImageObj,
  updateFolderImageObj,
  deleteFolderImageObj,
  deleteFolderData,
  getSingleFolderImageObj,
};
