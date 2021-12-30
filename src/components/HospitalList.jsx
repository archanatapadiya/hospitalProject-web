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
  const [localToken1, setLocalToken1] = useState('');

  const[userId, setUserId] = useState(0);


  const admitUser = async () => {
    history.push(`/add-hospital`);

 
  };

  useEffect(() => {
    const localTokenCalled = localStorage.getItem('token');
    setLocalToken1(localTokenCalled);
  }, []);
 
  return (
      <div>
      <h2>Health Center Data Upload System</h2>

      {searchUser === undefined && (
        <p>No record found, please register</p>
      )}

    <React.Fragment>
      <Formik
        initialValues={{  }}
        onSubmit={async (values, formikBag) => {
        
          values.localToken = localToken1;
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
                   

                    <div className="btn-wrapper">

                    <Link to="/add-hospital" className="btn btn-primary">Add Hospital</Link>

                   
              </div>
                  </div>
              
              <br />

              <h2>List Of Hospitals</h2>

            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
    </div>
  );
}

export default UploadData;
