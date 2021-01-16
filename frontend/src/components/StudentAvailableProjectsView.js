import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { withRouter } from 'react-router-dom';


import { withStyles, Grid} from '@material-ui/core';

/* StudenAvailableProjectsView ist eine Component, welche in der StudentView.js gerendert wird.
   Hier werden die Verfügbaren Projekte eines Studenten angezeigt, welche mithilfe der StudentProjectRegistration befüllt werden.
*/

class StudenAvailableProjectsView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      error: null,
    } 
  }

  render() {
    const { error } = this.state;
    return (
      <div>
        <Grid container spacing={1} justify='flex-start' alignItems='center'>
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

export default withRouter(withStyles(styles)(StudenAvailableProjectsView));