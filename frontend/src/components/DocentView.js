import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { withRouter } from 'react-router-dom';
import { withStyles, Grid, Button, Paper, Typography} from '@material-ui/core';
import DocentMeineProjekte from './DocentMeineProjekte';


/* DocentTeilnehmerliste ist eine Component, welche in der DocentView.js gerendert wird.
   Hier werden die Studenten eines Projektes angezeigt, welche mithilfe der DocentTeilnehmerlisteGrading befüllt werden.
*/

class DocentView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      students: [],
      projects: [],
      error: null,
      loadingProgress: false,
    } 
  }

  getAllStudents = () => {
    ProjectAdminAPI.getAPI().getAllStudents()
    .then(studentNBOs => {
        this.setState({
        students: studentNBOs,
        loadingProgress: false,
        error: null
      });
    }).catch(e => {
      this.setState({
        students: [],
        loadingInProgress: false,
        error: e
      })
    });
    this.setState({
    loadingInProgress: true,
    error: null
    });
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
    const { projects, students} = this.state;
    return (
        <div>
        <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
                <Button style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} variant="contained">Meine Projekte</Button>
            </Grid>
            <Grid item>
            {
            projects.length > 0 ? 
              projects.map(project =>
                <DocentMeineProjekte key={project.getId()} project={project}/>)
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

export default withRouter(withStyles(styles)(DocentView));








