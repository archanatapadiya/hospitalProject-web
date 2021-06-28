import React, { Component, useState } from 'react';
import axios from 'axios';
import history from './lib/history';
import { Link, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
class App extends Component {

  state = {
    health_update: '',
    datetime: '',
    dr_name: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };



  handleSubmit = (e) => {
    
    e.preventDefault();
    console.log(this.state);
    const localToken = localStorage.getItem('token');
    const userData = localStorage.getItem('user_data');
    const userData_parsed = JSON.parse(userData);
    const hospitalId = localStorage.getItem('hospital_id');

    let form_data = new FormData();
  
    form_data.append('health_update', this.state.health_update);
    form_data.append('datetime', this.state.datetime);
    form_data.append('user_id', userData_parsed.user_id);
    form_data.append('hospital_id', hospitalId);
    form_data.append('dr_name', this.state.dr_name);

    let url = 'http://65.2.26.144:8000/user_health_update/';
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
        .catch(err => console.log(err))
  };


  render() {
    return (
      <div>
         <h2>Upload Patient Health Details</h2>
     
      <div className="App" style={{width: '30%', border: '2px solid grey', marginLeft: '33%', marginTop: '20px', padding: '20px'}}>
        <form onSubmit={this.handleSubmit}>
      
          <div className="col">
                <h3 className="form-group-label">Health Update</h3>
          <p>
            <input type="healthUpdate"  id='health_update' value={this.state.health_update} onChange={this.handleChange} required/>
          </p>
          </div>

          <div className="col">
                <h3 className="form-group-label">Doctor Name</h3>
          <p>
            <input type="dr_name"  id='dr_name' value={this.state.dr_name} onChange={this.handleChange} required/>
          </p>
          </div>

           <div className="col">
                <h3 className="form-group-label">Date/Time</h3>
          <p>
          <input type="datetime-local" id="datetime" name="datetime"  value={this.state.datetime}  onChange={this.handleChange} />
          </p>
          </div> 
        
          <input type="submit"/>
        </form>
      </div>
      </div>
    );
  }
}

export default App;