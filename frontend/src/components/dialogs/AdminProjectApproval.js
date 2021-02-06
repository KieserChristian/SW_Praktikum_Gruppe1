import React, { Component } from 'react';
import ProjectAdminAPI from '../../api/ProjectAdminAPI';
import { Button, DialogActions, Grid} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { default as DialogContent, default as DialogContentText, } from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonNBO from '../../api/PersonNBO';
import RoleNBO from '../../api/RoleNBO';
import ProjectNBO from '../../api/ProjectNBO';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { colors } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class AdminProjectApproval extends Component {
    constructor (props) {
        super(props)

        this.state = {
            projectNBO: this.props.project,
            loadingInProgress: null,
            addingError: null,
            
        };
    }

    onDialogClose = () => {
        this.props.onCloseProp()
    }

    updateProject = (projectNBO) => {
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
        //this.props.onUpdate()
    }

    updateAlert = (projectNBO) => {
        const newProjectState = Object.assign(new ProjectNBO(),projectNBO);
        newProjectState.setState("Genehmigt");
        this.setState({projectNBO:newProjectState});
        console.log(newProjectState)
        this.updateProject(newProjectState);
        alert("Das Project ist erfolgreich genehmigt");
        this.onDialogClose();
    } 

    /*handleChangeCurrentState = () =>{
        const newProjectState = Object.assign(new ProjectNBO(),this.state.projectNBO);
        newProjectState.setState("Genehmigt")
        this.setState({projectNBO:newProjectState})
    }*/


    componentDidMount() {
    
    }
    
    render() {
        const {openApproval} = this.props;
        const {projectNBO} = this.state;
        return(
            <Dialog open={openApproval}>
                <DialogTitle id="alert-dialog-title">Projekt genehmigen</DialogTitle>
            <DialogContent id="alert-dialog-description">
                <DialogContentText id="alert-dialog-description">
                Möchten Sie das Projekt <b>"{projectNBO.getName()}"</b> wirklich genehmigen?
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

export default AdminProjectApproval;