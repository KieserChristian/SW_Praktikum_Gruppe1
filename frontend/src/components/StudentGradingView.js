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
            <Grid className={classes.gradings} container spacing={1} justify='flex-start' alignItems='center'>
                <Grid item>
                    <Typography>
                        Benotung:
                    </Typography>
                    {gradings.length > 0 ? 
                        gradings.map(grading =>
                            <div>
                            <div>{grading.getGrade()}</div>
                            </div>
                            )
                            :
                            null
                    }
                </Grid>
            </Grid>
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