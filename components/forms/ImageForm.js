/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { storage } from '../../utils/client';
import { createImage, updateImage } from '../../API/imageData';

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
};

export default function ImageForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();
  const { user } = useAuth();
  const didMount = React.useRef(false);

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
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
  };
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
              setFormInput(initialState);
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
  }),
};

ImageForm.defaultProps = {
  obj: initialState,
};
