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
import Background from "../components/images/background.jpeg";
import NameAndLogo from "./NameAndLogo";
import ArrowIcon from "mdi-react/ArrowBackIcon";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";

function AddHealthTip() {
  const isSuperuser = localStorage.getItem("isSuperuser");
  const superUserId = localStorage.getItem("user_id");

  const [selection, setSelection] = useState(1);
  const [reportSelection, setReportSelection] = useState('true');
  const [updateSelection, setUpdateSelection] = useState('true');
  const [billSelection, setBillSelection] = useState('true');
  const [reportLimit, setReportLimit] = useState(null);
  const [reportPrice, setReportPrice] = useState(null);
  const [updatesLimit, setUpdatesLimit] = useState(null);
  const [updatesPrice, setUpdatesPrice] = useState(null);
  const [billsLimit, setBillsLimit] = useState(null);
  const [billsPrice, setBillsPrice] = useState(null);
  const [documentLimit, setDocumentLimit] = useState(null);
  const [documentPrice, setDocumentPrice] = useState(null);


  console.log('reportLimit', reportSelection, updateSelection, billSelection  )
  return (
    <React.Fragment>
      <Formik
      initialValues={{ reportLimit: '' }}
        onSubmit={async (values, formikBag) => {
          let success;
          {selection == 1 
           ? success = await handlers.addHospitalPlan(superUserId, reportLimit, reportPrice, updatesLimit, updatesPrice, billsLimit, billsPrice)
           : success = await handlers.addIndividualPlan(superUserId, documentPrice, documentLimit)
          };

          if (success.is_success == true) {
            alert("Plan added successfully");
            history.push(isSuperuser == "true" ? `/superuser-login` : `/`);
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
                boxShadow: "0px 0px 10px #0000001a",
                border: "1px solid #c9c9c9",
                padding: 50,
                marginLeft: 350,
                marginRight: 350,
                marginTop: 50,
                backgroundColor: "#F7FBF9",
                opacity: 1,
                background: `url(${Background})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <NameAndLogo />

              <a
                href={isSuperuser == "true" ? `/superuser-login` : `/`}
                style={{ marginLeft: "-95%", color: "#D3ECF9" }}
              >
                <ArrowIcon />
              </a>

              <div
                style={{
                  backgroundColor: "white",
                  border: "2px solid black",
                  marginTop: "20px",
                  padding: "30px",
                  width: "70%",
                }}
              >

                <div className="col">
                  <h3 className="form-group-label" style={{fontWeight: 'bolder', textDecoration: 'underline'}}>Set A New Plan For</h3>

                  <RadioGroup
                    aria-label="plan"
                    defaultValue="1"
                    name="row-radio-buttons-group"
                    value={selection}
                    onChange={(e) => setSelection(e.target.value)}
                  >
                    <div style={{ display: "flex" }}>
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Hospital"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Individual"
                      />
                  
                    </div>
                  </RadioGroup>
                </div>


{selection == 1 && (
  
                <div className="col">
                  <br />
                  <h3 className="form-group-label" style={{fontWeight: 'bold', textDecoration: 'underline'}}>Set Plan For Hospital</h3>

                  <FormGroup>
                    <div style={{ display: "flex" }}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Reports"
                        onChange={(e) => {setReportSelection(!reportSelection)
                          if(!reportSelection){
                            setReportLimit('')
                            setReportPrice('')
                          }}}
                      />
                      <span
                        style={{
                          width: "100%",
                          float: "right",
                          alignContent: "flex-end",
                          textAlign: "right",
                          textDecoration: "underline",
                        }}
                      >
                        <input
                          type="text"
                          placeholder="Set Limit"
                          style={{ width: 100 }}
                          value={reportLimit}
                          onChange={(e) => setReportLimit(e.target.value)}
                          name="reportLimit"
                          required
                          disabled= {reportSelection}
                        />

                        <input
                          type="text"
                          placeholder="Set Price"
                          style={{ width: 100, marginLeft: 20 }}
                          value={reportPrice}
                          required
                          onChange={(e) => setReportPrice(e.target.value)}
                          disabled= {reportSelection}
                        />
                      </span>
                    </div>
                    <div style={{ display: "flex" }}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Updates"
                        onChange={(e) => {setUpdateSelection(!updateSelection)
                          if(!updateSelection){
                            setUpdatesLimit(null)
                            setUpdatesPrice(null)
                          }}}
                      />
                      <span
                        style={{
                          width: "100%",
                          float: "right",
                          alignContent: "flex-end",
                          textAlign: "right",
                          textDecoration: "underline",
                        }}
                      >
                        <input
                          type="text"
                          placeholder="Set Limit"
                          style={{ width: 100 }}
                          value={updatesLimit}
                          onChange={(e) => setUpdatesLimit(e.target.value)}
                          disabled= {updateSelection}
                          required
                        />

                        <input
                          type="text"
                          placeholder="Set Price"
                          style={{ width: 100, marginLeft: 20 }}
                          value={updatesPrice}
                          onChange={(e) => setUpdatesPrice(e.target.value)}
                          disabled= {updateSelection}
                          required
                        />
                      </span>
                    </div>
                    <div style={{ display: "flex" }}>
                      <FormControlLabel control={<Checkbox />} label="Bills" 
                      onChange={(e) => {setBillSelection(!billSelection)
                                        if(!billSelection){
                                          setBillsLimit('')
                                          setBillsPrice('')
                                        }}} />
                      <span
                        style={{
                          width: "100%",
                          float: "right",
                          alignContent: "flex-end",
                          textAlign: "right",
                          textDecoration: "underline",
                        }}
                      >
                        <input
                          type="text"
                          placeholder="Set Limit"
                          style={{ width: 100 }}
                          value={billsLimit}
                          onChange={(e) => setBillsLimit(e.target.value)}
                          disabled= {billSelection}
                          required
                        />

                        <input
                          type="text"
                          placeholder="Set Price"
                          style={{ width: 100, marginLeft: 20 }}
                          value={billsPrice}
                          onChange={(e) => setBillsPrice(e.target.value)}
                          disabled= {billSelection}
                          required
                        />
                      </span>
                    </div>
                  </FormGroup>
                </div>
)}
                <br />
                {selection == 2 && (

                <div className="col">
                  <h3 className="form-group-label" style={{fontWeight: 'bolder', textDecoration: 'underline'}}>Set Plan For Individual</h3>

                  <RadioGroup
                    aria-label="plan"
                    defaultValue="1"
                    name="row-radio-buttons-group"
                    // value={this.state.hospital_type}
                    // onChange={this.handleHospiTypeChange}
                  >
                    <div style={{ display: "flex" }}>
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Documents"
                      />

                      <span
                        style={{
                          width: "100%",
                          float: "right",
                          alignContent: "flex-end",
                          textAlign: "right",
                          textDecoration: "underline",
                        }}
                      >
                        <input
                          type="text"
                          placeholder="Set Limit"
                          style={{ width: 100 }}
                          value={documentLimit}
                          required
                          onChange={(e) => setDocumentLimit(e.target.value)}
                        />

                        <input
                          type="text"
                          placeholder="Set Price"
                          style={{ width: 100, marginLeft: 20 }}
                          value={documentPrice}
                          required
                          onChange={(e) => setDocumentPrice(e.target.value)}
                        />
                      </span>
                    </div>
                  </RadioGroup>
                </div>
                )}
                <br />

                <div className="btn-wrapper">
                  <Button color="primary" type="submit" disabled={reportSelection && updateSelection  && billSelection}>
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

export default AddHealthTip;
