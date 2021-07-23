import React, { Component } from 'react';
import axios from 'axios';
import history from './lib/history';
import { Link, useParams } from 'react-router-dom';

class App extends Component {

  state = {
    bill_file_name: '',
    remark:'',
    file: null
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleImageChange = (e) => {
    this.setState({
      file: e.target.files[0]
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
    form_data.append('file', this.state.file, this.state.file.name);
    form_data.append('bill_file_name', this.state.bill_file_name);
    form_data.append('remark', this.state.remark);
    form_data.append('user_id', userData_parsed.user_id);
    form_data.append('hospital_id', hospitalId);

    let url = 'http://3.109.71.28/bill_upload/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: localToken,
      }
    })
        .then(res => {
          history.push(`/fetch-user-billing/${userData_parsed.user_id}`);
          window.location.reload();
          console.log(res.data);
        })
        .catch(err => console.log(err))
  };

  render() {
    return (
      <div  className="login-wrapper"  style={{   boxShadow: '0px 0px 10px #0000001a',
      border: '1px solid #c9c9c9',
      padding: 50,
      marginLeft: 350,
      marginRight: 350,
      marginTop: 50,
      backgroundColor: '#F7FBF9',
      opacity: 1}}>
         <h2>Upload Patient Bills</h2>
      
      <div  >
        <form onSubmit={this.handleSubmit} style={{backgroundColor: 'white',  border: '2px solid black',  marginTop: '20px', padding: '30px'}}>
        <div className="col">
                <h3 className="form-group-label">Bill File Name</h3>

          <p>
            <input type="bill_file_name"  id='bill_file_name' value={this.state.bill_file_name} onChange={this.handleChange} required/>
          </p>
          </div>

          <div className="col">
                <h3 className="form-group-label">Remark</h3>

          <p>
            <input type="remark"  id='remark' value={this.state.remark} onChange={this.handleChange}/>
          </p>
          </div>

          <div className="col">
                <h3 className="form-group-label">Upload file</h3>
          <p style={{marginLeft: '80px'}}>
            <input type="file"
                   id="file"
                   accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
          </p>
          </div>
          <input type="submit"/>
        </form>
      </div>
    / </div>
    );
  }
}

export default App;