import React, { Component } from 'react';
import Homefooter from './Homefooter';
import Profilenavbar from './Profilenavbar';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './Profile.css';
import ImageUploader from "react-images-upload";

class Viewprofile extends Component{
    constructor(props) {
        super(props);
        const token = localStorage.getItem("token");
        let loggedIn = true
        if(token==null){
            loggedIn=false
        }
        this.state = {
            profile_pic:null,
            showuser: [],
            pictures: [],
            loggedIn
        }
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
          pictures: this.state.pictures.concat(pictureFiles)
        });
        console.log(this.state.pictures)
      }

    componentDidMount() {
        const mail = localStorage.getItem("user_email");
        const Finalvalue = {
            mail
        }
        var body = JSON.stringify(Finalvalue)
        axios.post('http://localhost/react_task/showstudentsdetails.php',body, {
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
      handleSubmit = () => {

        const pic = new FormData();
        pic.append('image', this.state.profile_pic, this.state.profile_pic.name)
        const user_mail = localStorage.getItem("user_email")
        const FinalValues = {
            user_mail,
            pic
        }
        console.log(FinalValues)
            var body = JSON.stringify(FinalValues)
            axios.post('http://localhost/react_task/imageupload.php', body, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                console.log(res)
            })
      }
      fileSelectHandler = event => {
          this.setState({
             profile_pic: event.target.files[0]})
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
                 {this.state.showuser.map((alldata ,i) => {
                    return (
                        <div className="container profile-card" key={i}>
                            <div className="picture-block">
                                <div className="picture">
                                    <img src={alldata.profile_pic} alt="mypic" width="100%" height="300px" />
                                </div>
                                <ImageUploader
                                    withIcon={false}
                                    withPreview={true}
                                    label=""
                                    buttonText="Upload Images"
                                    onChange={this.onDrop}
                                    imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg" ,".jpeg"]}
                                    maxFileSize={1048576}
                                    fileSizeError=" file size is too big"
                                />
                                {/* <input type="file" name="profile_pic"
                                onChange={this.fileSelectHandler} /><br /> */}
                                <button id="pic-button" >Update</button>
                            </div>
                            <div className="details">
                                <h3><b>{alldata.user_full_name}</b></h3>
                                <h4><b>Email:- </b> {alldata.user_email}</h4>
                                <h4><b>Number:- </b> {alldata.contact_number}</h4>
                                <h4><b>Number1:- </b> {alldata.alternative_number}</h4>
                                <h4><b>Address-1:- </b> {alldata.address_one}</h4>
                                <h4><b>Address-2:- </b> {alldata.address_two}</h4>
                                <h4><b>City:- </b> {alldata.user_city}</h4>
                                <h4><b>State:- </b> {alldata.user_state}</h4>
                                <h4><b>Zipcode:- </b> {alldata.user_zipcode}</h4>
                                <h4><b>Graduation year:- </b> {alldata.graduation_year}</h4>
                                <h4><b>Course:- </b> {alldata.graduation_course}</h4>
                                <h4><b>Branch:- </b> {alldata.graduation_branch}</h4>
                                <h4><b>Percent:- </b> {alldata.graduation_percent}</h4>
                                <h4><b>College Name:- </b> {alldata.college_name}</h4>
                                <h4><b>College City:- </b> {alldata.college_city}</h4>
                                <h4><b>Skills:- </b> {alldata.user_skills}</h4>
                                <h4><b>Experience:- </b> {alldata.user_experience}</h4>
                            </div>
                        </div>
                        )
                  })}
                 <Homefooter />
            </div>
        );
    }
}
export default Viewprofile;