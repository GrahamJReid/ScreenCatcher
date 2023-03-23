/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { signIn } from '../utils/auth';
import signinpagestyles from '../styles/SignInPage.module.css';

function Signin() {
  return (
    <div className={signinpagestyles.SignInPageContainer}>
      <h1 className={signinpagestyles.Title}>ScreenCatcher</h1>
      <img className={signinpagestyles.Image} src="/logo.png" />
      <button type="button" className={signinpagestyles.Button} onClick={signIn}>
        Sign In
      </button>
    </div>
  );
}

export default Signin;
