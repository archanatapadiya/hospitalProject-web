import { protectedAxios as protectedAxios } from './helpers'
import { unProtectedAxios as unprotectedAxios } from './helpers'
import axios from 'axios'

const localToken = localStorage.getItem('token');
const userData = localStorage.getItem('user_data');
const userData_parsed = JSON.parse(userData);

const hospitalId = localStorage.getItem('hospital_id');
const  baseUrl  = "http://65.2.26.144:8000";

export const searchUser = async (params) => {

  console.log('params123', params)
      return fetch(`${baseUrl}/find_request/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: params['localToken'],
        },
        body: JSON.stringify(params)
      })
        .then(data => data.json())
     }
       
export const admitUser = async (params) => {

return fetch(`${baseUrl}/admit_user/`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: localToken,
  },
  body: JSON.stringify(params)
})
  .then(data => data.json())
}

export const fetchUserDetails = async (params) => {

  return fetch(`${baseUrl}/get_user_details/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localToken,
    },
    body: JSON.stringify(params)
  })
    .then(data => data.json())
  }

export const registerUser = async (params) => {

  let bodyparams = {
    "username": params.username, 
    "email": params.email,
    "firstname":params.first_name,
    "lastname": params.last_name,
    "password": params.password,
    "address":params.address,
    "phone_number": params.phone_number,
    "zip_code": params.zip_code
  }
    return fetch(`${baseUrl}/user_register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localToken,
      },
      body: JSON.stringify(bodyparams)
    })
      .then(data => data.json())



}




export const uploadUserUpdates = async (params) => {
  try{
  const response = await protectedAxios.post('/user_health_update/', {
    "hospital_id": 11, 
    "user_id": params.user_id ,
    "lab_id": 1,
    "description": params.description ,
    "file_name": params.file_name,
    "file": params.file 
  })
  return response.data;
}catch(error){
  console.log('error in api'+ error);
}
}

export const uploadUserBilling = async (params) => {
  try{
  const response = await protectedAxios.post('/bill_upload/', {
    "hospital_id": 11, 
    "user_id": params.user_id ,
    "lab_id": 1,
    "description": params.description ,
    "file_name": params.file_name,
    "file": params.file 
  })
  return response.data;
}catch(error){
  console.log('error in api'+ error);
}
}

export const fetchUserReport = async (params) => {
let bodyparams = {
  "hospital_id": hospitalId, 
      "user_id": userData_parsed.user_id ,
}
  return fetch(`${baseUrl}/report_fetch/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localToken,
    },
    body: JSON.stringify(bodyparams)
  })
    .then(data => data.json())
}


export const fetchUserUpdates = async (params) => {
  let bodyparams = {
    "hospital_id": hospitalId, 
        "user_id": userData_parsed.user_id ,
  }
    return fetch(`${baseUrl}/fetch_user_health_update/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localToken,
      },
      body: JSON.stringify(bodyparams)
    })
      .then(data => data.json())
}


export const fetchUserBilling = async (params) => {
  let bodyparams = {
    "hospital_id": hospitalId, 
        "user_id": userData_parsed.user_id ,
  }
    return fetch(`${baseUrl}/bill_fetch/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localToken,
      },
      body: JSON.stringify(bodyparams)
    })
      .then(data => data.json())
}



