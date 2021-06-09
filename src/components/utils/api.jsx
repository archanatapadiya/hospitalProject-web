import { protectedAxios as protectedAxios } from './helpers'
import { unProtectedAxios as unprotectedAxios } from './helpers'
import axios from 'axios'

export const searchUser = async (params) => {
  try{
  const response = await protectedAxios.post('/find_user/', {
    "username": params.username, 
  })
  return response.data;
}catch(error){
  console.log('error in api'+ error);
}
}

export const uploadUserReports = async (params) => {
  try{
  const response = await protectedAxios.post('/upload_report/', {
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



