import React from 'react';
import { withRouter } from 'react-router-dom';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import LoadingProgress from './dialogs/LoadingProgress';
import { withStyles, Typography, Grid, TextField, InputAdornment, IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import StudentProjectEntry from './StudentProjectEntry';

class StudentView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      filteredProjects: [],
      projectFilter: '',
      error: null,
      loadingInProgress: false
    } 
  }

  getAllProjects = () => {
    ProjectAdminAPI.getAPI().getAllProjects().then(projectNBOs => {
      this.setState({
        projects: projectNBOs,
        filteredProjects: [...projectNBOs],
        loadingInProgress: false,
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
    const { error, loadingInProgress, projectFilter, filteredProjects } = this.state;
    return (
      <div className={classes.root}>
        <Grid container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
              Meine Projekte durchsuchen nach:
            </Typography>
            <TextField 
              autoFocus fullWidth type='text' 
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
          <Grid item style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}}>
            <Typography>
              Hier können Sie sich von angemeldeten Projekten abmelden:
            </Typography>
            { 
              filteredProjects.map(project =>
                <StudentProjectEntry key={project.getId()} project={project}/>)
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