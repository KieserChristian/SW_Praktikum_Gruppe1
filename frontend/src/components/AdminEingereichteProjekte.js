import React from 'react';
import { withRouter } from 'react-router-dom';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import LoadingProgress from './dialogs/LoadingProgress';
import { withStyles, Paper, Button, Typography, Grid, TextField, InputAdornment, IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AdminEingereichteProjecteEntry from './AdminEingereichteProjecteEntry';

class AdminEingereichteProjekte extends React.Component {

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
    const { error, loadingInProgress, projects, projectFilter, filteredProjects } = this.state;
    return (
      <div className={classes.root}>
      <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
        <Grid container spacing={1} justify='flex-start' alignItems='center'>
          <Button style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} variant="contained">
            Eingereichte Projekte
          </Button>
        </Grid>
        <Grid style={{paddingTop: 15}}>
          <Typography>
            Eingereichte Projekte durchsuchen nach:
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
            Eingereichte Projekte Ablehnen oder Annehmen:
          </Typography>
          { 
          projects.length > 0 ?
            filteredProjects.map(project =>
              <AdminEingereichteProjecteEntry key={project.getId()} project={project}/>)
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

export default withRouter(withStyles(styles)(AdminEingereichteProjekte));