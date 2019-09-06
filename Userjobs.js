import React, { Component } from 'react';
import Homefooter from './Homefooter';
import Profilenavbar from './Profilenavbar';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import MaterialTable from 'material-table';
import './Profile.css';

class Userjobs extends Component{
    constructor(props) {
        super(props);
        const token = localStorage.getItem("token");
        let loggedIn = true
        if(token==null){
            loggedIn=false
        }
        this.state = {
            showuser: [],
            loggedIn
        }
    }

    componentDidMount() {
        const mail = localStorage.getItem("user_email");
        const Finalvalue = {
            mail
        }
        var body = JSON.stringify(Finalvalue)
        axios.post('http://localhost/react_task/userjobs.php',body, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res)=>{ 
            var showall1=res.data
            let showdetails=[];
            for (let alldetail of showall1)
            {
                showdetails.push(alldetail);
            }
            this.setState({
              showuser: showdetails
            })
        }) 
      }
    render(){
        if(this.state.loggedIn===false){
			return <Redirect to="/slogin" />
		} 
        return(
            <div>
                <Profilenavbar />
                <section id="bottom-section" className="text-center">
                    <h1><b>MY PROFILE</b></h1>
                </section>
                <br />
                <MaterialTable
                    columns={[
                        { title: "Job Name", field: "job_name",
                            cellStyle: {
                                fontSize: '13px'
                            },
                            headerStyle: {
                                backgroundColor:'#6db9ef',
                                fontSize: '13px',
                                fontStyle:'bold',
                                color:'black'
                                }
                        },
            
                        { title: "Company Name", field: "company_name",
                            cellStyle: {
                                fontSize: '13px'
                            }, 
                            headerStyle: {
                                backgroundColor:'#6db9ef',
                                fontSize: '13px',
                                fontStyle:'bold',
                                color:'black'
                            }
                        },
                                    
                        { title: "Location", field: "job_location",
                            cellStyle: {
                                fontSize: '13px'
                            },
                            headerStyle: {
                                backgroundColor:'#6db9ef',
                                fontSize: '13px',
                                fontStyle:'bold',
                                color:'black'
                            }
                        }, 
            
                        { title:"Designation", field: "job_post",
                            cellStyle: {
                                fontSize: '13px'
                            },
                            headerStyle: {
                                backgroundColor:'#6db9ef',
                                fontSize: '13px',
                                fontStyle:'bold',
                                color:'black'
                            }
                        },
            
                        { title: "Package", field: "job_package",
                            cellStyle: {
                                fontSize: '13px'
                            }, 
                            headerStyle: {
                                backgroundColor:'#6db9ef',
                                fontSize: '13px',
                                fontStyle:'bold',
                                color:'black'
                            }
                        },
                    ]}
                    data={this.state.showuser}
                        title="Apply Jobs"
                        options={{
                            cellStyle: {
                                backgroundColor:'#6db9ef',
                                fontSize: '13px',
                                fontStyle:'bold',
                            },
                            rowStyle: {
                                backgroundColor: '#EEE',
                            },
                            exportButton: true
                        }}
                />
                 <Homefooter />
            </div>
        );
    }
}
export default Userjobs;