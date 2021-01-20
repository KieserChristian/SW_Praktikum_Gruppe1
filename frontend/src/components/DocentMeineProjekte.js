import React from 'react';
import { withRouter } from 'react-router-dom';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { colors } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


class DocentMeineProjekte extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            error: null,
        }
    }

    getAllProjects = () => {
        var api = ProjectAdminAPI.getAPI()
        api.getAPI().getAllProjects().then(projectsNBOs => {
            this.setState({
                projects: projectsNBOs,
            })
        })
    }
   
    componentDidMount() {
        this.getAllProjects()
    }
    render() {
        
        const { classes } = this.props;
        const { projects } = this.state;

        return(
        <div className={classes.root}>
        <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
        <Grid Container spacing={2} direction = "column">
            <Grid>
                <Button style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} variant="contained">Meine Projekte</Button> 
            </Grid>
        </Grid>
        <TableRow>
                    <TableCell style={{width: '100%', paddingBottom: 0, paddingTop: 0, backgroundColor: colors.grey[100]}} colSpan={10}>
                            <Box margin={1}>
                                <Table size="small" aria-label="purchases">
                                    <TableHead style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} variant="contained">
                                        <TableRow>
                                            <TableCell>

                                            </TableCell>
                                                <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Projekt </TableCell>
                                                <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Projektyp</TableCell>
                                                <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">ECTS</TableCell>
                                                
                                        </TableRow>
        
                                    </TableHead>
                                        <TableBody style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}}>
                                        <Link to='/dozent/teilnehmerliste'> 
                                            <Button style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} color="primary" variant="contained">Teilnehmerliste</Button>

                                                    
                                                 
                                                   
                                                   
                                                   
                                                
                                        </Link>    
                                                                                    
                                            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Test</TableCell>
                                            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Test</TableCell>
                                            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Test</TableCell>
                                        </TableBody>
                                    </Table>
                                </Box>
                        </TableCell>
            </TableRow>
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

export default withRouter(withStyles(styles)(DocentMeineProjekte));