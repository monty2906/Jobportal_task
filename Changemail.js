import React, { Component } from 'react';
import './Profile.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Homefooter from './Homefooter';
import Profilenavbar from './Profilenavbar';
import swal from 'sweetalert';

class Changemail extends Component{
    constructor(props) {
        super(props);
        const token = localStorage.getItem("token")
      
        let loggedIn = true
        if(token==null){
            loggedIn=false
        }
        this.state = {
            new_mail:'',
            fields: {},
            errors: {},

            loggedIn
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          errors:'',
          fields
        });
      }  

    handleSubmit = (event) => {
        const current_mail = localStorage.getItem("user_email")
        console.log(current_mail)
        const new_mail = this.state.fields.new_mail

        const FinalValues = {
            current_mail,
            new_mail
        }
        var body = JSON.stringify(FinalValues)
        event.preventDefault();
        if (this.validateForm()) {
                axios.post('http://localhost/react_task/update.php',body, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((res) => {
                    if(res.data===1){
                        swal("Email Changed","","success")
                        localStorage.removeItem("user_email")
                        localStorage.setItem("user_email",new_mail)
                    }
                    else{
                        swal("Email alredy Exist","","warning")
                    }
                    const test = localStorage.getItem("user_email")
                    console.log(test)
                    this.setState({
                        new_mail:''
                    })
                })
            }
    }

    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
  
        if (!fields["new_mail"]) {
          formIsValid = false;
          errors["new_mail"] = "*Enter email-ID";
        }
        if (typeof fields["new_mail"] !== "undefined") {
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(fields["new_mail"])) {
            formIsValid = false;
            errors["new_mail"] = "*Enter valid email";
          }
        }

        this.setState({
          errors: errors
        });
        return formIsValid;
      }

    render(){
        if(this.state.loggedIn===false){
			return <Redirect to="/slogin" />
		} 
        return(
            <div>
                <Profilenavbar />
                <section id="bottom-section" className="text-center">
                  <h1><b>Change Email</b></h1>
              </section>
                  <div>
                    <div className="form-row myform">
                        <div className="col-3"></div>
                        <div className="form-group col-md-6">
                            <label htmlFor="input"><b>New Email</b></label><font color="red" size="3">*</font>
                            <input type="text" className="form-control" id="input" placeholder="New Email" 
                                name="new_mail" value={this.state.fields.new_mail}
                                onChange={this.handleChange} />
                                <div className="errorMsg">{this.state.errors.new_mail}</div>
                        </div>
                    </div>
                    <div className="form-row">
                    <div className="col-3"></div>
                        <div className="col-md-6">
                            <button className="btn btn-success btn-block sub_button" onClick={this.handleSubmit}>Update</button>
                        </div>
                    </div>
                  </div>
                <Homefooter />
            </div>
        );
    }
}
export default Changemail;