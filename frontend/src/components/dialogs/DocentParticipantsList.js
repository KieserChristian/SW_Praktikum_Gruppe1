import React from 'react';
import { withRouter } from 'react-router-dom';
import ProjectAdminAPI from '../../api/ProjectAdminAPI';
import LoadingProgress from './LoadingProgress';
import { withStyles, Button } from '@material-ui/core';
import DocentParticipantEntry from './DocentParticipantEntry';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

class DocentParticipantsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            students: [],
            project: props.project,
            error: null,
            loadingInProgress: false
        } 
    }

    onDialogClose = () => {
        this.props.closeParticipantsList()
    }

    /* getStudentsByProject = () => {
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
    } */

    getAllStudents = () => {
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
    }

    componentDidMount() {
        this.getAllStudents();
        //this.getStudentsByProject();
    }

    render() {
        const { classes, openList } = this.props;
        const { error, loadingInProgress, students } = this.state;
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
                    <Button style={{marginBottom: 10, marginTop: 10, color: 'white'}} onClick={this.onClose}>
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