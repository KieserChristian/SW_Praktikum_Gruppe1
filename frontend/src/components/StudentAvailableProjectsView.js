import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { withRouter } from 'react-router-dom';
import { withStyles, Grid, Button, Paper, Typography} from '@material-ui/core';
import StudentAvailableProjectsEntry from './StudentAvailableProjectsEntry';

/* StudentAvailableProjectsView ist eine Component, welche in der StudentView.js gerendert wird.
   Hier werden die Verfügbaren Projekte eines Studenten angezeigt, welche mithilfe der StudentAvailableProjectsEntry befüllt werden.
*/

class StudentAvailableProjectsView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      error: null,
      loadingProgress: false,
    } 
  }

  getAllProjects = () => {
    ProjectAdminAPI.getAPI().getAllProjects()
    .then(projectNBOs => {
        this.setState({
        projects: projectNBOs,
        loadingProgress: false,
        error: null
      });
    }).catch(e => {
      this.setState({
        projects: [],
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
    this.getAllProjects();
  }

  render() {
    const { classes } = this.props;
    const { error, loadingInProgress, projects } = this.state;
    return (
        <div>
        <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
                <Button style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} variant="contained">Verfügbare Projekte</Button>
            </Grid>
            <Grid item>
            {
            projects.length > 0 ? 
              projects.map(project =>
                <StudentAvailableProjectsEntry key={project.getId()} project={project}/>)
                :
                null
            }
          </Grid>
        </Paper>
        </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
  }
});

export default withRouter(withStyles(styles)(StudentAvailableProjectsView));