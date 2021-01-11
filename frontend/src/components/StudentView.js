import React from 'react';
import { withRouter } from 'react-router-dom';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
//import LoadingProgress from './dialogs/LoadingProgress';
import { withStyles, Typography, Grid } from '@material-ui/core';
import ProjectNBO from '../api/ProjectNBO'

class StudentView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      //filteredProjects: [],
      //projectFilter: '',
      error: null,
      //loadingProgress: false
    } 
  }

  getAllProjects = () => {
     ProjectAdminAPI.getAPI().getAllProjectsAPI()
      .then(projectNBOs =>
        this.setState({
          projects: projectNBOs,
          //filteredProjects: [...projectNBOs],
          //loadingProgress: false,
          //error: null
        }))
        /*
        .catch(e =>
          this.setState({
            projects: [],
            //loadingInProgress: false,
            error: e
          })
        );
    this.setState({
      //loadingInProgress: true,
      error: null
    });
    */
  }

  componentDidMount() {
    this.getAllProjects()
    /* fetch('http://localhost:5000/project/projects').then(response => {
    return response.json()}).then((responseJSON) => {
      let ProjectNBOs = ProjectNBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(ProjectNBOs);
      })
    }).then(projectobject => {
      this.setState({
        projects: projectobject
      })
    }) */
  }
  

  render() {
    const { classes } = this.props;
    const { error, loadingInProgress, projects } = this.state;
    return (
      <div className={classes.root}>
        <Grid className={classes.projects} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
              Projekte für Studenten:
            </Typography>
            {projects.length > 0 ? 
              projects.map(project =>
                <div>
                <div>{project.getName()}</div>
                <div>{project.getCapacity()}</div>
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