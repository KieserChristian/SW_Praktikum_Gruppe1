import React, { Component } from 'react';
import { Button, Grid} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { default as DialogContent, default as DialogContentText } from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

/*  Dieser Dialog öffnet sich, sobald der Anmelde-Button nebem einem Projekt aus der StudentAvailableProjectEntry.js angeklickt wird.
    Er behinhaltet eine Abfrage, ob man sich für das angeklickte Projekt anmelden möchte und bietet einen "Anmelden"-, sowie "Abbrechen"- Button.
*/

class DocentProjectGrading extends Component {
    constructor (props) {
        super(props)
        this.state = {  
        }
    }

    onDialogClose =()=>{
        this.props.onCloseProp()
    }

    render() {
        const {openRegistration} = this.props;
        return(
            <Dialog open={openRegistration} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Möchtest du die Benotung für den Student verbindlich hochladen?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Note:
                </DialogContentText>
                <TextField  align="center" id="standard-number" type="number" InputLabelProps={{ shrink: true,}}></TextField>
                <Grid justify='space-between' alignItems='center'>
                    <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#4caf50'}} onClick={this.onDialogClose} >Hochladen</Button> 
                    <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#ff5722'}} onClick={this.onDialogClose} >Abbrechen</Button>   
                </Grid>     
            </DialogContent>

            </Dialog>
        );
    }

}

export default DocentProjectGrading;