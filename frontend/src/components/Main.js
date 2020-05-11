import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom';

import Login from './Login/Login';
import Signup from './Signup/Signup';
import StudentHome from './Student/Home/Home';
import Postings from './Student/Jobs/Postings';
import Applications from './Student/Jobs/Applications';
import JobPostings from './Company/JobPostings/JobPostings';
import Listings from './Company/JobPostings/Listings';
import CompanyProfile from './Company/Profile/CompanyProfile';

import ApplicantList from './Company/JobPostings/ApplicantList';
import Student from './Company/Students/student';
import Students from './Student/Students/Students';
import Navbar from './LandingPage/Navbar';
import { Redirect } from 'react-router';


//Create a Main Component
class Main extends Component {
    render(){
        let navRoute = null;
        if (localStorage.getItem('id')) {
            navRoute = <Navbar />
            }
        else{
        }

        return(
            <div>
                {/*Render Different Component based on Route*/}
                {navRoute}
                <Route exact path="/" render={() => <Redirect to="/login" />} />
                <Route exact path="/" component={Login}/>
                <Route exact path="/student/profile/:id" component={StudentHome}/>
                <Route exact path="/company/profile/:id" component={CompanyProfile}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/student/postings" component={Postings}/>
                <Route exact path="/student/applications" component={Applications}/>
                <Route exact path="/company/postings" component={JobPostings}/>
                <Route exact path="/company/applicantlist/:id" component={ApplicantList}/>
                <Route exact path="/company/students" component={Student}/>
                <Route exact path="/student/students" component={Students}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;