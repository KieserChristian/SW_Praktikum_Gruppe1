import React from 'react';
import { withRouter } from 'react-router-dom';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { withStyles, Grid, Button, Paper, Typography, FormRow} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { colors } from '@material-ui/core';
import Box from '@material-ui/core/Box';

class DocentProjectCreation extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
            <Paper style={{paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
                <Grid><h1>Anmeldung<br/>
                Projekte Fakultät 3</h1>
                </Grid>
                <Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6} elevation={0}>
                    <Paper style={{backgroundColor: '#eeeeee'}}><b>Art des Projekts</b></Paper>
                    </Grid>
                    <Grid item xs={6}>
                    <Paper style={{backgroundColor: '#eeeeee'}}><b>Kategorie des Projekts</b></Paper>
                    </Grid>
                    <Grid item xs={6}>
                    <Paper style={{backgroundColor: '#eeeeee'}}>Fachspezifisches Projekt (3 SWS/5 ECTS)</Paper>
                    </Grid>
                    <Grid item xs={6}>
                    <Paper style={{backgroundColor: '#eeeeee'}}>
                        <p>-</p>
                        <p>Nummer:</p>
                        <p>Titel:</p>
                    </Paper>
                    </Grid>
                </Grid>

{/*                 <TableRow>
                    <TableCell style={{width: '100%', paddingBottom: 0, paddingTop: 0, backgroundColor: colors.grey[100]}} colSpan={10}>
                            <Box margin={1}>
                                <Table size="small" aria-label="purchases">
                                    <TableHead >
                                        <TableRow>
                                            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">EDV-Nummer</TableCell>
                                            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Modul</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}}>
                                        <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Test</TableCell>
                                        <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Test</TableCell>
                                    </TableBody>
                                </Table>
                            </Box>
                    </TableCell>    
                </TableRow> */}

                </Grid>
            </Paper>
            </div>

        );
    }
}

const styles = theme => ({
    root: {
      width: '100%',
    }
  });

export default withRouter(withStyles(styles)(DocentProjectCreation));
