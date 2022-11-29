import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import SearchUser from  './components/SearchUser';
import SearchHospital from  './components/SearchHospital';
import Support from  './components/Support';
import UploadDetails from './components/UploadDetails';
import UserRegister from './components/UserRegister';
import FetchUserReports from './components/FetchUserReports';
import FetchUserUpdates from './components/FetchUserUpdates';
import FetchUserBilling from './components/FetchUserBilling';
import UploadUserReports from './components/UploadUserReports';
import UploadUserUpdates from './components/UploadUserUpdates';
import UploadUserBilling from './components/UploadUserBilling';
import UserDetails from './components/UserDetails';
import AddHospital from './components/AddHospital';
import EditHospital from './components/EditHospital';
import EditPatient from './components/EditPatient';
import HospitalList from './components/HospitalList';
import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import SuperUserLogin from './components/SuperAdminLogin';
import Topbar from './components/layout/topbar';
import Top from './components/topbar/topbar';
import HealthTip from './components/AddHealthTip';
import Offer from './components/AddOffer';
import ViewHealthTip from './components/ViewHealthTip';
import ViewOffer from './components/View Offer';
import AddCommercialPlans from './components/AddCommercialPlans';
import ViewCommercialPlans from './components/ViewCommercialPlans';
import EditCommercialPlans from './components/EditCommercialPlans';
import EditIndividualPlans from './components/EditIndividualPlans';

export default function BasicExample() {

  const localToken = localStorage.getItem('token');

  const [token, setToken] = useState(localToken);

  const localSuperUser = localStorage.getItem('isSuperuser');

  const [superUser, setSuperUser] = useState(localSuperUser);

  const localUserId = localStorage.getItem('userId');


  const [locuserId, setLocUserId] = useState(localUserId);
  let loc = window.location.href;

  const userData = localStorage.getItem('user_data');
  const userData_parsed = JSON.parse(userData);
  const userId = userData_parsed?.user_id;

  if(!token) {
    if (window.location.href.indexOf("support") > -1) {
      return <Support />
     }
     if (window.location.href.indexOf("superuser-login") > -1) {
      return <SuperUserLogin setToken={setToken} setSuperUser={setSuperUser} setUserId={setLocUserId} />
     }
    return <Login setToken={setToken} setSuperUser={setSuperUser} setUserId={setLocUserId} />
  }
 
  return (
    <Router basename="/dashboard">
     
      
       {/* { window.location.href.indexOf("superuser-login") == -1  && ( <Top userId={userId} />)} */}
    
      <div style={{marginTop: 0}}>
        <Switch>
          <Route exact path="/">
             <SearchUser />
          </Route> 
      
          <Route exact path="/superuser-login">
           < SearchHospital />
          </Route> 
          <Route exact path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route exact path="/add-hospital">
            <AddHospital />
          </Route>
          <Route exact path="/edit-hospital">
            <EditHospital />
          </Route>
          <Route exact path="/edit-patient-details/:id(\d*)">
            <EditPatient />
          </Route>
          <Route exact path="/upload-details/:id(\d*)">
            <UploadDetails />
          </Route>
          <Route exact path="/user-details/:id(\d*)">
            <UserDetails />
          </Route>
          <Route exact path="/upload-user-reports/:id(\d*)">
            <UploadUserReports />
          </Route>
          <Route exact path="/fetch-user-reports/:id(\d*)">
            <FetchUserReports />
          </Route>
          <Route exact path="/upload-user-health/:id(\d*)">
            <UploadUserUpdates />
          </Route>
          <Route exact path="/fetch-user-health/:id(\d*)">
            <FetchUserUpdates />
          </Route>
          <Route exact path="/upload-user-billing/:id(\d*)">
            <UploadUserBilling />
          </Route>
          <Route exact path="/fetch-user-billing/:id(\d*)">
            <FetchUserBilling />
          </Route>
          <Route exact path="/add-new-user">
            <UserRegister />
          </Route>
          <Route exact path="/add-health-tip">
            <HealthTip />
          </Route>
          <Route exact path="/add-offer">
            <Offer />
          </Route>
          <Route exact path="/view-health-tip">
            <ViewHealthTip />
          </Route>
          <Route exact path="/view-offer">
            <ViewOffer />
          </Route>
          <Route exact path="/add-plans">
            <AddCommercialPlans />
          </Route>
          <Route exact path="/view-plans">
            <ViewCommercialPlans />
          </Route>
          <Route exact path="/edit-plans">
            <EditCommercialPlans />
          </Route>
          <Route exact path="/edit-individual-plans">
            <EditIndividualPlans />
          </Route>
        </Switch>
        </div>
    
  


    </Router>
  );
}