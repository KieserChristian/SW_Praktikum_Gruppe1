import { Paper } from '@material-ui/core';
import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI'
import ProjectNBO from '../api/ProjectNBO';
import InfoIcon from '@material-ui/icons/Info';
import AdminViewEntry from './AdminViewEntry'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { withStyles, Button, List, ListItem, ListItemSecondaryAction, Typography, Input, Grid, InputAdornment } from '@material-ui/core';

class AdminSwitchDocentView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      docents: [],
      filtereddocents: [],
      docentFilter: '',
    }
  }

  getAllDocents = () => {
    ProjectAdminAPI.getAPI().getRoleByPerson("Genehmigt").then(projectBOs =>
      this.setState({
        projects: projectBOs,
        filteredProjects: [...projectBOs],
      })
    );
  }

  componentDidMount() {
    this.getProjectsByStateAccepted();
  }

  filterProjects = event => {
    const searchterm = event.target.value.toLowerCase();
    this.setState({
      filteredProjects: this.state.projects.filter(projects => {
        let projectNameContainsValue = projects.getName().toLowerCase().includes(searchterm);
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

  removeProject = (projectId) => {
    console.log(this.state.filteredProjects[0])
    console.log(projectId)
    let newProjects = this.state.filteredProjects.filter(project => project.getId() !== projectId)
    console.log(newProjects.length)
    this.setState({
      filteredProjects: this.state.filteredProjects.filter(project => project.getId() !== projectId)
    })
  }

  render() {
    const { projects, projectFilter, filteredProjects } = this.state;
    return (
      <div>
        <Paper style={{ paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15 }} elevation={0}>
          <Grid container spacing={1} justify='flex-start' alignItems='center'>
            <Button style={{ width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10 }} variant="contained">
              Alle genehmigten Projekte
            </Button>
          </Grid>
          <Grid style={{ width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10 }}>
            <TextField
              autoFocus type='text'
              value={projectFilter}
              onChange={this.filterProjects}
              InputProps={{
                endAdornment: <InputAdornment position='end'>
                  <IconButton onClick={this.clearProjectFilter}>
                    <HighlightOffIcon />
                  </IconButton>
                </InputAdornment>
              }}
            />
          </Grid>
          <Grid style={{ width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10 }}>
            <Typography>
              Hier können Sie alle Projekte einsehen oder bearbeiten:
            </Typography>
            {
              projects.length > 0 ?
                filteredProjects.map(project =>
                  <AdminViewEntry currentUserEmail={this.props.currentUserEmail} key={project.getId()} project={project} onDelete={() => this.removeProject(project.getId())} />)

                :
                "Test"
            }
          </Grid>
        </Paper>
      </div>
    )



  }



}

export default AdminView;