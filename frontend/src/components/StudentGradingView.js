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

class StudentGradingView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            gradings: [],
            error: null,
            module: null,
        } 
    }

/*     getAllGradings = () => {
        ProjectAdminAPI.getAPI().getAllGradings().then(gradingBOs => {
            this.setState({
                gradings: gradingBOs,
            })
        })
    } */

/*     getModuleById = () => {
        ProjectAdminAPI.getAPI().getModuleById()
        .then(moduleNBO => {
            this.setState({
            module: moduleNBO,
            loadingProgress: false,
            error: null
          });
        }).catch(e => {
          this.setState({
            module: null,
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
        ProjectAdminAPI.getAPI().getAllProjects().then(projectNBOs => {
          this.setState({
            projects: projectNBOs,
            filteredProjects: [...projectNBOs],
            loadingInProgress: false,
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

    getProjectTypeById = () => {
        ProjectAdminAPI.getAPI().getProjectTypeById()
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
    } */
    
   
    componentDidMount() {
        //this.getAllGradings();
/*         this.getAllProjects();
        this.getProjectTypeById(); */
    }

    render() {
        const { classes } = this.props;
        const { gradings, module, projects, projectType } = this.state;

        return(
        <div className={classes.root}>
        <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
        <Grid Container spacing={2}>
            <Grid>
                <Button style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} variant="contained">Leistungsübersicht</Button>
            </Grid>
        </Grid>
        <TableRow>
                    <TableCell style={{width: '100%', paddingBottom: 0, paddingTop: 0, backgroundColor: colors.grey[100]}} colSpan={10}>
                            <Box margin={1}>
                                <Table size="small" aria-label="purchases">
                                    <TableHead >
                                        <TableRow>
                                            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Projekt</TableCell>
                                            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Modul</TableCell>
                                            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">EDV-Nummer</TableCell>
                                            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Semester</TableCell>
                                            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="center">Note</TableCell>
                                            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="center">ECTS</TableCell>
                                            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="center">SWS</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}}>
                                        {projects.length > 0 ? 
                                                projects.map(project =>
                                                    <TableRow>
                                                        <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="center">{project.getName()} </TableCell>
                                                        <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="center">Test</TableCell>
                                                        <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="center">Test</TableCell>
                                                        <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Test</TableCell>
                                                        <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Test</TableCell>
                                                        <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Test</TableCell>
                                                        <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align='center'>Test</TableCell>
                                                    </TableRow>)
                                                    :
                                                    null
                                        }
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

export default withRouter(withStyles(styles)(StudentGradingView));