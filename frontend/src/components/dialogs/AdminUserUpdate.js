import React, { Component } from 'react';
import ProjectAdminAPI from '../../api/ProjectAdminAPI';
import { Button, DialogActions, Grid} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { default as DialogContent, default as DialogContentText, } from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonNBO from '../../api/PersonNBO';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { colors } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

class AdminUserUpdate extends Component {
    constructor (props) {
        super(props)

        this.state = {
            personNBO: props.person,
            loadingInProgress: null,
            addingError: null,
            personName: "",
            GoogleId: "",
            role: "",
        };
        //this.handleChangePersonName = this.handleChangePersonName.bind(this),
        //this.handleChangeGoogleId = this.handleChangeGoogleId.bind(this),
        //this.handleChangeRole = this.handleChangeRole.bind(this)
    }

    onDialogClose = () => {
        this.props.onCloseProp()
    }

    updatePerson = async(personNBO) => {
        ProjectAdminAPI.getAPI().updatePerson(personNBO.getId()).then(person => {
            this.props.onDialogClose(person);
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

    updateAlert = (personNBO) => {
        this.updatePerson(personNBO);
        alert("Daten erfolgreich geändert!");
        this.onDialogClose();
    } 

    handleChangePersonName = (personName) =>{
        //this.state.personNBO.setName(personName);
        const newPerson = Object.assign(new PersonNBO(),this.state.personNBO);
        newPerson.setName(personName)
        this.setState({personNBO:newPerson})
    }

    handleChangeGoogleId = (GoogleId) =>{
        //this.state.personNBO.setGoogleId(GoogleId);
        const newGoogleId = Object.assign(new PersonNBO(),this.state.personNBO);
        newGoogleId.setGoogleId(GoogleId)
        this.setState({personNBO:newGoogleId})
    }

    handleChangeRole = (role) =>{
        //this.state.personNBO.setRole(role);
        const newRole = Object.assign(new PersonNBO(),this.state.personNBO);
        newRole.setRole(role)
        this.setState({personNBO:newRole})
    }
    
    render() {
        const {openUpdate} = this.props;
        const {personNBO, role, personName, GoogleId} = this.state;
        return(
            <Dialog open={openUpdate}>
                <DialogTitle id="alert-dialog-title">Daten ändern</DialogTitle>
            <DialogContent id="alert-dialog-description">

                <Grid style={{paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, marginTop: 10, backgroundColor: '#e0e0e0'}} variant="contained" padding="dense" align="left">
                        <form noValidate autoComplete="off">
                            {<TextField
                                id="personName"
                                label="Name"
                                variant="filled"
                                fullWidth
                                color="secondary"
                                onChange={this.handleChangePersonName}
                                value={personNBO.getName()}
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
                                onChange={this.handleChangeGoogleId}
                                value={personNBO.getGoogleId()}
                            />}
                        </form>
                </Grid>
                <Grid style={{paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, marginTop: 10, backgroundColor: '#e0e0e0'}} variant="contained" padding="dense" align="left">
                        <form noValidate autoComplete="off">
                            {<TextField
                                id="Role"
                                label="Rolle"
                                variant="filled"
                                fullWidth
                                color="secondary"
                                onChange={this.handleChangeRole}
                                value={personNBO.getRole()} 
                            />}
                        </form>
                </Grid>

                <DialogContentText id="alert-dialog-description">
                Möchten Sie die Daten des Users <b>"{personNBO.getName()}"</b> wirklich ändern?
                </DialogContentText>    
            </DialogContent>
            <DialogActions>
                <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#4caf50'}} onClick={() => this.updateAlert(personNBO)}>Ändern</Button>
                <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#ff5722'}} onClick={() => this.onDialogClose()}>Abbrechen</Button>
                </DialogActions>
            </Dialog>
        );
    }


}

export default AdminUserUpdate;