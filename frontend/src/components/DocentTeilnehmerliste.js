import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { withRouter } from 'react-router-dom';
import { withStyles, Grid, Button, Paper, Typography} from '@material-ui/core';
import DocentTeilnehmerlisteGrading from './DocentTeilnehmerlisteGrading';


/* DocentTeilnehmerliste ist eine Component, welche in der DocentView.js gerendert wird.
   Hier werden die Studenten eines Projektes angezeigt, welche mithilfe der DocentTeilnehmerlisteGrading befüllt werden.
*/

class DocentTeilnehmerliste extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      participations: [],
      error: null,
      loadingProgress: false,
    } 
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
    this.getAllParticipations();

  }
  render() {
    const { classes } = this.props;
    const { participations} = this.state;
    return (
        <div>
        <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
                <Button style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} variant="contained">Teilnehmerliste</Button>
            </Grid>
            <Grid item>
            {
            participations.length > 0 ? 
              participations.map(participation =>
                <DocentTeilnehmerlisteGrading key={participation.getId()} participation={participation}/>)
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

export default withRouter(withStyles(styles)(DocentTeilnehmerliste));