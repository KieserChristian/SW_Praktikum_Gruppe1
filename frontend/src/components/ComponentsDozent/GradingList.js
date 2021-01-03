import React, {Component} from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import ProjectAdministration from '../../api/ProjectAdministration';
import ProjectListEntry from '../ProjectListEntry.js';
import DozentProjectListEntry from './DozentProjectListEntry'
import PersonNBO from '../../api/PersonNBO';
import StudentNBO from "../../api/StudentNBO";
import GradingBO from "../../api/GradingBO";
import ProjectNBO from"../../apiProject";
import SemesterNBO from "../"

class GradingList extends Components {
    constructor (props){
        super(props)
        this.state ={
        grading: [],
        project: new ProjectNBO("Daniel, Weinert, Matr.Nr., Project ,Note, bestanden/nicht bestanden "),
        error: ""
        }
        this.state.grading.setID(1)
        this.getAllProjectsForPerson = this.getAllProjectsForPerson.bind(this)
    }
    getAllProjectsForPerson(){
        console.log(this.state);
        ProjectmanagementAPI.getAPI().getProjectsForPerson(this.state.person.getID()).then(projectNBOs => 
        this.setState({
            projects:projectNBOs
        })).catch(e => 
            this.setState({
                projects:[],
                error:e
        }));
         console.log("error:",this.state.error)

    getAllProjects(){
        ProjectmanagementAPI.getAPI().getProjects().then(projectBOs => 
            this.setState({
                projects:projectBOs
            })).catch(e => 
                this.setState({
                    projects:[],
                    error:e
            }));
        console.log("error:",this.state.error)
    }
        
    componentDidMount(){
        this.getAllProjectsForPerson()
    }

    render(){
        const{projects} = this.state

    
        return(
            <div>
             <Paper>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell> ID</TableCell>
                                <TableCell align='center'>Projekt</TableCell>
                                <TableCell align='center' >Name</TableCell>
                                <TableCell align='center' >Matriculation_Number</TableCell>
                                <TableCell align='center' >Note</TableCell>
                                <TableCell align='center' >Bearbeiten</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {projects.map(project => <GradingList key={project.getID()} project={project} reloadProjects={this.getAllProjectsForPerson}/>)}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}
export default GradingList;