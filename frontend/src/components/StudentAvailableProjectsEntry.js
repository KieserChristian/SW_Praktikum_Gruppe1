import React from 'react';
import { Button, ButtonGroup, Grid, Typography, withStyles} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import LoadingProgress from './dialogs/LoadingProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


/*  StudentAvailableProjectsEntry wird aus der StudentAvailableProjectsView.js aufgerufen, um sich für das angezeigte
    Projekt anzumelden.
*/

class StudentAvailableProjectsEntry extends React.Component {

    constructor(props) {
        super(props);
        
        this.handleClose = this.handleClose(this);

        this.state = {
            ProjectNBOs: props.project,
        };
    }

    handleClose() {
        this.setState({show: false});
    }

    render() {
        const { classes } = this.props;
        const { error, loadingInProgress, ProjectNBOs } = this.state;
        return (
            <div className={classes.root}>
                        <Grid className={classes.project} container spacing={1} justify='flex-start' alignItems='center'>
                            <Grid item>
                                <Typography className={classes.heading}>
                                    { ProjectNBOs.getName() }
                                </Typography>
                            </Grid>
                            <Grid item>
                                <ButtonGroup variant='text' size='small'>
                                    <Button color='primary'>
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