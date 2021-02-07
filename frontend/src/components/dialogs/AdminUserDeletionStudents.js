import React, { Component } from 'react';
import ProjectAdminAPI from '../../api/ProjectAdminAPI';
import { Button, DialogActions} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { default as DialogContent, default as DialogContentText, } from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import StudentNBO from '../../api/StudentNBO';


/**
* AdminUserDeletionStudent liefert den Input für die Löschung des Studenten, beim anklicken vom Delete-Button 
in einer Studentenzeile in dem Adminreiter.(Aus der Nutzerübersicht in der Liste der Studenten.)
*/


class AdminUserDeletionStudents extends Component {
    constructor (props) {
        super(props)

        this.state = {
            studentNBO: props.student,
            loadingInProgress: null,
            addingError: null
        };
    }

    onDialogClose = () => {
        this.props.onCloseProp()
    }

    removeStudent = async(studentNBO) => {
        ProjectAdminAPI.getAPI().deleteStudent(studentNBO.getId()).then(student => {
            this.props.onDialogClose(student);
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

    removeAlert = (studentNBO) => {
        this.removeStudent(studentNBO);
        alert("Person erfolgreich gelöscht!");
        this.onDialogClose();
    } 
    
    render() {
        const {openDeletion} = this.props;
        const {studentNBO} = this.state;
        return(
            <Dialog open={openDeletion}>
                <DialogTitle id="alert-dialog-title">Sicherheitswarnung</DialogTitle>
            <DialogContent id="alert-dialog-description">
                <DialogContentText id="alert-dialog-description">
                Möchten Sie den User <b>"{studentNBO.getName()}"</b> wirklich löschen?
                </DialogContentText>    
            </DialogContent>
            <DialogActions>
                <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#4caf50'}} onClick={() => this.removeAlert(studentNBO)}>Löschen</Button>
                <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#ff5722'}} onClick={() => this.onDialogClose()}>Abbrechen</Button>
                </DialogActions>
            </Dialog>
        );
    }


}

export default AdminUserDeletionStudents;