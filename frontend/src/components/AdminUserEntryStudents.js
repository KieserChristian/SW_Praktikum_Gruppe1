import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { withStyles, Typography, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import AdminUserDeletion from './dialogs/AdminUserDeletion';
import AdminUserDeletionStudents from './dialogs/AdminUserDeletionStudents';
import AdminUserUpdate from './dialogs/AdminUserUpdate';
import AdminUserUpdateStudents from './dialogs/AdminUserUpdateStudents';
import roleNBO from '../api/RoleNBO';


/**
* AdminUserEntryStudents liefert den Input für die Nutzerübersicht der Studenten in dem Adminreiter. 
Dies sind alle Studenten welche sich registriert haben und eine Rolle ausgewählt haben.
Es gibt die Nutzerrolle, den Nutzernamen ,die Bearbeitungsmöglichkeit und die Löschmöglichkeit wieder.
*/


class AdminUserEntryStudents extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            studentNBO: props.student,
            openDialogUpdate: false,
            showDialog: false,
            openDialogDeletion: false
        };
    }

    handleClick = () => {
        this.setState({
            showDialog: true
        });
    }

    closeDialog = () => {
        this.setState({
            showDialog: false
        });
    }

    openDialogUpdate = () => {
        this.setState({
            openDialogUpdate: true})
    }

    closeDialogUpdate = () => {
        this.setState({
            openDialogUpdate: false})
    }

    openDialogDeletion = () => {
        this.setState({
            openDialogDeletion: true})
    }

    closeDialogDeletion = () => {
        this.setState({
            openDialogDeletion: false})
    }

    render() {
        const { classes, student } = this.props;
        const { error, showDialog, openDialogUpdate, openDialogDeletion } = this.state;
        return (
            <div className={classes.root}>
                <Grid container spacing={1} justify='space-between' alignItems='center'>
                    <Grid>
                        <React.Fragment>
                            <IconButton aria-label='expand' size='small' justify='flex-start' onClick={this.openDialogInfo}>
                                <PersonIcon/>
                            </IconButton>
                            <Typography className={classes.secondaryHeading}>
                                <b>Student</b>
                            </Typography>
                        </React.Fragment>
                    </Grid>
                    <Grid style={{marginBottom: 10, marginTop: 10}}> 
                        <Typography className={classes.heading}>
                            <b>{student.getName()}</b>
                        </Typography>
                    </Grid>
                    <Grid>
                        <React.Fragment>
                            {<AdminUserUpdateStudents
                                openUpdate={openDialogUpdate}
                                onCloseProp={this.closeDialogUpdate}
                                student={student}
                                onUpdate={this.props.onUpdate}
                            />}
                                <IconButton aria-label='expand' size='small' justify='flex-start' onClick={this.openDialogUpdate}>
                                    <EditIcon/>
                                </IconButton>
                            {<AdminUserDeletionStudents
                                openDeletion={openDialogDeletion}
                                onCloseProp={this.closeDialogDeletion}
                                student={student}
                                onDelete={this.props.onDelete}
                            />}
                                <IconButton aria-label='expand' size='small' justify='flex-start' onClick={this.openDialogDeletion}>
                                    <CancelIcon/>
                                </IconButton>
                        </React.Fragment>
                    </Grid>
                </Grid><hr/>
            </div>
        );
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
    },

    secondaryHeading: {
        fontSize: theme.typography.pxToRem(10),
        color: theme.palette.text.secondary,
    }
});

export default withStyles(styles)(AdminUserEntryStudents);