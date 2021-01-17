import React from 'react';
import { Button, ButtonGroup, Grid, Typography, withStyles} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import LoadingProgress from './dialogs/LoadingProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import ProjectDetailsDialog from './dialogs/ProjectDetailsDialog';


/*  StudentAvailableProjectsEntry wird aus der StudentAvailableProjectsView.js aufgerufen, um sich für das angezeigte
    Projekt anzumelden.
*/

class StudentAvailableProjectsEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ProjectNBOs: props.project,
            
            openDialog: false,
        };
    }

   
    

    openDialog = () => {
        this.setState({
            openDialog: true})
    }
    
    closeDialog = () => {
        this.setState({
            openDialog: false})
    }

    render() {
        const { classes } = this.props;
        const { error, loadingInProgress, ProjectNBOs, openDialog} = this.state;
        return (
            <div className={classes.root}>
                        <Grid className={classes.project} container spacing={1} justify='space-between' alignItems='center'>
                            <Grid>
                            <React.Fragment>
                                <ProjectDetailsDialog
                                    openDialog={this.openDialog}
                                    open={openDialog}
                                    onCloseProp={this.closeDialog}
                                />
                                <IconButton aria-label="expand row" size="small" justify='flex-start' onClick={ this.openDialog}>
                                <InfoIcon/>
                                </IconButton>
                            </React.Fragment>
                            </Grid>
                            <Grid item style={{marginBottom: 10, marginTop: 10}}>
                                <Typography className={classes.heading} >
                                    { ProjectNBOs.getName() }
                                </Typography>
                            </Grid>
                            <Grid item>
                                <ButtonGroup variant='text' size='small'>
                                    <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#4caf50'}}>
                                        Anmelden
                                    </Button>
                                </ButtonGroup>
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


export default withStyles(styles)(StudentAvailableProjectsEntry);