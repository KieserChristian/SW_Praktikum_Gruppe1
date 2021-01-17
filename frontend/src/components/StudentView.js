import React from 'react';
import { withRouter } from 'react-router-dom';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import LoadingProgress from './dialogs/LoadingProgress';
import { withStyles, Typography, Grid } from '@material-ui/core';
import StudentProjectEntry from './StudentProjectEntry';

class StudentView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      //filteredProjects: [],
      //projectFilter: '',
      error: null,
      loadingProgress: false
    } 
  }

  getAllProjects = () => {
    ProjectAdminAPI.getAPI().getAllProjects().then(projectNBOs => {
      this.setState({
        projects: projectNBOs,
        //filteredProjects: [...projectNBOs],
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

  render() {
    const { classes } = this.props;
    const { error, loadingInProgress, projects } = this.state;
    return (
      <div className={classes.root}>
        <Grid container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}}>
            <Typography>
            Hier können Sie sich von angemeldeten Projekten abmelden:
            </Typography>
            {
            projects.length > 0 ? 
              projects.map(project =>
                <StudentProjectEntry key={project.getId()} project={project}/>)
                :
                null
            }
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

export default withRouter(withStyles(styles)(StudentView));