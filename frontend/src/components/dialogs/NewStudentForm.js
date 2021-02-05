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

class NewStudentForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            matriculationNumber: '',
            courseAbbreviation: '',
            currentUserEmail: props.currentUserEmail,
            openNewStudentForm: props.openNewStudentForm
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        //this.addStudent();
        alert('Registrierung erfolgreich');
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    render() {
        const { classes } = this.props;
        const {  } = this.state;
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
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                    value={this.state.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="matriculation"
                                    label="Matrikelnummer"
                                    id="matriculation"
                                    autoFocus
                                    value={this.state.matriculationNumber}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="course"
                                    label="Studiengangskürzel"
                                    name="course"
                                    autoFocus
                                    value={this.state.courseAbbreviation}
                                />
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.handleSubmit}
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
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

export default withStyles(styles)(NewStudentForm);