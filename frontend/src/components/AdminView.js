import React from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, createMuiTheme, Theme } from '@material-ui/core/styles';
import { withStyles, Button, List, ListItem, ListItemSecondaryAction, Typography, Input, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'gray'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export default function MenuListComposition() {
  const classes = useStyles();

  return (

    <div className={classes.root}>
      <Grid container spacing={3}>
        <MenuList>
          <Grid item xs={12}>
            <h3>ADMIN</h3>
            <Paper className={classes.paper}>
                <MenuItem>Nutzerübersicht</MenuItem>
                <MenuItem>Projekteübersicht</MenuItem>
                <React.Fragment>
                                
                                   
                  <Link to='/admin/eingereichteprojekte'>
                    <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#4caf50'}}>
                        Projekteübersicht
                    </Button>
                  </Link>
                             
                </React.Fragment>
            </Paper>
          </Grid>
        </MenuList>
      </Grid>
    </div>
  );
}