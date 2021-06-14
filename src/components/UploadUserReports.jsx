import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import FormikMaterialTextField from "./FormikMaterialTextField";
import * as handlers from "./handlers";
import UploadDocument from "./UploadDocument";

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
        initialValues={{  }}
        onSubmit={async (values, formikBag) => {
          console.log('values123', values)
          let success = await handlers.uploadUserReport(values, formikBag);

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
            <Form className="formik-form" enctype="multipart/form-data">
              <div className="col">
                <h3 className="form-group-label">File Name</h3>

                <div className="form-group-field custom-input with-extention">
                  <Field name="file_name" component={FormikMaterialTextField} />
                </div>
              </div>

              <div className="col">
                <h3 className="form-group-label">Description</h3>

                <div className="form-group-field custom-input with-extention">
                  <Field
                    name="description"
                    component={FormikMaterialTextField}
                  />
                </div>
              </div>

              <div className="col">
                <h3 className="form-group-label">Upload File</h3>

                <div className="form-group-field custom-input with-extention">
                <input type="file" id="file" name="file" />
                  {/* <Field name="file" component={UploadDocument} /> */}
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
