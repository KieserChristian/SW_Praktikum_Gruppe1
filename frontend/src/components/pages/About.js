import { makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

/*  Diese Component kennzeichnet die Urheberschaft von Promato.
    Es werden die Namen der Ersteller angezeigt.
*/

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  },
  content: {
    margin: theme.spacing(1),
  }
}));

function About() {

  const classes = useStyles();

  return (
    <Paper style={{paddingLeft: 20, paddingRight: 20, paddingTop: 20}} elevation={0} className={classes.root}>
      <div className={classes.content}>
        <Typography variant='h6'>
          Promato
        </Typography>
        <br />
        <Typography>
          Promato ist ein webbasiertes Projektverwaltungstool.     
          <br />
          Die Applikation wurde innerhalb eines Projektes von Studierenden der Hochschule der Medien Stuttgart aus dem Studiengang Wirtschaftsinformatik konzipiert und erstellt.
        </Typography>
        <br />
        <br />
        <Typography>
            Umgesetzt von:
            <br />
            <br />
            <Typography>
                Christina Kaden
            </Typography>
            <Typography>
                Jeannine Beil
            </Typography>
            <Typography>
                Yusuf Gögüs
            </Typography>
            <Typography>
                Daniel Erbele
            </Typography>
            <Typography>
                Daniel Weinert
            </Typography>
            <Typography>
                Christian Kieser
            </Typography>          
               
        </Typography>
        <br />
        <br />
        <Typography variant='body2'>
          © Promato
        </Typography>
        <br />
      </div>
    </Paper>
  )
}

export default About;