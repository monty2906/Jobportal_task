import React, { Component } from 'react';
import './Bottomsection.css'
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.css';

class Bottomsection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showall:[]
        }
    }
    componentDidMount() {
        axios.post('http://localhost/react_task/countings.php', {
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then((res)=>{ 
          var showall=res.data
          let showdataNew=[];
          for (let allname of showall)
          {
            showdataNew.push(allname);
          }
          this.setState({
            showall: showdataNew
          })
        }) 
    }
    render(){
        return(
          <div>
            {this.state.showall.map((alldata,i) => {            
             return (
              <section id="site-status" key={i}>
                  <div className="container text-center">
                      <h2>JobKeepr's Site Stats</h2>
                      <div className="row">
                          <div className="col-md-6">
                              <div className="row">
                                  <div className="col-6">
                                      <div className="status-box">
                                          <i className="fa fa-user-o"></i><span>{alldata.apply_count}</span>
                                          <p>Job Seekrs</p>
                                      </div>
                                  </div>
                                  <div className="col-6">
                                      <div className="status-box">
                                          <i className="fa fa-slideshare"></i><span>{alldata.user_count}</span>
                                          <p>Employers</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-md-6">
                              <div className="row">
                                  <div className="col-6">
                                      <div className="status-box">
                                          <i className="fa fa-hand-peace-o"></i><span>{alldata.job_count}</span>
                                          <p>Active Jobs</p>
                                      </div>
                                  </div>
                                  <div className="col-6">
                                      <div className="status-box">
                                          <i className="fa fa-building-o"></i><span>{alldata.recruiter_count}</span>
                                          <p>Companies</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
               )
            })}
              <section id="bottom-section" className="text-center">
                  <h1>Find Your Dream Job Details By Register on Our web.</h1>
              </section>
          </div>
        );
    }
}
export default Bottomsection;