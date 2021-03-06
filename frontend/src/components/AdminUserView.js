/*Imports was man für die nachfolgenden Objekete braucht*/
import React from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles, createMuiTheme, Theme } from '@material-ui/core/styles';
import { withStyles, Button, List, ListItem, ListItemSecondaryAction, Typography, Input, Grid, InputAdornment } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import AdminUserEntry from './AdminUserEntry';
import AdminUserEntryStudents from './AdminUserEntryStudents';


/**
* AdminUserView liefert den Output für die Nutzerübersicht der Studenten, Dozenten und Admins in dem Adminreiter. 
Dies sind alle Studenten,Admins und Dozenten welche sich registriert haben und eine Rolle ausgewählt haben.
Es gibt die Nutzerrolle, den Nutzernamen ,die Bearbeitungsmöglichkeit und die Löschmöglichkeit wieder.
*/


/*Klassendefinition*/
class AdminUserView extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          /*leere Liste für die anzuzeigenden Objekte erstellen*/
        persons: [],
        filteredPersons: [],
        personFilter: '',
        students: [],
        filteredStudents: [],
        studentFilter: '',
      } 
    }

    /*Funktion aus der ProjectAdminAPI holen*/
    getAllPersons = () => {
        ProjectAdminAPI.getAPI().getAllPersons().then(PersonNBOs =>
            this.setState({
                persons: PersonNBOs,
                filteredPersons: [...PersonNBOs]
            })
        );
    }

    getAllStudents = () => {
        ProjectAdminAPI.getAPI().getAllStudents().then(StudentNBOs =>
            this.setState({
                students: StudentNBOs,
                filteredStudents: [...StudentNBOs]
            })
        );
    }

    componentDidMount() {
        this.getAllPersons();
        this.getAllStudents();
    }

    filterPersons = event => {
        const searchterm = event.target.value.toLowerCase();
        this.setState({
          filteredPersons: this.state.persons.filter(persons => {
            let personNameContainsValue = persons.getName().toLowerCase().includes(searchterm);
            return personNameContainsValue
          }),
          personFilter: searchterm
        })
    }
    
    clearPersonFilter = () => {
        this.setState({
          filteredPersons: [...this.state.persons],
          personFilter: ''
        })
    }

    removePerson = (personId) => {
        console.log(this.state.filteredPersons[0])
        console.log(personId)
        let newPersons= this.state.filteredPersons.filter(person => person.getGoogleId()!== personId)
        console.log(newPersons.length)
        this.setState({
            filteredPersons: this.state.filteredPersons.filter(person => person.getGoogleId()!== personId)
        })
    }

    filterStudents = event => {
        const searchterm = event.target.value.toLowerCase();
        this.setState({
          filteredStudents: this.state.students.filter(students => {
            let studentNameContainsValue = students.getName().toLowerCase().includes(searchterm);
            return studentNameContainsValue
          }),
          studentFilter: searchterm
        })
    }

    clearStudentFilter = () => {
        this.setState({
          filteredStudents: [...this.state.students],
          studentFilter: ''
        })
    }

    removeStudent = (studentId) => {
        console.log(this.state.filteredStudents[0])
        console.log(studentId)
        let newStudents= this.state.filteredStudents.filter(student => student.getGoogleId()!== studentId)
        console.log(newStudents.length)
        this.setState({
            filteredStudents: this.state.filteredStudents.filter(student => student.getGoogleId()!== studentId)
        })
    }

    updatePerson = (personNBO) => {
        let newPersons= this.state.filteredPersons.filter(person => person.getGoogleId()!== personNBO.getGoogleId())
        newPersons.push(personNBO)
        console.log(personNBO)
        this.setState({
            filteredPersons: newPersons
        })
    }

    updateStudent = (studentNBO) => {
        let newStudents= this.state.filteredStudents.filter(student => student.getGoogleId()!== studentNBO.getGoogleId())
        newStudents.push(studentNBO)
        console.log(studentNBO)
        this.setState({
            filteredStudents: newStudents
        })
    }

    /*Anzeigen*/
    render(){
        const { persons, personFilter, filteredPersons, students, studentFilter, filteredStudents } = this.state;
        return(
            <div>
            <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
                <Grid container spacing={1} justify='flex-start' alignItems='center'>
                    <Button style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} variant="contained">
                        Dozenten und Admins
                    </Button>
                </Grid>
                <Grid style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}}>
                    <TextField 
                        autoFocus type='text' 
                        value={personFilter} 
                        onChange={this.filterPersons}
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>
                                <IconButton onClick={this.clearPersonFilter}>
                                    <HighlightOffIcon/>
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                </Grid>
                <Grid>
                    <Typography>
                    Hier sehen Sie Dozenten und Admins:
                    </Typography><hr/>
                    {/*Durchstich*/
                    persons.length > 0 ?
                        filteredPersons.map(person =>
                    <AdminUserEntry key={person.getGoogleId()} person={person} onDelete={() => this.removePerson(person.getGoogleId())} onUpdate={this.updatePerson}/>)
                            :
                            null
                    }
                </Grid>
            </Paper>
            <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
                <Grid container spacing={1} justify='flex-start' alignItems='center'>
                    <Button style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} variant="contained">
                        Studenten
                    </Button>
                </Grid>
                <Grid style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}}>
                    <TextField 
                        autoFocus type='text' 
                        value={studentFilter} 
                        onChange={this.filterStudents}
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>
                                <IconButton onClick={this.clearStudentFilter}>
                                    <HighlightOffIcon/>
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                </Grid>
                <Grid>
                    <Typography>
                    Hier sehen Sie Studenten:
                    </Typography><hr/>
                    {
                    students.length > 0 ?
                        filteredStudents.map(student =>
                    <AdminUserEntryStudents key={student.getGoogleId()} student={student} onDelete={() => this.removeStudent(student.getGoogleId())} onUpdate={this.updateStudent}/>)
                        :
                        null
                    }
                </Grid>
            </Paper>
            </div>
        )



    }



}

export default AdminUserView; 