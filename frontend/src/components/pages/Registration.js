import Button from '@material-ui/core/Button';
import React from 'react';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

class Registration extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(   
        <div>
            <center> 
                <Typography style={{marginTop: 15, marginBottom: 15}} >
                    Wählen Sie bitte Ihre Rolle aus:
                </Typography>
                <Link to='/neuerstudent'>
                    <Button
                        size= "large"
                        variant="contained"
                        color="primary">  
                        Student
                    </Button>
                </Link>
                <Link to='/neuerdozent'>
                    <Button
                        size= "large"
                        variant="contained"
                        color="primary">
                        Dozent
                    </Button>
                </Link>
                <Link to='/neueradmin'>
                    <Button
                        size= "large"
                        variant="contained"
                        color="primary">
                        Admin
                    </Button>
                </Link>
            </center>        
        </div>
        );
    }
}

export default Registration;