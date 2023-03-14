/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getUserPublicImages } from '../../API/imageData';
import { getUser, updateUser } from '../../API/userData';

const initialState = {
  firebaseKey: '',
  uid: '',
  text: '',
  thread_id: '',
  date_added: '',
  author: '',
};
const commentImageInitialState = {
  comment_url: '',
};

export default function UserProfileForm() {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const [userImages, setUserImages] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [commentImage, setCommentImage] = useState('');
  const [commentImageFormInput, setCommentImageFormInput] = useState(commentImageInitialState);

  useEffect(() => {
    getUserPublicImages(user.uid).then(setUserImages);
  }, [user]);
  useEffect(() => {
    getUser(user.uid).then(setUserDetails);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleCommentImage = (e) => {
    const { name, value } = e.target;
    setCommentImage(value);
    setCommentImageFormInput(name);
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      photoURL: commentImageFormInput.comment_url,
      displayName: formInput.text,

    };
    getUser(user.uid).then(updateUser(payload));
    setFormInput(initialState);
    setCommentImage('');
    setCommentImageFormInput(commentImageInitialState);
  };

  return (

    <><img src={userDetails.photoURL} />

      <Form onSubmit={handleSubmit}>
        <h4 className="mt-3 mb-3">Edit User Profile</h4>
        {commentImage === '' ? '' : <img src={commentImage} width="200px" />}
        <FloatingLabel controlId="floatingSelect">
          <Form.Select
            aria-label="Folder"
            name="comment_image"
            onChange={handleCommentImage}
            value={commentImageFormInput.comment_url}
            className="mb-3"
          >
            <option value="">Change Profile Picture</option>
            {userImages.map((folder) => (
              <option
                key={folder.firebaseKey}
                value={folder.image_url}
              >
                {folder.image_title}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel controlId="floatingTextArea" label="Change Profile Name" className="mb-3 text-black">
          <Form.Control
            type="textarea"
            style={{ height: '100px' }}
            name="text"
            value={formInput.text}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <Button type="submit" className="blue-btn">Submit Changes</Button>
      </Form>
    </>
  );
}
