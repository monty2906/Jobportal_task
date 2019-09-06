import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import './Adminsidebar.css';
// import './material-dashboard.css';
// import './material-dashboard.min.css';
// import './material-dashboard-rtl.css';
// import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class Adminhead extends Component {
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
            {this.state.showall.map((alldata) => {            
                return (
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-header card-header-warning card-header-icon">
                                        <div className="card-icon">
                                            <i className="material-icons">people</i>
                                        </div>
                                        <p className="card-category">Total Recruiters</p>
                                        <h3 className="card-category"><b>{alldata.recruiter_count}</b></h3>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                           <font size="3"><b>Our Registered Recruiters.</b></font>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-header card-header-success card-header-icon">
                                        <div className="card-icon">
                                            <i className="material-icons">people_outline</i>
                                        </div>
                                        <p className="card-category">Total Students</p>
                                        <h3 className="card-category"><b>{alldata.user_count}</b></h3>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <font size="3"><b>Our Registerd Students</b></font>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-header card-header-danger card-header-icon">
                                        <div className="card-icon">
                                            <i className="material-icons">person_pin</i>
                                        </div>
                                        <p className="card-category">Total Jobs</p>
                                        <h3 className="card-category"><b>{alldata.job_count}</b></h3>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <font size="3"><b>Available Jobs.</b></font>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-header card-header-info card-header-icon">
                                        <div className="card-icon">
                                            <i className="material-icons">recent_actors</i>
                                        </div>
                                        <p className="card-category">Students Applied</p>
                                        <h3 className="card-category"><b>{alldata.apply_count}</b></h3>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <font size="3"><b>Total Applers.</b></font>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 )
                })}
            </div>
        )
    }
}
export default Adminhead;