import React,{Component} from 'react';
// import {Link} from 'react-router-dom';
import './Adminsidebar.css';
import './material-dashboard.css';
import './material-dashboard.min.css';
import './material-dashboard-rtl.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './adminlogin.css';
import './main.css';
import './util.css';
import axios from 'axios';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';

class Adminlogin extends Component{
    constructor(props) {
        super(props);
        const admintoken = localStorage.getItem("token_admin")
        let loggedIn = true;
        if(admintoken==null)
        {
            loggedIn = false;
        }
        this.state = {
            admin_email: '',
            admin_password: '',
            fields: {},
            errors: {},
            loggedIn
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields
        });
  
      }  

    handleSubmit = (event) => {
        const admin_email = this.state.fields.admin_email
        const admin_password = this.state.fields.admin_password
        const FinalValues = {
            admin_email,
            admin_password
        }
        event.preventDefault();
        if (this.validateForm()) {
            let fields = {};
            var body = JSON.stringify(FinalValues)
            axios.post('http://localhost/react_task/adminlogin.php', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                if(res.data===1){
                    localStorage.setItem("token_admin", "Abjhd%&*guytgtT!@%$&vtd467854FVBjb$^54");
                    this.setState({
                        loggedIn: true,
                        admin_email: '',
                        admin_password: '',
                        fields:fields
                    })
                }  
                else{
                    swal("Wrong Email or Password!", "", "warning");
                }
            })
        }
    }
  
    //validation function
    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
  
        if (!fields["admin_email"]) {
          formIsValid = false;
          errors["admin_email"] = "*Please enter your email-ID.";
        }
        if (typeof fields["admin_email"] !== "undefined") {
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(fields["admin_email"])) {
            formIsValid = false;
            errors["admin_email"] = "*Enter valid email-ID.";
          }
        }

        if (!fields["admin_password"]) {
          formIsValid = false;
          errors["admin_password"] = "*Please enter your password.";
        }
        this.setState({
          errors: errors
        });
        return formIsValid;
      }

    render(){
        // if logged in than redirect to Admin Dashboard
        if(this.state.loggedIn){
            return <Redirect to="/admin/dashboard" />
        }
        return(
            <div class="limiter background-login">
                <div class="container-login100">
                    <div class="wrap-login100 p-t-30 p-b-50">
                        <span class="login100-form-title p-b-41">
                            Admin Login
                        </span>
                        <form class="login100-form validate-form p-b-33 p-t-5">
                            <div class="wrap-input100 validate-input" data-validate = "Enter username">
                                <input class="input100" type="text" name="admin_email" placeholder="Email"
                                value={this.state.fields.admin_email} onChange={this.handleChange} />
                                <span class="focus-input100 loginicon"><i class="fa fa-user-o" aria-hidden="true"></i></span>
                            </div>
                            <div className="errorMsg">{this.state.errors.admin_email}</div>
        
                            <div class="wrap-input100 validate-input" data-validate="Enter password">
                                <input class="input100" type="password" name="admin_password" placeholder="Password"
                                value={this.state.fields.admin_password} onChange={this.handleChange} />
                                <span class="focus-input100 loginicon"><i class="fa fa-lock" aria-hidden="true"></i></span>
                            </div>
                            <div className="errorMsg">{this.state.errors.admin_password}</div>
        
                            <div class="container-login100-form-btn m-t-32">
                                <button class="login100-form-btn" onClick={this.handleSubmit}>
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Adminlogin;