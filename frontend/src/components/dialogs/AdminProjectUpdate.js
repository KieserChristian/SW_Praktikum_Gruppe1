import React, { Component } from 'react';
import ProjectAdminAPI from '../../api/ProjectAdminAPI';
import { Button, DialogActions, Grid} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { default as DialogContent, default as DialogContentText, } from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonNBO from '../../api/PersonNBO';
import RoleNBO from '../../api/RoleNBO';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { colors } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import ProjectNBO from '../../api/ProjectNBO';

class AdminProjectUpdate extends Component {
    constructor (props) {
        super(props)

        this.state = {
            projectNBO: this.props.project,
            roleNBO: this.props.role,
            loadingInProgress: null,
            addingError: null,
            projectName: "",
            CurrentState: "",
            Capacity: "",
            ExternalPartners: "",
            ShortDescription: "",
            WeeklyFlag: "",
            BDbeforeLecture: "",
            BDinExam: "",
            BDinLecture: "",
            BDpreferredInLecture: "",
            SpecialRoom: "",
        };
        //this.handleChangePersonName = this.handleChangePersonName.bind(this),
        //this.handleChangeGoogleId = this.handleChangeGoogleId.bind(this),
        //this.handleChangeRole = this.handleChangeRole.bind(this)
    }

    onDialogClose = () => {
        this.props.onCloseProp()
    }

    updateProject = async(projectNBO) => {
        ProjectAdminAPI.getAPI().updateProject(projectNBO).then(project => {
            this.props.onDialogClose(project);
        }).catch(e =>
            this.setState({
                loadingInProgress: false,
                addingError: e
            })
        );
        this.setState({
            loadingInProgress: true,
            addingError: null
        });
        this.props.onUpdate(projectNBO)
    }

    updateAlert = (projectNBO) => {
        this.updateProject(projectNBO);
        alert("Daten erfolgreich geändert!");
        this.onDialogClose();
    } 

    handleChangeProjectName = (projectName) =>{
        const newProjectName = Object.assign(new ProjectNBO(),this.state.projectNBO);
        newProjectName.setName(projectName)
        this.setState({projectNBO:newProjectName})
    }

    handleChangeCurrentState = (CurrentState) =>{
        const newCurrentState = Object.assign(new ProjectNBO(),this.state.projectNBO);
        newCurrentState.setState(CurrentState)
        this.setState({projectNBO:newCurrentState})
    }

    handleChangeCapacity = (Capacity) =>{
        const newCapacity = Object.assign(new ProjectNBO(),this.state.projectNBO);
        newCapacity.setCapacity(Capacity)
        this.setState({projectNBO:newCapacity})
    }


    handleChangeExternalPartners = (ExternalPartners) =>{
        const newExternalPartners = Object.assign(new ProjectNBO(),this.state.projectNBO);
        newExternalPartners.setExternalPartners(ExternalPartners)
        this.setState({projectNBO:newExternalPartners})
    }

    handleChangeShortDescription = (ShortDescription) =>{
        const newShortDescription = Object.assign(new ProjectNBO(),this.state.projectNBO);
        newShortDescription.setShortDescription(ShortDescription)
        this.setState({projectNBO:newShortDescription})
    }

    handleChangeWeeklyFlag = (WeeklyFlag) =>{
        const newWeeklyFlag = Object.assign(new ProjectNBO(),this.state.projectNBO);
        newWeeklyFlag.setWeeklyFlag(WeeklyFlag)
        this.setState({projectNBO:newWeeklyFlag})
    }

    handleChangeBDbeforeLecture = (BDbeforeLecture) =>{
        const newBDbeforeLecture = Object.assign(new ProjectNBO(),this.state.projectNBO);
        newBDbeforeLecture.setBDbeforeLecture(BDbeforeLecture)
        this.setState({projectNBO:newBDbeforeLecture})
    }

