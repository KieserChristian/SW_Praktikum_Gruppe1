import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

class AdminProjektAblehnen extends React.Component {

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

    cancellationAlert =()=>{
        alert("Ablehnen erfolgreich!");
        this.handleClose()
    }

    render() {
        const { classes, show } = this.props;
        const { deletingInProgress, deletingError, ProjectNBOs } = this.state;
        return (
            <Dialog open={show} onClose={this.handleClose}>
                <DialogTitle id="alert-dialog-title">
                    Sicherheitswarnung
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Möchten Sie das Projekt "{ProjectNBOs.getName()}" wirklich ablehnen?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.cancellationAlert} color="primary">
                        Ablehnen
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Abbrechen
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default AdminProjektAblehnen;