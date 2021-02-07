import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { Button, Grid, Typography, withStyles} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import ProjectDetailsDialog from './dialogs/ProjectDetailsDialog';
import StudentProjectRegistration from './dialogs/StudentProjectRegistration';
import AdminProjectDeletion from './dialogs/AdminProjectDeletion'
import DocentView from '../components/DocentView'
import { Link } from 'react-router-dom';


/**
* AdminSwitchStudentEntry liefert den Input für die Sicht der Studentenoperationen in dem Adminreiter. 
Dies sind alle Studenten welche sich registriert haben und eine Rolle ausgewählt haben.
Es gibt die Auswahlmöglichkeit eines Studenten wieder.
*/


class AdminSwitchStudentEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            studentBOs: props.students,
            students: [],
            openDialogInfo: false,
            openDialogRegistration: false,
            projectType: null
           
        };
    }    

    handleClick = () => {
        this.setState({
            showDialog: true
        });
    }

    closeDialog = () => {
        this.setState({
            showDialog: false
        });
    }

    openDialogInfo = () => {
        this.setState({
            openDialogInfo: true})
    }

    openDialogRegistration = () => {
        this.setState({
            openDialogRegistration: true})
    }
    
    closeDialogInfo = () => {
        this.setState({
            openDialogInfo: false})
    }

    closeDialogRegistration = () => {
        this.setState({
            openDialogRegistration: false})
    }

    openDialogDeletion = () => {
        this.setState({
            openDialogDeletion: true})
    }

    closeDialogDeletion = () => {
        this.setState({
            openDialogDeletion: false})
    }   

    getPersonsByRole = () => {
        ProjectAdminAPI.getAPI().getPersonsByRole(this.state.studentBOs.getId())
        .then(students => {
            this.setState({
            students: students.getName(),
            loadingProgress: false,
            error: null
          });
        }).catch(e => {
          this.setState({
            students: null,
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
        this.getPersonsByRole();
    }

    render() {
        const { classes } = this.props;
        const { error, students, studentBOs, openDialogInfo, openDialogRegistration, openDialogDeletion} = this.state;
        return (
            <div className={classes.root}>
                        <Grid className={classes.project} container spacing={1} xs={12}>
                            <Grid item style={{marginBottom: 10, marginTop: 10}} xs={6}>
                                <Typography className={classes.heading} >
                                    <b>{studentBOs.getName()}</b>
                                </Typography>
                                <Grid item style={{marginBottom: 10, marginTop: 10, position:'relative', left:'70%'}} xs={6}></Grid>
                                <React.Fragment>

                                <Link to= '/student'>
                                    <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#4caf50'}} onClick={this.openDialogRegistration}>
                                        Auswählen
                                    </Button>
                                    </Link>
                            </React.Fragment>
                            </Grid>

                            



                        </Grid>
                        <hr/>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      }
});


export default withStyles(styles)(AdminSwitchStudentEntry);