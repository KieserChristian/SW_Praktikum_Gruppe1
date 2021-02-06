import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { withRouter } from 'react-router-dom';
import { withStyles, Grid, Button, Paper, Typography, InputAdornment, IconButton, TextField} from '@material-ui/core';
import DocentMeineProjekte from './DocentMeineProjekte';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DocentProjectEntry from './DocentProjectEntry';


/* DocentTeilnehmerliste ist eine Component, welche in der DocentView.js gerendert wird.
   Hier werden die Studenten eines Projektes angezeigt, welche mithilfe der DocentTeilnehmerlisteGrading befüllt werden.
*/

class DocentView extends React.Component {

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


  /**getProjectsByPerson = async() => {
    //let person = await ProjectAdminAPI.getAPI().getPersonByGoogleId(this.props.currentUserEmail)
    //console.log(person)
    //console.log(person[0].getId())
    //console.log(ProjectAdminAPI.getAPI().getProjectsByPerson(person[0].getId()))
    ProjectAdminAPI.getAPI().getProjectsByPerson(1)
    .then(projectNBOs => {
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
  */

  

  getAllProjects = () => {
    ProjectAdminAPI.getAPI().getAllProjects()
    .then(projectNBOs => {
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
    const { projects, projectFilter, filteredProjects } = this.state;
    return (
        <div>
        <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
                <Button style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} variant="contained">Meine Projekte</Button>
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
            <Grid item>
            {
             projects.length > 0 ? 
              filteredProjects.map(project =>
               <DocentProjectEntry key={project.getId()} project={project}/>)
               :
               <Typography>Sie haben keine Projekte angelegt</Typography>
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

export default withRouter(withStyles(styles)(DocentView));








