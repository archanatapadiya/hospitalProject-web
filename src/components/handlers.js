import * as api from "./utils/api";

export const searchUser = async (values, formikBag) => {
  try {
    
    const res = await api.searchUser(values);

    // const res = {
    //   is_success: true,
    //   response_message: "Success",
    //   data: { username: "9898989898", user_id: 9, firstname: "John" },
    //   response_code: 200,
    // };

    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};

export const registerUser = async (values, formikBag) => {
  try {
    const res = await api.registerUser(values);

    // const res = {
    //   is_success: true,
    //   response_message: "Success",
    //   data: { username: "9898989898", user_id: 9, firstname: "John" },
    //   response_code: 200,
    // };

    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};

export const uploadUserReport = async (values, formikBag) => {
  try {
    const res = await api.uploadUserReports(values);

    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};

export const uploadUserUpdates = async (values, formikBag) => {
  try {
    const res = await api.uploadUserUpdates(values);

    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};

export const uploadUserBilling = async (values, formikBag) => {
  try {
    const res = await api.uploadUserBilling(values);

    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};

export const fetchUserReport = async (params) => {
  try {
    // const res = await api.fetchUserReport(params);

    const res = {"is_success": true, "response_message": "Success", "data": {"current": [], "history": [{"description": "", "lab_id__name": "abc lab", "file_name": "CT Scan", "file_url": "https://hospital-api-reports.s3.amazonaws.com/CT Scan-08 Jun 2021 07:26 PM.jpg", "event_time": "09 Jun 2021"}, {"description": "", "lab_id__name": "abc lab", "file_name": "CT Scan", "file_url": "https://hospital-api-reports.s3.amazonaws.com/CT Scan-08 Jun 2021 07:26 PM.jpg", "event_time": "09 Jun 2021"}]}, "response_code": 200}
    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};

export const fetchUserUpdates = async (params) => {
  try {
    // const res = await api.fetchUserUpdates(params);

    const res = {"is_success": true, "response_message": "Success", "data": {"current": [], "history": [{"description": "", "lab_id__name": "abc lab", "file_name": "CT Scan", "file_url": "https://hospital-api-reports.s3.amazonaws.com/CT Scan-08 Jun 2021 07:26 PM.jpg", "event_time": "09 Jun 2021"}, {"description": "", "lab_id__name": "abc lab", "file_name": "CT Scan", "file_url": "https://hospital-api-reports.s3.amazonaws.com/CT Scan-08 Jun 2021 07:26 PM.jpg", "event_time": "09 Jun 2021"}]}, "response_code": 200}
    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};


export const fetchUserBilling = async (params) => {
  try {
    // const res = await api.fetchUserBilling(params);

    const res = {"is_success": true, "response_message": "Success", "data": {"current": [], "history": [{"description": "", "lab_id__name": "abc lab", "file_name": "CT Scan", "file_url": "https://hospital-api-reports.s3.amazonaws.com/CT Scan-08 Jun 2021 07:26 PM.jpg", "event_time": "09 Jun 2021"}, {"description": "", "lab_id__name": "abc lab", "file_name": "CT Scan", "file_url": "https://hospital-api-reports.s3.amazonaws.com/CT Scan-08 Jun 2021 07:26 PM.jpg", "event_time": "09 Jun 2021"}]}, "response_code": 200}
    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};

