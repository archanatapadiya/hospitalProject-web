import React, { Component, useState } from 'react';
import axios from 'axios';
import history from './lib/history';
import { Link, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import Background from '../components/images/background.jpeg';

class App extends Component {

  state = {
    health_update: '',
    datetime: '',
    dr_name: '',
    report_type: '',
    is_opd: true,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  onChangeValue = (event) => {
    this.setState({
      report_type: event.target.value,
    });
    if(event.target.value == 2){
      this.setState({
        is_opd: false
      })
    }
    if(event.target.value == 1){
      this.setState({
        is_opd: true
      })
    }
  };

  handleSubmit = (e) => {

    e.preventDefault();
    console.log(this.state);
    const localToken = localStorage.getItem('token');
    const userData = localStorage.getItem('user_data');
    const userData_parsed = JSON.parse(userData);
    const hospitalId = localStorage.getItem('hospital_id');

    let hospital_type = localStorage.getItem("hospital_type");

    let opdFlag = null;
    if(hospital_type == 1){
      opdFlag= true
    }
    if(hospital_type == 2){
      opdFlag= false
    }
    if(hospital_type == 3){
      opdFlag= this.state.is_opd
    }

    let form_data = new FormData();

    form_data.append('health_update', this.state.health_update);
    form_data.append('datetime', this.state.datetime);
    form_data.append('user_id', userData_parsed.user_id);
    form_data.append('hospital_id', hospitalId);
    form_data.append('dr_name', this.state.dr_name);
    form_data.append("is_opd", opdFlag);

    let url = 'http://3.110.35.199/user_health_update/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: localToken,
      }
    })
      .then(res => {
        history.push(`/fetch-user-health/${userData_parsed.user_id}`);
        window.location.reload();
        console.log(res.data);
      })
      .catch(err => alert(err))
  };


  render() {
    let hospital_type = localStorage.getItem("hospital_type");
    return (
      <div className="login-wrapper" style={{
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
      }}>
        <h2 style={{color: '#D3ECF9'}}>Upload Patient Health Details</h2>

        <div>
          <form onSubmit={this.handleSubmit} style={{ backgroundColor: 'white', border: '2px solid black', marginTop: '20px', padding: '30px' }}>

          {hospital_type == 3 && (
              <div onChange={this.onChangeValue}>
                <input type="radio" value="1" name="report_type" defaultChecked/> OPD
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
              <h3 className="form-group-label">Health Update</h3>
              <p>
                <input type="healthUpdate" id='health_update' value={this.state.health_update} onChange={this.handleChange} required />
              </p>
            </div>

            <div className="col">
              <h3 className="form-group-label">Doctor Name</h3>
              <p>
                <input type="dr_name" id='dr_name' value={this.state.dr_name} onChange={this.handleChange} required />
              </p>
            </div>

            <div className="col">
              <h3 className="form-group-label">Date/Time</h3>
              <p>
                <input type="datetime-local" id="datetime" name="datetime" value={this.state.datetime} onChange={this.handleChange} />
              </p>
            </div>

            <input type="submit" style={{backgroundColor: '#38B6F7'}}/>
          </form>
        </div>
      </div>
    );
  }
}

export default App;