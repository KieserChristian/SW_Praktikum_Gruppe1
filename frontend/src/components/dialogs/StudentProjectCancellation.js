import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import ProjectAdminAPI from '../../api/ProjectAdminAPI';

/*  Dieser Dialog öffnet sich, sobald der Abmelden-Button nebem einem Projekt aus der StudentProjectEntry.js angeklickt wird.
    Er behinhaltet eine Sicherheitsabfrage, ob man sich für das ausgewählte Projekt anmelden möchte und bietet einen "Abmelden"-, sowie "Abbrechen"- Button,
    sowie einen Alert nach erfolgreicher Abmeldung.
*/

class StudentProjectCancellation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            deletingInProgress: false,
            deletingError: null,
            projectNBO: props.project
        };
    }

    handleClose = () => {
        this.props.close();
    }  

    deleteParticipationOfProject = async() => {
        let participation = await ProjectAdminAPI.getAPI().getParticipationsByProject(this.state.projectNBO.getId())
        console.log(participation)
        ProjectAdminAPI.getAPI().deleteParticipation(participation.getId())
        .then(participation => {
            this.props.close(participation);
            this.setState ({
                deletingInProgress: false,
                deletingError: null
            });
        }).catch (e =>
            this.setState ({
                deletingInProgress: false,
                deletingError: e
            })
        );
        this.setState ({
            deletingInProgress: true,
            deletingError: null
        });
    }

    cancellationAlert =()=>{
        this.deleteParticipationOfProject();
        alert("Abmeldung erfolgreich!");
        this.handleClose()
    }

    render() {
        const { classes, show } = this.props;
        const { deletingInProgress, deletingError, projectNBO } = this.state;
        return (
            <Dialog open={show} onClose={this.handleClose}>
                <DialogTitle id="alert-dialog-title">
                    Sicherheitswarnung
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Möchten Sie sich von dem Projekt "{projectNBO.getName()}" wirklich abmelden?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.cancellationAlert} color="primary">
                        Abmelden
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Abbrechen
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default StudentProjectCancellation;