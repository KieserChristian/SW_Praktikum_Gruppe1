import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import StudentNBO from '../api/StudentNBO';


class NewStudentForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            matriculationNumber: '',
            courseAbbreviation: '',
            email: '',
            currentUserEmail: props.currentUserEmail
        }
        this.baseState = this.state;
    }

    addNewStudent = () => {
        let newStudent = new StudentNBO();
        newStudent.setName(this.state.name);
        newStudent.setMatriculationNumber(this.state.matriculationNumber);
        newStudent.setCourseAbbreviation(this.state.courseAbbreviation);
        newStudent.setGoogleId(this.state.email);
        newStudent.setRoleId(1)
        console.log(newStudent)
        ProjectAdminAPI.getAPI().addStudent(newStudent)
        .then(student => {
            this.setState(this.baseState)
        })
    }

    handleSignUpButton = () => {
        this.addNewStudent();
        alert('Registrierung erfolgreich');
    }

    handleChange = (event) => {
        const value = event.target.value;
        let error = false;
        if (typeof value === 'string'){
            if (value.trim().length === 0) {
            error = true;
            }
        }
        this.setState({
          [event.target.id]: event.target.value
        });
    }

    render() {
        const { classes } = this.props;
        const { name, matriculationNumber, courseAbbreviation, email } = this.state;
        console.log(name)
        console.log(matriculationNumber)
        console.log(courseAbbreviation)
        console.log(email)
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper} align='center'>
                    <Avatar alignItems='center' className={classes.avatar}>
                        <AccountCircleIcon/>
                    </Avatar>
                    <Typography>
                        <b>Registrieren</b>
                    </Typography>
                    <form className={classes.form} noValidate autoComplete='off'>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                    onChange={this.handleChange}
                                    value={name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Matrikelnummer"
                                    id="matriculationNumber"
                                    autoFocus
                                    onChange={this.handleChange}
                                    value={matriculationNumber}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="courseAbbreviation"
                                    label="Studiengangskürzel"
                                    autoFocus
                                    onChange={this.handleChange}
                                    value={courseAbbreviation}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="E-Mail-Adresse"
                                    autoFocus
                                    onChange={this.handleChange}
                                    value={email}
                                />
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.handleSignUpButton}
                            >SignUp
                            </Button>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

const styles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

export default withStyles(styles)(NewStudentForm);