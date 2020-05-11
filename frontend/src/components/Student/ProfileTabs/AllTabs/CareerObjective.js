import React, { Component } from 'react';
import axios from 'axios';
import backendServer from '../../../../webConfig'
import { connect } from 'react-redux';
import { changeObjective } from "../../../../js/actions/studentProfile.js";
import { updateObjectiveMutation  } from '../../../../mutations/mutations'
import { graphql , compose } from 'react-apollo';






class CareerObjective extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            careerObjective:"",
            editing:false,
            mounted:false
        }

        // this.state.fname = this.props.entireData.fname;
    }

        componentDidUpdate() {
            if(this.props.careerObjective!=this.state.careerObjective && !this.state.mounted){
                this.setState({
                    careerObjective : this.props.careerObjective,
                    mounted: true
                })
            }
            
        }
    
        submitEdit = async (e) => {
            let mutationResponse = await this.props.updateObjectiveMutation({
                variables: {
                    careerObjective: this.state.careerObjective,
                    id:localStorage.getItem('id') 
                }
            });
            let response = mutationResponse.data.updateObjectiveMutation;
            if (response) {
                console.log(response)
                if (response.status === "200") {
                   
                }
                else{
                    console.log("Couldnt update objective")
                }
            }
            this.setState({
                editing: !this.state.editing
            })
        }
    
        cancelEdit = (e) => {
            this.setState({
                careerObjective: this.props.careerObjective,
                editing: false,
            })
        }
        careerObjectiveChangeHandler =(e)=>{
            this.setState({
                careerObjective: e.target.value,
                editing:true
            })
        }
    render() {

        let buttons= null;
        if(this.state.editing){
            buttons= 
                <p>
                    <button onClick={this.submitEdit} className="btn btn-success edit-button">Save</button>
                    <button onClick={this.cancelEdit} className="btn btn-danger edit-button">Cancel</button>
                </p>
        }

            return(
                <div className="card-body">
                     <h4 className="card-title">My Journey</h4>
                     <div className="row"></div>
                    <p className="card-text text-primary">What are you passionate about? What are you looking for on Handshake? What are your experiences or skills?</p>
                    <textarea className="form-control" value={this.state.careerObjective || ''} onChange={this.careerObjectiveChangeHandler} name="jobDescription" rows="3"></textarea>
                    {buttons}
                </div>
            )
        }
       
}
export default graphql(updateObjectiveMutation,{ name: "updateObjectiveMutation"})(CareerObjective);