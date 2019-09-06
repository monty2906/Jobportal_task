import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


export default class Adminlogout extends Component{
    constructor(props){
        super(props);
       localStorage.removeItem("token_admin")
    }
    render(){
        return(
            <div>
              <Redirect to="/admin/login" />
            </div>
        );
    }
}
