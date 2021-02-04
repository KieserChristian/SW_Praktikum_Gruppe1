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

class AdminUserUpdate extends Component {
    constructor (props) {
        super(props)

        this.state = {
            personNBO: props.person,
            loadingInProgress: null,
            addingError: null,
            /* personName: "",
            GoogleId: "",
            role: "", */
        };
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
    
    render() {
        const {openUpdate} = this.props;
        const {personNBO} = this.state;
        return(
            <Dialog open={openUpdate}>
                <DialogTitle id="alert-dialog-title">Daten ändern</DialogTitle>
            <DialogContent id="alert-dialog-description">

                <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="center">
                    <TableCell style={{backgroundColor: '#e0e0e0'}}>
                        <b>Name:</b>
                        <form noValidate autoComplete="off">
                            {/*<TextField
                                id="personName"
                                label=""
                                variant="filled"
                                color="secondary"
                                onChange={this.handleChange}
                                value={personName}
                            /> */}
                        </form>
                    </TableCell>
                </TableRow>
                <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                    <TableCell style={{backgroundColor: '#e0e0e0'}}>
                        <b>GoogleId:</b>
                        <form noValidate autoComplete="off">
                            {/* <TextField
                                id="GoogleId"
                                label=""
                                variant="filled"
                                color="secondary"
                                onChange={this.handleChange}
                                value={GoogleId}
                            /> */}
                        </form>
                    </TableCell>
                </TableRow>
                <TableRow style={{minwidth: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                    <TableCell style={{backgroundColor: '#e0e0e0'}}>
                        <b>Rolle:</b>
                        <form noValidate autoComplete="off">
                            {/* {<TextField
                                id="Role"
                                label=""
                                variant="filled"
                                color="secondary"
                                onChange={this.handleChange}
                                // value={role} */}
                            {/* />} */}
                        </form>
                    </TableCell>

                                        </TableRow>

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