import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import PostingsNavbar from './PostingsNavbar';
import JobList from './JobList';
import backendServer from '../../../webConfig'
import { connect } from 'react-redux';
import { updateFilteredJobs } from "../../../js/actions/jobSearch.js";
import { graphql , compose } from 'react-apollo';
import {jobsByStudentIDQuery} from '../../../queries/queries'



class Postings extends Component {
    constructor(props) {
        //Call the constrictor of Super classNameName i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            jobList: [],
            filteredJobList: [],
            valueRecieved: false
        }

        // this.filterChangeHandler = this.filterChangeHandler.bind(this);
        this.searchChangeHandler = this.searchChangeHandler.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    // async componentWillMount() {

    //     axios.defaults.withCredentials = true;
    //     //make a post request with the user data
    //     axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    //     await axios.get(`${backendServer}/api/job/getJobsByStudentID/${localStorage.getItem('id')}`)
    //         .then(response => {
    //             console.log(response);
    //             this.setState({
    //                 jobList: response.data.data,
    //                 filteredJobList: response.data.data
    //             })
    //             this.props.updateFilteredJobs({jobs:this.state.jobList});
    //         }
    //         ).catch(ex => {
    //             alert("error");
    //         });
    // }
    componentDidUpdate(){
        if(!this.props.data.loading && !this.state.valueRecieved){
            let data = this.props.data.jobsByStudentID;
            this.setState({
                jobList: data,
                filteredJobList:data,
                valueRecieved:true
            })
        }
    }

    searchChangeHandler = (e) => {
        if (e.target.value) {
            this.setState({
                filteredJobList :this.state.jobList.filter((job) => {
                    return (job.title.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
                }
                )}
            )
        }
    }

    cityChangeHandler = (e) => {
        if (e.target.value) {
            this.setState({
                filteredJobList :this.state.jobList.filter((job) => {
                    return (job.location.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
                }
                )
            }
            )
        }
    }

    render() {
        return (
            <div className="handshake-body">
                <PostingsNavbar />
                <div className=" col-sm-10 col-sm-offset-1 card-columns">
                    <div className="col-sm-12 card">
                        <div className="box-part-container">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-search"></i></span>
                                        <input id="search" onChange={this.searchChangeHandler} type="text" className="form-control" name="search" placeholder="Search" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-map-marker"></i></span>
                                        <input id="city" type="text" onChange={this.cityChangeHandler} className="form-control" name="city" placeholder="City" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 card">
                        <div className="box-part-container margin20"> <JobList jobList={this.state.filteredJobList}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default graphql(jobsByStudentIDQuery, {
    options: {
        variables: { 'id': localStorage.getItem("id") }
    }
})(Postings);
