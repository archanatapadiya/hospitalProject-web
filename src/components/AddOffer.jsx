import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import FormikMaterialTextField from "./FormikMaterialTextField";
import FormikMaterialTextFieldMultiLine from "./FormikMaterialTextFieldMultiLine";
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
import NameAndLogo from './NameAndLogo';
import ArrowIcon from "mdi-react/ArrowBackIcon";
import FormikDatePickerField from "./FormikDatePickerField";
import { TextField } from '@mui/material';




function AddOffer() {
  const isSuperuser = localStorage.getItem("isSuperuser");

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          title: "",
          description: "",
         start_date: '',
         end_date: ''
        }}
        onSubmit={async (values, formikBag) => {
          console.log('values in submit', values)
          let success = await handlers.addOffer(values, formikBag);

          if (success.is_success == true) {
            alert("Offer added successfully")
            history.push(isSuperuser == "true" ? `/superuser-login`:`/`);
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
              <NameAndLogo/>

              <a href={isSuperuser == "true" ? `/superuser-login`:`/`}  style={{ marginLeft: "-95%", color: '#D3ECF9' }}>
          <ArrowIcon />
        </a>

                <h2 style={{color: '#D3ECF9'}}>Add New Offer</h2>

              <div style={{ backgroundColor: 'white', border: '2px solid black', marginTop: '20px', padding: '30px', width: '50%'}}>
              <div className="col" >
                <h3 className="form-group-label">Title</h3>

                <div className="form-group-field custom-input with-extention">
                  <Field
                    name="title"
                    component={FormikMaterialTextField}
                  />


                </div>
              </div>

              <div className="col">
                <h3 className="form-group-label">Description</h3>

                <div className="form-group-field custom-input with-extention">
                  <Field name="description" component={FormikMaterialTextFieldMultiLine} />
                </div>
              </div>

              <div className="col" style={{marginTop: 10}}>
                <h3 className="form-group-label">Start Date</h3>

                <div className="form-group-field custom-input with-extention">
                  <Field name="start_date" component={FormikDatePickerField} />
                </div>
              </div>

              <div className="col" style={{marginTop: 10}}>
                <h3 className="form-group-label">End Date</h3>

                <div className="form-group-field custom-input with-extention">
                  <Field name="end_date" component={FormikDatePickerField} />
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

export default AddOffer;
