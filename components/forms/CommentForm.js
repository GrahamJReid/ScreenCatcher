/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createComment, updateComment } from '../../API/commentsData';
import { getUserPublicImages } from '../../API/imageData';
import viewthreadstyle from '../../styles/Threads/viewThread.module.css';

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

export default function AddAComment({ threadFbKey, onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const [userImages, setUserImages] = useState([]);
  const [commentImage, setCommentImage] = useState('');
  const [commentImageFirebaseKey, setCommentImageFirebaseKey] = useState('');
  const [commentImageFormInput, setCommentImageFormInput] = useState(commentImageInitialState);

  useEffect(() => {
    getUserPublicImages(user.uid).then(setUserImages);
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
    const Arr = value.split(',');
    console.warn(Arr[1]);
    setCommentImageFirebaseKey(Arr[1]);
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
      ...formInput,
      uid: user.uid,
      date_added: new Date().toLocaleString(),
      sort_date: Date.now(),
      author: user.displayName,
      thread_id: threadFbKey,
      thread_image: commentImageFormInput.comment_url,
      thread_comment_image_firebaseKey: commentImageFirebaseKey,
    };
    createComment(payload)
      .then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateComment(patchPayload)
          .then(() => onUpdate());
        setFormInput(initialState);
        setCommentImage('');
        setCommentImageFormInput(commentImageInitialState);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="mt-3 mb-3">Add A Comment</h4>
      {commentImage === '' ? '' : <img className={viewthreadstyle.CommentFormPreviewImage} src={commentImage} width="200px" />}
      <FloatingLabel controlId="floatingSelect">
        <Form.Select
          className={viewthreadstyle.CommentFormCommentTextWindow}
          style={{ height: '3em' }}
          aria-label="Image"
          name="comment_image"
          onChange={handleCommentImage}
          value={commentImageFormInput.comment_url}
        >
          <option value="">Select an Image</option>
          {
                  userImages.map((image) => (
                    <option
                      key={image.firebaseKey}
                      value={[image.image_url, image.firebaseKey]}
                    >
                      {image.image_title}
                    </option>
                  ))
                }
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel className={viewthreadstyle.CommentFormCommentTextWindowLabel} controlId="floatingTextArea" label="Type your comment here...">
        <Form.Control
          className={viewthreadstyle.CommentFormCommentTextWindow}
          style={{ height: '100px' }}
          type="textarea"
          name="text"
          value={formInput.text}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button className={viewthreadstyle.ViewThreadSubmitButton} type="submit">Submit Comment</Button>
    </Form>
  );
}

AddAComment.propTypes = {
  threadFbKey: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
