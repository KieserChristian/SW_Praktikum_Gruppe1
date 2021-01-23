import React from 'react';
import { Button, Grid, Typography, withStyles} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import DocentProjectGrading from './dialogs/DocentProjectGrading';
import DeleteIcon from '@material-ui/icons/Delete';
import DocentDeleteStudent from './dialogs/DocentDeleteStudent';
import ProjectAdminAPI from '../api/ProjectAdminAPI';



/*  DocentTeilnehmerlisteGrading.js wird aus der DocentTeilnehmerlisteGradingView.js aufgerufen, um den angezeigten
    Student zu benoten.
*/

class DocentTeilnehmerlisteGrading extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            StudentNBOs: props.student,
            ParticipationBOs: props.participation,
            ProjectNBOs: props.project,
            openDialogRegistration: false,
            participationsOfStudent: null,
        };
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
    getParticipationsOfStudent = () => {
        ProjectAdminAPI.getAPI().getParticipationsOfStudent(this.state.ParticipationBOs.getId())
        .then(participationsOfStudentAPI => {
            this.setState({
            participationsOfStudent: participationsOfStudentAPI,
            loadingProgress: false,
            error: null
          });
        }).catch(e => {
          this.setState({
            participationsOfStudent: null,
            loadingInProgress: false,
            error: e
          })
        });
        this.setState({
        loadingInProgress: true,
        error: null
        });
    }

    render() {
        const { classes } = this.props;
        const { error, ParticipationBOs, participationsOfStudent, openDialogRegistration, showDialog, numberEcts, ProjectNBOs, StudentNBOs} = this.state;
        return (
            <div className={classes.root}>
                        <Grid className={classes.project} container spacing={1} justify='space-between' alignItems='center'>

                            <Grid item style={{marginBottom: 10, marginTop: 10}}>
                                <Typography className={classes.heading} >
                                    <b>{ StudentNBOs.getName() }</b>
                                    
                                </Typography>
                                <Typography className={classes.heading} >
                                Matr.Nr.: { StudentNBOs.getMatriculationNumber() }
                                </Typography>
                            </Grid>
                            <Grid item>
                            <React.Fragment>
                                <DocentProjectGrading
                                    openRegistration={openDialogRegistration}
                                    onCloseProp={this.closeDialogRegistration}
                                />
                                    <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#4caf50'}} onClick={this.openDialogRegistration}>
                                        Benoten
                                    </Button>
                            </React.Fragment>
                            </Grid>
                            <Grid item>
                            <React.Fragment>
                                <DocentDeleteStudent 
                                    show={showDialog} 
                                    close={this.closeDialog} 
                                    participation={ParticipationBOs}
                                />
                                    <IconButton style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: 'red'}} aria-label="delete" className={classes.margin}><DeleteIcon fontSize="small"  onClick={this.handleClick}/>
                                        
                                    </IconButton>
                            </React.Fragment>
                            </Grid>
                        </Grid>
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
});


export default withStyles(styles)(DocentTeilnehmerlisteGrading);