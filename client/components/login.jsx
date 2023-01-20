import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'

import SignUpPage from './signUpPage.jsx';
import LoginPage from './loginPage.jsx';

const Login = (props) => {
  const [popUp, setPopUp] = useState();
  
  /* ----------popup button ---------*/
  const loginBtn = (
    <div>
      <button className="popUpBtn loginBtn" onClick={openLogin}>Log in</button>
    </div>
  )
  
  const logOutBtn = (
    <div>
      <button className="popUpBtn logOutBtn" onClick={logOut}>Log out</button>
    </div>
  )
  

  /* ----------click handlers ---------*/
  function closeLogin() {
    setPopUp(loginBtn);
  }

  function loggedIn() {
    setPopUp(logOutBtn);
  }
  
  function openLogin() {
    const inputs = document.querySelectorAll('.popup > input');
    inputs.forEach((input) => {
      input.value = '';
    })
    setPopUp(<LoginPage {...{ closeLogin, openSignUp, loggedIn, }} />);
  }
  
  function openSignUp() {
    const inputs = document.querySelectorAll('.popup > input');
    inputs.forEach((input) => {
      input.value = '';
    })
    setPopUp(<SignUpPage {...{ openLogin, loggedIn }} />);
  }
  
  function logOut() {
    const fetchData = async () => {
      try{
        const data = await axios.get('/user/logout');
        // console.log(data);
        window.location.reload();
      } catch (err) {
        console.log('logout error:', err);
      }
    }
    fetchData();
  }
  
   /* ----------render update---------*/
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get('/user');
        if (response.data === null) {
          setPopUp(loginBtn);
        } else {
          setPopUp(logOutBtn);
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  },[])

  return (
    <>
    {popUp}
    </>
  )
}

export default Login;