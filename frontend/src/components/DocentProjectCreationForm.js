import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { withRouter } from 'react-router-dom';
import { withStyles, Grid, Button, Paper, Typography, FormRow} from '@material-ui/core';


class DocentProjectCreation extends React.Component {

    constructor(props) {
        super(props) 
        this.state = {
                Projektname:"",
                ProjektId:"",
                external_partners:"",
                capacity:"",
                weekly_flag: "true,false",
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
        let name = event.target.name;
        let value = event.target.value;
      
        this.setState({
            [name]: value
        });

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

    /*handleSubmit = (event) => {
        alert(` ${this.state.name.value}`,` ${this.state.weekly_flag}` );

        fetchAdvanced("http://127.0.0.1:5000/project/projects", {
            method: "POST",

            body: JSON.stringify(this.state)
        }).then(function(response) {
            console.log(response)
            return response.json();
        });
        event.preventDefault();  /** Javascript Event preventDefault übernimmt im DOM die Aufgabe des Aufrufs return false;, 
                                 um die ursprüngliche Aktion des Browsers bei einem HTML-Element außer Kraft zu setzen.*/ 
        
    //}

    render() {
        
        
        return (
            <div>
            <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
                <Grid>
                    <h1>Anmeldung<br/>
                    Projekte Fakultät 3 </h1>
                </Grid>
                    <form onSubmit={this.handleSubmit}>
                        
                        
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
                        <input type="checkbox" name="weekly_flag" checked= {this.state.weekly_flag} value = {this.state.name} onChange= {this.handleInputChange}/>
                        
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
                        <label>Projektype</label>
                        <select value={this.state.Projektart} onChange={this.handleProjektTypChange}>
                            <option value="Fachspezifisches Projekt">Fachspezifisches Projekt (3 SWS/5 ECTS)</option>
                           
                            <option value="Interdisziplinäres Projekt">Interdisziplinäres Projekt (5 SWS/ 10ECTS)</option>
                            <option value="Transdisziplinäres Projekt">Transdisziplinäres Projekt (10 SWS/ 20ECTS; Laufzeit 2 Semester</option>
                        </select> 
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
                        

                    
                        <button type="submit" onSubmit={this.handleSubmit}>Absenden </button>
                    </form>                    
            </Paper>
            </div>      
        )
                    
    }

}

export default withRouter(DocentProjectCreation);
