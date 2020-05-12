import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {jobTypes, applicationStatus} from '../../../enum.js';
import axios from 'axios';
import PostingsNavbar from './PostingsNavbar';
import IndividualApplicant from './IndividualApplicant';
import backendServer from '../../../webConfig'
import { paginate, pages } from '../../../helperFunctions/paginate'
import { graphql , compose } from 'react-apollo';
import {applicantListByJobIDQuery} from '../../../queries/queries'






//create the Navbar Component
class ApplicantList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applicantList: [],
            filteredApplicants:[],
            valueRecieved:false
        }
    }

    // componentDidMount() {
    //     axios.defaults.withCredentials = true;
    //     // make a post request with the user data
    //     axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    //     axios.get(`${backendServer}/api/job/getApplicantListByJobID/${this.props.match.params.id}`)
    //         .then(response => {
    //             console.log(response);
    //             if (response.status === 200) {
    //                   this.setState({
    //                     applicantList: response.data.data,
    //                     filteredApplicants: paginate(response.data.data,1, 10),
    //                     pages: pages(response.data.data, 10)
    //                   })
    //                 console.log(response.data.data);
    //             } else {
    //                 console.log("error");
    //             }
    //         });
    // }
    componentDidUpdate(){
        if(!this.props.data.loading && !this.state.valueRecieved){
            console.log(this.props.data)
            let data = this.props.data.applicantListByJobID;
            this.setState({
                applicantList: data,
                filteredApplicants: data,
                valueRecieved:true
            })
        }
    }

    paginatinon = (e) => {
        this.setState({
            filteredApplicants: paginate(this.state.applicantList,e, 10)
        })
    }

    render() {
        let applicants = this.state.filteredApplicants.map(applicant => {
            return (
               <IndividualApplicant individualApplicant={applicant} jobID= {this.props.match.params.id}/>
            )
        })

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
                <div className=" col-sm-offset-1 col-sm-10 jobListCompany">
                <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Application Date</th>
      <th scope="col">View Profile</th>
      <th scope="col">View Resume</th>
      <th scope="col">Change Status</th>


    </tr>
  </thead>
  <tbody>
   {applicants}
   <ul className="pagination">
   {links}
   </ul>
  </tbody>
</table>

</div>

            {/* <div className="row">
                <div className="col-sm-12 jobListLeft">
                    {jobs}
                </div>
            </div> */}
            </div>
        )
    }
}

export default graphql(applicantListByJobIDQuery, {
    options: {
        variables: { 'id': localStorage.getItem("id") }
    }
})(ApplicantList);