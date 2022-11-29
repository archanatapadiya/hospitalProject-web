import * as api from "./utils/api";
import notifications from './notifications';
import Notification from 'rc-notification';


export const searchUser = async (values, formikBag) => {
  try {
    
    const res = await api.searchUser(values);
    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};



export const searchUserSuperuser = async (values) => {
  try {
    const res = await api.searchUserSuperuser(values);
    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");
    throw err;
  }
};

export const deletePatientFromHosp = async (params) => {
  try {
    console.log('params in handler', params)
    const res = await api.deletePatientFromHosp(params);
    return res;
  } catch (err) {
    console.log("deletePatientFromHosp--->error---->");
    throw err;
  }
};


export const admitUser = async (params) => {
  try {


 if(!params.room_number){
    Notification.newInstance({}, notification => {
      notification.notice({
        content: <span style={{backgroundColor: 'red', top: 65, left: '50%'}}>Please enter room number</span>,
        closable: true,
        duration: null,
      });
    });
  }
    
    const res = await api.admitUser(params);
    if(res.is_success == true) {
    window.location.reload();
    }
    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};

export const fetchUserDetails = async (params) => {
  try {
    
    const res = await api.fetchUserDetails(params);

    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};

export const fetchSpaceUtilization = async (params) => {
  try {
    
    const res = await api.fetchSpaceUtilization(params);

    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};


export const registerUser = async (values, formikBag) => {
  try {
    const res = await api.registerUser(values);

    if(!res.is_success){
      alert("User already exist")

      // Notification.newInstance({}, notification => {
      //   notification.notice({
      //     content: <span style={{backgroundColor: 'red', top: 65, left: '50%'}}>{res.response_message}</span>,
      //     closable: true,
      //     duration: null,
      //   });
      // });
    }

    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};

export const addHealthTip = async (values, formikBag) => {
  try {
    const res = await api.addhealthTip(values);

    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};

export const fetchHealthTip = async (id) => {
  try {
    const res = await api.fetchHealthTip(id);
    return res;
  } catch (err) {
    console.log("fetchHealthTip--->error---->");

    throw err;
  }
};

export const deleteHealthTip = async (id) => {
  try {
    const res = await api.deleteHealthTip(id);
    return res;
  } catch (err) {
    console.log("deleteHealthTip--->error---->");

    throw err;
  }
};

export const addOffer = async (values, formikBag) => {
  try {
    const res = await api.addOffer(values);

    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};

export const fetchOffer = async () => {
  try {
    const res = await api.fetchOffer();
    return res;
  } catch (err) {
    console.log("fetchOffer--->error---->");

    throw err;
  }
};

export const deleteOffer = async (id) => {
  try {
    const res = await api.deleteOffer(id);
    return res;
  } catch (err) {
    console.log("deleteOffer--->error---->");

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
    const res = await api.fetchUserReport(params);

    // const res = {"is_success": true, "response_message": "Success", "data": {"current": [], "history": [{"description": "", "lab_id__name": "abc lab", "file_name": "CT Scan", "file_url": "https://hospital-api-reports.s3.amazonaws.com/CT Scan-08 Jun 2021 07:26 PM.jpg", "event_time": "09 Jun 2021"}, {"description": "", "lab_id__name": "abc lab", "file_name": "CT Scan", "file_url": "https://hospital-api-reports.s3.amazonaws.com/CT Scan-08 Jun 2021 07:26 PM.jpg", "event_time": "09 Jun 2021"}]}, "response_code": 200}
    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};

export const fetchUserUpdates = async (params) => {
  try {
    const res = await api.fetchUserUpdates(params);

    // const res = {"is_success": true, "response_message": "Success", "data": {"current": [], "history": [{"description": "", "lab_id__name": "abc lab", "file_name": "CT Scan", "file_url": "https://hospital-api-reports.s3.amazonaws.com/CT Scan-08 Jun 2021 07:26 PM.jpg", "event_time": "09 Jun 2021"}, {"description": "", "lab_id__name": "abc lab", "file_name": "CT Scan", "file_url": "https://hospital-api-reports.s3.amazonaws.com/CT Scan-08 Jun 2021 07:26 PM.jpg", "event_time": "09 Jun 2021"}]}, "response_code": 200}
    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};


export const fetchUserBilling = async (params) => {
  try {
    const res = await api.fetchUserBilling(params);

    // const res = {"is_success": true, "response_message": "Success", "data": {"current": [], "history": [{"description": "", "lab_id__name": "abc lab", "file_name": "CT Scan", "file_url": "https://hospital-api-reports.s3.amazonaws.com/CT Scan-08 Jun 2021 07:26 PM.jpg", "event_time": "09 Jun 2021"}, {"description": "", "lab_id__name": "abc lab", "file_name": "CT Scan", "file_url": "https://hospital-api-reports.s3.amazonaws.com/CT Scan-08 Jun 2021 07:26 PM.jpg", "event_time": "09 Jun 2021"}]}, "response_code": 200}
    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};

export const deleteUserUpdates = async (params) => {
  try {
    const res = await api.deleteUserUpdates(params);
    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};

export const deleteUserReports = async (params) => {
  try {
    const res = await api.deleteUserReports(params);
    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};


export const deleteUserBills = async (params) => {
  try {
    const res = await api.deleteUserBills(params);
    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};

export const fetchHospitalList = async (localToken1, userIdLocal) => {
  try {
    const res = await api.fetchHospitalList(localToken1, userIdLocal);
    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};

export const disableHospital = async (params) => {
  try {
   
    const res = await api.disableHospital(params);
    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};

export const deleteHospital = async (params) => {
  try {
    const res = await api.deleteHospital(params);
    return res;
  } catch (err) {
    console.log("deleteHosp--->error---->");
    throw err;
  }
};

export const addHospitalPlan = async (superUserId, reportLimit, reportPrice, updatesLimit, updatesPrice, billsLimit, billsPrice) => {
  try {
    const res = await api.addHospitalPlan(superUserId, reportLimit, reportPrice, updatesLimit, updatesPrice, billsLimit, billsPrice);
    return res;
  } catch (err) {
    console.log("addHospitalPlan--->error---->");
    throw err;
  }
};

export const addIndividualPlan = async (superUserId, documentLimit, documentPrice) => {
  try {
    const res = await api.addIndividualPlan(superUserId, documentLimit, documentPrice);
    return res;
  } catch (err) {
    console.log("addHospitalPlan--->error---->");
    throw err;
  }
};

export const viewHospitalPlan = async () => {
  try {
    const res = await api.viewHospitalPlan();
    return res;
  } catch (err) {
    console.log("viewHospitalPlan--->error---->");
    throw err;
  }
};

export const viewIndividualPlan = async () => {
  try {
    const res = await api.viewIndividualPlan();
    return res;
  } catch (err) {
    console.log("viewIndividualPlan--->error---->");
    throw err;
  }
};

export const disableHospitalPlan = async (params) => {
  try {
   
    const res = await api.disableHospitalPlan(params);
    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};

export const disableIndividualPlan = async (params) => {
  try {
   
    const res = await api.disableIndividualPlan(params);
    return res;
  } catch (err) {
    console.log("handleSearch--->error---->");

    throw err;
  }
};
