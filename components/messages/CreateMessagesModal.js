/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from '../../utils/context/authContext';
import { createMessages, updateMessages } from '../../API/messagesData';
import userstomessagesstyle from '../../styles/messages/UsersToMessagePage.module.css';

const initialState = {
  messages_title: '',
};

export default function CreateMessagesModal({ otherUser }) {
  const [show, setShow] = useState(false);
  const { user } = useAuth();
  const [formInput, setFormInput] = useState(initialState);

  const handleSubmit = () => {
    const payload = {
      user_1: user.uid,
      user_2: otherUser.uid,
      user_1name: user.displayName,
      user_2name: otherUser.displayName,
      date_added: new Date().toLocaleString(),
      author: user.displayName,
      messages_title: formInput.messages_title,
    };
    createMessages(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateMessages(patchPayload)
        .then(() => {
          window.location.reload(true);
        });
    });
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Button className={userstomessagesstyle.ModalButton} variant="primary" onClick={handleShow}>
        Message
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className={userstomessagesstyle.Modal} closeButton>
          <Modal.Title>Start Messaging between {user.displayName} & {otherUser.displayName} </Modal.Title>
        </Modal.Header>
        <Modal.Body className={userstomessagesstyle.Modal}>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Messages Title</Form.Label>
              <Form.Control
                className={userstomessagesstyle.MessagesTitleInput}
                onChange={handleChange}
                type="text"
                value={formInput.messages_title}
                name="messages_title"
                placeholder="Create Messages Title"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className={userstomessagesstyle.Modal}>
          <Button className={userstomessagesstyle.ModalButton} onClick={handleClose}>
            Close
          </Button>
          <Button className={userstomessagesstyle.ModalButton} onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
