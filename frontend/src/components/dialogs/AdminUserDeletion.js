import React, { Component } from 'react';
import ProjectAdminAPI from '../../api/ProjectAdminAPI';
import { Button, DialogActions} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { default as DialogContent, default as DialogContentText, } from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonNBO from '../../api/PersonNBO';

class AdminUserDeletion extends Component {
    constructor (props) {
        super(props)

        this.state = {
            personNBO: props.person,
            loadingInProgress: null,
            addingError: null
        };
    }

    onDialogClose = () => {
        this.props.onCloseProp()
    }

    removePerson = async(personNBO) => {
        ProjectAdminAPI.getAPI().deletePerson(personNBO.getId()).then(person => {
            this.props.onDialogClose(person);
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

    removeAlert = (personNBO) => {
        this.removePerson(personNBO);
        alert("Person erfolgreich gelöscht!");
        this.onDialogClose();
    } 
    
    render() {
        const {openDeletion} = this.props;
        const {personNBO} = this.state;
        return(
            <Dialog open={openDeletion}>
                <DialogTitle id="alert-dialog-title">Sicherheitswarnung</DialogTitle>
            <DialogContent id="alert-dialog-description">
                <DialogContentText id="alert-dialog-description">
                Möchten Sie den User <b>"{personNBO.getName()}"</b> wirklich löschen?
                </DialogContentText>    
            </DialogContent>
            <DialogActions>
                <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#4caf50'}} onClick={() => this.removeAlert(personNBO)}>Löschen</Button>
                <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#ff5722'}} onClick={() => this.onDialogClose()}>Abbrechen</Button>
                </DialogActions>
            </Dialog>
        );
    }


}

export default AdminUserDeletion;