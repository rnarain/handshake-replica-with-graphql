import React, { Component } from 'react';
import axios from 'axios';
import backendServer from '../../../../webConfig'
import { connect } from 'react-redux';
import { changeContactInformation } from "../../../../js/actions/studentProfile.js";
import { updateAccountInfoMutation  } from '../../../../mutations/mutations'
import { graphql , compose } from 'react-apollo';




class AccountInfo extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            accountID:"",
            phone:"",
            email:"",
            edit:false,
        }

        this.editButtonChangeHandler = this.editButtonChangeHandler.bind(this);

        // this.state.email = this.props.entireData.email;
    }

        componentDidUpdate() {
            if(this.state.email !== this.props.email && !this.state.edit)
            {
                this.setState({
                    email : this.props.email,
                    phone : this.props.phone,
                })
            }
        }
        editButtonChangeHandler = (e) => {
            this.setState({
                edit: !this.state.edit
            })
        }

        phoneChangeHandler = (e) => {
            this.setState({
            phone: e.target.value
            })
        }

        emailChangeHandler = (e) => {
            this.setState({
                email: e.target.value
            })
        }

        cancelEdit = (e) => {
            this.setState({
                edit: !this.state.edit
            })
        }

        submitEdit = async (e) => {
            let mutationResponse = await this.props.updateAccountInfoMutation({
                variables: {
                    email: this.state.email,
                    phone: this.state.phone,
                    id:localStorage.getItem('id')
                }
            });
            let response = mutationResponse.data.updateAccountInfoMutation;
            if (response) {
                console.log(response)
                if (response.status === "200") {
                   
                }
                else{
                    console.log("Couldnt update objective")
                }
            }
            this.setState({
                edit: !this.state.edit
            })
        }
    
    render() {
        if(this.state.edit)
{
        return (
            <div className="card-body">
               <div>
               <h4 className="card-title">Contact Details</h4>
                <input onChange={this.phoneChangeHandler} value={this.state.phone} type="text" className="form-control marginUpBot20" name="phone" placeholder="Phone" />
                <input onChange={this.emailChangeHandler} value={this.state.email} type="text" className="form-control marginUpBot20" name="email" placeholder="Email" />
                <p>
                    <button onClick={this.submitEdit} className="btn btn-success edit-button">Save</button>
                    <button onClick={this.cancelEdit} className="btn btn-danger edit-button">Cancel</button>
                </p>
                </div>
            </div>
        )
    }
    else{
        let editButton=null;
            if(this.props.editable) {
                editButton = <button type="button" className="btn btn-default btn-circle pull-right" onClick={this.editButtonChangeHandler}>< i className="glyphicon glyphicon-pencil"></i></button>
            }
        return(
            <div className="card-body">
              <div className="container-fluid">
                  {editButton}
                <h4 className="card-title">Contact Details</h4>
                <p>Phone : {this.state.phone} </p>
                <p>Email : {this.state.email}</p>
                </div>
            </div>
        )
    }
    }
}
export default graphql(updateAccountInfoMutation,{ name: "updateAccountInfoMutation"})(AccountInfo);
