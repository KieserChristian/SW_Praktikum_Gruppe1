import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
// import { Link as RouterLink } from 'react-router-dom'
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class LogIn extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        

        return(
            
        <div>
           <center> 
            <Button variant="contained">Student</Button>
            <Button variant="contained">Dozent</Button>
            
                <Link to='/AdminView'>
                <Button
                    size= "large"
                    variant="contained"
                    color="default"
                    
                 >
                            Admin
                  
                </Button>
                </Link>
        </center>        
            <Button variant="contained" size= "large" color="primary" href ="SudentView">Student</Button>
            <Button variant="contained" size= "large" color="secondary" href ="DocentView" >Dozent</Button>
            <Button variant="contained" size= "large" color="default" href ="AdminView" >Admin</Button>
        </div>
         
        
        
        
        );
    }
}


export default LogIn;