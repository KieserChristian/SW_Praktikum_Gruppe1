import Button from '@material-ui/core/Button';
import ProjectAdminAPI from '../../api/ProjectAdminAPI';
import Dialog from '@material-ui/core/Dialog';
import { default as DialogContent, default as DialogContentText } from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
//import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';

/*  Dieser Dialog öffnet sich, sobald der Info-Button nebem einem Projekt aus der StudentAvailableProjectEntry.js angeklickt wird.
    Er behinhaltet einen Infotext mit dem Projektnamen, Projekttyp, Anzahl ECTS, Anzahl SWS, sowie eine Kurzbeschreibung und 
    lässt sich über einen Close-Button schließen.
*/

class ProjectDetailsDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
            ProjectNBOs: props.project,
            module: null,
            numberSws: null,
        }
    }


    getModuleByProject = () => {
        ProjectAdminAPI.getAPI().getModuleByProject(this.state.ProjectNBOs.getId())
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

    getNumberSwsByProject = () => {
        ProjectAdminAPI.getAPI().getNumberSwsByProject(this.state.ProjectNBOs.getId())
        .then(numberSwsAPI => {
            this.setState({
            numberSws: numberSwsAPI,
            loadingProgress: false,
            error: null
          });
        }).catch(e => {
          this.setState({
            numberSws: null,
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
        this.getModuleByProject();
        this.getNumberSwsByProject();
    }

    onDialogClose =()=>{
        this.props.onCloseProp()
    }

    
    render() {
        const { openInfo } = this.props;
        const { ProjectNBOs , module, numberSws} = this.state;
        return (
            <Dialog open={openInfo} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{color: 'white', backgroundColor: '#4caf50'}}><b>{ProjectNBOs.getName()}</b></DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {module?
                        <b>Modul: {module.getName()}</b> 
                    :"Test(Modulname)"}
                </DialogContentText>
                <DialogContentText>
                <b>Projekttyp:</b> 
                </DialogContentText>
                <DialogContentText>
                <b>Kapazität: {ProjectNBOs.getCapacity()} Plätze</b> 
                </DialogContentText>
                <DialogContentText>
                <b>ECTS:</b> 
                </DialogContentText>
                <DialogContentText>
                    {numberSws?
                        <b>{numberSws.getNumberSws()}</b> 
                    :"Test(10SWS)"}
                </DialogContentText>
                <DialogContentText>
                <b>Kurzbeschreibung:</b> {ProjectNBOs.getShortDescription()}
                </DialogContentText>
                <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#ff5722'}} onClick={this.onDialogClose} >close</Button>        
            </DialogContent>
        </Dialog>
        );
    }
}

export default ProjectDetailsDialog;