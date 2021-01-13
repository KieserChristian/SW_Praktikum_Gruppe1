import React from 'react';
import { withRouter } from 'react-router-dom';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { colors } from '@material-ui/core';
import Box from '@material-ui/core/Box';

class StudentGradingView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gradings: [],
            error: null,
        } 
    }

    getAllGradings = () => {
        ProjectAdminAPI.getAPI().getAllGradings().then(gradingBOs => {
            this.setState({
                gradings: gradingBOs,
            })
        })
    }
   
    componentDidMount() {
        this.getAllGradings()
    }

    render() {
        const { classes } = this.props;
        const { gradings } = this.state;

        return(
        <div className={classes.root}>
        <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>
        <Grid Container spacing={2}>
            <Grid item xs={12} sm={6} style={{paddingTop: 10, paddingBottom: 10,}} >
                <Button style={{paddingBottom: 10, paddingLeft: 10}} variant="contained">Projektübersicht</Button>
                <Button style={{paddingBottom: 10, paddingLeft: 10}} variant="contained">Leistungsübersicht</Button>
            </Grid>

            <Grid>
                <Button variant="contained">Notenspiegel</Button>
            </Grid>
        </Grid>
        <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: colors.grey[100]}} colSpan={10}>
                            <Box margin={1}>
                                <Table size="small" aria-label="purchases">
                                    <TableHead >
                                        <TableRow>
                                            <TableCell colSpan={1} padding="none" align="left">EDV-Nummer</TableCell>
                                            <TableCell colSpan={1} padding="none" align="left">Modul</TableCell>
                                            <TableCell colSpan={1} padding="none" align="left">Semester</TableCell>
                                            <TableCell colSpan={1} padding="none" align="center">Note</TableCell>
                                            <TableCell colSpan={1} padding="none" align="center">ECTS</TableCell>
                                            <TableCell colSpan={1} padding="none" align="center">SWS</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableCell colSpan={1} padding="none" align="left">Test</TableCell>
                                        <TableCell colSpan={1} padding="none" align="left">Test</TableCell>
                                        <TableCell colSpan={1} padding="none" align="left">Test</TableCell>
                                        {gradings.length > 0 ? 
                                                gradings.map(grading =>
                                                    <TableCell colSpan={1} padding="none" align="center">{grading.getGrade()}</TableCell>
                                                    )
                                                    :
                                                    null
                                        }
                                        <TableCell colSpan={1} padding="none" align='center'>Test</TableCell>
                                        <TableCell colSpan={1} padding="none" align='center'>Test</TableCell>
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

export default withRouter(withStyles(styles)(StudentGradingView));