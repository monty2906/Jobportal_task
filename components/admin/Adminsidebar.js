import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './Adminsidebar.css';
import './material-dashboard.css';
import './material-dashboard.min.css';
import './material-dashboard-rtl.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import Logo from './images/tie.png';

class Adminsidebar extends Component{
    render(){
        return(
            <div className="sidebar mysidebar" data-color="purple">
                <div className="logo">
                    <Link to="/admin/dashboard" className="simple-text logo-normal mylogo">
                       <img src={Logo} alt="logo" width="35px" height="35px" />Job Portal
                    </Link>
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        <li className="nav-item active  ">
                            <Link className="nav-link" to="/admin/dashboard">
                                <i class="material-icons">dashboard</i>
                                <p>Dashboard</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link className="nav-link" to="/admin/showrequests">
                                <i className="material-icons">person_add</i>
                                <p>Request Recruiters</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link className="nav-link" to="/admin/showrecruiters">
                                <i className="material-icons">people_outline</i>
                                <p>All Recruiters</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link className="nav-link" to="/admin/allstudents">
                                <i className="material-icons">people</i>
                                <p>All Students</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link className="nav-link" to="/admin/admindalljobs">
                                <i class="material-icons">local_library</i>
                                <p>All Jobs</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link class="nav-link"  to="/admin/adminapplystudents">
                                <i class="material-icons">list</i>
                                <p>All Applyers</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link class="nav-link"  to="/admin/logout">
                                <i class="material-icons">lock</i>
                                <p>Logout</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default Adminsidebar;