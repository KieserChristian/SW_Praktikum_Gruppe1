import React from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
//import LoadingProgress from './dialogs/LoadingProgress';
import { withStyles, Typography, Grid } from '@material-ui/core';
import ProjectNBO from '../api/ProjectNBO'
import PersonNBO from '../api/PersonNBO';
import DozentProjectListEntry from "./DozentProjectListEntry"
import DocentView from "./DocentView"


class DozentProjectList extends React.Component  {

    constructor(props) {
      super(props);
  
      this.state = {
        projects: [],
        person: new PersonNBO("Daniel", "Weinert", "Dozent","googleID", "Mail"),
        //filteredProjects: [],
        //projectFilter: '',
        error: null,
        //loadingProgress: false
      } 
    }
  
    getAllProjects = () => {
       ProjectAdminAPI.getAPI().getAllProjectsAPI()
        .then(projectNBOs =>
          this.setState({
            projects: projectNBOs,
            //filteredProjects: [...projectNBOs],
            //loadingProgress: false,
            //error: null
          }))
          /*
          .catch(e =>
            this.setState({
              projects: [],
              //loadingInProgress: false,
              error: e
            })
          );
      this.setState({
        //loadingInProgress: true,
        error: null
      });
      */
    }
  
    componentDidMount() {
      this.getAllProjects()
      /* fetch('http://localhost:5000/project/projects').then(response => {
      return response.json()}).then((responseJSON) => {
        let ProjectNBOs = ProjectNBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(ProjectNBOs);
        })
      }).then(projectobject => {
        this.setState({
          projects: projectobject
        })
      }) */
    }

    render() {
        const { classes } = this.props;
        const {  projects } = this.state;
        return (
            <div className={classes.root}>
            <Paper>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                            DozentProjectList
                        <TableRow>
                            <TableCell> ID</TableCell>
                            <TableCell align='center'>Projekt</TableCell>
                            <TableCell align='center' >Capacity</TableCell>
                            <TableCell align='center' >Projecttyp</TableCell>
                            <TableCell align='center' >State</TableCell>
                            <TableCell align='center' >Bearbeiten</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map(project => <DozentProjectListEntry key={project.getID()} project={project} reloadProjects={this.getAllProjects}/>)}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
}
}
const styles = theme => ({
    root: {
      width: '100%',
    }
  });
export default withRouter(withStyles(styles) (DozentProjectList));