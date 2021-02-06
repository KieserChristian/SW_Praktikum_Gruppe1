import React, { Component } from 'react';
import ProjectAdminAPI from '../../api/ProjectAdminAPI';
import { Button, DialogActions, Grid} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { default as DialogContent, default as DialogContentText, } from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonNBO from '../../api/PersonNBO';
import StudentNBO from '../../api/StudentNBO';
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

class AdminUserUpdateStudents extends Component {
    constructor (props) {
        super(props)

        this.state = {
            studentNBO: this.props.student,
            //roleNBO: this.props.role,
            loadingInProgress: null,
            addingError: null,
            studentName: "",
            GoogleId: "",
        };
        //this.handleChangePersonName = this.handleChangePersonName.bind(this),
        //this.handleChangeGoogleId = this.handleChangeGoogleId.bind(this),
        //this.handleChangeRole = this.handleChangeRole.bind(this)
    }

    onDialogClose = () => {
        this.props.onCloseProp()
    }

    updateStudent = async(studentNBO) => {
        ProjectAdminAPI.getAPI().updateStudent(studentNBO).then(student => {
            this.props.onDialogClose(student);
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
        this.props.onUpdate()
    }

    updateAlert = (studentNBO) => {
        this.updateStudent(studentNBO);
        alert("Daten erfolgreich geändert!");
        this.onDialogClose();
    } 

    handleChangeStudentName = (studentName) =>{
        //this.state.studentNBO.setName(studentName);
        const newStudent = Object.assign(new StudentNBO(),this.state.studentNBO);
        newStudent.setName(studentName)
        this.setState({studentNBO:newStudent})
    }

    handleChangeGoogleId = (GoogleId) =>{
        //this.state.personNBO.setGoogleId(GoogleId);
        const newGoogleId = Object.assign(new StudentNBO(),this.state.studentNBO);
        newGoogleId.setGoogleId(GoogleId)
        this.setState({studentNBO:newGoogleId})
    }

    /* handleChangeRole = (role) =>{
        //this.state.personNBO.setRole(role);
        const newRole = Object.assign(new RoleNBO(),this.state.roleNBO);
        newRole.setStaticAttribute(role)
        this.setState({roleNBO:role})
    } */

    componentDidMount() {
    
    }
    
    render() {
        const {openUpdate} = this.props;
        const {studentNBO, studentName, GoogleId} = this.state;
        return(
            <Dialog open={openUpdate}>
                <DialogTitle id="alert-dialog-title">Daten ändern</DialogTitle>
            <DialogContent id="alert-dialog-description">

                <Grid style={{paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, marginTop: 10, backgroundColor: '#e0e0e0'}} variant="contained" padding="dense" align="left">
                        <form noValidate autoComplete="off">
                            {<TextField
                                id="studentName"
                                label="Name"
                                variant="filled"
                                fullWidth
                                color="secondary"
                                onChange={(e) => this.handleChangeStudentName(e.target.value)}
                                value={this.state.studentNBO.getName()}
                            />}
                        </form>
                </Grid>
                <Grid style={{paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight:10, marginTop: 10, backgroundColor: '#e0e0e0'}} variant="contained" padding="dense" align="left">
                        <form noValidate autoComplete="off">
                            {<TextField
                                id="GoogleId"
                                label="GoogleId"
                                variant="filled"
                                fullWidth
                                color="secondary"
                                onChange={(e) => this.handleChangeGoogleId(e.target.value)}
                                value={this.state.studentNBO.getGoogleId()}
                            />}
                        </form>
                </Grid>
                <Grid style={{paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, marginTop: 10, backgroundColor: '#e0e0e0'}} variant="contained" padding="dense" align="left">
                        <form noValidate autoComplete="off">
                            {/* {<TextField
                                id="Role"
                                label="Rolle"
                                variant="filled"
                                fullWidth
                                color="secondary"
                                onChange={(e) => this.handleChangeRole(e.target.value)}
                                value={this.state.roleNBO} 
                            />} */}
                        </form>
                </Grid>

                <DialogContentText id="alert-dialog-description">
                Möchten Sie die Daten des Users <b>"{studentNBO.getName()}"</b> wirklich ändern?
                </DialogContentText>    
            </DialogContent>
            <DialogActions>
                <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#4caf50'}} onClick={() => this.updateAlert(studentNBO)}>Ändern</Button>
                <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#ff5722'}} onClick={() => this.onDialogClose()}>Abbrechen</Button>
                </DialogActions>
            </Dialog>
        );
    }


}

export default AdminUserUpdateStudents;