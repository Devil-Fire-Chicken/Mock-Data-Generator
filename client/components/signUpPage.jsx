import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const signUpPage = (props) => {
  const [message, setNewMessage] = useState('');
  const [messageChanged, setMessageStatus] = useState(0);
  const username = useRef();
  const password = useRef();
  const passwordR = useRef();

  function sendSignup(e) {
    e.preventDefault();
    console.log('sendsignup');

    if (password.current !== passwordR.current) {
      console.log('password doesn\'t match');
      setMessageStatus(1);
      return;
    }

    const signUp = async () => {
      try {
        await axios.post('/user/signup', { username: username.current, password: password.current })
        props.loggedIn();
      } catch (error) {
        setMessageStatus(2);
      }
    }
    signUp();
  }

  useEffect(() => {
    if (messageChanged === 1) {
      setNewMessage('Passwords doesn\'t match');
      setMessageStatus(0);
      setTimeout(() => {
        setNewMessage('');
      }, 3000);
    } else if (messageChanged === 2) {
      setNewMessage('username already existed');
      setMessageStatus(0);
      setTimeout(() => {
        setNewMessage('');
      }, 3000);
    }

  })

  return (
    <div className="popup">
      <h1>Welcome New User!!</h1>
      <form className="loginForm" onSubmit={sendSignup}>
        <label className="loginLabel">Username:
          <input type="text" name="username" onChange={e => {username.current = e.target.value}} required />
        </label>
        <br/>
        <label className="loginLabel">Password:
          <input type="password" id="password" onChange={e => {password.current = e.target.value}} required />
        </label>
        <br/>
        <label className="loginLabel">Re-enter Password:
          <input type="password" id="passwordR" onChange={e => {passwordR.current = e.target.value}} required />
        </label>
        <div className="loginFormBtns">
          <button type="submit" className="button" >Signup</button>
          <button type="button" className="button" onClick={props.openLogin}>Back to Login</button>
        </div>
      </form>
      <p>{message}</p>
    </div>
  )
}

export default signUpPage;