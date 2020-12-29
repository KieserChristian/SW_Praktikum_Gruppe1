import React, {Component} from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import ProjectAdministration from '../../api/ProjectAdministration';
import ProjectListEntry from '../ProjectListEntry.js';
import DozentProjectListEntry from './DozentProjectListEntry'
import PersonNBO from '../../api/PersonNBO';


class DozentProjectList extends Component{
    constructor(props){
        super(props)
        this.state = {
            projects: [],
            person: new PersonNBO("Daniel", "Weinert", "googleID", "mail", "Dozent"),
            error:""
        }
        this.state.person.setID(2) /**Rolle Dozent =2 */
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
    }
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
                                <TableCell align='center' >Kapazität</TableCell>
                                <TableCell align='center' >Projekttyp</TableCell>
                                <TableCell align='center' >Status</TableCell>
                                <TableCell align='center' >Bearbeiten</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {projects.map(project => <DozentProjectListEntry key={project.getID()} project={project} reloadProjects={this.getAllProjectsForPerson}/>)}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}
 export default DozentProjectList;