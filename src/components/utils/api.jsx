import { protectedAxios as protectedAxios } from './helpers'
import { unProtectedAxios as unprotectedAxios } from './helpers'
import axios from 'axios'

const localToken = localStorage.getItem('token');

const  baseUrl  = "http://65.2.26.144:8000";

export const searchUser = async (params) => {

      return fetch(`${baseUrl}/find_request/`, {
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
  try{
  const response = await protectedAxios.post('/user_register/', {
    "username": params.username, 
    "email": params.email,
    "firstname":params.first_name,
    "lastname": params.last_name,
    "password": params.password,
    "address":params.address,
    "phone_number": params.phone_number,
    "zip_code": params.zip_code
  })
  return response.data;
}catch(error){
  console.log('error in api'+ error);
}
}


export const uploadUserReports = async (params) => {
//   try{
//   const response = await protectedAxios.post('/report_upload/', {
//     "hospital_id": 11, 
//     "user_id": params.user_id ,
//     "lab_id": 1,
//     "description": params.description ,
//     "file_name": params.file_name,
//     "file": params.file 
//   })
//   return response.data;
// }catch(error){
//   console.log('error in api'+ error);
// }

let bodyparams = {
  "hospital_id": 1, 
      "user_id": 9 ,
      "lab_id": 1,
      "description": params.description ,
      "file_name": params.file_name,
      "file": params.file 
}

return fetch(`${baseUrl}/report_upload/`, {
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
  try{
  const response = await protectedAxios.post('/report_fetch/', {
    "hospital_id": 1, 
    "user_id": 9 ,
  })
  return response.data;
}catch(error){
  console.log('error in api'+ error);
}
}


export const fetchUserUpdates = async (params) => {
  try{
  const response = await protectedAxios.post('/fetch_user_health_update/', {
    "hospital_id": 1, 
    "user_id": 9 ,
  })
  return response.data;
}catch(error){
  console.log('error in api'+ error);
}
}


export const fetchUserBilling = async (params) => {
  try{
  const response = await protectedAxios.post('/bill_fetch/', {
    "hospital_id": 1, 
    "user_id": 9 ,
  })
  return response.data;
}catch(error){
  console.log('error in api'+ error);
}
}



