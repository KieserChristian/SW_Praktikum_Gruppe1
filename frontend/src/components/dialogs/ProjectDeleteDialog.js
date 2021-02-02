import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ProjectAdminAPI from '../../api/ProjectAdminAPI';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import ProjectAdminAPI from '../../api/ProjectAdminAPI';

/**
 * Shows a modal delete/cancle dialog, which asks for deleting a project. The projectBO to be deleted must be given in prop project.
 * In dependency of the user interaction (delete/cancel) the respective backendcall is made. After that, the function of the onClose prop
 * is called with the deleted projectBO object as parameter. When the dialog is canceled, onClose is called with null.
 *
 * @see See Material-UIs [Dialog](https://material-ui.com/components/dialogs)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class ProjectDeleteDialog extends Component {

    constructor(props) {
        super(props);
  
        // Init the state
        this.state = {
            deletingInProgress: false,
            deletingError: null
        };
    }

    deleteProject =() => {
        ProjectAdminAPI.getAPI().deleteProject(this.props.project.getId()).then(project => {
            this.setState({
                deletingInProgress: false,
                deletingError: null
            });
            this.props.onClose(this.props.project);
        
        }).catch(e => 
            this.setState({
                deletingInProgress: false,
                deletingError:e

            })
        );

        this.setState({
            deletingInProgress: true,
            deletingError: null
        });
    }

    handleClose = () => {
        this.props.onClose(null);
    }

    render() {
        const { classes, project, show } = this.props;
        const { deletingInProgress, deletingError } = this.state,

        return(
            show ?
                <Dialog open= {show} onClose={this.handleClose}>
                    <DialogTitle id="delete-dialog-title">
                        Project löschen
                        <IconButton className={classes.closeButton} onClick={this.handleClose}>
                            <CloseIcon/>
                        </IconButton>

                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Sicherheitswarnung Projekt löschen? 
                        </DialogContentText>
                        <LoadingProgress show={deletingInProgress}/>
                        <ContextErrorMessage error={deletingError} contextErrorMsg ={"Das Projekt ${project.getName()}"}
                            onReload={this.deleteProject}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={this.deleteProject} color="primary">
                            Delete

                        </Button>
                    </DialogActions>

                </Dialog>
                :null
        );
    }

}

/** Component specific styles */
const styles = theme => ({
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    }
  });
  
  /** PropTypes */
  ProjectDeleteDialog.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** The ProjectBO to be deleted */
    project: PropTypes.object.isRequired,
    /** If true, the dialog is rendered */
    show: PropTypes.bool.isRequired,
    /**
     * Handler function which is called, when the dialog is closed.
     * Sends the deleted ProjectBO as parameter or null, if cancel was pressed.
     *
     * Signature: onClose(ProjectBO Project);
     */
    onClose: PropTypes.func.isRequired,
  }
  
  export default withStyles(styles)(ProjectDeleteDialog);