import React from "react";
import FormControl from '@material-ui/core/FormControl';
import { withStyles, Typography, Grid, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { Checkbox } from '@material-ui/core';
import {Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const Projektart = [
    {
      value: 'FP',
      label: 'Fachspezifisches Projekt (3 SWS/5 ECTS)',
    },
    {
      value: 'FP nach alter SBO',
      label: 'Fachspezifisches Projekt alte SPO / im Minor (3 SWS/5 ECTS)',
    },
    {
      value: 'IP',
      label: 'Interdisziplinäres Projekt (5 SWS/ 10ECTS)',
    },
    {
      value: 'TP',
      label: 'Transdisziplinäres Projekt (10 SWS/ 20ECTS; Laufzeit 2 Semester',
    },
];

const Sprache = [
    { 
        value: "DE",
        label: "Deutsch"
    },
    {
        value: "EG",
        label: "Englisch"
    }
];
  



class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Projektart: "",
            Sprache:"",
            
        }
    }

    
    
    render() {
        const styles = theme => ({})
        return (
            <form>
                <div >
                    <TextField required id="standard-required" label="Projekt" defaultValue="Hello World" variant="filled"/>
                
                    <TextField required
                    id="standard-number"
                    label="Number"
                    type="number"
                    variant="filled"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                    
                    
                </div>
                <div>
                    <TextField
                    id="Projekttyp"
                    select
                    label="Select"
                    value={Projektart}
                    ///onChange={handleChange}
                    options={"TP"}
                    helperText="Please select your Projektart"
                    >

                    ))
                    </TextField>
                </div>
                <div>
                    <TextField
                    id="Sprache"
                    select
                    label="Select"
                    value={Sprache}
                    ///onChange={handleChange}
                    options={"Deutsch","Englisch"}
                    helperText="Please select your Sprache"
                    >

                    ))
                    </TextField>
                </div>    
                <div>
                    <TextField
                    required
                    id="filled-required"
                    label="Required"
                    defaultValue="Hello World"
                    variant="filled"
                    />
                    
                
                    
                </div>
                

             
            </form>
        );
    }
}    


export default withRouter(Form)

