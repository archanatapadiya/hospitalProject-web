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

function UploadReportData() {
  return (
    <React.Fragment>
    <Formik
      initialValues={{ }}
      onSubmit={async (values, formikBag) => {
        let success = await handlers.registerUser(
          values,
          formikBag
        );

        // setSearchUser(success.data);

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
