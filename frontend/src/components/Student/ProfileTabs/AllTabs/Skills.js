import React, { Component } from 'react';
import axios from 'axios';
import backendServer from '../../../../webConfig'
import { connect } from 'react-redux';
import { changeSkills } from "../../../../js/actions/studentProfile.js";
import { updateSkillsMutation  } from '../../../../mutations/mutations'
import { graphql , compose } from 'react-apollo';


class Skills extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            skills:"",
            editing:false,
            mounted:false
        }

        // this.state.fname = this.props.entireData.fname;
    }

        componentDidUpdate() {
            if(this.props.skills!==this.state.skills && !this.state.mounted){
                this.setState({
                    skills : this.props.skills,
                    mounted:true
                })
            }
            
        }
    
        submitEdit = async (e) => {
            let mutationResponse = await this.props.updateSkillsMutation({
                variables: {
                    skills: this.state.skills,
                    id:localStorage.getItem('id')
                }
            });
            let response = mutationResponse.data.updateSkillsMutation;
            if (response) {
                console.log(response)
                if (response.status === "200") {
                   
                }
                else{
                    console.log("Couldnt update skills")
                }
            }
            this.setState({
                editing: !this.state.editing
            })
        }
    
        cancelEdit = (e) => {
            this.setState({
                skills: this.props.skills,
                editing: false,
            })
        }
        skillsChangeHandler =(e)=>{
            this.setState({
                skills: e.target.value,
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
                     <h4 className="card-title">Skills</h4>
                     
                                      <p className="card-text text-primary">0-Ruby |
1-ASP.NET |
2-AJAX |
3-Objective-C |
4-PHP |
5-Python |
6-Perl |
7-C |
8-Java |
9-Javascript |
10-NodeJS |
11-No-SQL |
12-SQL</p>
<p>Add skills separated by comma (,)</p>
                <input onChange={this.skillsChangeHandler} value={this.state.skills || ''} type="text" className="form-control marginUpBot20" name="phone" placeholder="Skills" />
                    {buttons}
                </div>
            )
        }
       
}
export default graphql(updateSkillsMutation,{ name: "updateSkillsMutation"})(Skills);