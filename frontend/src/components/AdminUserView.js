/*Imports was man für die nachfolgenden Objekete braucht*/
import React from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles, createMuiTheme, Theme } from '@material-ui/core/styles';
import { withStyles, Button, List, ListItem, ListItemSecondaryAction, Typography, Input, Grid, InputAdornment } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import AdminUserEntry from './AdminUserEntry';

/*Klassendefinition*/
class AdminUserView extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          /*leere Liste für die anzuzeigenden Objekte erstellen*/
        users: []
      } 
    }

    /*Funktion aus der ProjectAdminAPI holen*/
    getAllPersons = () => {
        ProjectAdminAPI.getAPI().getAllPersons().then(PersonNBOs =>
            this.setState({
                users: PersonNBOs
            })
        );
    }

    componentDidMount() {
        this.getAllPersons();
    }

    /*Anzeigen*/
    render(){
        const {users}=this.state;
        return(
            <div>
            <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
                <Grid container spacing={1} justify='flex-start' alignItems='center'>
                    <Button style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} variant="contained">
                        Alle Nutzer
                    </Button>
                </Grid>
                <Grid style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}}>
                    <Typography>
                    Hier sehen Sie alle Nutzer und deren Rollen:
                    </Typography>
                    {/*Durchstich*/
                    users.length > 0 ?
                        users.map(person =>
                        /*getName kommt von PersonNBO*/
                    /*<div>{person.getName()}</div>*/
                    <AdminUserEntry key={person.getGoogleId()} person={person}/>)
                            :
                            null
                    }
                </Grid>
            </Paper>
            </div>
        )



    }



}

export default AdminUserView; 