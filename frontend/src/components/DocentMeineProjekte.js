import React from 'react';
import { Button, Grid, Typography, withStyles} from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import DocentView from './DocentView';
import ProjectAdminAPI from '../api/ProjectAdminAPI';



/*  DocentTeilnehmerlisteGrading.js wird aus der DocentTeilnehmerlisteGradingView.js aufgerufen, um den angezeigten
    Student zu benoten.
*/

class DocentMeineProjekte extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            PersonNBOs: props.person,
            ProjectNBOs: props.project,
            numberEcts: null,
            projectType: null,
        };
    }



    getProjectTypeByProject = () => {
        ProjectAdminAPI.getAPI().getProjectTypeByProject(this.state.ProjectNBOs.getId())
        .then(projectTypeAPI => {
            this.setState({
            projectType: projectTypeAPI,
            loadingProgress: false,
            error: null
          });
        }).catch(e => {
          this.setState({
            projectType: null,
            loadingInProgress: false,
            error: e
          })
        });
        this.setState({
        loadingInProgress: true,
        error: null
        });
    }




    render() {
        const { classes } = this.props;
        const { error, PersonNBOs, numberEcts, ProjectNBOs, StudentNBOs, projectType} = this.state;
        return (
            <div className={classes.root}>
                        <Grid className={classes.project} container spacing={1} justify='space-between' alignItems='center'>

                            <Grid item style={{marginBottom: 10, marginTop: 10}}>
                                <Typography className={classes.heading} >
                                    { ProjectNBOs.getName() }
                                    
                                </Typography>
                               
                            </Grid>
                            <Grid item>
                            <React.Fragment>
                                
                                   
                                <Link to='/dozent/docentview'>
                                    <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#4caf50'}}>
                                        Teilnehmerliste
                                    </Button>
                                </Link>
                             
                            </React.Fragment>
                            </Grid>

                        </Grid>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
});


export default withStyles(styles)(DocentMeineProjekte);