import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import SweetAlert from 'sweetalert-react';
// import 'sweetalert/dist/sweetalert.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { jobTypes } from '../../../enum.js'
import axios from 'axios';
import backendServer from '../../../webConfig'
import { connect } from 'react-redux';
import { jobSearchPaginatinon , jobSearchSort } from "../../../js/actions/jobSearch.js";
import { applyForJobMutation  } from '../../../mutations/mutations'
import { graphql } from 'react-apollo';



// let selectedfilters= [0,3];
// const jobTypes = {
//     0: "Full-Time",
//     1: "Part-Time",
//     2: "Internship",
//     3: "On-Campus"
// }
 const MySwal = withReactContent(Swal)




//create the Navbar Component
class JobList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobList: [],
            selectedJob: {},
            selectedPageNumber: 0,
            sortOrder:1,
            sortField:'location'

        }
        this.showJobDetail = this.showJobDetail.bind(this);
        this.sortColumnChangeHandler = this.sortColumnChangeHandler.bind(this);
        this.sortOrderChangeHandler = this.sortOrderChangeHandler.bind(this);

        this.paginationHandler = this.paginationHandler.bind(this);
        this.applyModal = this.applyModal.bind(this);
    }
    // filterJobs = ()=>{
    //     console.log("in filter jobs");

    //     this.props.jobList.filter((job)=>{
    //         selectedfilters.includes(job.category)
    //     })
    // } 


    componentDidUpdate() {
        if (this.props.jobList.length > 0) {

            if (Object.keys(this.state.selectedJob).length === 0) {
                this.setState({
                    selectedJob: this.props.jobList[0]
                })
            }
            // else if(this.state.selectedJob.jobID !== this.props.jobList.jobID){
            //         this.setState({
            //             selectedJob :this.props.jobList[0]
            //         })
            // }
        }
        else if (Object.keys(this.state.selectedJob).length !== 0) {
            this.setState({
                selectedJob: []
            })
        }


    }
    showJobDetail = (e) => {
        this.setState({
            selectedJob: e
        })
    }
    sortColumnChangeHandler = (e)=>{
        this.setState({
            sortField: e.target.value
        })
        this.props.jobSearchSort({
            sortField : e.target.value,
            sortOrder :this.state.sortOrder
        })
    }
    sortOrderChangeHandler = (e)=>{
        this.setState({
            sortOrder: e.target.value
        })
        this.props.jobSearchSort({
            sortField : this.state.sortField,
            sortOrder : e.target.value
        })
    }

    paginationHandler = (e) => {
        this.setState({
            selectedJob: e
        })
    }

    applyModal = () => {
        return (
            MySwal.fire({
                title: 'Apply to job',
                confirmButtonText: 'Apply',
                showCancelButton: true,
                preConfirm: async () => {
                //     axios.post(`${backendServer}/api/job/applyForJob?studentID=${localStorage.getItem('id')}&jobID=${this.state.selectedJob._id}&name=${localStorage.getItem('name')}`, data)
                //         .then(response => {
                //             if(response.status==201){
                //                 this.setState({
                //                     selectedJob: {
                //                         ...this.state.selectedJob,
                //                         applied:true
                //                     }
                //                 })
                //             }
                //         }
                //         ).catch(ex => {
                //            alert(ex);
                //         });



                let mutationResponse = await this.props.applyForJobMutation({
                    variables: {
                        jobID: this.state.selectedJob.id,
                        name: "test",
                        studentID:localStorage.getItem('id')
                    }
                });
                let response = mutationResponse.data.applyForJobMutation;
                if (response) {
                    console.log(response)
                    if (response.status === "200") {
                        this.setState({
                            selectedJob: {
                                ...this.state.selectedJob,
                                applied:true
                            }
                        })
                    }
                    else{
                        console.log("Couldnt apply")
                    }
                }
                 },
            }).then((result) => {
                if (result.value) {
                    MySwal.fire({
                        icon: 'success',
                        title: 'Applied',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }

            })
        )
    }


    //handle logout to destroy the cookie

    render() {

        let applicationCloseOnBar = "";
        if(this.state.selectedJob.applied === undefined){
        applicationCloseOnBar =<div className="card-body applyBox row">
            <div className="col-sm-10">
                Applications close on {this.state.selectedJob.deadLineDate} </div>
            <div className="col-sm-2">
                <button type="button" onClick={this.applyModal} className="btn btn-success" data-toggle="modal" data-target="#exampleModalLong">Apply</button>
            </div>
        </div>
        }
        else{
            applicationCloseOnBar= <p>applied</p>
        }

        let jobs = this.props.jobList.map(job => {
            return (
                <div className="row job" key={job.id} onClick={() => { this.showJobDetail(job) }} >
                    <div className="col-sm-12">
                        <h5> {job.title}</h5>
                        <p className="smallText"> {job.companyName} - {job.location}</p>
                        <span className="greyText smallText">{jobTypes[job.category]}</span>
                    </div>
                </div>
            )
        })


        let links = [];
        if (this.props.pages > 0) {
            for (let i = 1; i <= this.props.pages; i++) {
                links.push(<li className="page-item" key={i}><a className="page-link" onClick={()=>{this.props.jobSearchPaginatinon(i)}}>
                    {i}
                </a></li>
                )
            }
        }

        let sortColumnName = 
        (
           <select onChange={this.sortColumnChangeHandler} className="form-control sort-select">
           <option value="location" >location</option>
           <option value="postedDate">posted</option>
           <option value="deadLineDate">deadline</option>
           </select>
       );

       let sortOrder = 
        (
           <select onChange={this.sortOrderChangeHandler} className="form-control sort-select">
           <option value="1" >asc</option>
           <option value="-1">desc</option>
           </select>
       );

       let profileLink="/company/profile/" + this.state.selectedJob.companyID

        return (

           

            <div className="row jobList">
                <div className="col-sm-4 jobListLeft">
                <div className="row">
                <div className="col-sm-5 greyText"><i className="glyphicon glyphicon-sort"></i> Sort</div>

                <div className="col-sm-3 ">{sortColumnName}</div>
                <div className="col-sm-4">{sortOrder}</div>
                    </div>

                    {jobs}
                    {/* pagination */}
                </div>
                <div className="col-sm-8 jobListRight">
                    {/* <div>
                <button onClick={() => this.setState({ show: true })}>Alert</button>
                <SweetAlert
                    show={this.state.show}
                    title="Demo"
                    text="SweetAlert in React"
                    onConfirm={() => this.setState({ show: false })}
                />
                </div> */}
                    <h3>{this.state.selectedJob.title}</h3>
            <p><a href={profileLink}>{this.state.selectedJob.companyName}</a></p>
                    <span className="greyText marginright10">
                        <i className="glyphicon glyphicon-briefcase"></i> {jobTypes[this.state.selectedJob.category]} </span>
                    <span className="greyText marginright10"><i className="glyphicon glyphicon-map-marker"></i> {this.state.selectedJob.location}</span>
                    <span className="greyText marginright10"><i className="glyphicon glyphicon-usd"></i>{this.state.selectedJob.salary}</span>
                    <span className="greyText marginright10"><i className="glyphicon glyphicon-time"></i> Posted {this.state.selectedJob.postedDate}</span>
                    <div className="card">
                       {applicationCloseOnBar}
                        <p>{this.state.selectedJob.description}</p>
                    </div>
                </div>


            </div>
        )
    }
}

export default graphql(applyForJobMutation,{ name: "applyForJobMutation"})(JobList);