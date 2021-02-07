import React from 'react';
import { withStyles, Grid, Typography, Button } from '@material-ui/core';
import GradingBO from '../../api/GradingBO';
import ProjectAdminAPI from '../../api/ProjectAdminAPI';
import TextField from '@material-ui/core/TextField';

class DocentParticipantEntry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            student: props.student,
            grade: null,
            grading: null,
        }
        this.baseState = this.state;
        console.log(this.state.student.getId())
    }

    addGradingToParticipation = async() => {
        let participation = await ProjectAdminAPI.getAPI().getParticipationByStudent(this.state.student.getId())
        console.log(ProjectAdminAPI.getAPI().getParticipationByStudent(this.state.student.getId()))
        let newGrading = new GradingBO();
        newGrading.setGrade(this.state.grade)
        newGrading.setParticipationId(participation.getId())
        ProjectAdminAPI.getAPI().addGrading(newGrading)
        .then(grading => {
            this.setState(this.baseState)
        })
    }

    getGradingByParticipationOfStudent = async() => {
        let participation = await ProjectAdminAPI.getAPI().getParticipationByStudent(this.state.student.getId())
        console.log(participation.getId())
        ProjectAdminAPI.getAPI().getGradingByParticipation(participation.getId())
        .then(gradingBO => {
            this.setState({
                grading: gradingBO
            })
        })
    }

    handleGradingButton = () => {
        this.addGradingToParticipation();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    componentDidMount() {
        this.getGradingByParticipationOfStudent();
    }

    render() {
        const { classes } = this.props;
        const { student, grade, grading } = this.state;
        console.log(grading)
        return (
            <div className={classes.root}>
                <Grid container spacing={1} xs={12}>
                    <Grid item style={{marginBottom: 10, marginTop: 10}} xs={6}>
                        <Typography className={classes.heading}>
                            <b>{student.getName()}</b>
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography className={classes.heading}>
                            { grading ?
                            <b>Note: {grading[0].getGrade()}</b>
                            :
                            'noch keine Bewertung'
                            }
                        </Typography>
                    </Grid>
                    <Grid>
                        <form className={classes.form} noValidate autoComplete='off'>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="grade"
                                label="Note"
                                autoFocus
                                onChange={this.handleChange}
                                value={grade}
                            />
                        </form>
                    </Grid>
                    <Grid item xs={3}>
                        <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#697bdb'}}
                        onClick={this.addGradingToParticipation}>
                            Bewerten
                        </Button>
                    </Grid>
                </Grid>
                <hr/>
            </div>
        )
    }
}

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    }
});

export default withStyles(styles)(DocentParticipantEntry);