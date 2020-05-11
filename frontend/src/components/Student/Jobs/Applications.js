import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import PostingsNavbar from './PostingsNavbar';
import ApplicationJobList from './ApplicationJobList';
import backendServer from '../../../webConfig'
import { paginate, pages } from '../../../helperFunctions/paginate'





class Applications extends Component {
    constructor(props) {
        //Call the constrictor of Super classNameName i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            jobList: [],
            filteredJobList: [],
            selectedfilters: [],
            pending : false,
            reviewed: false,
            declined: false,
        }

        this.filterChangeHandler = this.filterChangeHandler.bind(this);
        this.buildSelectedFilterArray = this.buildSelectedFilterArray.bind(this);


    }
    //Call the Will Mount to set the auth Flag to false
    async componentWillMount() {

        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        await axios.get(`${backendServer}/api/job/getAppliedJobsByStudentID/${localStorage.getItem('id')}`)
            .then(response => {
                this.setState({
                    jobList: response.data.data,
                    filteredJobList: paginate(response.data.data,1, 10),
                        pages: pages(response.data.data, 10)
                })
            }
            ).catch(ex => {
                alert("error");
            });
    }
    paginatinon = (e) => {
        this.setState({
            filteredJobList: paginate(this.state.filteredJobList,e, 10)
        })
    }
    clearFilter = () => {
        this.setState({
            pending : false,
            reviewed: false,
            declined: false,
            selectedfilters: [],
            filteredJobList: this.state.jobList
        })
    }

    filterChangeHandler = (i) => {

        switch (i) {
            case 0:
                this.setState({
                    pending: !this.state.pending
                }, () => {
                    this.buildSelectedFilterArray()
                })
                break;
            case 1:
                this.setState({
                    reviewed: !this.state.reviewed
                }, () => {
                    this.buildSelectedFilterArray()
                })
                break;
            case 2:
                this.setState({
                    declined: !this.state.declined
                }, () => {
                    this.buildSelectedFilterArray()
                })
                break;
        }
    }

    buildSelectedFilterArray = () => {
        var selFilters = [];
        if (this.state.pending) {
            selFilters.push(0);
        }
        if (this.state.reviewed) {
            selFilters.push(1);
        }
        if (this.state.declined) {
            selFilters.push(2);
        }
        let tempJobs;
        if (selFilters.length > 0) {
            tempJobs = this.state.jobList.filter((job) => {
                return (selFilters.includes(job.jobApplicants.find(j=>j.studentID == localStorage.getItem('id')).status))
            }
            )
        }
        else {
            tempJobs = this.state.jobList;
        }
        this.setState({
            selectedfilters: selFilters,
            filteredJobList: tempJobs

        })
        return tempJobs;
    }

    render() {
        let clearButton = null;
        if (this.state.selectedfilters.length > 0) {
            clearButton = <a onClick={() => { this.clearFilter() }} className="btn">Clear All</a>
        }

        let links = [];
        if (this.state.pages > 0) {
            for (let i = 1; i <= this.state.pages; i++) {
                links.push(<li className="page-item" key={i}><a className="page-link" onClick={() => { this.paginatinon(i) }}>
                    {i}
                </a></li>
                )
            }
        }
        return (
            <div className="handshake-body">
                <PostingsNavbar />
                <div className=" col-sm-10 col-sm-offset-1 card-columns">
                    <div className="col-sm-12 card">
                            <div className="row">
                                <div className="col-sm-12 filter-buttons">
                                    <button type="button" className={this.state.pending ? 'btn btn-outline-colored' : 'btn btn-outline'} onClick={() => { this.filterChangeHandler(0) }}>Pending</button>
                                    <button type="button" className={this.state.reviewed ? 'btn btn-outline-colored' : 'btn btn-outline'} onClick={() => { this.filterChangeHandler(1) }}>Reviewed</button>
                                    <button type="button" className={this.state.declined ? 'btn btn-outline-colored' : 'btn btn-outline'} onClick={() => { this.filterChangeHandler(2) }}>Declined</button>
                                    <button type="button" className={this.state.selectedfilters.length > 0 ? 'btn btn-outline-colored' : 'btn btn-outline'}>Filters <span className="badge badge-light">{this.state.selectedfilters.length}</span></button>
                                    {clearButton}
                                </div>
                        </div>
                    </div>
                    <div className="col-sm-12 card">
                        <div className="box-part-container margin20"> <ApplicationJobList jobList={this.state.filteredJobList} />
                        <ul className="pagination">
   {links}
   </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Applications;
