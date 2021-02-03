import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ProjectAdminAPI from '../../api/ProjectAdminAPI';
import ProjectNBO from  '../../api/ProjectNBO';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';


class ProjectForm extends Component {

    constructor (props) {
        super(props);

        let n="", sd ="", ep = "", c = "", wf= "", bblp = "", biep ="",bilp ="", bpilp="",sr ="",pti ="", mi ="", pi="";

        if (props.project){

            n = props.project.getName();
            sd = props.project.getShortDescription();
            ep = props.project.getExternal_Partners();
            c = props.project.getCapacity();
            wf = props.project.getWeekly_Flag();
            bblp = props.project.getBd_before_lecture_Periode();
            biep = props.project.getBd_In_Exam_Period();
            bilp = props.project.getBd_in_lecture_Periode();
            bpilp = props.project.getBd_preferred_in_lecture_Periode();
            sr = props.project.getSpecial_Room();
            pti = props.project.getproject_type_id();
            mi = props.project.getModule_id();
            pi = props.project.get_person_id();

        }
        this.State ={

            name : n,
            nameValidationFailed:false, 
            nameEdited: false,
            ShortDescription : sd,
            ShortDescriptionValidationFailed:false, 
            ShortDescriptionEdited: false,
            External_Partners : ep,
            External_PartnersValidationFailed:false, 
            External_PartnersEdited: false,
            Capacity : c,
            CapacityValidationFailed:false, 
            CapacityEdited: false,
            Weekly_Flag : wf,
            Weekly_FlagValidationFailed:false, 
            Weekly_FlagEdited: false,
            Bd_Before_Lecture_Period :bblp,
            Bd_Before_Lecture_PeriodValidationFailed:false, 
            Bd_Before_Lecture_PeriodEdited: false,
            Bd_In_Exam_Period : biep,
            Bd_In_Exam_PeriodValidationFailed:false,
            Bd_In_Exam_PeriodEdited: false,
            Bd_in_lecture_Periode : bilp,
            Bd_in_lecture_PeriodeValidationFailed: false,
            Bd_in_lecture_PeriodeEdited: false,
            Bd_preferred_in_lecture_Periode :bpilp,
            Bd_preferred_in_lecture_PeriodeValidationFailed:false,
            Bd_preferred_in_lecture_PeriodeEdited: false,
            special_room : sr,
            Special_RoomValidationFailed: false,
            Special_RoomEdited: false, 
            project_type_id:pti,
            project_type_idValidationFailed:false,
            project_type_idEdited: false,
            module_id : mi,
            module_idValidationFailed: false,
            module_idEdited:false,
            person_id : pi,
            person_idValidationFailed: false,
            person_idEdited: false,

            addingInProgress: false,
            updatingInProgress: false,
            addingError:null,
            updatingError:null


        };
        this.baseState = this.state;


    }
    addProject = () => {
        let newProject = new ProjectNBO (this.state.name, this.state.ShortDescription,this.state.External_Partners,this.state.capacity,
        this.state.Weekly_Flag, this.state.Bd_Before_Lecture_Period, this.state.Bd_In_Exam_Period, this.state.Bd_in_lecture_Periode, this.state.Bd_preferred_in_lecture_Periode,
        this.state.special_room, this.state.project_type_id, this.state.module_id, this.state.person_id);

        ProjectAdminAPI.getAPI().addProject(newProject).then(project => {
                    //Bacend call sucessfull reinit the sialog state for a new empty projects
            this.setState(this.baseState);
            this.props.onClose(project);
        }).catch(e => 
            this.setState({
                updatingInProgress:false,
                updatingError:e
            })
        );

        this.setState({
            updatingInProgress:true,
            updatingError: null
        });    

    }

