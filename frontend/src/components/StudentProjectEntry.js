import React from 'react';
import { withRouter } from 'react-router-dom';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import LoadingProgress from './dialogs/LoadingProgress';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { withStyles, Typography, Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StudentProjectCancellation from './dialogs/StudentProjectCancellation';

class StudentProjectEntry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ProjectNBOs: props.project,
            showProjectCancellationDialog: false
        };
    }

    render() {
        const { classes } = this.props;
        const { error, loadingInProgress, ProjectNBOs, showProjectCancellationDialog } = this.state;
        return (
            <div className={classes.root}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Grid className={classes.project} container spacing={1} justify='flex-start' alignItems='center'>
                            <Grid item style={{width: '80%'}}>
                                <Typography className={classes.heading}>
                                    { ProjectNBOs.getName() }
                                </Typography>
                                <Typography className={classes.secondaryHeading}>
                                    { ProjectNBOs.getCapacity() }
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button variant='text' size='small' color='secondary' alignItems='right'>
                                    <StudentProjectCancellation show={showProjectCancellationDialog}/>
                                </Button>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            { ProjectNBOs.getShortDescription() }
                        </Typography>
                    </AccordionDetails>
                </Accordion>
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
    },
});

export default withStyles(styles)(StudentProjectEntry);