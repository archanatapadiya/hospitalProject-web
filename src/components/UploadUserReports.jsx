import React, { Component } from "react";
import axios from "axios";
import history from "./lib/history";
import { Link, useParams } from "react-router-dom";
import Background from '../components/images/background.jpeg';
import NameAndLogo from './NameAndLogo';
import ArrowIcon from 'mdi-react/ArrowBackIcon';

class App extends Component {


  state = {
    file_name: "",
    description: "",
    file: null,
    report_type: '',
    is_opd: true,
    dr_name: "",
    testdate: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleImageChange = (e) => {
    console.log('eeeee', e.target.files[0].size);

    {
      e.target.files[0]?.size < 1000000 && (this.setState({
        file: e.target.files[0],
      }));
    }
    {
      e.target.files[0]?.size > 1000000 &&
        (alert(
          `Max file size exceeded (1 MB). 
Your file size is ` +
          (Math.round((e.target.files[0]?.size / 1000000) * 100) / 100).toFixed(2) +
          ' MB',
        )
        )
    }


  };

  onChangeValue = (event) => {
    this.setState({
      report_type: event.target.value,
    });
    if (event.target.value == 2) {
      this.setState({
        is_opd: false
      })
    }
    if (event.target.value == 1) {
      this.setState({
        is_opd: true
      })
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('state in submit', this.state);
    const localToken = localStorage.getItem("token");
    const userData = localStorage.getItem("user_data");

    const userData_parsed = JSON.parse(userData);

    const hospitalId = localStorage.getItem("hospital_id");

    let hospital_type = localStorage.getItem("hospital_type");

    let opdFlag = null;
    if (hospital_type == 1) {
      opdFlag = true
    }
    if (hospital_type == 2) {
      opdFlag = false
    }
    if (hospital_type == 3) {
      opdFlag = this.state.is_opd
    }

    let form_data = new FormData();
    form_data.append("file", this.state.file, this.state.file.name);
    form_data.append("file_name", this.state.file_name);
    form_data.append("description", this.state.description);
    form_data.append("user_id", userData_parsed.user_id);
    form_data.append("hospital_id", hospitalId);
    form_data.append("is_opd", opdFlag);
    form_data.append("dr_name", this.state.dr_name);
    form_data.append('testdate', this.state.testdate);


    console.log('form_data in upload report', this.state.file.size)
    let url = "http://43.205.89.142/report_upload/";
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: localToken,
        },
      })
      .then((res) => {
        history.push(`/fetch-user-reports/${userData_parsed.user_id}`);
        window.location.reload();
        console.log(res.data);
      })
      .catch((err) => alert(err));
  };

  render() {
    let hospital_type = localStorage.getItem("hospital_type");
    const searchedUserData = localStorage.getItem("searched_user_data");
    const searchedUserData_parsed = JSON.parse(searchedUserData);
    const isSuperuser = localStorage.getItem("isSuperuser");


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


        <div style={{ width: '100%', textAlign: 'right' }}>
          <a href={isSuperuser == "true" ? `/superuser-login` : `/`}  >
            <button style={{ marginRight: 10 }} type="button" class="btn btn-success btn-sm">Search Patient</button>
          </a>
          <a href={`/upload-details/${searchedUserData_parsed.user_id}`}  >
            <button type="button" class="btn btn-success btn-sm">Patient Details</button>
          </a>
        </div>


        <h2 style={{ color: '#D3ECF9' }}>Upload Patient Report</h2>

        <h2 style={{ textDecoration: "underline", color: '#D3ECF9' }}>Patient Details</h2>
        <div
          style={{
            // width: "30%",
            padding: 20,
            border: "2px solid grey",
            // marginLeft: "35%",
            marginTop: "20px",
            backgroundColor: "white",
            textAlign: 'left'
          }}
        >
          <p>
            <span style={{ fontWeight: "bold" }}>Patient Name:</span>{" "}
            {searchedUserData_parsed?.first_name}{' '}{searchedUserData_parsed?.last_name}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Email:</span> {searchedUserData_parsed?.email}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Address: </span>
            {searchedUserData_parsed?.address}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Phone Number: </span>
            {searchedUserData_parsed?.phone_number}
          </p>

          {searchedUserData_parsed?.is_admit && (
            <p>
              <span style={{ fontWeight: "bold" }}>Room No.: </span>
              {searchedUserData_parsed?.room_number}
            </p>
          )}
        </div>
        <br />

        <div>
          <form
            onSubmit={this.handleSubmit}
            style={{
              backgroundColor: "white",
              border: "2px solid black",
              marginTop: "20px",
              padding: "30px",
            }}
          >

            {hospital_type == 3 && (
              <div onChange={this.onChangeValue}>
                <input type="radio" value="1" name="report_type" defaultChecked /> OPD
                <input
                  style={{ marginLeft: 10 }}
                  type="radio"
                  value="2"
                  name="report_type"
                />{" "}
                IPD
              </div>
            )}
            <br />
            <div className="col">
              <h3 className="form-group-label">Type/Modality</h3>

              <p>
                <input
                  type="file_name"
                  id="file_name"
                  value={this.state.file_name}
                  onChange={this.handleChange}
                  required
                />
              </p>
            </div>

            <div className="col">
              <h3 className="form-group-label">Description</h3>

              <p>
                <input
                  type="description"
                  id="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  required
                />
              </p>
            </div>

            <div className="col">
              <h3 className="form-group-label">Test Date</h3>
              <p>
                <input type="date" id="testdate" name="testdate" value={this.state.testdate} onChange={this.handleChange} required />
              </p>
            </div>


            <div className="col">
              <h3 className="form-group-label">Dr. Name</h3>

              <p>
                <input
                  type="dr_name"
                  id="dr_name"
                  value={this.state.dr_name}
                  onChange={this.handleChange}
                  required
                />
              </p>
            </div>

            <div className="col">
              <h3 className="form-group-label">Upload file</h3>

              <p style={{ marginLeft: "80px" }}>
                <input
                  type="file"
                  id="file"
                  accept="image/png, image/jpeg, .pdf"
                  onChange={this.handleImageChange}
                  required
                />
              </p>


            </div>
            <input type="submit" style={{ backgroundColor: '#38B6F7' }} />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
