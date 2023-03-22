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
      {commentImage === '' ? '' : <img src={commentImage} width="200px" />}
      <FloatingLabel controlId="floatingSelect">
        <Form.Select
          className={viewthreadstyle.CommentFormCommentTextWindow}
          aria-label="Folder"
          name="comment_image"
          onChange={handleCommentImage}
          value={commentImageFormInput.comment_url}
        >
          <option value="">Select an Image</option>
          {
                  userImages.map((folder) => (
                    <option
                      key={folder.firebaseKey}
                      value={folder.image_url}
                    >
                      {folder.image_title}
                    </option>
                  ))
                }
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingTextArea" label="Type your comment here...">
        <Form.Control
          className={viewthreadstyle.CommentFormCommentTextWindow}
          type="textarea"
          style={{ height: '100px' }}
          name="text"
          value={formInput.text}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button className={viewthreadstyle.ViewThreadButton} type="submit">Submit Comment</Button>
    </Form>
  );
}

AddAComment.propTypes = {
  threadFbKey: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
