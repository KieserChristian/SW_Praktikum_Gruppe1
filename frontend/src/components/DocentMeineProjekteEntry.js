import React from "react";
import { TableRow, TableCell } from "material-ui/Table";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ProjectAdminAPI from "../api/ProjectAdminAPI";
import ProjectNBO from "../api/ProjectNBO";
import { Button, Grid, Typography, withStyles} from '@material-ui/core';






class DocentMeineProjekteEntry extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            ProjectNBOs: props.project,
            projects: []
            
        };
    }

    render (){
        const { classes } = this.props;
        const { ProjectNBOs } = this.state;
    
        return(
                <div className={classes.root}>
                        <Grid className={classes.project} container spacing={1}>
                            <TableRow >
                                <TableCell>
                                    { ProjectNBOs.getId() }
                                </TableCell>
                                <TableCell align='center'>
                                    { ProjectNBOs.getName() }
                                </TableCell>
                                <TableCell align='center' >
                                    { ProjectNBOs.getCapacity() }
                                </TableCell>
                                <TableCell align='center' >
                                <Grid item style={{marginBottom: 10, marginTop: 10}}>
                                    <Typography className={classes.heading}>
                                        { ProjectNBOs.getState() }
                                    </Typography>
                                </Grid>    
                                       
                                </TableCell>
                                <TableCell style={{
                                    paddingLeft: 0,
                                    paddingTop: 0, 
                                    paddingBottom: 0, 
                                    paddingRight: 10}} align='center'>
                                
                                    
                                </TableCell>
                            </TableRow>
                        </Grid>
                </div>
            
        );
    }  
}

export default DocentMeineProjekteEntry;
