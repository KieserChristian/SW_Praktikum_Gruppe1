import React from "react";
import FormControl from '@material-ui/core/FormControl';
import { withStyles, Typography, Grid, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { Checkbox } from '@material-ui/core';
import {Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Projektart: ""
        }
    }

    
    
    
    render() {
        return (
            <form >
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
                    required
                    id="filled-required"
                    label="Required"
                    defaultValue="Hello World"
                    variant="filled"
                    />
                    
                
                    
                </div>
                <div>
                    <label>
                        Art des Projekts
                    </label>
                    <select value={this.state.Projektart} onChange={this.handleProjektartChange}>
                        <option value="FP">Fachspezifisches Projekt (3 SWS/5 ECTS)</option>
                        <option value="IP">Interdisziplinäres Projekt (5 SWS/ 10ECTS)</option>
                        <option value="TP">Transdisziplinäres Projekt (10 SWS/ 20ECTS; Laufzeit 2 Semester</option>
                    </select>

                </div>
                <button type='submit'>Submit</button>
            </form>
        );
    }
}    
const  styles = (theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  });
  

export default withStyles(styles)(Form)

