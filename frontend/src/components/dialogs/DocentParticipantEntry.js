import React from 'react';
import { withStyles, Grid, Typography, Button } from '@material-ui/core';


/**
* DocentParticipationEntry liefert den Input für die Bewertung eines Studenten, beim anklicken vom Bewerten-Button 
in einer Teilnehmerzeile in dem Dozentreiter.
*/


class DocentParticipantEntry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            student: props.student
        }
    }

    render() {
        const { classes } = this.props;
        const { student } = this.state;
        return (
            <div className={classes.root}>
                <Grid container spacing={1} xs={12}>
                    <Grid item style={{marginBottom: 10, marginTop: 10}} xs={6}>
                        <Typography className={classes.heading} >
                            <b>{student.getName()}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#697bdb'}}>
                            Bewerten
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
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

export default withStyles(styles)(DocentParticipantEntry);