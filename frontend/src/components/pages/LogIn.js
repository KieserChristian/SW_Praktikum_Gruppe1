import React from 'react';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';

class LogIn extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return(
        <div>
            <Button variant="contained">Student</Button>
            <Button variant="contained">Dozent</Button>
            <Button variant="contained">Admin</Button>
        </div>
        );
    }
}


export default LogIn;