import React from 'react';
import { withRouter } from 'react-router-dom';
import ProjectAdminAPI from '../../api/ProjectAdminAPI';
import LoadingProgress from './LoadingProgress';
import { withStyles, Button } from '@material-ui/core';
import DocentParticipantEntry from './DocentParticipantEntry';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';


/**
* DocentParticiation liefert den Input für die Teilnehmerliste eines Projektes, beim anklicken vom Teilnehmer-Button 
in einer Projektzeile in dem Dozentreiter.
*/


class DocentParticipantsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            students: [],
            project: props.project,
            error: null,
            loadingInProgress: false,
            onClose: props.onClose
        } 
    }

    onCloseDialog = () => {
        this.props.onClose()
    }

    getStudentsByProject = () => {
        console.log(this.state.project.getId())
        console.log(ProjectAdminAPI.getAPI().getStudentsByProject(this.state.project.getId()))
        ProjectAdminAPI.getAPI().getStudentsByProject(this.state.project.getId())
        .then (studentNBOs => {
            this.setState({
                students: studentNBOs,
                loadingInProgress: false,
                error: null
            });
        }).catch(e => {
        this.setState({
            students: [],
            loadingInProgress: false,
            error: e
            })
        });
        this.setState({
            loadingInProgress: true,
            error: null
        });
    }

    /* getAllStudents = () => {
        ProjectAdminAPI.getAPI().getAllStudents().then(studentNBOs => {
            this.setState({
                students: studentNBOs,
                loadingInProgress: false,
                error: null
            });
        }).catch(e => {
        this.setState({
            students: [],
            loadingInProgress: false,
            error: e
            })
        });
        this.setState({
        loadingInProgress: true,
        error: null
        });
    } */

    componentDidMount() {
        //this.getAllStudents();
        this.getStudentsByProject();
    }

    render() {
        const { classes, openList } = this.props;
        const { error, loadingInProgress, students } = this.state;
        console.log(students)
        return (
            <div className={classes.root}>
            <Dialog open={openList}>
                <DialogTitle id="alert-dialog-title">Teilnehmerliste</DialogTitle>
                <DialogContent id="alert-dialog-description">
                    <DialogContentText id="alert-dialog-description">
                        { 
                            students.length > 0 ?
                            students.map(student =>
                                <DocentParticipantEntry key={student.getId()} student={student}/>)
                            :
                            null
                        }
                    </DialogContentText>    
                </DialogContent>
                <DialogActions>
                    <Button style={{marginBottom: 10, marginTop: 10, color: '#3f51b5'}} onClick={this.onCloseDialog}>
                        Schließen
                    </Button>
                </DialogActions>
            </Dialog>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
    }
});

export default withRouter(withStyles(styles)(DocentParticipantsList));