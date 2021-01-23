import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

class DocentDeleteStudent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            deletingInProgress: false,
            deletingError: null,
            ParticipationsOfStudent: null
        };
    }

    handleClose = () => {
        this.props.close();
    }  

    cancellationAlert =()=>{
        alert("Abmeldung erfolgreich!");
        this.handleClose()
    }

    render() {
        const { classes, show } = this.props;
        const { deletingInProgress, deletingError, ParticipationBOs, ParticipationsOfStudent } = this.state;
        return (
            <Dialog open={show} onClose={this.handleClose}>
                <DialogTitle id="alert-dialog-title">
                    Sicherheitswarnung
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Möchten Sie den Student wirklich löschen?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.cancellationAlert} color="primary">
                        Löschen
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Abbrechen
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default DocentDeleteStudent;