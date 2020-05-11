import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {jobTypes, applicationStatus} from '../../../enum.js'

// let selectedfilters= [0,3];


 


//create the Navbar Component
class ApplicationJobList extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     jobList: [],
        //     selectedJob: {},
        //     selectedPageNumber: 0,
            
        // }
        // this.showJobDetail = this.showJobDetail.bind(this);
        // this.paginationHandler = this.paginationHandler.bind(this);
        // this.applyModal =this.applyModal.bind(this);
    }
    // filterJobs = ()=>{
    //     console.log("in filter jobs");

    //     this.props.jobList.filter((job)=>{
    //         selectedfilters.includes(job.category)
    //     })
    // } 


    componentDidMount() {
        // if (this.props.jobList.length > 0) {

        // if (Object.keys(this.state.selectedJob).length === 0) {
        //         this.setState({
        //             selectedJob: this.props.jobList[0]
        //         })
        // }
        // // else if(this.state.selectedJob.jobID !== this.props.jobList.jobID){
        // //         this.setState({
        // //             selectedJob :this.props.jobList[0]
        // //         })
        // // }
        // }
        // else if(Object.keys(this.state.selectedJob).length !== 0){
        //     this.setState({
        //         selectedJob: []
        //     })
        // }
    }

    render() {

        

        let jobs = this.props.jobList.map(job => {
            return (
                <div className="row job"  key= {job._id} >
                    <div className="col-sm-4">
                        <h5> {job.title}</h5>
                        <p className="smallText"> {job.name}</p>
                        <span className="greyText smallText">{jobTypes[job.category]}</span>
                    </div>
                    <div className="col-sm-4">
                        <h5>Status : {applicationStatus [job.jobApplicants.find(j=>j.studentID == localStorage.getItem('id')).status]}</h5>
                    </div>
                    <div className="col-sm-4">
                        <h5> <i className="glyphicon glyphicon-ok"></i> Applied {job.jobApplicants.find(j=>j.studentID == localStorage.getItem('id')).applicationDate}</h5>
                        {/* <p className="smallText"> {job.name}</p>
                        <span className="greyText smallText">{jobTypes[job.category]}</span> */}
                    </div>
                </div>
            )
        })

        // let pages = this.props.jobList.length / 25;
        // if (this.props.jobList.length % 25 !== 0) {
        //     pages++
        // }


        //     let links = [];
        //     if(pages > 0){
        //         for (let i = 1; i <= pages; i++) {
        //             links.push(<li className="page-item" key={i}><a className="page-link" href="#">
        //                 {i}
        //                 </a></li>
        //             )
        //         }
        // }


        //         const pageLinks = [];
        //         if(pages > 0){
        // for(let i =1; i <pages ; i++){
        //             return(
        //                 pageLinks.push(<li class="page-item"><a class="page-link" href="#">i</a></li>)
        //             )

        //                             }
        //         }





        //if Cookie is set render Logout Button
        return (
            
            <div className="row jobList">
                <div className="col-sm-12 jobListLeft">
                    {jobs}
                </div>
            </div>
        )
    }
}

export default ApplicationJobList;