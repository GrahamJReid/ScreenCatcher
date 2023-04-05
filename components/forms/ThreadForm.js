/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createThread, updateThread } from '../../API/threadData';
import threadformstyles from '../../styles/Threads/ThreadForm.module.css';

const initialState = {
  firebaseKey: '',
  date_added: '',
  description: '',
  uid: '',
  username: '',
  category: '',
};

export default function ThreadForm({ img }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput, uid: user.uid, date_added: new Date().toLocaleString(), username: user.displayName, user_image: user.photoURL, thread_image: `${img.image_url}`, thread_image_firebaseKey: `${img.firebaseKey}`, sort_date: Date.now(),
    };
    createThread(payload)
      .then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateThread(patchPayload)
          .then(() => {
            router.push('/threads/ThreadsPage');
          });
      });
  };

  return (
    <Form className={threadformstyles.ThreadFormContainer} onSubmit={handleSubmit}>
      <h1 className={threadformstyles.ThreadFormTitle}>Create Thread</h1>

      {/* FOLDER TITLE */}
      <FloatingLabel className={threadformstyles.ThreadFormLabel} controlId="floatingInput2" label="Thread Title">
        <Form.Control
          className={threadformstyles.ThreadFormInput}
          style={{ height: '2.7em' }}
          type="text"
          name="thread_title"
          value={formInput.thread_title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* FOLDER DESCRIPTION TEXTAREA */}
      <FloatingLabel className={threadformstyles.ThreadFormLabel} controlId="floatingTextArea" label="Thread Description">
        <Form.Control
          className={threadformstyles.ThreadFormInput}
          type="textarea"
          style={{ height: '2.7em' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel className={threadformstyles.ThreadFormLabel} controlId="floatingInput3" label="Category">
        <Form.Control
          className={threadformstyles.ThreadFormInput}
          style={{ height: '2.7em' }}
          type="text"
          name="category"
          value={formInput.category}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* FOLDER DESCRIPTION TEXTAREA */}

      {/* SUBMIT BUTTON  */}

      <Button type="submit" className={threadformstyles.ThreadFormSubmitButton}> Create Thread</Button>

    </Form>
  );
}
ThreadForm.propTypes = {
  img: PropTypes.shape({
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
    image_url: PropTypes.string,
  }).isRequired,
};
