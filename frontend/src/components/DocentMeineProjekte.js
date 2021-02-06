import React from 'react';
import { Button, Grid, Typography, withStyles} from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import ProjectAdminAPI from '../api/ProjectAdminAPI';




class DocentMeineProjekte extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projectNBO: props.project,
            projectType: null,
        };
    }



    getProjectTypeById = () => {
        ProjectAdminAPI.getAPI().getProjectTypeById(this.state.projectNBO.getProjectTypeId())
        .then(projectTypeNBO => {
            this.setState({
            projectType: projectTypeNBO,
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



    componentDidMount() {
    
    }




    render() {
        const { classes } = this.props;
        const { error, projectNBO, projectType} = this.state;
        return (
            <div className={classes.root}>
                        <Grid className={classes.project} container spacing={1} justify='space-between' alignItems='center'>

                            <Grid item style={{marginBottom: 10, marginTop: 10}}>
                                <Typography className={classes.heading} >
                                    { projectNBO.getName() }
                                    
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