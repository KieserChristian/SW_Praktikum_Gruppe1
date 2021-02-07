import Button from '@material-ui/core/Button';
import React from 'react';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


class StartPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>
            <center> 
                <Typography style={{marginTop: 15, marginBottom: 15}} variant='h6'>
                    Willkommen zu Promato
                </Typography>
                <Typography>
                    Ich habe bereits einen Account:
                </Typography>
                <Link to='/login'>
                    <Button
                        size= "large"
                        variant="contained"
                        color="primary">  
                        Einloggen
                    </Button>
                </Link>
                <Typography>
                    Ich habe noch keinen Account:
                </Typography>
                <Link to='/registrierung'>
                    <Button
                        size= "large"
                        variant="contained"
                        color="primary">
                        Registrieren
                    </Button>
                </Link>
            </center>        
            </div>
        )
    }
}

export default StartPage;