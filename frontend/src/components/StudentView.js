import React from 'react';
import { withRouter } from 'react-router-dom';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import LoadingProgress from './dialogs/LoadingProgress';
import { withStyles, Typography, Grid, Button } from '@material-ui/core';

class StudentView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      //filteredProjects: [],
      //projectFilter: '',
      error: null,
      loadingProgress: false
    } 
  }

  getAllProjects = () => {
    ProjectAdminAPI.getAPI().getAllProjects().then(projectNBOs => {
      this.setState({
        projects: projectNBOs,
        //filteredProjects: [...projectNBOs],
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
      <div className={classes.root}>
        <Grid className={classes.projects} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
            Hier können Sie Projekte an- und abmelden:
            </Typography>
            {
            projects.length > 0 ? 
              projects.map(project =>
                <div>
                <Button variant='contained'>{project.getName()} {project.getCapacity()}</Button>
                <Button variant="outlined" color="primary">Anmelden</Button>
                <Button variant="outlined" color="secondary">Abmelden</Button>
                </div>
                )
                :
                null
            }
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

export default withRouter(withStyles(styles)(StudentView));