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
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';


class DocentProjectCreation extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            Projektname:"",
            Sprache: "",
            BetreuendeProf:"(Google_ID?)",

        }
    }

    handleProjekttitelChange = (event) => {
        this.setState
            ({ Projekttitel: event.target.value })

    }
    handleInhaltChange = (event) => {
        this.setState({Inhalt: event.target.value})
    }
    handleSpracheChange = (event) => {
        this.setState({Sprache: event.target.value})
    }
    handleProjektartChange= (event) => {
        this.setState({Projektart: event.target.value})
    }
    handleBetrProfChange = (event) => {
        this.setState({betrProf: event.target.value})
    }
    handleExtKoopChange = (event) => {
        this.setState({extKoop: event.target.value})
    }
    handleSubmit = (event) => {
        alert(`${this.state.name} ${this.state.Inhalt} ${this.state.Sprache} ${this.state.Projekttitel}`)
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
                <form onSubmit={this.handleSubmitPost.bind(this)}>              
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: colors.grey[100]}} colSpan={10}>
                            <Box margin={1}>
                                <Table size="small" aria-label="expand row">
                                    <TableHead>
                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}><b>Projekttypen</b></TableCell>
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
                                            <p>Id:<br/><input type="number" value = {this.state.Projekttitel} onChange={this.handleProjekttitelChange}/></p> 
                                            <p>Name:<br/><br/></p><input type="text" value = {this.state.Projekttitel} onChange={this.handleProjekttitelChange}/> 
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
                                                <Checkbox/>Interdisziplinäres Projekt (5 SWS/ 10ECTS)
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
                                                <select value={this.state.sprache} onChange={this.handleSpracheChange}>
                                                    <option
                                                        value ="Deutsch"> Deutsch
                                                    </option>
                                                    <option
                                                        value = "Englisch">Englisch
                                                    </option>
                                                </select>
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
                                                <b>Betreuende(r) ProfessorInnen (GoogleId):
                                                    <input type="text" value="" > </input>
                                                </b>
                                            </TableCell>
                                            <TableCell>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                                <b>Externer Kooperationspartner:
                                                    <input type = "text" ></input></b> 
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
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}><b>Inhalt (Kurzbeschreibung):
                                                <input type="textarea" value="Kurzbeschreibung"> </input> "</b></TableCell>
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
                </form> 
                </Grid>
                <form handleClick={this.OnSubmit}>
                <Grid>
                    <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#4caf50'}}>
                        Absenden
                    </Button>
                </Grid>
                </form> 
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
