import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import FormikMaterialTextField from "./FormikMaterialTextField";
import * as handlers from './handlers';
import { Link, useParams } from 'react-router-dom';
import history from './lib/history';

import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  ButtonToolbar,
  Button,
} from "reactstrap";

function UploadData() {
  
    const [searchUser, setSearchUser] = useState('');

  const[userId, setUserId] = useState(0);

  return (
      <div>
      <h2>Welcome to Hospital Data Upload System</h2>

      {/* <a href={`/upload-details/${userId}`}> 
      {searchUser} 
      </a> */}

      

      {searchUser === undefined && (
        <p>No record found, please register</p>
      )}

    <React.Fragment>
      <Formik
        initialValues={{  }}
        onSubmit={async (values, formikBag) => {
          let success = await handlers.searchUser(
            values,
            formikBag
          );

          
          if(success.data.user_id){
            history.push(`/upload-details/${success.data.user_id}`);
            window.location.reload();
            }

          if(success){
          setSearchUser(success.data.username);
          setUserId(success.data.user_id);
          localStorage.setItem('user_data', JSON.stringify(success.data));
          }


        }}
      >
        {(formikBag) => {
          const {
            isSubmitting,
            errors,
            values,
            touched,
            setErrors,
            setFieldValue,
            handleSubmit,
          } = formikBag;

          return (
            <Form className="formik-form">
            
              
                  <div className="col">
                    <h3 className="form-group-label">Search patient</h3>

                    <div className="form-group-field custom-input with-extention">
                      <Field
                        name="username"
                        component={FormikMaterialTextField}
                        // type="number"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
              
              <br />

              <div className="btn-wrapper">
                <Button color="primary" type="submit" disabled={isSubmitting}>
                  Search
                </Button>
              </div>
              <br />
         
          <Link to="/add-new-user" className="btn btn-primary">Add New User</Link>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
    </div>
  );
}

export default UploadData;
