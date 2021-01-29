import React, { Component } from 'react';
import ProjectAdminAPI from '../../api/ProjectAdminAPI';
import { Button, DialogActions} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { default as DialogContent, default as DialogContentText, } from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ParticipationBO from '../../api/ParticipationBO';

/*  Dieser Dialog öffnet sich, sobald der Anmelde-Button nebem einem Projekt aus der StudentAvailableProjectEntry.js angeklickt wird.
    Er behinhaltet eine Abfrage, ob man sich für das angeklickte Projekt anmelden möchte und bietet einen "Anmelden"-, sowie "Abbrechen"- Button.
*/

class StudentProjectRegistration extends Component {
    constructor (props) {
        super(props)

        this.state = {
            ProjectNBOs: props.project,
            currentUserEmail: props.currentUserEmail,
            loadingInProgress: null,
            addingError: null,
            studentNBO: ''
        };
        //console.log(props.currentUserEmail)
    }

    onDialogClose = () => {
        this.props.onCloseProp()
    }

    addParticipationToProject = async() => {
        let newParticipation = new ParticipationBO();
        let student = await ProjectAdminAPI.getAPI().getStudentByGoogleId(this.props.currentUserEmail)
        //console.log(student)
        newParticipation.setProjectId(this.state.ProjectNBOs.getId());
        //console.log(this.state.ProjectNBOs.getId())
        newParticipation.setStudentId(student[0].getId());
        //console.log(newParticipation);
        ProjectAdminAPI.getAPI().addParticipation(newParticipation).then(participation => {
            this.props.onDialogClose(participation);
        }).catch(e =>
            this.setState({
                loadingInProgress: false,
                addingError: e
            })
        );
        this.setState({
            loadingInProgress: true,
            addingError: null
        });
    }  

    registrationAlert = () => {
        this.addParticipationToProject();
        alert("Anmeldung erfolgreich!");
        this.onDialogClose();
    } 

    render() {
        const {openRegistration} = this.props;
        const {ProjectNBOs} = this.state;
        return(
            <Dialog open={openRegistration}>
                <DialogTitle id="alert-dialog-title">Sicherheitswarnung</DialogTitle>
            <DialogContent id="alert-dialog-description">
                <DialogContentText id="alert-dialog-description">
                Möchten Sie sich zu dem Projekt <b>"{ProjectNBOs.getName()}"</b> wirklich anmelden?
                </DialogContentText>    
            </DialogContent>
            <DialogActions>
                <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#4caf50'}} onClick={this.registrationAlert}>Anmelden</Button>
                <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#ff5722'}} onClick={this.onDialogClose}>Abbrechen</Button>
                </DialogActions>
            </Dialog>
        );
    }

}

export default StudentProjectRegistration;