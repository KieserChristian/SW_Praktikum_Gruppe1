import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { withRouter } from 'react-router-dom';
import { Button, Grid, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';

/* StudentNavigation ist eine Component, welche nach Auswahl des Buttons "Studenten" aus der LogIn.js gerendert wird.
   Hier wird eine Navigation angezeigt mit 2 Buttons.
   Mit Klick auf den Button "Projektübersicht" werden die beiden Components "StudentView.js" und "StudentAvailableProjectsView.js" gerendert.
   Mit Klick auf den Button "Leistungsübersicht" wird die Component "StudentGradingView" aufgerufen, in der die Benotung der 
   angemeldeten Projekte angezeigt wird.
*/

class StudentNavigation extends React.Component {

    constructor(props) {
        super(props);
        } 
    
    render() {

        return(
        <div >
        <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
        <Grid Container spacing={2}>
            <Grid item xs={12} sm={12} style={{paddingTop: 10, paddingBottom: 10,}} >
                <Link to='/student/projektübersicht'>
                    <Button style={{width: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} variant="contained">Projektübersicht</Button>
                </Link>
                <Link to='/student/leistungsübersicht'>
                    <Button style={{width: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} variant="contained">Leistungsübersicht</Button>
                </Link>
            </Grid>
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

export default withRouter(withStyles(styles)(StudentNavigation));