/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function OffCanvas({ name, ...props }) {
  const [show, setShow] = useState(false);
  const { user } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();

  return (
    <>
      <Button variant="dark" onClick={handleShow} className="me-2">
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props} className="off-canvas-container">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ScreenCatcher</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

          <img src={user.photoURL} width="200px" />
          <h1>{user.displayName}</h1>

          <nav onClick={handleClose}>
            <ul className="navbar-nav me-auto">
              <li className="NavLink">
                <Link passHref href="/">
                  <a className="NavLink">
                    Home
                  </a>
                </Link>
              </li>
              <li className="NavLink">
                <Link passHref href="/images">
                  <a className="NavLink">
                    Images
                  </a>
                </Link>
              </li>
              <li className="NavLink">
                <Link passHref href="/folders">

                  <a className="NavLink">
                    Folders
                  </a>
                </Link>
              </li>
              <li className="NavLink">
                <Link passHref href="/ImageEditorPage">

                  <a className="NavLink">
                    ImageEditor
                  </a>
                </Link>
              </li>
              <li className="NavLink">
                <Link passHref href="/UsersPage">

                  <a className="NavLink">
                    Users
                  </a>
                </Link>
              </li>
              <li className="NavLink">
                <Link passHref href="/ThreadsPage">

                  <a className="NavLink">
                    Threads
                  </a>
                </Link>
              </li>
              <li className="NavLink">
                <Link passHref href="/userProfile">

                  <a className="NavLink">
                    UserProfile
                  </a>
                </Link>
              </li>
              <li className="NavLink">
                <Link passHref href="/messages">

                  <a className="NavLink">
                    Messages
                  </a>
                </Link>
              </li>
              <button
                type="button"
                className="btn btn-danger navbar-signout-btn"
                onClick={() => {
                  router.push('/');
                  signOut();
                }}
              >
                Sign Out
              </button>
            </ul>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

// function Example() {
//   return (
//     <>
//       {['start', 'end', 'top', 'bottom'].map((placement, idx) => (
//         <OffCanvasExample key={idx} placement={placement} name={placement} />
//       ))}
//     </>
//   );
// }
export default OffCanvas;

OffCanvas.propTypes = {

  name: PropTypes.string.isRequired,

};
