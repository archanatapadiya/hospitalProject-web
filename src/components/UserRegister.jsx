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
import history from "./lib/history";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Background from '../components/images/background.jpeg';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignupSchema = Yup.object().shape({
  first_name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(),
  last_name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(),
  email: Yup.string().email("Invalid email").required(),
  password: Yup.string().required(),
  phone_number: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .max(10, "Phone number is not valid")
    .required(),
  address: Yup.string().required(),
  zip_code: Yup.string().required(),
});

function UploadReportData() {
  return (
    <React.Fragment>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          dob: "",
          email: "",
          password: "",
          phone_number: "",
          address: "",
          zip_code: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, formikBag) => {
          let success = await handlers.registerUser(values, formikBag);

          if (success.is_success == true) {
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
            <Form
              // className="formik-form"
              className="login-wrapper"
              style={{
                boxShadow: '0px 0px 10px #0000001a',
                border: '1px solid #c9c9c9',
                padding: 50,
                marginLeft: 350,
                marginRight: 350,
                marginTop: 50,
                backgroundColor: '#F7FBF9',
                opacity: 1,
                background: `url(${Background})`,
                backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
              }}
            >
                <h2 style={{color: '#D3ECF9'}}>Add New User</h2>

              <div style={{ backgroundColor: 'white', border: '2px solid black', marginTop: '20px', padding: '30px', width: '50%'}}>
              <div className="col" >
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
                  <Field name="last_name" component={FormikMaterialTextField} />
                </div>
              </div>

              <div className="col">
                <h3 className="form-group-label">Date of Birth</h3>

                <div className="form-group-field custom-input with-extention">
                  <DatePicker
                    selected={values.dob}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    name="dob"
                    onChange={(date) => setFieldValue("dob", date)}
                  />
                </div>
              </div>

              <div className="col">
                <h3 className="form-group-label">Email</h3>

                <div className="form-group-field custom-input with-extention">
                  <Field name="email" component={FormikMaterialTextField} />
                </div>
              </div>

              <div className="col">
                <h3 className="form-group-label">Password</h3>

                <div className="form-group-field custom-input with-extention">
                  <Field
                    name="password"
                    type="password"
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
                  <Field name="address" component={FormikMaterialTextField} />
                </div>
              </div>

              <div className="col">
                <h3 className="form-group-label">Zip Code</h3>

                <div className="form-group-field custom-input with-extention">
                  <Field name="zip_code" component={FormikMaterialTextField} />
                </div>
              </div>

              <br />

              <div className="btn-wrapper">
                <Button color="primary" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}

export default UploadReportData;
