/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { storage } from '../../utils/client';
import { createImage, getUserImages, updateImage } from '../../API/imageData';
import { getFolders, getUserFolders } from '../../API/folderData';
import { createFolderImageObj, updateFolderImageObj } from '../../API/folderImageData';
import ImagesPageContent from '../imagesPage/ImagesPageContent';
import imagepagestyles from '../../styles/Images/ImagesPage.module.css';

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
  image_placeholder: '',
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
  const [imagefile, setImageFile] = useState(null);
  const [folders, setFolders] = useState([]);
  const [updateImages, setUpdateImages] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const didMount = React.useRef(false);

  const handleUpdateArr = () => {
    getUserImages(user.uid).then((item) => {
      const sortedImageOrder = item.sort((b, a) => a.date_added.localeCompare(b.date_added));
      setUpdateImages(sortedImageOrder);
    });
  };

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  useEffect(() => {
    getUserFolders(user.uid).then(setFolders);
    handleUpdateArr();
  }, [obj, user]);

  useEffect(() => {
    if (didMount.current) {
      const uploadTask = async () => storage.ref(`images/${image.name}`).put(image);
      const delayFunction = async () => {
        const delayingUploadTask = await uploadTask();
        storage.ref('images').child(image.name).getDownloadURL().then((url) => {
          setImageFile(image.name);
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
    console.warn(image);
    e.preventDefault();
    if (obj.firebaseKey) {
      updateImage(formInput)
        .then(() => router.push(`/viewImage/${obj.firebaseKey}`));
    } else {
      const payload = {
        ...formInput,
        uid: user.uid,
        date_added: new Date().toLocaleString(),
        username: user.displayName,
        image_url: `${imageUrl}`,
        image_file: `${imagefile}`,
        sort_date: Date.now(),
      };
      createImage(payload)
        .then(({ name }) => {
          const patchPayload = { firebaseKey: name };
          updateImage(patchPayload)
            .then(() => {
              const folderPayload = {
                ...folderImageInput, image_id: name,
              };
              if (folderImageInput.folder_id === '') {
                console.warn('no folder selected');
              } else {
              // eslint-disable-next-line no-shadow
                createFolderImageObj(folderPayload).then(({ name }) => {
                  const patchFolderPayload = { firebaseKey: name };
                  updateFolderImageObj(patchFolderPayload);
                });
              }

              setFormInput(initialState);
              setFolderImageInput(folderImageInitialState);
              console.warn(updateImages);
                <ImagesPageContent arr={updateImages} />;
            });
        });
    }
  };

  return (
    <div className={imagepagestyles.ImagesFormDiv}>
      <Form onSubmit={handleSubmit} className={imagepagestyles.ImagesForm}>
        <h1 className={imagepagestyles.ImagesFormTitle}>{obj.firebaseKey ? 'Update' : 'Add'} Image</h1>

        {/* IMAGE FILE */}
        {obj.firebaseKey ? '' : (
          <FloatingLabel className={imagepagestyles.ImageFormInputLabel} controlId="floatingInput1" label="Add File">
            <Form.Control
              className={imagepagestyles.ImageFormInput}
              style={{ height: '55%' }}
              type="file"
              onInput={handleImage}
              required
              name="image_placeholder"
              value={formInput.image_placeholder}
            />
          </FloatingLabel>
        )}

        {/* IMAGE TITLE */}
        <FloatingLabel className={imagepagestyles.ImageFormInputLabel} controlId="floatingInput2" label="Image Title">
          <Form.Control
            className={imagepagestyles.ImageFormInput}
            style={{ height: '55%' }}
            type="text"
            name="image_title"
            value={formInput.image_title}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* IMAGE DESCRIPTION TEXTAREA */}
        <FloatingLabel className={imagepagestyles.ImageFormInputLabel} controlId="floatingTextArea" label="Image Description">
          <Form.Control
            className={imagepagestyles.ImageFormInput}
            type="textarea"
            style={{ height: '55%' }}
            name="description"
            value={formInput.description}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel className={imagepagestyles.ImageFormInputLabel} controlId="floatingInput3" label="Category">
          <Form.Control
            className={imagepagestyles.ImageFormInput}
            style={{ height: '55%' }}
            type="text"
            name="category"
            value={formInput.category}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* IMAGE DESCRIPTION TEXTAREA */}
        <Form.Check
          className={imagepagestyles.ImageFormSwitchInput}
          type="switch"
          id="public"
          name="public"
          label="Make public"
          checked={formInput.public}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              public: e.target.checked,
            }));
          }}
        />
        <Form.Check
          className={imagepagestyles.ImageFormSwitchInput}
          type="switch"
          id="gallery"
          name="gallery"
          label="Add to Gallery"
          checked={formInput.gallery}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              gallery: e.target.checked,
            }));
          }}
        />
        {obj.firebaseKey ? '' : (
          <FloatingLabel controlId="floatingSelect">
            <Form.Select
              className={imagepagestyles.ImageFormInput}
              style={{ height: '55%' }}
              aria-label="Folder"
              name="folder_id"
              onChange={handleFolderImageChange}
              value={folderImageInput.folder_id}
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
        )}

        {/* SUBMIT BUTTON  */}

        <Button className={imagepagestyles.ImageFormSubmitButton} type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Image</Button>

      </Form>
    </div>
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
