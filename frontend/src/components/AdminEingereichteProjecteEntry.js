import React from 'react';
import { withStyles, Typography, Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import AdminProjektAblehnen from './dialogs/AdminProjektAblehnen';
import ProjectDetailsDialog from './dialogs/ProjectDetailsDialog';
import AdminProjektAnnehmen from './dialogs/AdminProjektAnnehmen';

class AdminEingereichteProjekteEntry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ProjectNBOs: props.project,
            openDialogInfo: false,
            showDialog: false
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

    closeDialogInfo = () => {
        this.setState({
            openDialogInfo: false})
    }

    render() {
        const { classes } = this.props;
        const { ProjectNBOs, showDialog, openDialogInfo } = this.state;
        return (
            <div className={classes.root}>
                <Grid container spacing={1} justify='space-between' alignItems='center'>
                    <Grid>
                        <React.Fragment>
                            <ProjectDetailsDialog
                            openInfo={openDialogInfo}
                            onCloseProp={this.closeDialogInfo}
                            project={ProjectNBOs}
                            />
                            <IconButton aria-label='expand' size='small' justify='flex-start' onClick={this.openDialogInfo}>
                                <InfoIcon/>
                            </IconButton>
                        </React.Fragment>
                    </Grid>   
                    <Grid style={{marginBottom: 10, marginTop: 10}}> 
                        <Typography className={classes.heading}>
                            <b>{ ProjectNBOs.getName() }</b> 
                        </Typography>
                        <Typography>
                            Kapazität: { ProjectNBOs.getCapacity()} Plätze
                        </Typography>
                    </Grid>
                    <Grid>
                        <React.Fragment>
                            <AdminProjektAnnehmen
                            show={showDialog}
                            close={this.closeDialog}
                            project={ProjectNBOs}
                            />
                            <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: 'green'}} onClick={this.handleClick}>
                                Annehmen
                            </Button>    
                        </React.Fragment>
                    </Grid>

                    <Grid>
                        <React.Fragment>
                            <AdminProjektAblehnen 
                            show={showDialog} 
                            close={this.closeDialog} 
                            project={ProjectNBOs}
                            />
                            <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#ff5722'}} onClick={this.handleClick}>
                                Ablehnen
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

export default withStyles(styles)(AdminEingereichteProjekteEntry);