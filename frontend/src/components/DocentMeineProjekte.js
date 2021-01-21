import React from 'react';
import { withRouter } from 'react-router-dom';
import ProjectAdminAPI from '../api/ProjectAdminAPI';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import { TableCell, TableRow, TableHead, TableBody} from '@material-ui/core'
import DocentMeineProjekteEntry from "./DocentMeineProjekteEntry"
import { withStyles, Grid, Button, Typography, Select} from '@material-ui/core';
import PropTypes from 'prop-types';





class DocentMeineProjekte extends React.Component {

   
 
    constructor(props) {
        super(props);
    
        this.state = {
          projects: [],
          participation: [],
          error: null,
          loadingProgress: false,
        };
        
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

    render(){
        const { classes } = this.props;
        const{projects, error} = this.state;

        
        return(
            <div>
                <Paper>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                               
                                <TableCell align='center'>Id</TableCell>
                                <TableCell align='center'>Name</TableCell>
                                <TableCell align='center' >Capacity</TableCell>                                
                                <TableCell align='center' >State</TableCell>
                                <TableCell align='center' >Projecttyp</TableCell>
                                <TableCell align='center' >Bearbeiten</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        <Grid item>

                            {projects.length > 0 ?
                                projects.map(project =>
                                    <DocentMeineProjekteEntry key={project.getProjectId()} project={project} />)
                                    : 
                                    null
                            }

                        </Grid>
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}
        
 

                                        
export default withRouter(DocentMeineProjekte);