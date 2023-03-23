import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createFolder, updateFolder } from '../../API/folderData';
import folderpagestyles from '../../styles/FoldersPage.module.css';

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
        .then(() => router.push(`/viewFolder/${obj.firebaseKey}`));
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
              router.push('/folders');
            });
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="mt-5 mb-3">{obj.firebaseKey ? 'Update' : 'Add'} Folder</h1>

      {/* FOLDER TITLE */}
      <FloatingLabel controlId="floatingInput2" label="Folder Title">
        <Form.Control
          className={folderpagestyles.FolderFormInput}
          type="text"
          name="folder_title"
          value={formInput.folder_title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* FOLDER DESCRIPTION TEXTAREA */}
      <FloatingLabel controlId="floatingTextArea" label="Folder Description">
        <Form.Control
          className={folderpagestyles.FolderFormInput}
          type="textarea"
          style={{ height: '100px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Category">
        <Form.Control
          className={folderpagestyles.FolderFormInput}
          type="text"
          name="category"
          value={formInput.category}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* FOLDER DESCRIPTION TEXTAREA */}
      <Form.Check
        className="mb-3"
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
