import { Paper,Grid,Button, Typography } from '@material-ui/core';
import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI'
import ProjectNBO from '../api/ProjectNBO';

class AdminView extends React.Component {

  constructor (props){
    super(props);
    this.state={
      projects:[]
    }
  }

  getProjectsByStateNew = () => {
    ProjectAdminAPI.getAPI().getProjectsByCurrentState("Neu")
    .then(projectBOs => {
      console.log(projectBOs);
      this.setState({
        projects: projectBOs,
        error: null,
        loadingInProgress: false
      })
    }).catch(e => {
      console.log(e);
    });
    this.setState({
    loadingInProgress: true,
    error: null
    });
  }

  componentDidMount() {
    /*this.getAllProjects();*/
    this.getProjectsByStateNew();
  }


  render(){
    const {projects}=this.state;
    return(
      <div> 
        <Paper>
          <Grid>
            <Button>
              Eingereichte Projekte
            </Button>
          </Grid>
          <Grid>
            <Typography>
              Hier können Sie eingereichte Projekte genehmigen oder ablehnen:
            </Typography>
            {
            projects.length > 0 ?
              projects.map (project => 
                <div>{project.getName()}</div>
                )
              :
              "Test"
            }
          </Grid>
        </Paper>
      </div>
    )
        


  }



}

export default AdminView;