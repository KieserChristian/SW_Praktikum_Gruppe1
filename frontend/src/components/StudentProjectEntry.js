import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { withStyles, Typography, Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import StudentProjectCancellation from './dialogs/StudentProjectCancellation';
import ProjectDetailsDialog from './dialogs/ProjectDetailsDialog';

class StudentProjectEntry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            projectNBO: props.project,
            openDialogInfo: false,
            showDialog: false,
            projectType: null
        };
        //console.log(this.props.projectNBO)
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

    closeDialogInfo = () => {
        this.setState({
            openDialogInfo: false})
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
        const { projectNBO, projectType, showDialog, openDialogInfo } = this.state;
        return (
            <div className={classes.root}>
                <Grid container spacing={1} justify='space-between' alignItems='center'>
                    <Grid>
                        <React.Fragment>
                            <ProjectDetailsDialog
                            openInfo={openDialogInfo}
                            onCloseProp={this.closeDialogInfo}
                            project={projectNBO}
                            propProjectType={projectType}
                            />
                            <IconButton aria-label='expand' size='small' justify='flex-start' onClick={this.openDialogInfo}>
                                <InfoIcon/>
                            </IconButton>
                        </React.Fragment>
                    </Grid>   
                    <Grid style={{marginBottom: 10, marginTop: 10}}> 
                        <Typography className={classes.heading}>
                            <b>{projectNBO.getName()}</b>
                            {console.log(projectNBO)}
                            {console.log(projectNBO.getName())}
                        </Typography>
                        <Typography className={classes.heading}>
                                    {projectType?
                                        <b>ECTS: {projectType.getNumberEcts()}</b> 
                                    :"Test(5ECTS)"}
                        </Typography>
                        <Typography className={classes.heading}>
                            Kapazität: {projectNBO.getCapacity()} Plätze
                            {console.log(projectNBO)}
                            {console.log(projectNBO.getCapacity())}
                        </Typography>
                    </Grid>
                    <Grid>
                        <React.Fragment>
                            <StudentProjectCancellation 
                            show={showDialog} 
                            close={this.closeDialog} 
                            project={projectNBO}
                            />
                            <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#ff5722'}} onClick={this.handleClick}>
                                Abmelden
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
    }
});

export default withStyles(styles)(StudentProjectEntry);