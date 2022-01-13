import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import FormikMaterialTextField from "./FormikMaterialTextField";
import * as handlers from "./handlers";
import { Link, useParams } from "react-router-dom";
import history from "./lib/history";
import "./styles.css";
import {
  Col,
  Container,
  Row,
  Card,
  CardBody,
  ButtonToolbar,
  Button,
} from "reactstrap";
import Background from '../components/images/background.jpeg';
import logo from "./images/MyMedCordsTransparent.png";
import axios from "axios";
import NameAndLogo from './NameAndLogo';

function UploadData() {
  const [searchUser, setSearchUser] = useState("");
  const [localToken1, setLocalToken1] = useState("");
  const [hospName, setHospName] = useState("");

  const [userId, setUserId] = useState(0);

  const clickLogout = async (params) => {
    let url = "http://3.109.71.28/user_logout/";
    axios
      .get(url, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: localToken1,
        },
      })
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("is_superuser");
        localStorage.removeItem("isSuperuser");
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        localStorage.removeItem("hospital_id");
        history.push(`/`);
        window.location.reload();
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const localTokenCalled = localStorage.getItem("token");
    const loggedInHospital = localStorage.getItem("hospital_name");

    if (localTokenCalled != null) {
      setLocalToken1(localTokenCalled);
    }
    if (loggedInHospital != null) {
      setHospName(loggedInHospital);
    }
    if (localTokenCalled == null) {
      window.location.reload();
    }
  }, [localToken1]);


  useEffect(() => {
    localStorage.removeItem("user_data");
  }, []);

  return (
    <div
      className="login-wrapper"
      style={{
        boxShadow: "0px 0px 10px #0000001a",
        border: "1px solid #c9c9c9",
        padding: 50,
        marginLeft: 350,
        marginRight: 350,
        marginTop: 50,
        backgroundColor: "#F7FBF9",
        opacity: 1,
        background: `url(${Background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >

      <NameAndLogo />

      <h2 style={{ color: '#D3ECF9' }}>Health Center Data Upload System</h2>

      <a href="/add-new-user">
        <button type="button" class="btn btn-success btn-sm">
          Add New User
        </button>
      </a>

      <React.Fragment>
        <Formik
          initialValues={{}}
          onSubmit={async (values, formikBag) => {
            values.localToken = localToken1;
            let success = await handlers.searchUser(values, formikBag);

            if (success.data.user_id) {
              history.push(`/upload-details/${success.data.user_id}`);
              window.location.reload();
            }

            if (success) {
              setSearchUser(success.data.username);
              setUserId(success.data.user_id);
              localStorage.setItem("user_data", JSON.stringify(success.data));
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
              <div
                style={{
                  // width: "30%",
                  padding: 30,
                  border: "2px solid grey",
                  // marginLeft: "35%",
                  // marginTop: "20px",
                  backgroundColor: "white",
                }}
              >
                <Form className="formik-form">
                  <div className="col">
                    <h3 className="form-group-label">Search Patient</h3>

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
                  {searchUser === undefined && (
                    <p>No record found, please register</p>
                  )}
                  <div className="btn-wrapper">
                    <Button type="submit" disabled={isSubmitting}>
                      Search
                    </Button>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      </React.Fragment>
    </div>
  );
}

export default UploadData;
