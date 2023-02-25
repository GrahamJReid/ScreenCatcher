/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { storage } from '../../utils/client';
import { createImage, updateImage } from '../../API/imageData';
import { getFolders } from '../../API/folderData';
import { createFolderImageObj, updateFolderImageObj } from '../../API/folderImageData';

const initialState = {
  firebaseKey: '',
  image_title: '',
  date_added: '',
  description: '',
  uid: '',
  public: false,
  username: '',
  gallery: false,
  category: '',
  image_file: '',
};
const folderImageInitialState = {
  firebaseKey: '',
  folder_id: '',
  image_id: '',
  folder_select: '',
};

export default function ImageForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [folderImageInput, setFolderImageInput] = useState(folderImageInitialState);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [folders, setFolders] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const didMount = React.useRef(false);

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);
  useEffect(() => {
    getFolders(user.uid).then(setFolders);
  }, [obj, user]);
  useEffect(() => {
    if (didMount.current) {
      const uploadTask = async () => storage.ref(`images/${image.name}`).put(image);
      const delayFunction = async () => {
        const delayingUploadTask = await uploadTask();
        storage.ref('images').child(image.name).getDownloadURL().then((url) => {
          setImageUrl(url);
        });
      };
      delayFunction();
    } else { didMount.current = true; }
  }, [image]);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleFolderImageChange = (e) => {
    const { name, value } = e.target;
    setFolderImageInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateImage(formInput)
        .then(() => router.push(`/viewImage.js/${obj.firebaseKey}`));
    } else {
      const payload = {
        ...formInput, uid: user.uid, date_added: new Date().toLocaleString(), username: user.displayName, image_url: `${imageUrl}`,
      };
      createImage(payload)
        .then(({ name }) => {
          const patchPayload = { firebaseKey: name };
          updateImage(patchPayload)
            .then(() => {
              const folderPayload = {
                ...folderImageInput, image_id: name,
              };
              // eslint-disable-next-line no-shadow
              createFolderImageObj(folderPayload).then(({ name }) => {
                const patchFolderPayload = { firebaseKey: name };
                updateFolderImageObj(patchFolderPayload);
              });

              setFormInput(initialState);
              setFolderImageInput(folderImageInitialState);
              router.push('/images');
            });
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="mt-5 mb-3">{obj.firebaseKey ? 'Update' : 'Add'} Image</h1>

      {/* IMAGE FILE */}
      {obj.firebaseKey ? '' : (
        <FloatingLabel controlId="floatingInput1" label="" className="mb-3 text-black background-file-input">
          <Form.Control
            type="file"
            onInput={handleImage}
            required
            name="image_file"
            value={formInput.image_file}
          />
        </FloatingLabel>
      )}

      {/* IMAGE TITLE */}
      <FloatingLabel controlId="floatingInput2" label="Image Title" className="mb-3 text-black">
        <Form.Control
          type="text"
          name="image_title"
          value={formInput.image_title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE DESCRIPTION TEXTAREA */}
      <FloatingLabel controlId="floatingTextArea" label="Image Description" className="mb-3 text-black">
        <Form.Control
          type="textarea"
          style={{ height: '100px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Category" className="mb-3 text-black">
        <Form.Control
          type="text"
          name="category"
          value={formInput.category}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE DESCRIPTION TEXTAREA */}
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
      <Form.Check
        className="mb-3"
        type="switch"
        id="gallery"
        name="gallery"
        label="Add to Gallery?"
        checked={formInput.gallery}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            gallery: e.target.checked,
          }));
        }}
      />
      <FloatingLabel controlId="floatingSelect">
        <Form.Select
          aria-label="Folder"
          name="folder_select"
          value={folderImageInput.folder_select}
          onChange={handleFolderImageChange}
          className="mb-3"
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

      {/* SUBMIT BUTTON  */}

      <Button type="submit" className="home-form-submit-btn">{obj.firebaseKey ? 'Update' : 'Add'} Image</Button>

    </Form>
  );
}

ImageForm.propTypes = {
  obj: PropTypes.shape({
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

ImageForm.defaultProps = {
  obj: initialState,
};
