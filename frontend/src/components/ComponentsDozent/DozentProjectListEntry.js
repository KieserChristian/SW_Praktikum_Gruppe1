import React, {Component} from 'react';
import { TableRow, TableCell} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ProjectmanagementAPI from '../../api/ProjectmanagementAPI';

/**test */

 class ProjectListEntry extends Component{
    deleteProject(id){
        ProjectmanagementAPI.getAPI().deleteProject(id).then (() => {
            this.props.reloadProjects()}).catch(e => console.log(e))
    }
    render (){
        const {project}=this.props;

        return(
         
                <TableRow key = {project.getID()}>
                    <TableCell >
                        {project.getID()}
                    </TableCell>
                    <TableCell align='center'>
                    {project.getName()}
                    </TableCell>
                    <TableCell align='center' >
                    {project.getCapacity()}
                    </TableCell>
                    <TableCell align='center' >
                    {project.getProjecttype_id()}
                    </TableCell>
                    <TableCell align='center' >
                    {project.getCurrentState()}
                    </TableCell>
                    <TableCell style={{
                        paddingLeft: 0,
                        paddingTop: 0, 
                        paddingBottom: 0, 
                        paddingRight: 10}} align='center'>
                        <IconButton aria-label="expand row" 
                            size="small" 
                            onClick={() => this.deleteProject(project.getID())}>
                            <DeleteIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>
           
            
        )
    }  
}

export default ProjectListEntry;