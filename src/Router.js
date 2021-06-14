import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import SearchUser from  './components/SearchUser';
import UploadDetails from './components/UploadDetails';
import UserRegister from './components/UserRegister';
import FetchUserReports from './components/FetchUserReports';
import FetchUserUpdates from './components/FetchUserUpdates';
import FetchUserBilling from './components/FetchUserBilling';
import UploadUserReports from './components/UploadUserReports';
import UploadUserUpdates from './components/UploadUserUpdates';
import UploadUserBilling from './components/UploadUserBilling';

import Login from './components/Login';

export default function BasicExample() {

  const localToken = localStorage.getItem('token');

  const [token, setToken] = useState(localToken);

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <Router>
      <div>
      
        <Switch>
          <Route exact path="/">
            <SearchUser />
          </Route>
          <Route exact path="/upload-details/:id(\d*)">
            <UploadDetails />
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