/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getUserPublicImages } from '../../API/imageData';
import { getUser, updateUser } from '../../API/userData';

const commentImageInitialState = {
  comment_url: '',
};

export default function UserProfileForm() {
  const { user } = useAuth();
  const [userImages, setUserImages] = useState([]);
  const [pageReload, setPageReload] = useState(0);
  const [userDetails, setUserDetails] = useState([]);
  const [commentImage, setCommentImage] = useState('');
  const [commentImageFormInput, setCommentImageFormInput] = useState(commentImageInitialState);

  useEffect(() => {
    getUserPublicImages(user.uid).then(setUserImages);
  }, [user]);
  useEffect(() => {
    getUser(user.uid).then(setUserDetails);
  }, [user, pageReload]);

  useEffect(() => {
    const userObj = {
      photoURL: `${user.photoUrl}`,
    };
    setCommentImageFormInput(userObj);
  }, [user]);

  const handleCommentImage = (e) => {
    const { name, value } = e.target;
    setCommentImage(value);
    setCommentImageFormInput(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      photoURL: commentImage,
      firebaseKey: userDetails.firebaseKey,

    };
    getUser(user.uid).then(updateUser(payload));
    setCommentImage('');
    setCommentImageFormInput(commentImageInitialState);
    setPageReload(1);
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
        <Button type="submit" className="blue-btn">Submit Changes</Button>
      </Form>
    </>
  );
}
