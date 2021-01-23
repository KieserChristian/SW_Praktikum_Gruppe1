import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import LoadingProgress from './dialogs/LoadingProgress';
import { withStyles, Typography, Grid, Button } from '@material-ui/core';



class DocentView extends React.Component {
    
    constructor(props){
        super(props);

        
        this.state = {
            projects: [],
            grading: [],
            //filteredProjects: [],
            //projectFilter:"",
            error: null,
            loadingProgress: false
        }    


    }

      render() {
        const { classes } = this.props;
        const { error, loadingInProgress, projects, gradings } = this.state;
        return (
            <div className={classes.root}>
                <Grid className={classes.projects} container spacing={1} justify="flex-start" alignItems="center">
                    <Grid item>
                      <Typography>
                        
                      </Typography>
                       
                    </Grid>
                </Grid>
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










