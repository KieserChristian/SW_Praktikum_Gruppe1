import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { withRouter } from 'react-router-dom';
import { withStyles, Grid, Button, Paper, Typography, InputAdornment, IconButton, TextField} from '@material-ui/core';
import DocentMeineProjekte from './DocentMeineProjekte';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DocentProjectEntry from './DocentProjectEntry';


/* DocentView.js wird nach der Auswahl der Projektübersicht der Componente  DocentNavigation aufgerufen.
   Hier werden die Projekte des angemeldeten Dozenten angezeigt.Die Befüllung erfolgt über die DocentProjectEntry, welche
   im render über eine map Funktion die projecte als Array zurückgibt.
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

  
  /**
   * Liest die einzelnen Projekte eines Dozenten aus. Das async keyword vor der Deklaration der Funktion
   * lässt einen Promise ausgeben und nicht direkt einen Wert (value). Das await Keyword pausiert
   * den Code bis der Promise erfüllt wurde und gibt dann eine Wert aus. consol.log wird genutzt um bei Errors im 
   * Browser eine Überprüfung der Übermittelten Daten durchzuführen. Über die API ProjectAdminAPI erfolgt die
   *  Kommunikation Application und Database layer. 
   */

  getProjectsOfDocent = async() => {
    let person = await ProjectAdminAPI.getAPI().getPersonByGoogleId(this.props.currentUserEmail)
    console.log(person)
    console.log(person[0].getId())
    console.log(ProjectAdminAPI.getAPI().getProjectsByPerson(person[0].getId()))
    ProjectAdminAPI.getAPI().getProjectsByPerson(person[0].getId())
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
 
  /* getAllProjects = () => {
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
  } */
  /**Lifecycle Methode, die aufgerufen wird wenn die Komponente in den Browser eingefügt wird */
  componentDidMount = () => {
    //this.getAllProjects();
    this.getProjectsOfDocent();

  }

  /**
   * 
   * Filtert die aufgelistetetn Elemente nach ihren mitgegebenen Namen
   */
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
  /**
   * Leeren des Filters
   */
  clearProjectFilter = () => {
    this.setState({
      filteredProjects: [...this.state.projects],
      projectFilter: ''
    })
  }
    /**
   * Rendermethode der Projektübersicht eines Dozenten und den Projektfilter
   */
  render() {
    const { classes } = this.props;
    const { projects, projectFilter, filteredProjects } = this.state;
    console.log(this.props.location.myProp)
    return (
      <div>
        <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
                <Button style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} variant="contained">Meine Projekte</Button>
            </Grid>
            <Grid style={{paddingTop: 15}}>
              <Typography>
                Meine Projekte durchsuchen nach:
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
               <Typography>Sie bieten derzeit noch keine Projekte an.</Typography>
            }
            </Grid>
        </Paper>
      </div>
    );
  }
}
/** Styling der Component*/
const styles = theme => ({
  root: {
    width: '100%',
  }
});

export default withRouter(withStyles(styles)(DocentView));








