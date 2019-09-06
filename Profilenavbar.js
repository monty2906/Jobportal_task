import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

class Profilenavbar extends Component {
    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-sm container ">
                    <div className="menubar profilelogo">
                       <Link to="/profile"><h1><i className="fa fa-graduation-cap"></i>JobKeeper's</h1></Link>
                    </div>
                    <ul id="second-menu" className="navbar-nav profilenav">
                        <li><Link to="/profile">All Jobs</Link></li>
                        <li><Link to="/userjobs">Apply Jobs</Link></li>
                        <li><Link to="/profile">Settings</Link>
                            <ul className="dropdown1">
                                <li><Link to="/updateprofile">Update Profile</Link></li>
                                <li><Link to="/changemail">Change Email</Link></li>
                            </ul>
                        </li>
                    </ul>              
                    <div className="loglogo">
                        <Link className="powerlog" to="/viewprofile" title="See Profile" ><i className="fa fa-user-o"></i></Link>
                        <Link className="powerlogof" to="/logout"><i className="fa fa-power-off"></i></Link>
                    </div>
                </nav>
            </div>
        );
    }
}
export default Profilenavbar;