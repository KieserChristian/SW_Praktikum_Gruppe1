import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles,  Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ProjectForm from './dialogs/ProjectForm';
import ProjectListEntry from './ProjectListEntry';



class ProjectList extends Component {

    constructor(props) {
        super(props);
  
        // console.log(props); //testen der props im Browser
        let expandedId = null;
  
        if (this.props.location.expandProject) {
            expandedId = this.props.location.expandProject.getId();
        }
  
        // Init an empty state
        this.state = {
            projects: [],
            filteredProjects: [],
            ProjectFilter: '', //Projectfilterby Dozent/personid/dozent_id? 
            error: null,
            loadingInProgress: false,
            expandedProjectId: expandedId,
            showDocentProjectForm: false
        };
    }
    
    //alle ProjectNBOS des Backend auslesen 

    getAllProjects = () => {
        ProjectAdminAPI.getAPI().getProjects()
            .then(projectNBOs =>
                this.setState({
                    projects: projectNBOs,
                    filteredProjects: [...projectNBOs],
                    loadingInProgress: false,
                    error:null
                })).catch(e =>
                    this.setState({
                        projects: [],
                        loadingInProgress: false,
                        error: e
                    })
                );

        //loading auf true setzen 
        this.setState({
            loadingInProgress: true,
            error: null
        });

    }

    componentDidMount() {
        this.getAllProjects();

    }

    /** 
     * Handles onExpandedStateChange events from the ProjectListEntry component. Toggels the expanded state of 
     * the ProjectListEntry of the given ProjectNBO.
     * 
     * @param {project} ProjectNBO of the ProjectListEntry to be toggeled
     */
    onExpandedStateChange = project => {
        // console.log(projectId);   //Zum testen im Browser slashes entfernen
        // Set expandend customer entry to null by default
        let newId = null;

        // If same customer entry is clicked, collapse it else expand a new one
        if (project.getId() !== this.state.expandedProjectId) {
            // Expand the customer entry with projectId
            newId = project.getId();
        }
        // console.log(newId);   //testen ob neue Id angelegt wurde
        this.setState({
            expandedProjectId: newId,
        });
    }

    /** 
     * Handles onCustomerDeleted events from the CustomerListEntry component
     * 
     * @param {customer} CustomerBO of the CustomerListEntry to be deleted
     */
    projectDeleted = project => {
        const newProjectList = this.state.projects.filter(projectFromState => projectFromState.getId() !== project.getId());
        this.setState({
            projects: newProjectList,
            filteredProjects: [...newProjectList],
            showProjectForm: false
        });
    }

    /** Handles the onClick event of the add project button */
    addProjectButtonClicked = event => {
        // Do not toggle the expanded state
        event.stopPropagation();
        //Show the ProjectForm
        this.setState({
            showProjectForm: true
        });
    }

    /** Handles the onClose event of the ProjectForm */
    projectFormClosed = project => {
        // customer is not null and therefore created
        if (project) {
            const newProjectList = [...this.state.projects, project];
            this.setState({
                projects: newProjectList,
                filteredProjects: [...newProjectList],
                showProjectForm: false
            });
        } else {
            this.setState({
            showProjectForm: false
            });
            this.setState({
                showProjectForm: false
            });
        }
    }

    /** Handels onChange events of the project filter text field */   
    filterFieldValueChange = event => {
        const value = event.target.value.toLowerCase();
        this.setState({
            filteredProjects:this.state.projects.filter(project => {
                let CurrentStateContainsValue = project.getCurrentState().toLowerCase().includes(value);
                let CapacityContainsValue = project.getCapacity().toLowerCase().includes(value);
                let External_PartnersContainsValue = project.getExternal_Partners().toLowerCase().includes(value);
                let ShortdescriptionContainsValue = project.getShortDescription().toLowerCase().includes(value);
                let Weekly_FlagContainsValue = project.getWeekly_Flag().toLowerCase().includes(value);
                let Bd_Before_Lecture_PeriodContainsValue = project.getBd_before_lecture_Periode().toLowerCase().includes(value);
                let Bd_In_Exam_PeriodContainsValue = project.getBd_In_Exam_Period().toLowerCase().includes(value);
                let Bd_In_Lecture_PeriodContainsValue = project.getBd_In_Lecture_Periode().toLowerCase().includes(value);
                let Bd_Preferred__In_Lecture_PeriodContainsValue = project.getBd_Preferred_In_Lecture_Periode().toLowerCase().includes(value);
                let special_room = project.getSpecial_Room().toLowerCase().includes(value);
                let Project_Type_Id = project.getProject_Type_Id().toLowerCase().includes(value);

                return CurrentStateContainsValue || CapacityContainsValue  ||  External_PartnersContainsValue ||
                ShortdescriptionContainsValue ||Weekly_FlagContainsValue || Bd_Before_Lecture_PeriodContainsValue ||Bd_In_Exam_PeriodContainsValue
                ||Bd_In_Lecture_PeriodContainsValue ||Bd_Preferred__In_Lecture_PeriodContainsValue || special_room || Project_Type_Id 

            }),
            projectFilter:value
        });
    }

    /** Handles the onClose event of the clear filter button */
    clearFilterFieldButtonClicked = () => {
    // Reset the filter
    this.setState({
        filteredProjects: [...this.state.projects],
        projectFilter: ''
    });
    }

    render() {
        const { classes } = this.props;
        const { filteredProjects, projectFilter, expandedProjectId, loadingProgress, error, showProjectForm } = this.state;
        return(
            <div className={classes.root}>
                <Grid className={classes.projectFilter} container spacing={1} justify='flex-start' alignItems='center'>
                    <Grid item>
                        <Typography>
                            Filter ProjectList by Name:
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            autoFocus
                            fullWidth
                            id="projectFilter"
                            type="text"
                            value={projectFilter}
                            onChange={this.filterFieldValueChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={this.clearFilterFieldButtonClicked}>
                                        <ClearIcon/>
                                    </IconButton>
                                </InputAdornment>,
                            }}
                        />
                </Grid>
                <Grid item xs/>
                <Grid item>
                    <Button variant='contained' color='primary' startIcon= {<AddIcon/>} onClick={this.addProjectButtonClicked}>
                        Add Project
                    </Button>
                </Grid>
            </Grid>
            {
                filteredProjects.map(project =>
                    <ProjectListEntry key={project.getId()} project={project} expandedState={expandedProjectId === project.getID()}
                        onExpandedStateChange={this.onExpandedStateChange}
                        onProjectDelete={this.projectDeleted}
                    />)
                                                
            }
            <LoadingProgress show={loadingProgress}/>
            <ContextErrorMessage error={error} contextErrorMsg ={"Liste der Projekte konnte nicht geladen werden"} onReload= {this.getAllProjects}/>
            <ProjectForm show = {showProjectForm} onClose = {this.projectFormClosed}/>
            </div>

        ); 

        

    }
}

/** Component specific styles */
const styles = theme => ({
    root: {
      width: '100%',
    },
    projectsFilter: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
    }
});
  
  /** PropTypes */
ProjectList.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** @ignore */
    location: PropTypes.object.isRequired,
}
  
export default withRouter(withStyles(styles)(ProjectList));




