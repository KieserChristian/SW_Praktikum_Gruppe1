import React from "react";
import FormControl from '@material-ui/core/FormControl';
import { withStyles, Typography, Grid, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { Checkbox } from '@material-ui/core';
import {Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Projekttitel: '',
            Inhalt: ``,
            Sprache: "Sprache",
            Projektart: "Projektart",
            betrProf: "",
            extKoop:""
        }

    }

    handleProjekttitelChange = (event) => {
        this.setState
            ({ Projekttitel: event.target.value })

    }
    handleInhaltChange = (event) => {
        this.setState({Inhalt: event.target.value})
    }
    handleSpracheChange = (event) => {
        this.setState({Sprache: event.target.value})
    }
    handleProjektartChange= (event) => {
        this.setState({Projektart: event.target.value})
    }
    handleBetrProfChange = (event) => {
        this.setState({betrProf: event.target.value})
    }
    handleExtKoopChange = (event) => {
        this.setState({extKoop: event.target.value})
    }
    handleSubmit = (event) => {
        alert(`${this.state.name} ${this.state.Inhalt} ${this.state.Sprache} ${this.state.Projekttitel}`)
    }

    render() {
        
        
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Projekttitel</label>
                    <input type="text" value = {this.state.Projekttitel} onChange={this.handleProjekttitelChange}/> 

                </div>
                <div>
                    <label>Betreuender Professor/in</label>
                    <input type="text" value = {this.state.betrProf} onChange={this.handleBetrProfChange}/> 

                </div>
                <div>
                    <label>Externer Kooperationspartner</label>
                    <input type="text" value = {this.state.extKoop} onChange={this.handleExtKoopChange}/> 

                </div>
               
     
                <div>
                    <input type="checkbox" id="ja" name="JaCheck" value="Ja"></input>
                    <label for="ja">Ja </label>
                </div>
                <div>
                    <input type="checkbox" id="N" name="NeinCheck" value ="Nein"></input>
                    <label for="ja">Nein </label>
                </div>
                
                
                <div>
                    <label>
                        Art des Projekts
                    </label>
                    <select value={this.state.Projektart} onChange={this.handleProjektartChange}>
                        <option value="FP">Fachspezifisches Projekt (3 SWS/5 ECTS)</option>
                        <option value="FPZG">Fachspezifisches Projekt Zugleich Wahlfach alte SPO/ im Minor - Programm (3 SWS/5 ECTS)</option>
                        <option value="IP">Interdisziplinäres Projekt (5 SWS/ 10ECTS)</option>
                        <option value="TP">Transdisziplinäres Projekt (10 SWS/ 20ECTS; Laufzeit 2 Semester</option>
                    </select>    
                </div>
                <div>
                    <label>Inhalt </label>
                    <textarea value={this.state.Inhalt} onChange={this.handleInhaltChange} />
                </div>
                <div>
                    <labe>Sprache</labe>
                    <select value={this.state.sprache} onChange={this.handleSpracheChange}>
                        <option
                            value ="Deutsch"> Deutsch
                        </option>
                        <option
                            value = "Englisch">Englisch
                        </option>
                    </select>
                </div>
                <button type="submit" onSubmit={this.handleSubmit}>Absenden </button>
            </form>
        )
                    
    }

}

export default withRouter(Form);
