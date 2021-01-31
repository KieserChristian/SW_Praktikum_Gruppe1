import React from 'react';
import { withRouter } from 'react-router-dom';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import {withStyles } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class StudentGradingEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      project: props.project,
      module: null,
      projectType: null,
      error: null
    } 
  }

  getModuleById = () => {
    ProjectAdminAPI.getAPI().getModuleById(this.state.project.getModuleId())
    .then(moduleNBO => {
      this.setState({
        module: moduleNBO
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

  getProjectTypeById = () => {
    ProjectAdminAPI.getAPI().getProjectTypeById(this.state.project.getProjectTypeId())
    .then(projectTypeNBO => {
        this.setState({
        projectType: projectTypeNBO,
        loadingInProgress: false,
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
    this.getModuleById();
    this.getProjectTypeById();       
  }

  render() {
    const { classes } = this.props;
    const { module, project, projectType } = this.state;
    return (
      <TableRow>
        <TableCell style={{width: '14,3%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">
          {project.getName()} 
        </TableCell>
        <TableCell style={{width: '14,3%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">
          { module ?
            module.getName()
            :
            'k.A.'}
        </TableCell>
        <TableCell style={{width: '14,3%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">
          { module ?
            module.getEdvNumber()
            :
            'k.A.'}
        </TableCell>
        <TableCell style={{width: '14,3%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">
          SemesterTest
        </TableCell>
        <TableCell style={{width: '14,3', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">
          NoteTest
        </TableCell>
        <TableCell style={{width: '14,3%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">
        { projectType ?
            projectType.getNumberEcts()
            :
            'k.A.'}
        </TableCell>
        <TableCell style={{width: '14,3%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align='left'>
        { projectType ?
            projectType.getNumberSws()
            :
            'k.A.'}  
        </TableCell>
      </TableRow>
    );
  }
}

const styles = theme => ({
    root: {
      width: '100%',
    }
  });

export default withRouter(withStyles(styles)(StudentGradingEntry));