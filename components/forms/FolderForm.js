import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createFolder, updateFolder } from '../../API/folderData';
import folderpagestyles from '../../styles/Folders/FoldersPage.module.css';

const initialState = {
  firebaseKey: '',
  folder_title: '',
  date_added: '',
  description: '',
  uid: '',
  public: false,
  username: '',
  gallery: false,
  category: '',
};

export default function FolderForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateFolder(formInput)
        .then(() => router.push(`/Folders/viewFolder/${obj.firebaseKey}`));
    } else {
      const payload = {
        ...formInput, uid: user.uid, date_added: new Date().toLocaleString(), username: user.displayName, sort_date: Date.now(),
      };
      createFolder(payload)
        .then(({ name }) => {
          const patchPayload = { firebaseKey: name };
          updateFolder(patchPayload)
            .then(() => {
              setFormInput(initialState);
              window.location.reload(true);
              router.push('/Folders/foldersPage');
            });
        });
    }
  };

  return (
    <div>
      <div className={folderpagestyles.FolderFormDiv}>
        <Form onSubmit={handleSubmit}>
          <h1 className={folderpagestyles.FolderFormTitle}>{obj.firebaseKey ? 'Update' : 'Add'} Folder</h1>

          {/* FOLDER TITLE */}
          <FloatingLabel className={folderpagestyles.FolderFormInputLabel} controlId="floatingInput2" label="Folder Title">
            <Form.Control
              className={folderpagestyles.FolderFormInput}
              type="text"
              style={{ height: '100px' }}
              name="folder_title"
              value={formInput.folder_title}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          {/* FOLDER DESCRIPTION TEXTAREA */}
          <FloatingLabel className={folderpagestyles.FolderFormInputLabel} controlId="floatingTextArea" label="Folder Description">
            <Form.Control
              className={folderpagestyles.FolderFormInput}
              type="textarea"
              style={{ height: '150px' }}
              name="description"
              value={formInput.description}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel className={folderpagestyles.FolderFormInputLabel} controlId="floatingInput3" label="Category">
            <Form.Control
              className={folderpagestyles.FolderFormInput}
              style={{ height: '100px' }}
              type="text"
              name="category"
              value={formInput.category}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          {/* FOLDER DESCRIPTION TEXTAREA */}
          <Form.Check
            className={folderpagestyles.FolderFormInputCheck}
            type="switch"
            id="public"
            name="public"
            label="Make public?"
            checked={formInput.public}
            onChange={(e) => {
              setFormInput((prevState) => ({
                ...prevState,
                public: e.target.checked,
              }));
            }}
          />

          {/* SUBMIT BUTTON  */}

          <Button type="submit" className={folderpagestyles.FolderFormButton}>{obj.firebaseKey ? 'Update' : 'Add'} Folder</Button>

        </Form>
      </div>
    </div>
  );
}

FolderForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    folder_title: PropTypes.string,
    date_added: PropTypes.string,
    description: PropTypes.string,
    uid: PropTypes.string,
    public: PropTypes.bool,
    username: PropTypes.string,
    category: PropTypes.string,
  }),
};

FolderForm.defaultProps = {
  obj: initialState,
};
