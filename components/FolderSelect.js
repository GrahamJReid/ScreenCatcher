import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getUserFolders } from '../API/folderData';
import { createFolderImageObj, updateFolderImageObj } from '../API/folderImageData';
import { useAuth } from '../utils/context/authContext';
import viewimagepagestyles from '../styles/Images/ViewImagePage.module.css';

const initialState = {
  firebaseKey: '',
  image_id: '',
  folder_id: '',
};
export default function FolderSelect({ imageObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [folders, setFolders] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    getUserFolders(user.uid).then(setFolders);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.folder_id) {
      const folderPayload = {
        ...formInput, image_id: imageObj.firebaseKey,
      };
      // eslint-disable-next-line no-shadow
      createFolderImageObj(folderPayload).then(({ name }) => {
        const patchFolderPayload = { firebaseKey: name };
        updateFolderImageObj(patchFolderPayload);
        window.alert('Image Added to Folder');
        window.location.reload(true);
      });
      setFormInput(initialState);
    } else {
      window.alert('You must select a valid folder');
    }
  };

  return (
    <div className={viewimagepagestyles.FolderSelectDiv}>
      <Form>
        <FloatingLabel controlId="floatingSelect">
          <Form.Select
            className={viewimagepagestyles.FolderSelect}
            style={{ height: '2.7em', width: '13em' }}
            aria-label="Folder"
            name="folder_id"
            onChange={handleChange}
            value={formInput.folder_id}
            required
          >
            <option value="">Select a Folder</option>
            {
          folders.map((folder) => (
            <option
              key={folder.firebaseKey}
              value={folder.firebaseKey}
            >
              {folder.folder_title}
            </option>
          ))
        }
          </Form.Select>
        </FloatingLabel>
      </Form>
      <Button className={viewimagepagestyles.FolderSelectAddButton} variant="light" onClick={handleSubmit}>
        Add
      </Button>
    </div>
  );
}

FolderSelect.propTypes = {
  imageObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    image_title: PropTypes.string,
    date_added: PropTypes.string,
    description: PropTypes.string,
    uid: PropTypes.string,
    public: PropTypes.bool,
    username: PropTypes.string,
    gallery: PropTypes.bool,
    category: PropTypes.string,
    image_file: PropTypes.string,
  }),
};

FolderSelect.defaultProps = {
  imageObj: initialState,
};
