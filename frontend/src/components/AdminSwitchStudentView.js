import { Paper } from '@material-ui/core';
import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI'
import PersonNBO from '../api/PersonNBO';
import InfoIcon from '@material-ui/icons/Info';
import AdminViewEntry from './AdminViewEntry'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { withStyles, Button, List, ListItem, ListItemSecondaryAction, Typography, Input, Grid, InputAdornment } from '@material-ui/core';
import AdminSwitchDocentEntry from './AdminSwitchDocentEntry'
import AdminSwitchStudentEntry from './AdminSwitchStudentEntry'


/**
* AdminSwitchStudentView liefert den Output für die Sicht der Studentenoperationen in dem Adminreiter. 
Dies sind alle Studenten welche sich registriert haben und eine Rolle ausgewählt haben.
Es gibt die Auswahlmöglichkeit eines Studenten wieder.
*/


class AdminSwitchStudentView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      students: [],
      filteredStudents: [],
      studentFilter: '',
    }
  }

  getAllStudents = () => {
    ProjectAdminAPI.getAPI().getAllStudents().then(studentBOs =>
      this.setState({
        students: studentBOs,
        filteredStudents: [...studentBOs],
      })
    );
  }

  componentDidMount() {
    this.getAllStudents();
  }

  filterStudent = event => {
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

  render() {
    const { students, studentFilter, filteredStudents } = this.state;
    return (
      <div>
        <Paper style={{ paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15 }} elevation={0}>
          <Grid container spacing={1} justify='flex-start' alignItems='center'>
            <Button style={{ width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10 }} variant="contained">
              Alle Studenten
            </Button>
          </Grid>
          <Grid style={{ width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10 }}>
            <TextField
              autoFocus type='text'
              value={studentFilter}
              onChange={this.filterStudents}
              InputProps={{
                endAdornment: <InputAdornment position='end'>
                  <IconButton onClick={this.clearStudentFilter}>
                    <HighlightOffIcon />
                  </IconButton>
                </InputAdornment>
              }}
            />
          </Grid>
          <Grid style={{ width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10 }}>
            <Typography>
              Hier können Sie den Studenten auswählen:
            </Typography><hr/>
            {
              students.length > 0 ?
                filteredStudents.map(students =>
                  <AdminSwitchStudentEntry  key={students.getId()} students={students} />)

                :
                "Test"
            }
          </Grid>
        </Paper>
      </div>
    )



  }



}

export default AdminSwitchStudentView;