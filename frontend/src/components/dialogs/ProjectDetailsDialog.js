import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { default as DialogContent, default as DialogContentText } from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
//import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';

class ProjectDetailsDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }

    handleClose = () => {
        this.props.setNewProjectDialogValue({
          name: '',
          value: ''
        });
        this.props.openProjectAddDialog(false);
    }

    onDialogClose =()=>{
        this.props.onCloseProp()
    }

    
    render() {
        const { newProjectDialogValue } = this.state
        const { open } = this.props;
        return (
            <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Test</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Test
                </DialogContentText>
                <Button onClick={this.onDialogClose} >close</Button>        
            </DialogContent>
        </Dialog>
        );
    }
}

export default ProjectDetailsDialog;