import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { TableRow, TableCell} from '@material-ui/core';
import ProjectNBO from "../api/ProjectNBO";
import DozentProjectList from "./DozentProjectList"

class DozentProjectListEntry extends Component (DozentProjectList) {
    
    //deleteProject(id){
        //ProjectAdminAPI.getAPI().deleteProject(id).then (() => {
                //this.props.reloadProjects()}).catch(e => console.log(e))
//}
    

    render (){
        const {project}=this.props;
        const { classes } = this.props;
        

        return(
     
            <TableRow key = {project.getID()}>
                <TableCell >
                    {project.getID()}
                </TableCell>
                <TableCell align='center'>
                {project.getName("")}
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
                
                </TableCell>
            </TableRow>
       
        
        )
    }  
}
export default DozentProjectListEntry;