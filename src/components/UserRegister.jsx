import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import FormikMaterialTextField from "./FormikMaterialTextField";
import * as handlers from "./handlers";
import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  ButtonToolbar,
  Button,
} from "reactstrap";
import history from './lib/history';
import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const SignupSchema = Yup.object().shape({
  
  first_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required(),
    last_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required(),
  email: Yup.string().email('Invalid email').required(),
  password: Yup.string().required(),
  phone_number: Yup.string().matches(phoneRegExp, 'Phone number is not valid').max(10, 'Phone number is not valid').required(),
  address: Yup.string().required(),
  zip_code: Yup.string().required(),
});

function UploadReportData() {
  return (
    <React.Fragment>
    <Formik
      initialValues={{ first_name: '',
      last_name: '',
      email: '',
    password: '',
    phone_number: '',
  address: '',
zip_code: '' }}
      validationSchema={SignupSchema}
      onSubmit={async (values, formikBag) => {
        let success = await handlers.registerUser(
          values,
          formikBag
        );

        if(success.is_success == true){
          history.push(`/`);
          window.location.reload();
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
          <Form className="formik-form" style={{backgroundColor: '#F7FBF9' ,width: '30%', border: '2px solid grey', marginLeft: '33%', marginTop: '20px', padding: '20px'}}>
          
            
                <div className="col">
                  <h3 className="form-group-label">First Name</h3>

                  <div className="form-group-field custom-input with-extention">
                    <Field
                      name="first_name"
                      component={FormikMaterialTextField}
                    />
                  </div>
            
                </div>

                <div className="col">
                  <h3 className="form-group-label">Last Name</h3>

                  <div className="form-group-field custom-input with-extention">
                    <Field
                      name="last_name"
                      component={FormikMaterialTextField}
                  
                    />
                  </div>
                </div>

                <div className="col">
                  <h3 className="form-group-label">Email</h3>

                  <div className="form-group-field custom-input with-extention">
                    <Field
                      name="email"
                      component={FormikMaterialTextField}
                  
                    />
                  </div>
                </div>

                <div className="col">
                  <h3 className="form-group-label">Password</h3>

                  <div className="form-group-field custom-input with-extention">
                    <Field
                      name="password"
                      component={FormikMaterialTextField}
                  
                    />
                  </div>
                </div>

                <div className="col">
                  <h3 className="form-group-label">Phone Number</h3>

                  <div className="form-group-field custom-input with-extention">
                    <Field
                      name="phone_number"
                      component={FormikMaterialTextField}
                  
                    />
                  </div>
                </div>

                <div className="col">
                  <h3 className="form-group-label">Address</h3>

                  <div className="form-group-field custom-input with-extention">
                    <Field
                      name="address"
                      component={FormikMaterialTextField}
                  
                    />
                  </div>
                </div>

                <div className="col">
                  <h3 className="form-group-label">Zip Code</h3>

                  <div className="form-group-field custom-input with-extention">
                    <Field
                      name="zip_code"
                      component={FormikMaterialTextField}
                  
                    />
                  </div>
                </div>
            
            <br />

            <div className="btn-wrapper">
              <Button color="primary" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  </React.Fragment>
  );
}

export default UploadReportData;
