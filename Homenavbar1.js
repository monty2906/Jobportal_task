import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Homenavbar1.css';

class Homenavbar1 extends Component {
  
    render(){
        return(
          <div>
          <section id="header">
            <div className="menu-bar">
            <nav className="navbar navbar-expand-lg navbar-light">
            <Link className="navbar-brand logo" to="/"><font color="white"><h1><i className="fa fa-graduation-cap" aria-hidden="true"></i>JobKeeper's</h1></font></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Select Job Categories</Link>
                  <ul className="dropdown">
                    <li><Link className="nav-link" to="/">Technical</Link></li>
                    <li><Link className="nav-link" to="/">Non-Technical</Link></li>
                    <li><Link className="nav-link" to="/">Medical</Link></li>
                    <li><Link className="nav-link" to="/">Education</Link></li>
                    <li><Link className="nav-link" to="/">Travel</Link></li>
                    <li><Link className="nav-link" to="/">Banking</Link></li>
                  </ul>
                </li>
                <li id="signup-btn">
                  <Link className="nav-link" to="/">Signup</Link>
                  <ul className="dropdown">
                    <li><Link className="nav-link" to="/slogin">Student</Link></li>
                    <li><Link className="nav-link" to="/">Recruiter</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
          </div>

          <div className="banner text-center">
            <h1>JOBS AROUND YOU</h1>
            <h4>Find Your Dream Job Here...</h4>
          </div>
          </section>

          <div className="search-job text-center">
            <input type="text" className="form-control" placeholder="Job Name" />
            <input type="text" className="form-control" placeholder="Location" />
            <input type="button" className="btn btn-primary" value="Find job" />
          </div>
          </div>
        );
    }
}
export default Homenavbar1;