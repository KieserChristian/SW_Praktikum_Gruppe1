import React, { Component } from 'react';
import ProjectAdminAPI from '../../api/ProjectAdminAPI';
import { Button, DialogActions} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { default as DialogContent, default as DialogContentText, } from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ProjectNBO from '../../api/PersonNBO';

/**
* AdminProjectDeletion liefert den Input für die Löschung eines Projektes, beim anklicken vom Delete-Button 
oder beim anklicken des Ablehnen-Buttons in einer Projektzeile in dem Adminreiter.(Aus der Projektübersicht 
in der Liste der genehmigten Projekte. Oder aus der Projektübersicht in der Liste der neuen Projekte, das Ablehnen Button.)
*/

class AdminProjectDeletion extends Component {
    constructor (props) {
        super(props)

        this.state = {
            projectNBO: props.project,
            loadingInProgress: null,
            addingError: null
        };
    }

    onDialogClose = () => {
        this.props.onCloseProp()
    }

    removeProject = async(projectNBO) => {
        ProjectAdminAPI.getAPI().deleteProject(projectNBO.getId()).then(project => {
            this.props.onDialogClose(project);
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
        this.props.onDelete()
    }

    removeAlert = (projectNBO) => {
        this.removeProject(projectNBO);
        alert("Projekt erfolgreich gelöscht!");
        this.onDialogClose();
    } 
    
    render() {
        const {openDeletion} = this.props;
        const {projectNBO} = this.state;
        return(
            <Dialog open={openDeletion}>
                <DialogTitle id="alert-dialog-title">Sicherheitswarnung</DialogTitle>
            <DialogContent id="alert-dialog-description">
                <DialogContentText id="alert-dialog-description">
                Möchten Sie das Projekt <b>"{projectNBO.getName()}"</b> wirklich löschen?
                </DialogContentText>    
            </DialogContent>
            <DialogActions>
                <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#4caf50'}} onClick={() => this.removeAlert(projectNBO)}>Löschen</Button>
                <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#ff5722'}} onClick={() => this.onDialogClose()}>Abbrechen</Button>
                </DialogActions>
            </Dialog>
        );
    }


}

export default AdminProjectDeletion;