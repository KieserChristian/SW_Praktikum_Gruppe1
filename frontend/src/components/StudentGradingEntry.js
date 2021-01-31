import React from 'react';
import { withRouter } from 'react-router-dom';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import {withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


class StudentGradingEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            project: this.props.propproject,
            grading: null,
            error: null,
            module: null,
            projectType: null,
        } 
    }

    getModuleById = () => {
        ProjectAdminAPI.getAPI().getModuleById(this.state.project.getModuleId())
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
   
    getProjectTypeById = () => {
        ProjectAdminAPI.getAPI().getProjectTypeById(this.state.project.getProjectTypeId())
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
    getGradingByParticipationId = (participationId) => {
        ProjectAdminAPI.getAPI().getGradingByParticipationId(participationId)
        .then(gradingAPI => {
            this.setState({
            grading: gradingAPI,
            loadingProgress: false,
            error: null
          });
        }).catch(e => {
          this.setState({
            grading: null,
            loadingInProgress: false,
            error: e
          })
        });
        this.setState({
        loadingInProgress: true,
        error: null
        });
    }
    
   getData = async() => {
        let participation = await this.getParticipationByProjectId()
        this.getGradingByParticipationId(participation.getId())
   }
    componentDidMount() {
        this.getData();
        this.getProjectTypeById();
        this.getModuleById();        
    }

    render() {
        const { classes } = this.props;
        const { gradings, module, project, projectType } = this.state;

        return(
        <div className={classes.root}>
        <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
        <TableRow>
            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="center">{project.getName()} </TableCell>
            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="center">{this.state.gradings}</TableCell>
            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="center">Test</TableCell>
            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Test</TableCell>
            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Test</TableCell>
            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Test</TableCell>
            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align='center'>Test</TableCell>
        </TableRow>)        
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

export default withRouter(withStyles(styles)(StudentGradingEntry));