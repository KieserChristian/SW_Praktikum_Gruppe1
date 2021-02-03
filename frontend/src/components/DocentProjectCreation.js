import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import ProjectNBO from '../api/ProjectNBO';
import { withRouter } from 'react-router-dom';
import { withStyles, Grid, Button, Paper, Typography, FormRow} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { colors } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import Checkbox from '@material-ui/core/Checkbox';
/* import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder' */
import TextField from '@material-ui/core/TextField';



class DocentProjectCreation extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            currentState: "",
            capacity: "",
            externalPartners: "",
            shortDescription: "",
            weeklyFlag: false,
            bdBeforeLecturePeriod: false,
            bdInLecturePeriod: false,
            bdInExamPeriod: false,
            bdPreferredInLecturePeriod: "",
            specialRoom: null,
            projectType: null,
/*             language: null, */
        };
        this.baseState = this.state;
    }


    addProject = () => {
        let newProject = new ProjectNBO(this.state.name, this.state.currentState, this.state.capacity,
            this.state.externalPartners, this.state.shortDescription, this.state.bdPreferredInLecturePeriod);
        //newProject.setProjectId();
        //console.log()
        ProjectAdminAPI.getAPI().addProject(newProject).then(project => {
            this.setState(this.baseState);
            //this.props.onClose(project);
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
    }


    handleChange = (event) => {
        const value = event.target.value;
    
        let error = false;
        if (value.trim().length === 0) {
          error = true;
        }
    
        this.setState({
          [event.target.id]: event.target.value,
          [event.target.id + 'ValidationFailed']: error,
          [event.target.id + 'Edited']: true
        });
      }




    render() {
        return(
            <div>
            <Paper style={{paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
                <Grid><h1>Anmeldung<br/>
                Projekte Fakultät 3</h1>
                </Grid>
                <Grid>

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
                                                <Checkbox/>Interdisziplinäres Projekt (5 SWS/10 ECTS)
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
                                                <form noValidate autoComplete="off">
                                                    <TextField
                                                        id="filled-secondary"
                                                        label=""
                                                        variant="filled"
                                                        color="secondary"
                                                        onChange={this.handleChange}
                                                    />
                                                </form>
                                            </TableCell>
                                            <TableCell>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                                <b>Betreuende(r) ProfessorInnen:</b>
                                                <form noValidate autoComplete="off">
                                                    <TextField
                                                        id="filled-secondary"
                                                        label=""
                                                        variant="filled"
                                                        color="secondary"
                                                    />
                                                </form>
                                            </TableCell>
                                            <TableCell>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                                <b>Externer Kooperationspartner:</b>
                                                <form noValidate autoComplete="off">
                                                    <TextField
                                                        id="filled-secondary"
                                                        label=""
                                                        variant="filled"
                                                        color="secondary"
                                                    />
                                                </form>
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
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}><b>Inhalt (Kurzbeschreibung):</b>
                                            <form noValidate autoComplete="off">
                                                    <TextField
                                                        id="outlined-multiline-static"
                                                        label=""
                                                        multiline
                                                        rows={6}
                                                        defaultValue=""
                                                        variant="outlined"
                                                    />
                                                </form>
                                            </TableCell>
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
                                
                                <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                    <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                        <Checkbox/>Blocktage vor Beginn der Vorlesungszeit
                                    </TableCell>
                                    <TableCell>
                                        Anzahl: Tage
                                    </TableCell>
                                </TableRow>

                                <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                    <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                        <Checkbox/>Blocktage in der Prüfungszeit <b>(nur inter-/trans. Projekte!!!)</b>
                                    </TableCell>
                                    <TableCell>
                                        Anzahl: Tage
                                    </TableCell>
                                </TableRow>

                                <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                    <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                        <Checkbox/>Blocktage (Samstage) in der Vorlesungszeit
                                        <p>Präferierte Tage:</p>
                                    </TableCell>
                                    <TableCell>
                                        Anzahl: Tage
                                    </TableCell>
                                </TableRow>

                                <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                    <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                        <Checkbox/>Besonderer Raum notwendig
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            </Table>
                            </Box>

                    </TableCell>    
                </TableRow>

                </Grid>
                <Grid>
                    <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#4caf50'}} onClick={this.addProject}>
                        Absenden
                    </Button>
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
