import React, { Component } from 'react';
import ProjectAdminAPI from '../../api/ProjectAdminAPI';
import { Button, DialogActions, Grid} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { default as DialogContent, default as DialogContentText, } from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { colors } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import StudentNBO from "./api/StudentNBO";


class ProjectParticipationAddGrading extends Component {
    constructor (props) {
        super(props)

        this.state = {
            gradingBO: props.grading,
            currentUserEmail: props.currentUserEmail,
            loadingInProgress: null,
            addingError: null
           
        };
    }

    onDialogClose = () => {
        this.props.onCloseProp()
    }
    
    addGrade = async() => {
        let newGrade = ParticipationBO (this.state.grading_Id, creationdate, grade);
            newGrade.setGrade(this.state.Grade)
        ProjectAdminAPI.getAPI().addGrade(GradingBO).then(grading => {
            this.props.onDialogClose(participation);
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
        this.props.onAdding()
    }

    addingAlert = (gradingBO) => {
        this.addGrade(gradingBO);
        alert("Note erfolgreich hinzugefügt!");
        this.onDialogClose();
    } 
    
    handleChange = (event) => {
        const value = event.target.value;

        let error = false;
        if(typeof value === 0){
        if(typeof value === "string"){
        error = true;
        }
    }
    this.setState({
        [event.target.id]: event.target.value
    });
    }

    render() {
        const {openUpdate, Grade} = this.props;
        const {gradingBO} = this.state;
        return(
            <Dialog open={openUpdate}>
                <DialogTitle id="alert-dialog-title">Note hinzufügen</DialogTitle>
            <DialogContent id="alert-dialog-description">


                <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                    <TableCell style={{backgroundColor: '#e0e0e0'}}>
                        <b>Note:</b>
                        <form noValidate autoComplete="off">
                            { <TextField
                                id="Grade"
                                label="Grade"
                                variant="filled"
                                color="secondary"
                                onChange={this.handleChange}
                                value={Grade}
                            /> }
                        </form>
                    </TableCell>
                </TableRow>

                <DialogContentText id="alert-dialog-description">
                Möchten Sie die Note <b>"{gradingBO.getGrade()}"</b> dem Studenten/Participation wirklich hinzufügen?
                </DialogContentText>    
            </DialogContent>
            <DialogActions>
                <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#4caf50'}} onClick={() => this.updateAlert(gradingBO)}>Note hinzufügen</Button>
                <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#ff5722'}} onClick={(handleDialogClose) => this.onDialogClose()}>Abbrechen</Button>
                </DialogActions>
            </Dialog>
        );
    }


}

export default ProjectParticipationAddGrading;