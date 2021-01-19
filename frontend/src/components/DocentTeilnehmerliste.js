import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { colors } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ProjectAdminAPI from '../api/ProjectAdminAPI';

class DocentTeilnehmerliste extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            students:[],
            error: null,
        }
    }

    getStudentById = () => {
        ProjectAdminAPI.getAPI().getStudentById().then(studentNBOs => {
            this.setState({
                students: studentNBOs,
            })
        })
    }
   
    componentDidMount() {
        this.getStudentById()
    }
  

    render() {
        const { classes } = this.props;
        const { studentNBOs } = this.state;
        

        return(
        <div className={classes.root}>
        <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
        <Grid Container spacing={2}>
            <Grid>
                <Button style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} variant="contained">Teilnehmerliste</Button> 
            </Grid>
        </Grid>
        <TableRow>
                    <TableCell style={{width: '100%', paddingBottom: 0, paddingTop: 0, backgroundColor: colors.grey[100]}} colSpan={10}>
                            <Box margin={1}>
                                <Table size ="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Matr.Nr.</TableCell>
                                            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Name</TableCell>
                                            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="center">Benotung</TableCell>
                                            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="center">Speichern</TableCell>
                                            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="center">Löschen</TableCell>
                                            <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="center">Test</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}}>
                                        <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Test</TableCell>
                                        <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="left">Test</TableCell>
                                        <TableCell><TextField  align="center" id="standard-number" type="number" InputLabelProps={{ shrink: true,}}></TextField></TableCell>
                                        <TableCell><Button style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="center" variant="contained" color="primary" size="small" className={classes.button} startIcon={<SaveIcon/>}>Speichern</Button></TableCell>
                                        <TableCell><IconButton style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="center" aria-label="delete" className={classes.margin}><DeleteIcon fontSize="small" /></IconButton></TableCell>

                                                <TableCell style={{width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10}} colSpan={1} padding="none" align="center" >{ studentNBOs.getName() }</TableCell>


                                    
                                    </TableBody>
                                </Table>
                            </Box>
                        </TableCell>
            </TableRow>
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

export default withRouter(withStyles(styles)(DocentTeilnehmerliste));