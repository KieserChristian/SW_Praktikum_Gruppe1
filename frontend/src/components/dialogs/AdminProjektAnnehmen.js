import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

class AdminProjektAnnehmen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            deletingInProgress: false,
            deletingError: null,
            ProjectNBOs: props.project
        };
    }

    handleClose = () => {
        this.props.close();
    }  

    registrationAlert =()=>{
        alert("Annehmen erfolgreich!");
        this.handleClose()
    }

    render() {
        const { classes, show } = this.props;
        const { deletingInProgress, deletingError, ProjectNBOs } = this.state;
        return (
            <Dialog open={show} onClose={this.handleClose}>
                <DialogTitle id="alert-dialog-title">
                    Warnung
                </DialogTitle>
                <DialogContent id="alert-dialog-content">
                    <DialogContentText id="alert-dialog-description">
                        Möchten Sie das Projekt "{ProjectNBOs.getName()}" wirklich annehmen?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.registrationAlert} color="primary">
                        Annehmen
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Abbrechen
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default AdminProjektAnnehmen;