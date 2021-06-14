import React, { Component } from 'react';
import axios from 'axios';
import history from './lib/history';
import { Link, useParams } from 'react-router-dom';

class App extends Component {

  state = {
    health_update: '',
    
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
    form_data.append('user_id', userData_parsed.user_id);
    form_data.append('hospital_id', hospitalId);

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
      <div className="App">
        <form onSubmit={this.handleSubmit}>
      

          <div className="col">
                <h3 className="form-group-label">Health Update</h3>

          <p>
            <input type="healthUpdate"  id='health_update' value={this.state.health_update} onChange={this.handleChange} required/>
          </p>
          </div>
        
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default App;