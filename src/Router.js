import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import SearchUser from  './components/SearchUser';
import UploadDetails from './components/UploadDetails';
import UploadUserReports from './components/UploadUserReports';
import UserRegister from './components/UserRegister';
import FetchUserReports from './components/FetchUserReports';

export default function BasicExample() {
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
          <Route exact path="/upload-user-reports">
            <UploadUserReports />
          </Route>
          <Route exact path="/fetch-user-reports">
            <FetchUserReports />
          </Route>
          <Route exact path="/upload-user-health">
            <UploadUserReports />
          </Route>
          <Route exact path="/upload-user-billing">
            <UploadUserReports />
          </Route>
          <Route exact path="/add-new-user">
            <UserRegister />
          </Route>
          
         
        </Switch>
      </div>

   
    </Router>
  );
}