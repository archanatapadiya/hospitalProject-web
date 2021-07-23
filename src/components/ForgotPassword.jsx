import React, { useState } from 'react';
import './stylesLogin.css';
import PropTypes from 'prop-types';
import Notification from 'rc-notification';
import logo from './images/logo.jpeg';
import { Link, useParams } from 'react-router-dom';

async function loginUser(credentials) {
    return fetch('http://3.109.71.28/hospital_login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }
   
   
async function loginAdmin(credentials) {
  return fetch('http://3.109.71.28/super_admin_login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }
 


export default function Login({ setToken, setSuperUser }) {

    const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const [adminLogin, setAdminLogin] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });

    if(token.is_success){
    setToken(token.data.token);
    setSuperUser(token.data.is_superuser);
    localStorage.setItem('token', token.data.token);
    localStorage.setItem('hospital_id', token.data.user_id);
    localStorage.setItem('username', token.data.username);
    localStorage.setItem('is_superuser', false);
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

  
  const handleAdminSubmit = async e => {
    e.preventDefault();
    const token = await loginAdmin({
      username,
      password
    });

    if(token.is_success){
    setToken(token.data.token);
    setSuperUser(token.data.is_superuser);
    localStorage.setItem('token', token.data.token);
    localStorage.setItem('username', token.data.username);
    localStorage.setItem('isSuperuser', token.data.is_superuser);
    }

    if(!token.is_success){
      Notification.newInstance({}, notification => {
        notification.notice({
          content: <span style={{backgroundColor: 'red', top: 65, left: '50%'}}>{token.response_message}</span>,
          closable: true,
          duration: 5,
        });
      });
    }
  }

  return(
    <div className="login-wrapper" style={{   boxShadow: '0px 0px 10px #0000001a',
      border: '1px solid #c9c9c9',
      padding: 50,
      marginLeft: 200,
      marginRight: 200,
      marginTop: 50,
      backgroundColor: '#F7FBF9',
      opacity: 1}}>

<br />



        <div  style={{padding: 20,  border: '10px solid', borderRadius: 10}}>
        
        <h1> <img src={logo} alt="Logo" width="40"/> MyMedCords</h1>
        </div>
        <br />

       
      <button type="button" class="btn btn-success btn-sm" onClick={() => setAdminLogin(true)}>Admin Login</button>


       <h2>Forgot</h2>

       {!adminLogin && (
      <h3>Please login with the hospital username and password </h3>
       )}
         {!adminLogin && (
      <form onSubmit={handleSubmit} style={{ boxShadow: '0px 0px 10px #0000001a', backgroundColor: '#0E53A5', width: '30%', border: '2px solid black',  marginTop: '20px', padding: '20px'}}>
        <label>
          <p style={{color: 'white'}}>Username</p>
          <input type="text"  onChange={e => setUserName(e.target.value)} required/>
        </label>
        <label>
          <p style={{color: 'white', marginTop: 20}}>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} required/>
        </label>
      
   

        <div>

        <div className="btn-wrapper">
<br />
<a href={`/forgot-password`} className="btn btn-primary" style={{color: 'lightgrey'}}>Forgot Password</a>


</div>



        <br />
          <button type="submit">Submit</button>
        </div>
      </form>
      )}

{adminLogin && (
      <h3>Please enter your Admin username and password </h3>
       )}

{adminLogin && (
      <form onSubmit={handleAdminSubmit} style={{ boxShadow: '0px 0px 10px #0000001a', backgroundColor: '#0E53A5', width: '30%', border: '2px solid black',  marginTop: '20px', padding: '20px'}}>
        <label>
          <p style={{color: 'white'}}>Admin Username</p>
          <input type="text"  onChange={e => setUserName(e.target.value)} required/>
        </label>
        <label>
          <p style={{color: 'white', marginTop: 20}}>Admin Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} required/>
        </label>
      
        <div>
        <br />
          <button type="submit">Submit</button>
        </div>
      </form>
      )}

    </div>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
    setSuperUser: PropTypes.func.isRequired
  }