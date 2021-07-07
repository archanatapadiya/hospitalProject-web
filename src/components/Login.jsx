import React, { useState } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import Notification from 'rc-notification';

async function loginUser(credentials) {
    return fetch('http://65.2.26.144:8000/hospital_login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }
   


export default function Login({ setToken }) {

    const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });

    if(token.is_success){
    setToken(token.data.token);
    localStorage.setItem('token', token.data.token);
    localStorage.setItem('hospital_id', token.data.user_id);
    localStorage.setItem('username', token.data.username);
    }

    if(!token.is_success){
      Notification.newInstance({}, notification => {
        notification.notice({
          content: <span style={{backgroundColor: 'red', top: 65, left: '50%'}}>{token.response_message}</span>,
          closable: true,
          duration: null,
        });
      });
    }
  }

  return(
    <div className="login-wrapper">
       <h1>Welcome to Hospital Data Upload System</h1>
      <h3>Please login with the hospital username and password </h3>
      <form onSubmit={handleSubmit} style={{backgroundColor: '#F7FBF9', width: '30%', border: '2px solid grey',  marginTop: '20px', padding: '20px'}}>
        <label>
          <p>Username</p>
          <input type="text"  onChange={e => setUserName(e.target.value)} required/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} required/>
        </label>
      
        <div>
        <br />
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }