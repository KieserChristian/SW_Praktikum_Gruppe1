import React from 'react';
import { withStyles, Button, Grid } from '@material-ui/core';

class StudentView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      projects: [],
    } 
  }

  render() {
    const { classes } = this.props;
    const { projects } = this.state;
  
    return (
      <div className={classes.root}>
        <Grid className={classes.studentProjects}container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Button variant='contained'>Building a Data Cube</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
  }
});

export default withStyles(styles)(StudentView);