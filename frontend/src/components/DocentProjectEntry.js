import React from 'react';
import { withStyles, Typography, Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import ProjectDetailsDialog from './dialogs/ProjectDetailsDialog';
import DocentParticipantsList from './dialogs/DocentParticipantsList';

class DocentProjectEntry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            projectNBO: props.project,
            openDialogInfo: false,
            openParticipantsList: false
        };
    }

    openParticipantsList = () => {
        this.setState({
            openParticipantsList: true
        });
    }

    closeParticipantsList = () => {
        this.setState({
            openParticipantsList: false
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

    render() {
        const { classes } = this.props;
        const { projectNBO, openParticipantsList, openDialogInfo } = this.state;
        return (
            <div className={classes.root}>
                <Grid container spacing={1} justify='space-between' alignItems='center'>  
                    <Grid style={{marginBottom: 10, marginTop: 10}}> 
                        <React.Fragment>
                            <ProjectDetailsDialog
                            openInfo={openDialogInfo}
                            onCloseProp={this.closeDialogInfo}
                            project={projectNBO}
                            />
                            <IconButton aria-label='expand' size='small' justify='flex-start' onClick={this.openDialogInfo}>
                                <InfoIcon/>
                            </IconButton>
                        </React.Fragment>
                    </Grid>
                    <Grid style={{marginBottom: 10, marginTop: 10}}> 
                        <Typography className={classes.heading}>
                            <b>{projectNBO.getName() }</b> 
                        </Typography>
                        <Typography>
                            Projektstatus: {projectNBO.getState()} 
                        </Typography>
                    </Grid>
                    <Grid>
                        <React.Fragment>
                            <DocentParticipantsList
                            openList={openParticipantsList}
                            onClose={this.closeParticipantsList}
                            project={projectNBO}
                            currentUserEmail={this.props.currentUserEmail}
                            />
                            <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#697bdb'}}
                            onClick={this.openParticipantsList}>
                                Teilnehmerliste
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

export default withStyles(styles)(DocentProjectEntry);