    updateProject = () => {

        let updatedProject = Object.assign(new ProjectNBO(),this.props.project);
        //set the new attributes über den Dialog
        
        updatedProject.setName();
        updatedProject.setShortDescription();
        updatedProject.setExternal_Partners();
        updatedProject.setCapacity();
        updatedProject.setWeekly_Flag();
        updatedProject.setBd_before_lecture_Periode();
        updatedProject.setBd_In_Exam_Period();
        updatedProject.setBd_in_lecture_Periode();
        updatedProject.setBd_preferred_in_lecture_Periode();
        updatedProject.setSpecial_Room();
        updatedProject.setproject_type_id();
        updatedProject.setModule_id();
        updatedProject.setperson_id();
        ProjectAdminAPI.getAPI().updateProject(updatedProject).then(project => {
            this.setState({
                updatingInProgress:false,
                updatingError:null
            });
                //neuer state als baseState
            this.baseState.name = this.state.name;
            this.baseState.ShortDescription = this.state.ShortDescription;
            this.baseState.External_Partners = this.state.External_Partners;
            this.baseState.Capacity= this.state.Capacity;
            this.baseState.Weekly_Flag = this.state.Weekly_Flag;
            this.baseState.Bd_Before_Lecture_Period = this.state.Bd_Before_Lecture_Period;
            this.baseState.Bd_In_Exam_Period = this.state.Bd_In_Exam_Period;
            this.baseState.Bd_in_lecture_Periode = this.Bd_in_lecture_Periode;
            this.baseState.Bd_preferred_in_lecture_Periode = this.state.Bd_preferred_in_lecture_Periode;
            this.baseState.special_room = this.state.special_room;
            this.baseState.project_type_id= this.state.project_type_id;
            this.baseState.module_id = this.state.module_id;
            this.baseState.person_id = this.state.person_id;
            this.props.onClose(updatedProject); //call the parent with the new project data

        //zeigt error an und stopt das Laden
        }).catch(e => 
            this.setState({
                updatingInProgress:false,
                updatingError:e
            })
        );
            //loading auf true setzen und errormessage null
        this.setState({
            updatingInProgress: true,
            updatingError: null
        });

    }
        //Validierung und Eingabeänderungen des Forms werden hier behandelt
    textFieldValueChange = (event) => {
        const value = event.target.value;

        let error = false;
        if (value.trim().length === 0){
            error = true;
        }

        this.setState({
            [event.target.id]: event.target.value,
            [event.target.id + "ValidationFailed"]: error,
            [event.target.id + "Edited"]: true
        });
    }
        //close / cancel Button event
    handleClose = () => {
        this.setState(this.baseState);
        this.props.onClose(null);
    }

