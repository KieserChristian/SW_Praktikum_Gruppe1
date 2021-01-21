import React from 'react';
import { Button, Grid, Typography, withStyles} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import ProjectDetailsDialog from './dialogs/ProjectDetailsDialog';
import StudentProjectRegistration from './dialogs/StudentProjectRegistration';


/*  StudentAvailableProjectsEntry wird aus der StudentAvailableProjectsView.js aufgerufen, um sich für das angezeigte
    Projekt anzumelden.
*/

class StudentAvailableProjectsEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ProjectNBOs: props.project,
            openDialogInfo: false,
            openDialogRegistration: false,
        };
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


    render() {
        const { classes } = this.props;
        const { error, ProjectNBOs, openDialogInfo, openDialogRegistration} = this.state;
        return (
            <div className={classes.root}>
                        <Grid className={classes.project} container spacing={1} justify='space-between' alignItems='center'>
                            <Grid>
                            <React.Fragment>
                                <ProjectDetailsDialog
                                    openInfo={openDialogInfo}
                                    onCloseProp={this.closeDialogInfo}
                                    project={ProjectNBOs}
                                />
                                <IconButton aria-label="expand row" size="small" justify='flex-start' onClick={this.openDialogInfo}>
                                <InfoIcon/>
                                </IconButton>
                            </React.Fragment>
                            </Grid>
                            <Grid item style={{marginBottom: 10, marginTop: 10}}>
                                <Typography className={classes.heading} >
                                    <b>{ ProjectNBOs.getName() }</b>
                                </Typography>
                                <Typography className={classes.heading}>
                                    Kapazität: {ProjectNBOs.getCapacity()} Plätze
                                </Typography>
                            </Grid>
                            <Grid item>
                            <React.Fragment>
                                <StudentProjectRegistration
                                    openRegistration={openDialogRegistration}
                                    onCloseProp={this.closeDialogRegistration}
                                />
                                    <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#4caf50'}} onClick={this.openDialogRegistration}>
                                        Anmelden
                                    </Button>
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
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      }
});


export default withStyles(styles)(StudentAvailableProjectsEntry);