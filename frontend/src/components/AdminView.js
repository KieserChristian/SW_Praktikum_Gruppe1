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

  getAllProjects = () => {
    ProjectAdminAPI.getAPI().getAllProjects().then(NewProjectNBOs =>
      this.setState({
        projects:NewProjectNBOs
      })
    );
  }

  componentDidMount() {
    this.getAllProjects();
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