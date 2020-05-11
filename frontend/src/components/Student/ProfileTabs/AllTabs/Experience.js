import React, { Component } from 'react';
import axios from 'axios';
import backendServer from '../../../../webConfig'
import {dateTimeToDate} from '../../../../helperMethods';
import { connect } from 'react-redux';
import { changeExperience  , deleteExperience } from "../../../../js/actions/studentProfile.js";
import { updateExperienceMutation  } from '../../../../mutations/mutations'
import { graphql , compose } from 'react-apollo';





class Experience extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            company:"",
            location:"",	
            startDate:"",
            endDate:"",
            title:"",
            description:"",
            add: false,
            edit: false,
            mounted:false
        }
    }

    componentDidUpdate() {
            if(this.props.Experience.company!==this.state.company && !this.state.mounted){
                this.setState({
                    company: this.props.Experience.company,
                location: this.props.Experience.location,
                startDate: this.props.Experience.startDate,
                endDate: this.props.Experience.endDate,
                title: this.props.Experience.title,
                description: this.props.Experience.description,
                add: this.props.Experience.add,
                edit: this.props.Experience.edit,
                mounted :true
                })
            }
    }

    editButtonChangeHandler = (e) => {
        this.setState({
            edit: !this.state.edit,
            add: false
        })
    }
    deleteButtonChangeHandler = (e) => {
        this.props.deleteExperience({
            id: localStorage.getItem('id'),
            experienceId:this.state._id
        });
    }
    companyChangeHandler = (e) => {
        this.setState({
            company: e.target.value
        })
    }
    locationChangeHandler = (e) => {
        this.setState({
            location: e.target.value
        })
    }
    startDateChangeHandler = (e) => {
        this.setState({
            startDate: e.target.value
        })
    }
    endDateChangeHandler = (e) => {
        this.setState({
            endDate: e.target.value
        })
    }
    titleChangeHandler = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    descriptionChangeHandler = (e) => {
        this.setState({
            description: e.target.value
        })
    }



    cancelEdit = (e) => {
        if(this.state.add){
            this.props.deleteExperience({
                id: localStorage.getItem('id'),
                experienceId:this.state._id
            });
        }
        

        this.setState({
            edit: false,
            add:false,
        })
        // this.state =[]
    }

    submitEdit = async (e) => {
        let mutationResponse = await this.props.updateExperienceMutation({
            variables: {
                company: this.state.company,
                location: this.state.location,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                title: this.state.title,
                description: this.state.description,
                id: localStorage.getItem('id'),
            }
        });
        let response = mutationResponse.data.updateExperienceMutation;
        if (response) {
            console.log(response)
            if (response.status === "200") {
               
            }
            else{
                console.log("Couldnt update experience")
            }
        }
        this.setState({
            add: false,
            edit: false
        })
    }
    render() {

        if (this.state.edit || this.state.add) {
            return (
                <div>
                    <div className="form-group">
                        <label>company</label>
                        <input type="text" onChange={this.companyChangeHandler} value={this.state.company} className="form-control" placeholder="company" />
                    </div>
                    <div className="form-group">
                        <label>Job Title</label>
                        <input type="text" onChange={this.titleChangeHandler} value={this.state.title} className="form-control" placeholder="title" />
                    </div>
                    <div className="form-group">
                        <label>Job Description</label>
                    <textarea className="form-control" value={this.state.description} onChange={this.descriptionChangeHandler} name="jobDescription" rows="3"></textarea>
                    </div>
                        <div className="form-group ">
                            <label >location</label>
                            <input type="text" onChange={this.locationChangeHandler} value={this.state.location} className="form-control" placeholder="location" />
                        </div>

                    <div className="row">
                        <div className="form-group col-sm-6">
                            <label >Start Date</label>
                            <input type="date" onChange={this.startDateChangeHandler} value={this.state.startDate} className="form-control" />
                        </div>
                        <div className="form-group col-sm-6">
                            <label >End Date</label>
                            <input type="date" onChange={this.endDateChangeHandler} value={this.state.endDate} className="form-control" />
                        </div>
                    </div>
                    <button onClick={this.submitEdit} className="btn btn-success edit-button">Save</button>
                    <button onClick={this.cancelEdit} className="btn btn-danger edit-button">Cancel</button>
                </div>

            )
        }
        else {
            let editButton=null;
            let deleteButton=null;

            if(this.props.editable) {
                deleteButton = <button type="button" className="btn btn-danger btn-circle pull-right delete-button" onClick={this.deleteButtonChangeHandler}>< i className="glyphicon glyphicon-remove"></i></button>
                editButton = <button type="button" className="btn btn-default btn-circle pull-right" onClick={this.editButtonChangeHandler}>< i className="glyphicon glyphicon-pencil"></i></button>
            }
            return (
                <div className="row">
                    <div className="col-sm-1">
                        <p>
                            <img src="/images/work.png" className="logo" /></p>
                    </div>
                    <div className="col-sm-7">
                        <h4>{this.state.company}</h4>
                        <p>{this.state.title}</p>
                        <p>{dateTimeToDate(this.state.startDate)} - {dateTimeToDate(this.state.endDate) }  | {this.state.location}</p>
                        <p>{this.state.description}</p>
                    </div>
                    <div className="col-sm-4">
                        {deleteButton}
                        {editButton}
                    </div>
                </div>
            )
        }
    }
}

export default graphql(updateExperienceMutation,{ name: "updateExperienceMutation"})(Experience);