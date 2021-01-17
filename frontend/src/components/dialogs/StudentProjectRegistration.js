import React, { Component } from 'react';
import { Button, Grid} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { default as DialogContent, default as DialogContentText } from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

/*  Dieser Dialog öffnet sich, sobald der Anmelde-Button nebem einem Projekt aus der StudentAvailableProjectEntry.js angeklickt wird.
    Er behinhaltet eine Abfrage, ob man sich für das angeklickte Projekt anmelden möchte und bietet einen "Anmelden"-, sowie "Abbrechen"- Button.
*/

class StudentProjectRegistration extends Component {
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
                <DialogTitle id="form-dialog-title">Möchtest du dich verbindlich für das Projekt anmelden?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Projekt:
                </DialogContentText>
                <Grid justify='space-between' alignItems='center'>
                    <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#4caf50'}} onClick={this.onDialogClose} >Anmelden</Button> 
                    <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#ff5722'}} onClick={this.onDialogClose} >Abbrechen</Button>   
                </Grid>     
            </DialogContent>

            </Dialog>
        );
    }

}

export default StudentProjectRegistration;