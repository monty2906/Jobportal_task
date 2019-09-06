import React, { Component } from 'react';
import './Homefooter.css'

class Homefooter extends Component {
    render(){
        return(
          <div>
              <section id="footer" className="text-center">
                <font color="black" size="5">
                    <i className="fa fa-graduation-cap" aria-hidden="true"></i>JobKeeper's
                </font><br />
                <font size="3">Our web portal is always help you to find your dream job. <br />
                You can easily make Account and use it.</font><br />
                <font color="#33adff" size="6" id="font-bottom-icons"><i className="fa fa-twitter"></i></font>
                <font color="#005ce6" size="6" id="font-bottom-icons"><i className="fa fa-facebook-official"></i></font>
                <font color="#0099ff" size="6" id="font-bottom-icons"><i className="fa fa-linkedin"></i></font>
                <hr />
                <h4>Copyright <i className="fa fa-copyright"></i> 2018-19 </h4>
              </section>
          </div>
        );
    }
}
export default Homefooter;