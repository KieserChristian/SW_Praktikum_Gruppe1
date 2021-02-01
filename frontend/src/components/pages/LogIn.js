import Button from '@material-ui/core/Button';
import React from 'react';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

class LogIn extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(   
        <div>
            <center> 
                <Typography>
                    Willkommen zu Promato!
                    Wählen Sie bitte Ihre Rolle aus:
                </Typography>
                <Link to='/student'>
                    <Button
                        size= "large"
                        variant="contained"
                        color="primary">  
                        Student
                    </Button>
                </Link>
                <Link to='/dozent'>
                    <Button
                        size= "large"
                        variant="contained"
                        color="primary">
                        Dozent
                    </Button>
                </Link>
                <Link to='/admin'>
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

export default LogIn;