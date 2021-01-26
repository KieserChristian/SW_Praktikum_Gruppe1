import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { withRouter, Link } from 'react-router-dom';
import { withStyles, Grid, Button, Paper, Typography} from '@material-ui/core';
import DocentTeilnehmerlisteGrading from './DocentTeilnehmerlisteGrading';


/* DocentTeilnehmerliste ist eine Component, welche in der DocentView.js gerendert wird.
   Hier werden die Studenten eines Projektes angezeigt, welche mithilfe der DocentTeilnehmerlisteGrading befüllt werden.
*/

class DocentTeilnehmerliste extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      students: [],
      projects: [],
      participations: [],
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

  getAllParticipations = () => {
    ProjectAdminAPI.getAPI().getAllParticipations()
    .then(participationBOs => {
          this.setState({
          participations: participationBOs,
          loadingProgress: false,
          error: null
        });

    }).catch(e => {
      this.setState({
      participations: [],
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
    this.getAllStudents();

  }
  render() {
    const { classes } = this.props;
    const { participations, students} = this.state;
    return (
        <div>
        <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
                <Button style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} variant="contained">Teilnehmerliste</Button>
            </Grid>
            <Grid item>
            {
            students.length > 0 ? 
              students.map(student =>
                <DocentTeilnehmerlisteGrading key={student.getId()} student={student}/>)
                :
                null
            }

            </Grid>

          
        </Paper>
            <Link to='/dozent/bewertungsliste'>
                <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#4caf50'}}>
                         Bewertungsliste generieren
                 </Button>
            </Link>
        </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
  }
});

export default withRouter(withStyles(styles)(DocentTeilnehmerliste));