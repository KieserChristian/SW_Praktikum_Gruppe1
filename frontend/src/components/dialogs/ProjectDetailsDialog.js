import Button from '@material-ui/core/Button';
import ProjectAdminAPI from '../../api/ProjectAdminAPI';
import Dialog from '@material-ui/core/Dialog';
import { default as DialogContent, default as DialogContentText } from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { Component } from 'react';

/*  Dieser Dialog öffnet sich, sobald der Info-Button nebem einem Projekt aus der "StudentAvailableProjectsEntry.js",
    sowie der "StudentProjectEntry.js" angeklickt wird.
    Er behinhaltet einen Infotext mit dem Projektnamen, , Modul, Dozent, Projekttyp, Anzahl ECTS, Anzahl SWS, 
    Kapazität, sowie eine Kurzbeschreibung und lässt sich über einen Close-Button schließen.
*/

class ProjectDetailsDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
            projectNBO: props.project,
            module: null,
            numberSws: null,
            numberEcts: null,
            projectType: this.props.propProjectType,
            person: this.props.propPerson
        }
    }

    getModuleById = () => {
        //console.log(this.state.projectNBO)
        //console.log(this.state.projectNBO.getModuleId())
        ProjectAdminAPI.getAPI().getModuleById(this.state.projectNBO.getModuleId())
        .then(moduleNBO => {
            this.setState({
            module: moduleNBO,
            loadingProgress: false,
            error: null
          });
        }).catch(e => {
          this.setState({
            module: null,
            loadingInProgress: false,
            error: e
          })
        });
        this.setState({
        loadingInProgress: true,
        error: null
        });
    }

    getProjectTypeById = () => {
        ProjectAdminAPI.getAPI().getProjectTypeById(this.state.projectNBO.getProjectTypeId())
        .then(projectTypeNBO => {
            this.setState({
            projectType: projectTypeNBO,
            loadingProgress: false,
            error: null
          });
        }).catch(e => {
          this.setState({
            projectType: null,
            loadingInProgress: false,
            error: e
          })
        });
        this.setState({
        loadingInProgress: true,
        error: null
        });
    }

    getPersonById = () => {
        ProjectAdminAPI.getAPI().getPersonById(this.state.projectNBO.getPersonId())
        .then(personNBO => {
            this.setState({
            person: personNBO,
            loadingProgress: false,
            error: null
          });
        }).catch(e => {
          this.setState({
            person: null,
            loadingInProgress: false,
            error: e
          })
        });
        this.setState({
        loadingInProgress: true,
        error: null
        });
    }

    componentDidMount() {
        this.getModuleById();
        this.getProjectTypeById();
        this.getPersonById();
    }

    onDialogClose =()=>{
        this.props.onCloseProp()
    }

    render() {
        const { openInfo } = this.props;
        const { projectNBO, module, projectType, person} = this.state;
        return (
            <Dialog open={openInfo} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{color: 'white', backgroundColor: '#4caf50'}}><b>{projectNBO.getName()}</b></DialogTitle>
            <DialogContent>
                <DialogContentText>
                { module ?
                    <b>Modul: {module.getName()}</b> 
                    :
                    'Modul: keine Angabe'}
                </DialogContentText>
                <DialogContentText>
                { person ?
                    <b>Dozent: {person.getName()}</b> 
                    :
                    'Dozent: keine Angabe'}
                </DialogContentText>
                <DialogContentText>
                { projectType ?
                    <b>Projekttyp: {projectType.getName()}</b> 
                    :
                    'Projekttyp: keine Angabe'}
                </DialogContentText>
                <DialogContentText>
                { projectNBO ?
                    <b>Kapazität: {projectNBO.getCapacity()} Plätze</b>
                    :
                    'Kapazität: keine Angabe'}
                </DialogContentText>
                <DialogContentText>
                { projectType ?
                    <b>Anzahl ECTS: {projectType.getNumberEcts()}</b> 
                    :
                    'Anzahl ECTS: keine Angabe'}
                </DialogContentText>
                <DialogContentText>
                { projectType ?
                    <b>Anzahl SWS: {projectType.getNumberSws()}</b> 
                    :
                    'Anzahl SWS: keine Angabe'}
                </DialogContentText>
                <DialogContentText>
                { projectNBO ?
                    <b>Kurzbeschreibung: {projectNBO.getShortDescription()}</b>
                    :
                    'Kurzbeschreibung: keine Angabe'}
                </DialogContentText>
                <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#ff5722'}} onClick={this.onDialogClose} >Schließen</Button>        
            </DialogContent>
        </Dialog>
        );
    }
}

export default ProjectDetailsDialog;