    render() {
        const { classes, project, show } = this.props;
        const { name, nameValidationFailed, nameEdited, ShortDescription, ShortDescriptionValidationFailed, ShortDescriptionEdited, External_Partners, External_PartnersValidationFailed,External_PartnersEdited ,
        Capacity, CapacityValidationFailed, CapacityEdited, Weekly_Flag, Weekly_FlagValidationFailed, Weekly_FlagEdited, Bd_Before_Lecture_Period, Bd_Before_Lecture_PeriodValidationFailed,
        Bd_Before_Lecture_PeriodEdited, Bd_In_Exam_Period, Bd_In_Exam_PeriodValidationFailed, Bd_In_Exam_PeriodEdited,Bd_in_lecture_Periode, Bd_in_lecture_PeriodeValidationFailed, Bd_In_Lecture_PeriodEdited,
        Bd_preferred_in_lecture_Periode, Bd_preferred_in_lecture_PeriodeValidationFailed, Bd_preferred_in_lecture_PeriodeEdited,
        Special_Room, Special_RoomValidationFailed, Special_RoomEdited, project_type_id, project_type_idValidationFailed, project_type_idEdited, 
        module_id, module_idValidationFailed, module_idEdited, person_id,person_idValidationFailed, person_idEdited, addingInProgress, updatingInProgress, updatingError, addingError} = this.state;

        let title = "";
        let header = "";

        if (project) {
            title = "Update a project";
            header = `Project Id: ${project.getId()}`;

        } else {
            title = "Create a new project";
            header = " enter project data "
        }

        return (
            show ?
                <Dialog open={show} onClose={this.handleClose} maxWidth="xs">
                    <DialogTitle id= "form-dialog-title">{title}
                        <IconButton className={classes.closeButton} onClick={this.handleClose}>
                            <CloseIcon/>
                        </IconButton>

                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {header}
                        </DialogContentText>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField autoFocus type= "text" required fullWidth margin ="normal" id ="name" label="Name:" value = {name}
                            onChange={this.textFieldValueChange} error={nameValidationFailed}
                            helperText={nameValidationFailed ? "Name muss ausgefüllt werden": ""} />
                            <TextField autoFocus type= "text" required fullWidth margin ="normal" id ="ShortDescription" label="Short Description:" value = {ShortDescription}
                            onChange={this.textFieldValueChange} error={ShortDescriptionValidationFailed}
                            helperText={ShortDescriptionValidationFailed ? "Short Description muss ausgefüllt werden": ""} />
                            <TextField autoFocus type= "text" required fullWidth margin ="normal" id ="External_Partners" label="External Partner:" value = {External_Partners}
                            onChange={this.textFieldValueChange} error={External_PartnersValidationFailed}
                            helperText={External_PartnersValidationFailed ? "External Partners muss ausgefüllt werden": ""} />
                            <TextField autoFocus type= "number" required fullWidth margin ="normal" id ="Capacity" label="Capacity" value = {Capacity}
                            onChange={this.textFieldValueChange} error={CapacityValidationFailed}
                            helperText={CapacityValidationFailed ? "Capacity muss ausgefüllt werden": ""} />
                            <TextField autoFocus type= "number" required fullWidth margin ="normal" id ="Weekly_Flag" label="Weekly Flag" value = {Weekly_Flag}
                            onChange={this.textFieldValueChange} error={Weekly_FlagValidationFailed}
                            helperText={Weekly_FlagValidationFailed ? "Weekly Flag muss ausgefüllt werden": ""} />
                            <TextField autoFocus type= "number" required fullWidth margin ="normal" id ="Bd_Before_Lecture_Period" label="Bd_Before_Lecture_Period" value = {Bd_Before_Lecture_Period}
                            onChange={this.textFieldValueChange} error={Bd_Before_Lecture_PeriodValidationFailed}
                            helperText={Bd_Before_Lecture_PeriodValidationFailed ? "Bd_Before_Lecture_Period muss ausgefüllt werden": ""} />
                            <TextField autoFocus type= "number" required fullWidth margin ="normal" id ="Bd_In_Exam_Period" label="Bd_In_Exam_Period" value = {Bd_In_Exam_Period}
                            onChange={this.textFieldValueChange} error={Bd_In_Exam_PeriodValidationFailed}
                            helperText={Bd_In_Exam_PeriodValidationFailed ? "Bd_In_Exam_Period muss ausgefüllt werden": ""} />
                            <TextField autoFocus type= "number" required fullWidth margin ="normal" id ="Bd_in_lecture_Periode" label="Bd_in_lecture_Periode" value = {Bd_in_lecture_Periode}
                            onChange={this.textFieldValueChange} error={Bd_in_lecture_PeriodeValidationFailed}
                            helperText={Bd_in_lecture_PeriodeValidationFailed ? "Bd_in_lecture_Periode muss ausgefüllt werden": ""} />
                            <TextField autoFocus type= "number" required fullWidth margin ="normal" id ="Bd_preferred_in_lecture_Periode" label="Bd_preferred_in_lecture_Periode" value = {Bd_preferred_in_lecture_Periode}
                            onChange={this.textFieldValueChange} error={Bd_preferred_in_lecture_PeriodeValidationFailed}
                            helperText={Bd_preferred_in_lecture_PeriodeValidationFailed ? "Bd_preferred_in_lecture_Periode muss ausgefüllt werden": ""} />
                            <TextField autoFocus type= "text" required fullWidth margin ="normal" id ="Special_Room" label="Special_Room" value = {Special_Room}
                            onChange={this.textFieldValueChange} error={Special_RoomValidationFailed}
                            helperText={Special_RoomValidationFailed ? "Special_Room muss ausgefüllt werden": ""} />
                            <TextField autoFocus type= "number" required fullWidth margin ="normal" id ="project_type_id" label="project_type_id" value = {project_type_id}
                            onChange={this.textFieldValueChange} error={project_type_idValidationFailed}
                            helperText={project_type_idValidationFailed ? "project_type_id muss ausgefüllt werden": ""} />
                            <TextField autoFocus type= "number" required fullWidth margin ="normal" id ="module_id" label="module_id" value = {module_id}
                            onChange={this.textFieldValueChange} error={module_idValidationFailed}
                            helperText={module_idValidationFailed ? " muss ausgefüllt werden": ""} />
                            <TextField autoFocus type= "number" required fullWidth margin ="normal" id ="person_id" label="person_id" value = {person_id}
                            onChange={this.textFieldValueChange} error={person_idValidationFailed}
                            helperText={person_idValidationFailed ? "person_id muss ausgefüllt werden": ""} />


                        </form>
                        <LoadingProgress show={addingInProgress || updatingInProgress} />
                        {
                            //Error message in Abhängigkeit des project props
                            project ? 
                            <ContextErrorMessage error={updatingError} contextErrorMsg={`The Project ${project.getId()} konnte nicht geupdated werden`} onReload= {this.updateProject}/>
                            : 
                            <ContextErrorMessage error={addingError} contextErrorMsg={`Das Project konnte nicht hinzugefügt werden`} onReload= {this.addProject}/>


                        }
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        {
                            //Falls Project vorhanden, zeige update Project button sonst einen add button
                            project ?
                                <Button disabled={nameValidationFailed || ShortDescriptionValidationFailed || External_PartnersValidationFailed  ||
                                     CapacityValidationFailed ||Weekly_FlagValidationFailed ||Bd_Before_Lecture_PeriodValidationFailed || Bd_In_Exam_PeriodValidationFailed || Bd_in_lecture_PeriodeValidationFailed || Bd_preferred_in_lecture_PeriodeValidationFailed ||
                                     Special_RoomValidationFailed || project_type_idValidationFailed || module_idValidationFailed || person_idValidationFailed}  variant = "contained" onClick={this.updateProject} color="primary">
                                         Update

                                </Button>
                                :<Button disabled={nameValidationFailed || !nameEdited||  ShortDescriptionValidationFailed || !ShortDescriptionEdited ||External_PartnersValidationFailed  || !External_PartnersEdited ||
                                    CapacityValidationFailed || !CapacityEdited ||Weekly_FlagValidationFailed || !Weekly_FlagEdited||Bd_Before_Lecture_PeriodValidationFailed || !Bd_Before_Lecture_PeriodEdited || Bd_In_Exam_PeriodValidationFailed || !Bd_In_Exam_PeriodEdited || Bd_in_lecture_PeriodeValidationFailed ||
                                    !Bd_In_Lecture_PeriodEdited || Bd_preferred_in_lecture_PeriodeValidationFailed || !Bd_preferred_in_lecture_PeriodeEdited || 
                                    Special_RoomValidationFailed || !Special_RoomEdited || project_type_idValidationFailed || !project_type_idEdited || module_idValidationFailed || !module_idEdited ||person_idValidationFailed || !person_idEdited}  variant = "contained" onClick={this.addProject} color="primary">

                                        Add

                                </Button>
                                          
                        }
                    </DialogActions>
                </Dialog>
                :null
        );
    }
}

/** Component specific styles */
const styles = theme => ({
    root: {
        width: '100%',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});
  
/** PropTypes */
ProjectForm.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** The ProjectBO to be edited */
    project: PropTypes.object,
    /** If true, the form is rendered */
    show: PropTypes.bool.isRequired,
    /**
     * Handler function which is called, when the dialog is closed.
     * Sends the edited or created ProjectBO as parameter or null, if cancel was pressed.
     *
     * Signature: onClose(ProjectBO project);
     */
    onClose: PropTypes.func.isRequired,
}
  
export default withStyles(styles)(ProjectForm);