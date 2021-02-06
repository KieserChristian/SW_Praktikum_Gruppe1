import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { withRouter } from 'react-router-dom';
import { withStyles, Grid, Button, Paper, Typography, InputAdornment, IconButton, TextField} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import StudentAvailableProjectsEntry from './StudentAvailableProjectsEntry';

/* StudentAvailableProjectsView ist eine Component, welche in der StudentView.js gerendert wird.
   Hier werden die Verfügbaren Projekte eines Studenten angezeigt, welche mithilfe der StudentAvailableProjectsEntry befüllt werden.
*/

class StudentAvailableProjectsView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      filteredProjects: [],
      projectFilter: '',
      error: null,
      loadingProgress: false,
      currentUserEmail: props.currentUserEmail
    } 
  }

  getAvailableProjectsOfStudent = async() => {
    //let student = await ProjectAdminAPI.getAPI().getStudentByGoogleId(this.props.currentUserEmail)
    //console.log(student)
    //console.log(student[0].getId())
    //console.log(ProjectAdminAPI.getAPI().getAvailableProjectsOfStudent(student[0].getId()))
    ProjectAdminAPI.getAPI().getAvailableProjectsOfStudent(5)
    .then(projectNBOs => {
      //console.log(projectNBOs)
        this.setState({
        projects: projectNBOs,
        filteredProjects: [...projectNBOs],
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

  componentDidMount = () => {
    this.getAvailableProjectsOfStudent();
  }

  filterProjects = event => {
    const searchterm = event.target.value.toLowerCase();
    this.setState({
      filteredProjects: this.state.projects.filter(project => {
        let projectNameContainsValue = project.getName().toLowerCase().includes(searchterm);
        return projectNameContainsValue
      }),
      projectFilter: searchterm
    })
  }

  clearProjectFilter = () => {
    this.setState({
      filteredProjects: [...this.state.projects],
      projectFilter: ''
    })
  }

  render() {
    const { classes } = this.props;
    const { error, loadingInProgress, projects, projectFilter, filteredProjects } = this.state;
    return (
        <div>
        <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
                <Button style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} variant="contained">
                  Verfügbare Projekte
                </Button>
            </Grid>
            <Grid style={{paddingTop: 15}}>
              <Typography>
                Verfügbare Projekte durchsuchen nach:
              </Typography>
              <TextField 
                autoFocus type='text' 
                value={projectFilter} 
                onChange={this.filterProjects}
                InputProps={{
                  endAdornment: <InputAdornment position='end'>
                    <IconButton onClick={this.clearProjectFilter}>
                      <HighlightOffIcon/>
                    </IconButton>
                  </InputAdornment>
                }}
              />
            </Grid>
            <Grid style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}}>
              <Typography>
                Hier können Sie sich für Projekte anmelden:
              </Typography>
              {
              projects.length > 0 ? 
                filteredProjects.map(project =>
                  <StudentAvailableProjectsEntry key={project.getId()} project={project}/>)
                  :
                  <Typography>Es stehen keine Projekte zur Anmeldung zur Verfügung.</Typography>
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