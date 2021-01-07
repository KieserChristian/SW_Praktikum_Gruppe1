import React from 'react';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';

class LogIn extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return(
        <div>
            <Button variant="contained" size= "large" color="primary" href ="SudentView">Student</Button>
            <Button variant="contained" size= "large" color="secondary" href ="DocentView" >Dozent</Button>
            <Button variant="contained" size= "large" color="default" href ="AdminView" >Admin</Button>
        </div>
        );
    }
}


export default LogIn;