import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { default as DialogContent, default as DialogContentText } from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
//import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';

/*  Dieser Dialog öffnet sich, sobald der Info-Button nebem einem Projekt aus der StudentAvailableProjectEntry.js angeklickt wird.
    Er behinhaltet einen Infotext mit dem Projektnamen, Projekttyp, Anzahl ECTS, Anzahl SWS, sowie eine Kurzbeschreibung und 
    lässt sich über einen Close-Button schließen.
*/

class ProjectDetailsDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }

    onDialogClose =()=>{
        this.props.onCloseProp()
    }

    
    render() {
        const { openInfo } = this.props;
        return (
            <Dialog open={openInfo} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Business Intelligence</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Projekt:
                </DialogContentText>
                <DialogContentText>
                Projekttyp:
                </DialogContentText>
                <DialogContentText>
                ECTS
                </DialogContentText>
                <DialogContentText>
                SWS:
                </DialogContentText>
                <DialogContentText>
                Kurzbeschreibung:
                </DialogContentText>
                <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#ff5722'}} onClick={this.onDialogClose} >close</Button>        
            </DialogContent>
        </Dialog>
        );
    }
}

export default ProjectDetailsDialog;