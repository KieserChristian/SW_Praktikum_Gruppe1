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
            StudentNBOs: props.student,
            ProjectNBOs: props.project,
            numberEcts: null,
            projectType: null,
        };
    }


    getParticipationsOfStudent = () => {
        ProjectAdminAPI.getAPI().getParticipationsOfStudent(this.state.ParticipationBOs.getId())
        .then(participationsOfStudentAPI => {
            this.setState({
            participationsOfStudent: participationsOfStudentAPI,
            loadingProgress: false,
            error: null
          });
        }).catch(e => {
          this.setState({
            participationsOfStudent: null,
            loadingInProgress: false,
            error: e
          })
        });
        this.setState({
        loadingInProgress: true,
        error: null
        });
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

    getNumberEctsByProject = () => {
        ProjectAdminAPI.getAPI().getNumberEctsByProject(this.state.ProjectNBOs.getId())
        .then(numberEctsAPI => {
            this.setState({
            numberEcts: numberEctsAPI,
            loadingProgress: false,
            error: null
          });
        }).catch(e => {
          this.setState({
            numberEcts: null,
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
        this.getNumberEctsByProject();
        this.getProjectTypeByProject();
    }

    render() {
        const { classes } = this.props;
        const { error, ParticipationBOs, participationsOfStudent, numberEcts, ProjectNBOs, StudentNBOs, projectType} = this.state;
        return (
            <div className={classes.root}>
                        <Grid className={classes.project} container spacing={1} justify='space-between' alignItems='center'>

                            <Grid item style={{marginBottom: 10, marginTop: 10}}>
                                <Typography className={classes.heading} >
                                    { ProjectNBOs.getName() }
                                    
                                </Typography>
                                <Typography className={classes.heading} >
                                    {numberEcts?
                                        <b>{numberEcts.getNumberEcts()}</b> 
                                    :"Test(5ECTS)"}
                                </Typography>
                                <Typography>
                                    {projectType?
                                        <b>{projectType.getName()}</b> 
                                    :"Test(ProjektTyp)"}
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
