import { protectedAxios as protectedAxios } from './helpers'
import { unProtectedAxios as unprotectedAxios } from './helpers'
import axios from 'axios'
import dayjs from 'dayjs';

const localToken = localStorage.getItem('token');
const userData = localStorage.getItem('user_data');
const userData_parsed = JSON.parse(userData);

const hospitalId = localStorage.getItem('hospital_id');
const baseUrl = "http://43.205.89.142";

export const searchUser = async (params) => {

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

export const searchUserSuperuser = async (params) => {
  return fetch(`${baseUrl}/find_user_super_admin/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localToken,
    },
    body: JSON.stringify(params)
  })
    .then(data => data.json())
}



export const deletePatientFromHosp = async (params) => {
  return fetch(`${baseUrl}/delete_patient_from_hospital/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localToken,
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

export const fetchSpaceUtilization = async (params) => {

  return fetch(`${baseUrl}/check_space/`, {
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

  let dateOfBirth = dayjs(params.dob).format('YYYY-MM-DD');

  let bodyparams = {
    "username": params.username,
    "email": params.email,
    "firstname": params.first_name,
    "lastname": params.last_name,
    "password": params.password,
    "address": params.address,
    "phone_number": params.phone_number,
    "zip_code": params.zip_code,
    "dob": dateOfBirth,
    "blood_pressure": params.blood_pressure,
    "blood_group": params.blood_group,
    "height": params.height,
    "weight": params.weight,
    // "bmi":params.bmi,
    "pulse": params.pulse,
    "health_id": params.health_id
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

export const addhealthTip = async (params) => {

  let bodyparams = {
    "title": params.title,
    "description": params.description,

  }
  return fetch(`${baseUrl}/add_health_tip/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localToken,
    },
    body: JSON.stringify(bodyparams)

  })
    .then(data => data.json())
}

export const fetchHealthTip = async () => {
  let bodyparams = {}
  return fetch(`${baseUrl}/view_health_tip/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localToken,
    },
    body: JSON.stringify(bodyparams)
  })
    .then(data => data.json())
}


export const deleteHealthTip = async (id) => {
  let bodyparams = {
    "id": id
  }
  return fetch(`${baseUrl}/delete_health_tip/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localToken,
    },
    body: JSON.stringify(bodyparams)
  })
    .then(data => data.json())
}


export const addOffer = async (params) => {
  let start_date = dayjs(params.start_date).format('YYYY-MM-DD');
  let end_date = dayjs(params.end_date).format('YYYY-MM-DD');

  let bodyparams = {
    "title": params.title,
    "description": params.description,
    "start_date": start_date,
    "end_date": end_date
  }
  return fetch(`${baseUrl}/add_offers/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localToken,
    },
    body: JSON.stringify(bodyparams)
  })
    .then(data => data.json())
}

export const fetchOffer = async () => {
  let bodyparams = {}
  return fetch(`${baseUrl}/view_offers/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localToken,
    },
    body: JSON.stringify(bodyparams)
  })
    .then(data => data.json())
}

export const deleteOffer = async (id) => {
  let bodyparams = {
    "id": id
  }
  return fetch(`${baseUrl}/delete_offers/`, {
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
  try {
    const response = await protectedAxios.post('/user_health_update/', {
      "hospital_id": 11,
      "user_id": params.user_id,
      "lab_id": 1,
      "description": params.description,
      "file_name": params.file_name,
      "file": params.file
    })
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
}

export const uploadUserBilling = async (params) => {
  try {
    const response = await protectedAxios.post('/bill_upload/', {
      "hospital_id": 11,
      "user_id": params.user_id,
      "lab_id": 1,
      "description": params.description,
      "file_name": params.file_name,
      "file": params.file
    })
    return response.data;
  } catch (error) {
    console.log('error in api' + error);
  }
}

export const fetchUserReport = async (params) => {
  let bodyparams = {
    "hospital_id": hospitalId,
    "user_id": userData_parsed?.user_id,
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
    "user_id": userData_parsed.user_id,
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
    "user_id": userData_parsed.user_id,
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


export const deleteUserUpdates = async (params) => {
  let bodyparams = {
    "id": params,
    "delete": true,
  }
  return fetch(`${baseUrl}/delete_health_update/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localToken,
    },
    body: JSON.stringify(bodyparams)
  })
    .then(data => data.json())
}

export const deleteUserReports = async (params) => {
  let bodyparams = {
    "id": params,
    "delete": true,
  }
  return fetch(`${baseUrl}/delete_report/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localToken,
    },
    body: JSON.stringify(bodyparams)
  })
    .then(data => data.json())
}

export const deleteUserBills = async (params) => {
  let bodyparams = {
    "id": params,
    "delete": true,
  }
  return fetch(`${baseUrl}/delete_bill/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localToken,
    },
    body: JSON.stringify(bodyparams)
  })
    .then(data => data.json())
}

