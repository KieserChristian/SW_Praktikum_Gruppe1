import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import ProjectNBO from '../api/ProjectNBO';
import { withRouter } from 'react-router-dom';
import { withStyles, Grid, Button, Paper} from '@material-ui/core';
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



/* import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder' */
import TextField from '@material-ui/core/TextField';

/**Wird geöffnet, wenn man oben in der Dozenten Navigation auf "Neues Projekt klickt".
Erzeugt eine Seite, auf der es verschiedene Auswwahlfenster oder Eingabefelder gibt, 
die man mit den richtigen Werten ausfüllen muss, um am Ende ein Projekt zu erstellen
und dieses dann einem Admin zur Freigabe schickt.
*/

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
            projectType: "",
            module: "",
            semester: "",
            person: null,
            currentUserEmail: props.currentUserEmail,
        };
        this.baseState = this.state;
    }

/**addProject ist in der DocentProjectCreation von nöten, da damit die einzelnen "set" Funktionen gesetzt werden,
 * um am Ende ein Projekt mit den jeweiligen Werten zu befüllen.
 */
    addProject = async() => {
        let newProject = await new ProjectNBO();
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
            newProject.setProjectTypeId(this.state.projectType)
            newProject.setPersonId(this.state.person)
            console.log(this.getDocentById())
            newProject.setModuleId(this.state.module)
            newProject.setSemesterId(this.state.semester)
            //newProject.setWeeklyFlag(this.state.weeklyFlag)

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

/**getDocentById gibt hier zuerst die aktuelle GoogleId (Google-Account Email) des aktuellen Users aus.
 * Damit kann dann der Docent über diese Id ausgelesen werden.
 */
    getDocentById = () => {
        ProjectAdminAPI.getAPI().getPersonByGoogleId(this.props.currentUserEmail)
        .then(docent => {
            this.setState({
                person: docent[0].getId()                              
            })
        })
    }
/**Lifecycle-Methode, die aufgerufen wird, wenn die Komponente in den Browser eingefügt wird.
*/
    componentDidMount() {
        this.getDocentById();
    }
/**Übermittelt den Wert, den man eingibt weiter an die Datenbank.
 * HandleCahnge st über this.state von oben bei addProject verbunden
 */
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

    handleProjectTypeIdChange = (event) => {
        this.setState({projectType: event.target.value})
    }

    handleModuleIdChange = (event) => {
        this.setState({module: event.target.value})
    }

    handleSemesterChange = (event) => {
        this.setState({semester: event.target.value})
    }

    render() {
        const {projectName, capacity, externalPartners, shortDescription, bdBeforeLecturePeriod,
            bdInLecturePeriod, bdInExamPeriod, bdPreferredInLecturePeriod, specialRoom, module, semester, person, projectType, weeklyFlag} = this.state;
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
                                            <FormControl style={{minWidth: 130}}>
                                                <InputLabel id="projectType">Projekttyp</InputLabel>
                                                    <Select
                                                    labelId="projectType"
                                                    id="projectType"
                                                    margin= 'dense'
                                                    value={this.state.projectType}
                                                    onChange={this.handleProjectTypeIdChange}
                                                    >
                                                    <MenuItem value={1}>Transdisziplinäres Projekt (10 SWS/20 ECTS; Laufzeit: 2 Semester)</MenuItem>
                                                    <MenuItem value={2}>Interdisziplinäres Projekt (5 SWS/10 ECTS)</MenuItem>
                                                    <MenuItem value={3}>Fachspezifisches Projekt (3 SWS/5 ECTS)</MenuItem>
                                                    </Select>
                                                </FormControl>
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
                                                        fullWidth
                                                        margin= 'dense'
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
                                            <FormControl style={{minWidth: 130}}>
                                                <InputLabel id="module">Modul</InputLabel>
                                                    <Select
                                                    labelId="module"
                                                    id="module"
                                                    margin= 'dense'
                                                    fullWidth
                                                    value={this.state.module}
                                                    onChange={this.handleModuleIdChange}
                                                    >
                                                    <MenuItem value={1}>DataScience</MenuItem>
                                                    <MenuItem value={2}>Strategien digitaler Medien</MenuItem>
                                                    <MenuItem value={3}>Business Intelligence</MenuItem>
                                                    </Select>
                                            </FormControl>
                                            </TableCell>
                                            <TableCell>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                            <FormControl style={{minWidth: 130}}>
                                                <InputLabel id="semester">Semester</InputLabel>
                                                    <Select
                                                    labelId="semester"
                                                    id="semester"
                                                    margin= 'dense'
                                                    fullWidth
                                                    value={this.state.semester}
                                                    onChange={this.handleSemesterChange}
                                                    >
                                                    <MenuItem value={1}>SS 20</MenuItem>
                                                    <MenuItem value={2}>WS 20/21</MenuItem>
                                                    <MenuItem value={3}>SS 21</MenuItem>
                                                    <MenuItem value={4}>WS 21/22</MenuItem>
                                                    </Select>
                                            </FormControl>
                                            </TableCell>
                                            <TableCell>
                                            </TableCell>
                                        </TableRow>

{/*                                         <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                                <b>Betreuende(r) ProfessorIn:</b>
                                                <form noValidate autoComplete="off">
                                                    <TextField
                                                        id="person"
                                                        label=""
                                                        variant="filled"
                                                        fullWidth
                                                        margin= 'dense'
                                                        onChange={this.handleChange}
                                                        value={person}
                                                    />
                                                        {console.log(person)}
                                                </form>
                                            </TableCell>
                                            <TableCell>
                                            </TableCell>
                                        </TableRow> */}

                                        <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                            <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                                <b>Externer Kooperationspartner:</b>
                                                <form noValidate autoComplete="off">
                                                    <TextField
                                                        id="externalPartners"
                                                        label=""
                                                        variant="filled"
                                                        fullWidth
                                                        margin= 'dense'
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
                                                        fullWidth
                                                        margin= 'dense'
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
                                            <TextField style={{maxWidth: 60}}
                                                id="capacity"
                                                label=""
                                                variant="filled"
                                                margin= 'dense'
                                                onChange={this.handleChange}
                                                value={capacity}
                                            />
                                        </form>
                                    </TableCell>
                                </TableRow>
{/* 
                                <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                    <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                        <input
                                            type="checkbox"
                                            label="weeklyFlag"
                                            value={weeklyFlag}
                                            ref="complete"
                                            onChange={this.handleChange}
                                        />Wöchentliche Termine (Präsenzzeit / studentische Gruppenmeetings)
                                    </TableCell>
                                </TableRow> */}
                                
                                <TableRow style={{minwidth: '50%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={0} variant="contained" padding="dense" align="left">
                                    <TableCell style={{backgroundColor: '#e0e0e0'}}>
                                        Anzahl Blocktage vor Beginn der Vorlesungszeit:
                                        <form noValidate autoComplete="off">
                                            <TextField style={{maxWidth: 60}}
                                                id="bdBeforeLecturePeriod"
                                                label=""
                                                variant="filled"
                                                margin= 'dense'
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
                                            <TextField style={{maxWidth: 60}}
                                                id="bdInExamPeriod"
                                                label=""
                                                variant="filled"
                                                margin= 'dense'
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
                                            <TextField style={{maxWidth: 60}}
                                                id="bdInLecturePeriod"
                                                label=""
                                                variant="filled"
                                                margin= 'dense'
                                                onChange={this.handleChange}
                                                value={bdInLecturePeriod}
                                            />
                                        </form>
                                        <p>Präferierte Tage:</p>
                                        <form noValidate autoComplete="off">
                                            <TextField style={{maxWidth: 60}}
                                                id="bdPreferredInLecturePeriod"
                                                label=""
                                                variant="filled"
                                                margin= 'dense'
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
                                                fullWidth
                                                margin= 'dense'
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
