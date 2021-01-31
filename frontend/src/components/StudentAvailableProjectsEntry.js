import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
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
            projectNBO: props.project,
            openDialogInfo: false,
            openDialogRegistration: false,
            projectType: null
           
        };
        //console.log(this.state.projectNBO)
        //console.log(this.state.projectNBO.getId())
        //console.log(this.state.projectNBO.getProjectTypeId())
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

    getProjectTypeById = () => {
        ProjectAdminAPI.getAPI().getProjectTypeById(this.state.projectNBO.getProjectTypeId())
        .then(projectTypeNBO => {
            this.setState({
            projectType: projectTypeNBO,
            loadingProgress: false,
            error: null
          });
        }).catch(e => {
          this.setState({
            projectType: null,
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
        this.getProjectTypeById();
    }

    render() {
        const { classes } = this.props;
        const { error, projectNBO, projectType, openDialogInfo, openDialogRegistration} = this.state;
        //console.log(projectNBO)
        return (
            <div className={classes.root}>
                        <Grid className={classes.project} container spacing={1} xs={12}>
                            <Grid xs={3}> 
                            <React.Fragment>
                                <ProjectDetailsDialog
                                    openInfo={openDialogInfo}
                                    onCloseProp={this.closeDialogInfo}
                                    project={projectNBO}
                                    propProjectType={projectType}
                                />
                                <IconButton aria-label="expand row" size="small" justify='flex-start' onClick={this.openDialogInfo}>
                                <InfoIcon/>
                                </IconButton>
                            </React.Fragment>
                            </Grid>
                            <Grid item style={{marginBottom: 10, marginTop: 10}} xs={6}>
                                <Typography className={classes.heading} >
                                    <b>Projektname: {projectNBO.getName()}</b>
                                </Typography>
                                <Typography className={classes.heading}>
                                    {projectType?
                                        <b>ECTS: {projectType.getNumberEcts()}</b> 
                                    :"Test(5ECTS)"}
                                </Typography>
                                <Typography className={classes.heading}>
                                    Kapazität: {projectNBO.getCapacity()} Plätze
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                            <React.Fragment>
                                <StudentProjectRegistration
                                    openRegistration={openDialogRegistration}
                                    onCloseProp={this.closeDialogRegistration}
                                    project={projectNBO}
                                    currentUserEmail={this.props.currentUserEmail}
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