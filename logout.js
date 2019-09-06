import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


export default class logout extends Component{
    constructor(props){
        super(props);
       localStorage.removeItem("token")
       localStorage.removeItem("user_email")
    }
    render(){
        return(
            <div>
              <Redirect to="/" />
            </div>
        );
    }
}
