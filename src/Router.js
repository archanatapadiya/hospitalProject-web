import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import SearchUser from  './components/SearchUser';
import SearchHospital from  './components/SearchHospital';

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
import HospitalList from './components/HospitalList';
import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import Topbar from './components/layout/topbar';
import Top from './components/topbar/topbar';

export default function BasicExample() {

  const localToken = localStorage.getItem('token');

  const [token, setToken] = useState(localToken);

  const localSuperUser = localStorage.getItem('isSuperuser');

  const [superUser, setSuperUser] = useState(localSuperUser);

  const localUserId = localStorage.getItem('userId');


  const [locuserId, setLocUserId] = useState(localUserId);


  const userData = localStorage.getItem('user_data');
  const userData_parsed = JSON.parse(userData);
  const userId = userData_parsed?.user_id;

  if(!token) {
    return <Login setToken={setToken} setSuperUser={setSuperUser} setUserId={setLocUserId} />
  }
 
  return (
    <Router basename="/">
     
      
        <Top userId={userId} />
    
      <div style={{marginTop: 90}}>
        <Switch>
          <Route exact path="/">
            {superUser ? < SearchHospital /> : <SearchUser />}
          </Route> 
          <Route exact path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route exact path="/add-hospital">
            <AddHospital />
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
        </Switch>
        </div>
    
  


    </Router>
  );
}