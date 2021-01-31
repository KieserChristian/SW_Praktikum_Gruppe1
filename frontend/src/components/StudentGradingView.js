import React from 'react';
import { withRouter } from 'react-router-dom';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { Button, Grid, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import StudentGradingEntry from './StudentGradingEntry';

class StudentGradingView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      error: null,
      currentUserEmail: props.currentUserEmail
    } 
  }   
    
  getRegisteredProjectsOfStudent = async() => {
    let student = await ProjectAdminAPI.getAPI().getStudentByGoogleId(this.props.currentUserEmail)
    //console.log(student)
    console.log(ProjectAdminAPI.getAPI().getRegisteredProjectsOfStudent(student[0].getId()))
    ProjectAdminAPI.getAPI().getRegisteredProjectsOfStudent(student[0].getId())
    .then(projectNBOs => {
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
  
  componentDidMount() {
    this.getRegisteredProjectsOfStudent();
  }

  render() {
    const {classes} = this.props;
    const {projects} = this.state;
    return(
      <div>
        <Grid Container spacing={2}>
          <Grid>
              <Button style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} variant="contained">Leistungsübersicht</Button>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="purchases">
            <TableHead style={{backgroundColor: '#697bdb'}}>
              <TableRow>
                <TableCell style={{color: 'white', width: '14,3%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Projekt</TableCell>
                <TableCell style={{color: 'white', width: '14,3%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Modul</TableCell>
                <TableCell style={{color: 'white', width: '14,3%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">EDV</TableCell>
                <TableCell style={{color: 'white', width: '14,3%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Semester</TableCell>
                <TableCell style={{color: 'white', width: '14,3%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Note</TableCell>
                <TableCell style={{color: 'white', width: '14,3%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">ECTS</TableCell>
                <TableCell style={{color: 'white', width: '14,3%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">SWS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}}>
              { projects.length > 0 ? 
                projects.map(project =>
                  <StudentGradingEntry key={project.getId()} project={project}/>)
                :
                null
              }           
            </TableBody>
          </Table>
        </TableContainer>
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