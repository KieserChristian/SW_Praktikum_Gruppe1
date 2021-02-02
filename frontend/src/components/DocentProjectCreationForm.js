import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { withRouter } from 'react-router-dom';
import { withStyles, Grid, Button, Paper, Typography, FormRow} from '@material-ui/core';
import ProjectNBO from '../api/ProjectNBO';


class DocentProjectCreation extends React.Component {

    constructor(props) {
        super(props) 
        this.state = {
                Projektname:"",
                ProjektId:"",
                creation_date: new Date,
                external_partners:"",
                capacity:"",
                weekly_flag: "",
                bd_preferred_in_lecture_period:"",
                bd_in_lecture_period:"",
                bd_in_exam_period:"",
                bd_before_lecture_period:"",
                short_description:"",
                special_room:"",
                project_type:"",
                project_type_id:"",
                module_id:"",
                state_id:"",
                current_state:"Neu"
        }
        this.handleInputChange = this.handleInputChange.bind(this);

    }
    handleInputChange = (event) =>  {
 
      this.state.Projektname = event.target.value
   

    }
    handleProjektNameChange = (event) => {
        this.setState
            ({ name: event.target.value })

    }
    handleIdChange = (event) => {
        this.setState({Id: event.target.value})
    }
    handleExternal_PartnersChange = (event) => {
        this.setState({external_partners: event.target.value})
    }
    handleCapacityChange= (event) => {
        this.setState({capacity: event.target.value})
    }
    handleWeekly_FlagChange = (event) => {
        this.setState({weekly_flag: event.target.value})
    }
    handleBd_preferred_in_lecture_periodeChange = (event) => {
        this.setState({bd_preferred_in_lecture_period: event.target.value})
    }
    handleBd_in_lecture_periodeChange = (event) => {
        this.setState({bd_in_lecture_period: event.target.value})
    }
    handleBd_in_exam_periodeChange = (event) => {
        this.setState({bd_in_exam_period: event.target.value})
    }
    handleBd_before_lecture_periodeChange = (event) => {
        this.setState({bd_in_exam_period: event.target.value})
    }
    handleShort_DescriptionChange = (event) => {
        this.setState({short_description: event.target.value})
    }
    handelSpecial_RoomChange = (event) => {
        this.setState({special_room: event.target.value})
    }
    handleProjecttyp_IdChange = (event) => {
        this.setState({project_type_id: event.target.value})
    }
    handleModule_IdChange = (event) => {
        this.setState({module_id: event.target.value})
    }
    handleProjektTypChange = (event) => {
        this.setState({Projekttyp: event.target.value})
    }
    handleProjektTypIdChange = (event) => {
        this.setState({project_type_id: event.target.value})
    }
    handleModule_IdChange = (event) => {
        this.setState({module_id: event.target.value})
    }
    handleCurrentState = (event) => {
        this.setState({current_state: event.target.value})
    }

    handleSubmit = (event) => {
       this.state.name = event.target.value
    } 

    addProject = () => {
        let newProject = new ProjectNBO(this.state.projektname, this.state.ProjektId);
        ProjectAdminAPI.getAPI().addCustomer(newProject).then(project => {
          // Backend call sucessfull
          // reinit the dialogs state for a new empty customer
          this.setState(this.baseState);
          this.props.onClose(project); // call the parent with the customer object from backend
        }).catch(e =>
          this.setState({
            updatingInProgress: false,    // disable loading indicator 
            updatingError: e              // show error message
          })
        );
    
        // set loading to true
        this.setState({
          updatingInProgress: true,       // show loading indicator
          updatingError: null             // disable error message
        });
      }
    

    render() {
        
        
        return (
            <div>
            <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
                <Grid>
                    <h1>Anmeldung<br/>
                    Projekte Fakultät 3 </h1>
                </Grid>
                    <form type= "Submit" action = "" method = "POST" onSubmit={this.handleSubmit}>
                        
                        
                        <div>    
                            <label>Projektname</label>
                            <input name = "projektname" type="text" value = {this.state.name} onChange={this.handleProjektNameChange}/> 

                        </div>
                        <div>
                            <label>ProjektId</label>
                            <input type="number" value = {this.state.Id} onChange={this.handleInputChange}/> 

                        </div>
                        <div>
                            <label>Externer Kooperationspartner</label>
                            <input type="text" value = {this.state.external_partners} onChange={this.handleExternal_PartnersChange}/> 

                        </div>
                        <div>
                            <label>Kapazität</label>
                            <input type="number" value = {this.state.capacity} onChange={this.handleCapacityChange}/>
                        </div>
                    <div>
                        <label>Weekly Flag</label>
                        <input type="number" name="weekly_flag" placeholder="1 = ja 0 = nein" checked= {this.state.weekly_flag}  onChange= {this.handleInputChange}/>
                        
                    </div>
                        <div>
                            <label>Short Description</label>
                            
                            
                            <textarea input type="text" value = {this.state.short_description} onChange={this.handleShort_DescriptionChange}>

                            </textarea>
                            

                        
                        </div>
                        <div>
                        <label>
                            Blockdays before lecture period
                        </label>
                        
                        <input type="number" placeholder= " Anzahl der Tage" name="bd_before_lecture_period" value = {this.state.value} onChange={this.handleBd_before_lecture_periodeChange}/>
                    </div>                    
                    <div>
                        <label>
                            Blockdays preferred in lecture period
                        </label>
                        
                        <input type="number" placeholder= " Anzahl der Tage" name="bd_preferred_in_lecture_period" value = {this.state.value} onChange={this.handleBd_preferred_in_lecture_periodeChange}/>
                    </div>
                    <div>
                        <label>
                            Blockdays in lecture period
                        </label>
                        
                        <input type="number" placeholder= " Anzahl der Tage" name="bd_in_lecture_period" value = {this.state.value} onChange={this.handleBd_in_lecture_periodeChange}/>
                    </div>
                    <div>
                        <label>
                            Blockdays in exam period
                        </label>
                        
                        <input type="number" placeholder= " Anzahl der Tage" name="bd_in_exam_period" value = {this.state.value} onChange={this.handleBd_in_exam_periodeChange}/>
                    </div>      

                    

                    <div>
                        <label>Special Room</label>
                        <input type="text" value = {this.state.value} onChange={this.handelSpecial_RoomChange}/>
                    </div>
   
          
                    <div>
                        <label>Projecttyp Id</label>
                        <input type="number" placeholder= "1 FP, 2 IP,3 TP" value = {this.state.value} onChange={this.handleProjecttyp_IdChange}/>
                        
                    </div>
                    <div>
                        <label>Modul Id</label>
                        <input type="number" value = {this.state.value} onChange={this.handleModule_IdChange}/>
                    </div>
                    <div>
                        <label>Current State</label>
                        <input type="text" placeholder="default new" disabled/>
                    </div>
                    <div>
                        person
                    </div>
                        

                    
                        <button type="submit" onSubmit={this.handleSubmit}>Absenden </button>
                    </form>                    
            </Paper>
            </div>      
        )
                    
    }

}

export default withRouter(DocentProjectCreation);
