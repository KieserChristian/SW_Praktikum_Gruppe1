import React, { createRef } from 'react';
import { Popover, IconButton, Avatar, ClickAwayListener, withStyles, Typography, Paper, Button, Grid, Divider } from '@material-ui/core';
import firebase from 'firebase/app';

class Profile extends React.Component {

    #profileButtonRef = createRef();

    constructor(props) {
        super(props);

        this.state = {
            openProfile: false,
            currentUser: props.currentUser
        }
    }

    handleOpenProfile = () => {
        this.setState ({
            openProfile: true
        });
    }

    handleClose = () => {
        this.setState ({
            openProfile: false
        });
    }

    handleSignOut = () => {
        firebase.auth().signOut();
    }

    render() {
        const { classes, currentUser } = this.props;
        const { openProfile } = this.state;
        return (
            currentUser ?
            <div>
                <IconButton 
                className={classes.profileButton} 
                ref={this.#profileButtonRef}
                onClick={this.handleOpenProfile}>
                    <Avatar src={currentUser.photoURL}/>
                </IconButton>
                <Popover 
                    open={openProfile} 
                    anchorEl={this.#profileButtonRef.current} 
                    onClose={this.handleClose}
                    anchorOrigin={{ 
                        vertical: 'top', 
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}> 
                    <ClickAwayListener onClickAway={this.handleClose}>
                        <Paper className={classes.profileBox}>
                            <Typography align='center'>
                                Hallo!
                            </Typography>
                            <Divider className={classes.divider}/>
                            <Typography align='center'>
                                {currentUser.displayName}
                            </Typography>
                            <Typography align='center'>
                                {currentUser.email}
                            </Typography>
                            <Divider className={classes.divider}/>
                            <Grid align='center'>
                                <Button color='primary' onClick={this.handleSignOut}>
                                    Abmelden
                                </Button>
                            </Grid>
                        </Paper>
                    </ClickAwayListener>
                </Popover>
            </div>
            :
            null
        )
    }
}

const styles = theme => ({
    profileButton: {
      float: 'right'
    },
    divider: {
      margin: theme.spacing(1),
    },
    profileBox: {
      padding: theme.spacing(1),
      background: theme.palette.background.default
    }
});


export default withStyles(styles)(Profile);