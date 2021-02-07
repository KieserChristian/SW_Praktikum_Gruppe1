import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { Button, Grid, Typography, withStyles} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import ProjectDetailsDialog from './dialogs/ProjectDetailsDialog';
import AdminProjectApproval from './dialogs/AdminProjectApproval';
import AdminProjectDeletion from './dialogs/AdminProjectDeletion'
import ProjectNBO from '../api/ProjectNBO';

class AdminAppliedProjectEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // currentState= "Genehmigt",
            projectNBO: props.project,
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

    openDialogApproval = () => {
        this.setState({
            openDialogApproval: true})
    }
    
    closeDialogInfo = () => {
        this.setState({
            openDialogInfo: false})
    }

    closeDialogApproval = () => {
        this.setState({
            openDialogApproval: false})
    }

    openDialogDeletion = () => {
        this.setState({
            openDialogDeletion: true})
    }

    closeDialogDeletion = () => {
        this.setState({
            openDialogDeletion: false})
    }   

    updateAlert = (projectNBO) => {
        this.updateProject(projectNBO);
        alert("Daten erfolgreich geändert!");
        this.onDialogClose();
    } 

    // handleChangeCurrentState = () =>{
    //     const newCurrentState = Object.assign(new ProjectNBO(),this.state.currentState);
    //     newCurrentState.setState("Genehmigt")
    //     this.setState({currentState:newCurrentState})

    // }

    getProjectTypeById = () => {
        ProjectAdminAPI.getAPI().getProjectTypeById(this.props.project.getProjectTypeId())
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
        const { classes, project } = this.props;
        const { error, projectType, openDialogInfo, openDialogApproval, openDialogDeletion} = this.state;
        return (
            <div className={classes.root}>
                        <Grid className={classes.project} container spacing={1} xs={12}>
                            <Grid item style={{marginBottom: 10, marginTop: 10, }} xs={3}> 
                            <React.Fragment>
                                <ProjectDetailsDialog
                                    openInfo={openDialogInfo}
                                    onCloseProp={this.closeDialogInfo}
                                    project={project}
                                    propProjectType={projectType}
                                />
                                <IconButton aria-label="expand row" size="small" justify='flex-start' onClick={this.openDialogInfo}>
                                <InfoIcon/>
                                </IconButton>
                            </React.Fragment>
                            </Grid>
                            <Grid item style={{marginBottom: 10, marginTop: 10}} xs={6}>
                                <Typography className={classes.heading} >
                                    <b>Projektname: {project.getName()}</b>
                                </Typography>
                                <Typography className={classes.heading}>
                                    {projectType?
                                        <b>ECTS: {projectType.getNumberEcts()}</b> 
                                    :"Test(5ECTS)"}
                                </Typography>
                                <Typography className={classes.heading}>
                                    Kapazität: {project.getCapacity()} Plätze
                                </Typography>
                            </Grid>
                            <Grid item style={{marginBottom: 10, marginTop: 10, position:'relative', left:'70%'}} xs={6}>
                            <React.Fragment>
                                <AdminProjectApproval
                                    openApproval={openDialogApproval}
                                    onCloseProp={this.closeDialogApproval}
                                    project={project}
                                    currentUserEmail={this.props.currentUserEmail}
                                    onUpdate={this.props.onUpdate}
                                />
                                    <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#4caf50'}} onClick={this.openDialogApproval}>
                                        Genehmigen
                                    </Button>
                            </React.Fragment>
                            <React.Fragment>
                                <AdminProjectDeletion
                                    openDeletion={openDialogDeletion}
                                    onCloseProp={this.closeDialogDeletion}
                                    project={project}
                                    onDelete={this.props.onDelete}
                                />
                                    <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#ff5722'}} onClick={this.openDialogDeletion}>
                                        Ablehnen
                                    </Button>
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


export default withStyles(styles)(AdminAppliedProjectEntry);