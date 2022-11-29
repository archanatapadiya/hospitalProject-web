import React, { useState, useEffect, Component } from "react";
import history from "./lib/history";
import "react-datepicker/dist/react-datepicker.css";
import Background from "../components/images/background.jpeg";
import NameAndLogo from "./NameAndLogo";
import ArrowIcon from "mdi-react/ArrowBackIcon";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";

class App extends Component {
  state = {
    name: "",
    id: "",
    reportLimit: null,
    reportPrice: null,
    updateLimit: null,
    updatePrice: null,
    billLimit: null,
    billPrice: null,
  };

  componentWillMount() {
    let plan_details = JSON.parse(localStorage.getItem("editPlan"));
    console.log("plan_details", plan_details);
    this.setState({
      name: plan_details.name,
      id: plan_details.id,
      reportLimit: plan_details.report_limit,
      reportPrice: plan_details.report_price,
      updateLimit: plan_details.health_limit,
      updatePrice: plan_details.health_price,
      billLimit: plan_details.bill_limit,
      billPrice: plan_details.bill_price,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const localToken = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    let bodyparams = {
      user_id: userId,
      id: this.state.id,
      report_limit: this.state.reportLimit,
      report_price: this.state.reportPrice,
      bill_limit: this.state.billLimit,
      bill_price: this.state.billPrice,
      health_limit: this.state.updateLimit,
      health_price: this.state.updatePrice,
      name: null,
    };

    return fetch(`http://43.205.89.142/hospital_space_edit/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localToken,
      },
      body: JSON.stringify(bodyparams),
    }).then((res) => {
      history.push(`/view-plans`);
      window.location.reload();
      console.log(res.data);
    });
  };

  render() {
    const isSuperuser = localStorage.getItem("isSuperuser");

    let reportCheck = false;
    if (this.state.reportLimit != null) {
      reportCheck = true;
    }

    let updateCheck = false;
    if (this.state.updateLimit != null) {
      updateCheck = true;
    }

    let billCheck = false;
    if (this.state.billLimit != null) {
      billCheck = true;
    }
    return (
      <div
        className="login-wrapper"
        style={{
          boxShadow: "0px 0px 10px #0000001a",
          border: "1px solid #c9c9c9",
          padding: 50,
          marginLeft: 300,
          marginRight: 300,
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
          href={isSuperuser == "true" ? `/view-plans` : `/`}
          style={{ marginLeft: "-95%", color: "#D3ECF9" }}
        >
          <ArrowIcon />
        </a>
        <form
          onSubmit={this.handleSubmit}
          style={{
            backgroundColor: "white",
            border: "2px solid grey",
            marginTop: "20px",
            padding: "30px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              border: "2px solid black",
              marginTop: "20px",
              padding: "30px",
              // width: "70%",
            }}
          >
            <div className="col">
              <h3
                className="form-group-label"
                style={{ fontWeight: "bolder", textDecoration: "underline" }}
              >
                Edit Plan For
              </h3>

              <RadioGroup
                aria-label="plan"
                defaultValue="1"
                name="row-radio-buttons-group"
                value={this.state.selection}
              >
                <div style={{ display: "flex" }}>
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Hospital"
                  />
                </div>
              </RadioGroup>
            </div>

            <div className="col">
              <br />
              <h3
                className="form-group-label"
                style={{ fontWeight: "bold", textDecoration: "underline" }}
              >
                Edit Plan For Hospital
              </h3>

              <FormGroup>
                <div style={{ display: "flex" }}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked={reportCheck} />}
                    label="Reports"
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
                      value={this.state.reportLimit}
                      onChange={(e) =>
                        this.setState({ reportLimit: Number(e.target.value) })
                      }
                      name="reportLimit"
                    />

                    <input
                      type="text"
                      placeholder="Set Price"
                      style={{ width: 100, marginLeft: 20 }}
                      value={this.state.reportPrice}
                      onChange={(e) =>
                        this.setState({ reportPrice: Number(e.target.value) })
                      }
                    />
                  </span>
                </div>
                <div style={{ display: "flex" }}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked={updateCheck} />}
                    label="Updates"
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
                      value={this.state.updateLimit}
                      onChange={(e) =>
                        this.setState({ updateLimit: Number(e.target.value) })
                      }
                    />

                    <input
                      type="text"
                      placeholder="Set Price"
                      style={{ width: 100, marginLeft: 20 }}
                      value={this.state.updatePrice}
                      onChange={(e) =>
                        this.setState({ updatePrice: Number(e.target.value) })
                      }
                    />
                  </span>
                </div>
                <div style={{ display: "flex" }}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked={billCheck} />}
                    label="Bills"
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
                      value={this.state.billLimit}
                      onChange={(e) =>
                        this.setState({ billLimit: Number(e.target.value) })
                      }
                    />

                    <input
                      type="text"
                      placeholder="Set Price"
                      style={{ width: 100, marginLeft: 20 }}
                      value={this.state.billPrice}
                      onChange={(e) =>
                        this.setState({ billPrice: Number(e.target.value) })
                      }
                    />
                  </span>
                </div>
              </FormGroup>
            </div>

            <br />

            <br />
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default App;
