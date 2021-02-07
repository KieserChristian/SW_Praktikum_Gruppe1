import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { Button, Grid, Typography, withStyles} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import { withRouter } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import ProjectDetailsDialog from './dialogs/ProjectDetailsDialog';
import StudentProjectRegistration from './dialogs/StudentProjectRegistration';
import AdminProjectDeletion from './dialogs/AdminProjectDeletion'
import AdminProjectUpdate from './dialogs/AdminProjectUpdate'

class AdminViewEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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

    openDialogUpdate = () => {
        this.setState({
            openDialogUpdate: true})
    }

    closeDialogUpdate = () => {
        this.setState({
            openDialogUpdate: false})
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
        const { classes,project } = this.props;
        const { error, projectType, openDialogInfo, openDialogRegistration, openDialogDeletion, openDialogUpdate} = this.state;
        return (
            <div className={classes.root}>
                        <Grid className={classes.project} container spacing={1} xs={12}>
                            <Grid item style={{marginBottom: 10, marginTop: 10}}xs={3}> 
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
                            <Grid item style={{marginBottom: 10, marginTop: 10, position: 'relative', left:'10%'}} xs={6}>
                                <Typography className={classes.heading} >
                                    <b>Projektname: {project.getName()}</b>
                                </Typography>
                            </Grid>
                            <Grid item style={{marginBottom: 10, marginTop: 10, position: 'relative', left:'18%'}}>
                        <React.Fragment>
                        <AdminProjectUpdate
                                openUpdate={openDialogUpdate}
                                onCloseProp={this.closeDialogUpdate}
                                project={project}
                                onUpdate={this.props.onUpdate}
                            />
                            <IconButton aria-label='expand' size='small' justify='flex-start' onClick={this.openDialogUpdate}>
                                <EditIcon/>
                            </IconButton>

                            <AdminProjectDeletion
                                openDeletion={openDialogDeletion}
                                onCloseProp={this.closeDialogDeletion}
                                project={project}
                                onDelete={this.props.onDelete}
                            />
                            <IconButton aria-label='expand' size='small' justify='flex-start' onClick={this.openDialogDeletion}>
                                <CancelIcon/>
                            </IconButton>
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


export default withStyles(styles)(AdminViewEntry);