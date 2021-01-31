import React from 'react';
import { withStyles, Typography, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';


class AdminUserEntry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            personNBO: props.person,
            openDialogInfo: false,
            showDialog: false
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

    openDialogInfo = () => {
        this.setState({
            openDialogInfo: true})
    }

    closeDialogInfo = () => {
        this.setState({
            openDialogInfo: false})
    }

    render() {
        const { classes } = this.props;
        const { personNBO, showDialog, openDialogInfo } = this.state;
        return (
            <div className={classes.root}>
                <Grid container spacing={1} justify='space-between' alignItems='center'>
                    <Grid>
                        <React.Fragment>
                            <IconButton aria-label='expand' size='small' justify='flex-start' onClick={this.openDialogInfo}>
                                <PersonIcon/>
                            </IconButton>
                        </React.Fragment>
                    </Grid>   
                    <Grid style={{marginBottom: 10, marginTop: 10}}> 
                        <Typography className={classes.heading}>
                            <b>{personNBO.getName()}</b>
                            {console.log(personNBO)}
                            {console.log(personNBO.getName())}
                        </Typography>
                    </Grid>
                    <Grid>
                        <React.Fragment>
                            <IconButton aria-label='expand' size='small' justify='flex-start' onClick={this.openDialogInfo}>
                                <EditIcon/>
                            </IconButton>
                            <IconButton aria-label='expand' size='small' justify='flex-start' onClick={this.openDialogInfo}>
                                <CancelIcon/>
                            </IconButton>
                        </React.Fragment>
                    </Grid>
                </Grid>
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
    }
});

export default withStyles(styles)(AdminUserEntry);