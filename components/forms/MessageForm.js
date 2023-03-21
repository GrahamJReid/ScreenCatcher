/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getUserPublicImages } from '../../API/imageData';
import { createPostMessage, updatePostMessage } from '../../API/postMessageData';

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

export default function PostMessageForm() {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const [userImages, setUserImages] = useState([]);
  const [commentImage, setCommentImage] = useState('');
  const [commentImageFormInput, setCommentImageFormInput] = useState(commentImageInitialState);
  const router = useRouter();
  const { firebaseKey } = router.query;

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
      post_image: commentImageFormInput.comment_url,
      messages_id: firebaseKey,
    };
    createPostMessage(payload)
      .then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePostMessage(patchPayload);
        setFormInput(initialState);
        setCommentImage('');
        setCommentImageFormInput(commentImageInitialState);
      });
    function updateScroll() {
      const element = document.getElementById('messages');
      element.scrollTop = element.scrollHeight;
    }
    updateScroll();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="mt-3 mb-3">Create Message</h4>
      {commentImage === '' ? '' : <img src={commentImage} width="200px" />}
      <FloatingLabel controlId="floatingSelect">
        <Form.Select
          aria-label="Folder"
          name="comment_image"
          onChange={handleCommentImage}
          value={commentImageFormInput.comment_url}
          className="mb-3"
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

      <FloatingLabel controlId="floatingTextArea" label="Type your message here..." className="mb-3 text-black">
        <Form.Control
          type="textarea"
          style={{ height: '100px' }}
          name="text"
          value={formInput.text}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit" className="blue-btn">Submit Message</Button>
    </Form>
  );
}