export const fetchHospitalList = async (localToken1, userIdLocal) => {
  let bodyparams = {
    user_id: userIdLocal
  }
  console.log('params454545', localToken1, userIdLocal)
  return fetch(`${baseUrl}/fetch_hospitals/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localToken1,
    },
    body: JSON.stringify(bodyparams)
  })
    .then(data => data.json())
}

export const disableHospital = async (params) => {
  let bodyparams = {
    "id": params['id'],
    "user_id": params['user_id'],
    "delete": params['is_active'],
  }
  return fetch(`${baseUrl}/delete_hospital/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localToken,
    },
    body: JSON.stringify(bodyparams)
  })
    .then(data => data.json())
}

export const deleteHospital = async (params) => {
  let bodyparams = {
    "id": params['id'],
    "user_id": params['user_id'],
    "delete": true
  }
  return fetch(`${baseUrl}/remove_hospital/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localToken,
    },
    body: JSON.stringify(bodyparams)
  })
    .then(data => data.json())
}

export const addHospitalPlan = async (superUserId, reportLimit, reportPrice, updatesLimit, updatesPrice, billsLimit, billsPrice) => {

  let bodyparams = {
    "user_id": superUserId,
  "report_limit": reportLimit,
  "report_price": reportPrice ,
  "bill_limit": billsLimit,
  "bill_price": billsPrice,
  "health_limit": updatesLimit,
  "health_price": updatesPrice,
  "name": null
  }
  return fetch(`${baseUrl}/hospital_space_plan/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localToken,
    },
    body: JSON.stringify(bodyparams)

  })
    .then(data => data.json())
}

export const addIndividualPlan = async (superUserId, documentLimit, documentPrice) => {

  let bodyparams = {
    "user_id": superUserId,
  "report_limit": documentLimit,
  "report_price": documentPrice ,
  "name": null
  }
  return fetch(`${baseUrl}/user_space_plan/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localToken,
    },
    body: JSON.stringify(bodyparams)

  })
    .then(data => data.json())
}

export const viewHospitalPlan = async () => {
  return fetch(`${baseUrl}/hospital_space_view/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localToken,
    },

  })
    .then(data => data.json())
}

export const viewIndividualPlan = async () => {
  return fetch(`${baseUrl}/user_space_view/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localToken,
    },
  })
    .then(data => data.json())
}

export const disableHospitalPlan = async (params) => {
  let bodyparams = {
    "id": params['id'],
    "is_active": params['is_active'],
  }
  return fetch(`${baseUrl}/hospital_space_disable/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localToken,
    },
    body: JSON.stringify(bodyparams)
  })
    .then(data => data.json())
}

export const disableIndividualPlan = async (params) => {
  let bodyparams = {
    "id": params['id'],
    "is_active": params['is_active'],
  }
  return fetch(`${baseUrl}/user_space_disable/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localToken,
    },
    body: JSON.stringify(bodyparams)
  })
    .then(data => data.json())
}

