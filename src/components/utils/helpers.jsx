import axios from 'axios'
import { API } from './constants'
import { Buffer } from 'buffer'
// import { getToken } from './api'


// const auth = Buffer.from(`${API.CONSUMER_KEY}:${API.CONSUMER_SECRET}`, 'utf8').toString('base64')
// const auth = await read_from_async_storage

const localToken = localStorage.getItem('token');

export const protectedAxios = axios.create({
  baseURL: API.SERVER_URL,
  headers: {
    'Content-Type': API.CONTENT_TYPE,
    Authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imhvc3BpdGFsQGdtYWlsLmNvbSIsImV4cCI6MTY1NTA0MDc1Nn0.iFwjU2KfznFbtMHINLCEBzHxD0lkbcSl3WsLsG2zmFI`,
  },
})
export const unProtectedAxios = axios.create({
  baseURL: API.SERVER_URL,
  headers: {
    'Content-Type': API.CONTENT_TYPE,
    // Authorization: `Basic ${auth}`,
  },
})

// protectedAxios.interceptors.request.use(
//   async (config) => {
//       const token = await getToken()
//       if (token) {
//           config.headers['Authorization'] =  token;
//       }
//       // config.headers['Content-Type'] = 'application/json';
//       return config;
//   },
//   error => {
//       Promise.reject(error)
//   });

