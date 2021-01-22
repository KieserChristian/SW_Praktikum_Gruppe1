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
          project_Id:[],
          participation: [],
          error: null,
          loadingProgress: false,
        };
        
    }
    
    getProjectById = () => {
        ProjectAdminAPI.getAPI().getProjectById().then(projectNBOs => {
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
        this.getProjectById();
    }

    render(){
        const { classes } = this.props;
        const{projects, error, project_id} = this.state;

        
        return(
            <div>
                <Paper>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Name</TableCell>   
                                <TableCell align='center'>ECTS</TableCell>
                                <TableCell align='center' >Projekttyp</TableCell>                                
</TableRow>
                        </TableHead>
                        <TableBody>
                            <Grid item>
                            <TableCell align='center' ></TableCell>
                                {projects.length > 0 ?
                                    projects.map(project =>
                                        <DocentMeineProjekteEntry key={projects.getId()} project={project} />)
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