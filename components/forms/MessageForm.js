/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getUserPublicImages } from '../../API/imageData';
import { createPostMessage, updatePostMessage } from '../../API/postMessageData';
import viewmessagesstyle from '../../styles/messages/ViewMessages.module.css';

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
  const [imageFirebaseKey, setImageFirebaseKey] = useState('');
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
    const Arr = value.split(',');
    console.warn(Arr[1]);
    setImageFirebaseKey(Arr[1]);
    console.warn(name);
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
      image_firebaseKey: imageFirebaseKey,
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
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="mt-3 mb-3">Create Message</h4>
      {commentImage === '' ? '' : <img src={`${commentImage}`} width="100px" />}
      <FloatingLabel controlId="floatingSelect">
        <Form.Select
          className={viewmessagesstyle.MessageFormInput}
          aria-label="Folder"
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

      <FloatingLabel controlId="floatingTextArea" label="Type your message here...">
        <Form.Control
          className={viewmessagesstyle.MessageFormInput}
          type="textarea"
          style={{ height: '50px' }}
          name="text"
          value={formInput.text}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit" className={viewmessagesstyle.MessageFormSubmitButton}>Submit Message</Button>
    </Form>
  );
}
