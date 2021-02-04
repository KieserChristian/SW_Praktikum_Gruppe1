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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';


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
            projectName: "",
            currentState: "Neu",
            capacity: "",
            externalPartners: "",
            shortDescription: "",
            weeklyFlag: false,
            bdBeforeLecturePeriod: "",
            bdInLecturePeriod: "",
            bdInExamPeriod: "",
            bdPreferredInLecturePeriod: "",
            specialRoom: "",
            projectType: null,
            projectModule: "",
            semester: "",
            docent: "",
/*             language: null, */
        };
        this.baseState = this.state;
    }


    addProject = async() => {
        let newProject = await new ProjectNBO(this.state.projectName, this.state.currentState, this.state.capacity,
            this.state.externalPartners, this.state.shortDescription, this.state.bdBeforeLecturePeriod, this.state.bdInLecturePeriod,
            this.state.bdInExamPeriod, this.state.bdPreferredInLecturePeriod, this.state.specialRoom, this.state.projectModule, this.state.semester,
            this.state.docent);
            newProject.setName(this.state.projectName)
            newProject.setState(this.state.currentState)
            newProject.setCapacity(this.state.capacity)
            newProject.setExternalPartners(this.state.externalPartners)
            newProject.setShortDescription(this.state.shortDescription)
            newProject.setBDbeforeLecture(this.state.bdBeforeLecturePeriod)
            newProject.setBDinLecture(this.state.bdInLecturePeriod)
            newProject.setBDinExam(this.state.bdInExamPeriod)
            newProject.setBDpreferredInLecture(this.state.bdPreferredInLecturePeriod)
            newProject.setSpecialRoom(this.state.specialRoom)


        //newProject.setProjectId();
        console.log(newProject)
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
        if(typeof value === 'string'){
            if (value.trim().length === 0) {
            error = true;
            }
        }
        this.setState({
          [event.target.id]: event.target.value
        });
      }




    render() {
        const {projectName, capacity, externalPartners, shortDescription, bdBeforeLecturePeriod,
            bdInLecturePeriod, bdInExamPeriod, bdPreferredInLecturePeriod, specialRoom, projectModule, semester, docent, projectType, weeklyFlag} = this.state;
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
                                        </TableRow>
                                    </TableHead>
                                    <TableBody style={{width: '50%'}}>
                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                            <FormControl>
                                                    <InputLabel id="demo-simple-select-label">Projekttyp</InputLabel>
                                                    <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={projectType}
                                                    onChange={this.handleChange}
                                                    >
                                                    <MenuItem value={1}>Transdisziplinäres Projekt (10 SWS/20 ECTS; Laufzeit: 2 Semester)</MenuItem>
                                                    <MenuItem value={2}>Interdisziplinäres Projekt (5 SWS/10 ECTS)</MenuItem>
                                                    <MenuItem value={3}>Fachspezifisches Projekt (3 SWS/5 ECTS)</MenuItem>
                                                    </Select>
                                                </FormControl>
{/* 
                                            <input
                                                    type="checkbox"
                                                    label="Fachspezifisches Projekt (3 SWS/5 ECTS)"
                                                    defaultChecked={this.state.complete}
                                                    ref="complete"
                                                    onChange={this.handleChange}
                                                />
                                                Fachspezifisches Projekt (3 SWS/5 ECTS)
                                            </TableCell>
                                        </TableRow>
                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                            <input
                                                    type="checkbox"
                                                    label="Interdisziplinäres Projekt (5 SWS/10 ECTS)"
                                                    defaultChecked={this.state.complete}
                                                    ref="complete"
                                                    onChange={this.handleChange}
                                                />
                                                Interdisziplinäres Projekt (5 SWS/10 ECTS)
                                            </TableCell>
                                        </TableRow>
                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                            <input
                                                    type="checkbox"
                                                    label=" Transdisziplinäres Projekt (10 SWS/20 ECTS; Laufzeit: 2 Semester)"
                                                    defaultChecked={this.state.complete}
                                                    ref="complete"
                                                    onChange={this.handleChange}
                                                />
                                                Transdisziplinäres Projekt (10 SWS/20 ECTS; Laufzeit: 2 Semester) */}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                                <b>Projekttitel:</b>
                                                <form noValidate autoComplete="off">
                                                    <TextField
                                                        id="projectName"
                                                        label=""
                                                        variant="filled"
                                                        color="secondary"
                                                        onChange={this.handleChange}
                                                        value={projectName}
                                                    />
                                                </form>
                                            </TableCell>
                                            <TableCell>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                                <b>Modul:</b>
                                                <form noValidate autoComplete="off">
                                                    <TextField
                                                        id="projectModule"
                                                        label=""
                                                        variant="filled"
                                                        color="secondary"
                                                        onChange={this.handleChange}
                                                        value={projectModule}
                                                    />
                                                </form>
                                            </TableCell>
                                            <TableCell>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                                <b>Semester:</b>
                                                <form noValidate autoComplete="off">
                                                    <TextField
                                                        id="semester"
                                                        label=""
                                                        variant="filled"
                                                        color="secondary"
                                                        onChange={this.handleChange}
                                                        value={semester}
                                                    />
                                                </form>
                                            </TableCell>
                                            <TableCell>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                                <b>Betreuende(r) ProfessorIn:</b>
                                                <form noValidate autoComplete="off">
                                                    <TextField
                                                        id="docent"
                                                        label=""
                                                        variant="filled"
                                                        color="secondary"
                                                        onChange={this.handleChange}
                                                        value={docent}
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
                                                        id="externalPartners"
                                                        label=""
                                                        variant="filled"
                                                        color="secondary"
                                                        onChange={this.handleChange}
                                                        value={externalPartners}
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
                                                        id="shortDescription"
                                                        label=""
                                                        multiline
                                                        rows={6}
                                                        defaultValue=""
                                                        variant="outlined"
                                                        onChange={this.handleChange}
                                                        value={shortDescription}
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
                            <TableBody style={{width: '50%'}}>
                                <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                    <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                        Kapazität:
                                        <form noValidate autoComplete="off">
                                            <TextField
                                                id="capacity"
                                                label=""
                                                variant="filled"
                                                color="secondary"
                                                onChange={this.handleChange}
                                                value={capacity}
                                            />
                                        </form>
                                    </TableCell>
                                </TableRow>

                                <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                    <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                        <input
                                            type="checkbox"
                                            label="Wöchentliche Termine (Präsenzzeit / studentische Gruppenmeetings)"
                                            value={weeklyFlag}
                                            ref="complete"
                                            onChange={this.handleChange}
                                        />Wöchentliche Termine (Präsenzzeit / studentische Gruppenmeetings)
                                    </TableCell>
                                </TableRow>
                                
                                <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                    <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                        Anzahl Blocktage vor Beginn der Vorlesungszeit:
                                        <form noValidate autoComplete="off">
                                            <TextField
                                                id="bdBeforeLecturePeriod"
                                                label=""
                                                variant="filled"
                                                color="secondary"
                                                onChange={this.handleChange}
                                                value={bdBeforeLecturePeriod}
                                            />
                                        </form>
                                    </TableCell>
                                </TableRow>

                                <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                    <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                        Anzahl Blocktage in der Prüfungszeit <b>(nur inter-/trans. Projekte!)</b>:
                                        <form noValidate autoComplete="off">
                                            <TextField
                                                id="bdInExamPeriod"
                                                label=""
                                                variant="filled"
                                                color="secondary"
                                                onChange={this.handleChange}
                                                value={bdInExamPeriod}
                                            />
                                        </form>
                                    </TableCell>
                                </TableRow>

                                <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                    <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                        Anzahl Blocktage in der Vorlesungszeit (Samstage):
                                        <form noValidate autoComplete="off">
                                            <TextField
                                                id="bdInLecturePeriod"
                                                label=""
                                                variant="filled"
                                                color="secondary"
                                                onChange={this.handleChange}
                                                value={bdInLecturePeriod}
                                            />
                                        </form>
                                        <p>Präferierte Tage:</p>
                                        <form noValidate autoComplete="off">
                                            <TextField
                                                id="bdPreferredInLecturePeriod"
                                                label=""
                                                variant="filled"
                                                color="secondary"
                                                onChange={this.handleChange}
                                                value={bdPreferredInLecturePeriod}
                                            />
                                        </form>
                                    </TableCell>
                                </TableRow>

                                <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                    <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                        Besonderer Raum:
                                        <form noValidate autoComplete="off">
                                            <TextField
                                                id="specialRoom"
                                                label=""
                                                variant="filled"
                                                color="secondary"
                                                onChange={this.handleChange}
                                                value={specialRoom}
                                            />
                                        </form>
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
