import React from 'react';
import { withRouter } from 'react-router-dom';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { withStyles, Grid, Button, Paper, Typography, FormRow} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { colors } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

class DocentProjectCreation extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
            <Paper style={{paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
                <Grid><h1>Anmeldung<br/>
                Projekte Fakultät 3</h1>
                </Grid>
                <Grid>
{/*                 <Grid container spacing={2}>
                    <Grid item xs={6} elevation={0}>
                    <Paper style={{backgroundColor: '#eeeeee'}}>
                        <p><b>Art des Projekts</b></p>
                        <p><Checkbox/>Fachspezifisches Projekt (3 SWS/5 ECTS)</p>
                        <p><Checkbox/>Zugleich Wahlfach nach alter SPO / <br/>
                           Zugleich im MINOR - Programm                     
                        </p>
                        <p>Interdisziplinäres Projekt (5 SWS/10 ECTS)</p>
                        <p>Transdisziplinäres Projekt
                           (10 SWS/20 ECTS; Laufzeit: 2 Semester)
                        </p>
                    </Paper>
                    </Grid>
                    <Grid item xs={6}>
                    <Paper style={{backgroundColor: '#eeeeee'}}>
                        <p><b>Kategorie des Projekts</b></p>
                        <p>-</p>
                        <p>Nummer:<br/></p>
                        <p>Titel:<br/><br/></p>
                        <p>-<br/></p>
                        <p>-<br/></p>                      
                    </Paper>
                    </Grid>
                    <Grid item xs={12} elevation={0}>
                    <Paper style={{backgroundColor: '#eeeeee'}}>
                        Sprache: deutsch / englisch
                    </Paper>
                    </Grid>
                </Grid> */}

                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: colors.grey[100]}} colSpan={10}>
                            <Box margin={1}>
                                <Table size="small" aria-label="expand row">
                                    <TableHead>
                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}><b>Art des Projekts</b></TableCell>
                                            <TableCell><b>Kategorie des Projekts</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody style={{width: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                                <p><Checkbox/>Fachspezifisches Projekt (3 SWS/5 ECTS)</p>
                                                <p><Checkbox/>Zugleich Wahlfach nach alter SPO
                                                            Zugleich im MINOR - Programm</p>
                                            </TableCell>
                                            <TableCell>
                                            <p>-</p>
                                            <p>Nummer:<br/></p>
                                            <p>Titel:<br/><br/></p>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                                <Checkbox/>Fachspezifisches Projekt (3 SWS/5 ECTS)
                                            </TableCell>
                                            <TableCell>
                                            -
                                            </TableCell>
                                        </TableRow>
                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                                <Checkbox/>Transdisziplinäres Projekt (10 SWS/20 ECTS; Laufzeit: 2 Semester)
                                            </TableCell>
                                            <TableCell>
                                            -
                                            </TableCell>
                                        </TableRow>
                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                                Sprache: <Checkbox/> deutsch <Checkbox/>englisch
                                            </TableCell>
                                        </TableRow>

                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                                <b>Projekttitel:</b>
                                            </TableCell>
                                            <TableCell>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                                <b>Betreuende(r) ProfessorInnen:</b>
                                            </TableCell>
                                            <TableCell>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                                <b>Externer Kooperationspartner:</b>
                                            </TableCell>
                                            <TableCell>
                                            </TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </Box>

                            <Box margin={1}>
                            <Table size="small" aria-label="expand row">
                            <TableHead>
                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}><b>Inhalt (Kurzbeschreibung):</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                            </Table>
                            </Box>

                            <Box margin={1}>
                            <Table size="small" aria-label="expand row">
                                <TableHead>
                                    <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                        <TableCell style={{backgroundColor: '#e0e0e0'}}><b>Raum-/Ressourcenplanung:</b></TableCell>
                                    </TableRow>
                            </TableHead>
                            <TableBody style={{width: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                    <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                        Wöchentliche Termine (Präsenzzeit / studentische Gruppenmeetings)
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox/>Ja
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox/>Nein
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            </Table>
                            </Box>

                    </TableCell>    
                </TableRow>
                </Grid>
            </Paper>
            </div>

        );
    }
}

const styles = theme => ({
    root: {
      width: '100%',
    }
  });

export default withRouter(withStyles(styles)(DocentProjectCreation));