    handleChangeBDinExam = (BDinExam) =>{
        const newBDinExam = Object.assign(new ProjectNBO(),this.state.projectNBO);
        newBDinExam.setBDinExam(BDinExam)
        this.setState({projectNBO:newBDinExam})
    }

    handleChangeBDinLecture = (BDinLecture) =>{
        const newBDinLecture = Object.assign(new ProjectNBO(),this.state.projectNBO);
        newBDinLecture.setBDinLecture(BDinLecture)
        this.setState({projectNBO:newBDinLecture})
    }

    handleChangeBDpreferredInLecture = (BDpreferredInLecture) =>{
        const newBDpreferredInLecture = Object.assign(new ProjectNBO(),this.state.projectNBO);
        newBDpreferredInLecture.setBDpreferredInLecture(BDpreferredInLecture)
        this.setState({projectNBO:newBDpreferredInLecture})
    }

    handleChangeSpecialRoom = (SpecialRoom) =>{
        const newSpecialRoom = Object.assign(new ProjectNBO(),this.state.projectNBO);
        newSpecialRoom.setSpecialRoom(SpecialRoom)
        this.setState({projectNBO:newSpecialRoom})
    }

    componentDidMount() {
    
    }
    
    render() {
        const {openUpdate} = this.props;
        const {projectNBO, roleNBO, projectName, CurrentState, Capacity, ExternalPartners, ShortDescription, WeeklyFlag, BDbeforeLecture, BDinExam, BDinLecture, BDpreferredInLecture,SpecialRoom} = this.state;
        return(
            <Dialog open={openUpdate}>
                <DialogTitle id="alert-dialog-title">Daten ändern</DialogTitle>
            <DialogContent id="alert-dialog-description">

                <Grid style={{paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, marginTop: 10, backgroundColor: '#e0e0e0'}} variant="contained" padding="dense" align="left">
                        <form noValidate autoComplete="off">
                            {<TextField
                                id="projectName"
                                label="Projekt-Name"
                                variant="filled"
                                fullWidth
                                color="secondary"
                                onChange={(e) => this.handleChangeProjectName(e.target.value)}
                                value={this.state.projectNBO.getName()}
                            />}
                        </form>
                </Grid>
                <Grid style={{paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight:10, marginTop: 10, backgroundColor: '#e0e0e0'}} variant="contained" padding="dense" align="left">
                        <form noValidate autoComplete="off">
                            {<TextField
                                id="CurrentState"
                                label="Status"
                                variant="filled"
                                fullWidth
                                color="secondary"
                                onChange={(e) => this.handleChangeCurrentState(e.target.value)}
                                value={this.state.projectNBO.getState()}
                            />}
                        </form>
                </Grid>
                <Grid style={{paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, marginTop: 10, backgroundColor: '#e0e0e0'}} variant="contained" padding="dense" align="left">
                        <form noValidate autoComplete="off">
                            {<TextField
                                id="Capacity"
                                label="Kapazität"
                                variant="filled"
                                fullWidth
                                color="secondary"
                                onChange={(e) => this.handleChangeCapacity(e.target.value)}
                                value={this.state.projectNBO.getCapacity()} 
                            />}
                        </form>
                </Grid>
                <Grid style={{paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, marginTop: 10, backgroundColor: '#e0e0e0'}} variant="contained" padding="dense" align="left">
                        <form noValidate autoComplete="off">
                            {<TextField
                                id="ExternalPartners"
                                label="Externe Partner"
                                variant="filled"
                                fullWidth
                                color="secondary"
                                onChange={(e) => this.handleChangeExternalPartners(e.target.value)}
                                value={this.state.projectNBO.getExternalPartners()} 
                            />}
                        </form>
                </Grid>
                <Grid style={{paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, marginTop: 10, backgroundColor: '#e0e0e0'}} variant="contained" padding="dense" align="left">
                        <form noValidate autoComplete="off">
                            {<TextField
                                id="ShortDescription"
                                label="Kurzbeschreibung"
                                variant="filled"
                                fullWidth
                                color="secondary"
                                onChange={(e) => this.handleChangeShortDescription(e.target.value)}
                                value={this.state.projectNBO.getShortDescription()} 
                            />}
                        </form>
                </Grid>
                <Grid style={{paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, marginTop: 10, backgroundColor: '#e0e0e0'}} variant="contained" padding="dense" align="left">
                        <form noValidate autoComplete="off">
                            {<TextField
                                id="WeeklyFlag"
                                label="Weekly Flag"
                                variant="filled"
                                fullWidth
                                color="secondary"
                                onChange={(e) => this.handleChangeWeeklyFlag(e.target.value)}
                                value={this.state.projectNBO.getWeeklyFlag()} 
                            />}
                        </form>
                </Grid>
                <Grid style={{paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, marginTop: 10, backgroundColor: '#e0e0e0'}} variant="contained" padding="dense" align="left">
                        <form noValidate autoComplete="off">
                            {<TextField
                                id="BDbeforeLecture"
                                label="BDbeforeLecture"
                                variant="filled"
                                fullWidth
                                color="secondary"
                                onChange={(e) => this.handleChangeBDbeforeLecture(e.target.value)}
                                value={this.state.projectNBO.getBDbeforeLecture()} 
                            />}
                        </form>
                </Grid>
                <Grid style={{paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, marginTop: 10, backgroundColor: '#e0e0e0'}} variant="contained" padding="dense" align="left">
                        <form noValidate autoComplete="off">
                            {<TextField
                                id="BDinExam"
                                label="BDinExam"
                                variant="filled"
                                fullWidth
                                color="secondary"
                                onChange={(e) => this.handleChangeBDinExam(e.target.value)}
                                value={this.state.projectNBO.getBDinExam()} 
                            />}
                        </form>
                </Grid>
                <Grid style={{paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, marginTop: 10, backgroundColor: '#e0e0e0'}} variant="contained" padding="dense" align="left">
                        <form noValidate autoComplete="off">
                            {<TextField
                                id="BDinLecture"
                                label="BDinLecture"
                                variant="filled"
                                fullWidth
                                color="secondary"
                                onChange={(e) => this.handleChangeBDinLecture(e.target.value)}
                                value={this.state.projectNBO.getBDinLecture()} 
                            />}
                        </form>
                </Grid>
                <Grid style={{paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, marginTop: 10, backgroundColor: '#e0e0e0'}} variant="contained" padding="dense" align="left">
                        <form noValidate autoComplete="off">
                            {<TextField
                                id="BDpreferredInLecture"
                                label="BDpreferredInLecture"
                                variant="filled"
                                fullWidth
                                color="secondary"
                                onChange={(e) => this.handleChangeBDpreferredInLecture(e.target.value)}
                                value={this.state.projectNBO.getBDpreferredInLecture()} 
                            />}
                        </form>
                </Grid>
                <Grid style={{paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, marginTop: 10, backgroundColor: '#e0e0e0'}} variant="contained" padding="dense" align="left">
                        <form noValidate autoComplete="off">
                            {<TextField
                                id="SpecialRoom"
                                label="SpecialRoom"
                                variant="filled"
                                fullWidth
                                color="secondary"
                                onChange={(e) => this.handleChangeSpecialRoom(e.target.value)}
                                value={this.state.projectNBO.getSpecialRoom()} 
                            />}
                        </form>
                </Grid>

                <DialogContentText id="alert-dialog-description">
                Möchten Sie die Daten des Projects <b>"{projectNBO.getName()}"</b> wirklich ändern?
                </DialogContentText>    
            </DialogContent>
            <DialogActions>
                <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#4caf50'}} onClick={() => this.updateAlert(projectNBO)}>Speichern</Button>
                <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#ff5722'}} onClick={() => this.onDialogClose()}>Abbrechen</Button>
                </DialogActions>
            </Dialog>
        );
    }


}

export default AdminProjectUpdate;