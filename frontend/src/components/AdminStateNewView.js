import { Paper,Grid,Button, Typography } from '@material-ui/core';
import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI'
import ProjectNBO from '../api/ProjectNBO';

class AdminStateNewView extends React.Component {

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
        <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
          <Grid container spacing={1} justify='flex-start' alignItems='center'>
            <Button style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} variant="contained">
              Eingereichte Projekte
            </Button>
          </Grid>
          <Grid style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}}>
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

export default AdminStateNewView;