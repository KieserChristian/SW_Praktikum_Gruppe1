import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProjectForm from './dialogs/ProjectForm';
import ProjectDeleteDialog from './dialogs/ProjectDeleteDialog';


/**
 * Renders a CustomerBO object within a expandable/collapsible CustomerListEntry with the customer manipulation
 * functions. If expanded, it renders a AccountList.
 * 
 * @see See [AccountList](#accountlist)
 * 
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class ProjectListEntry extends Component {

    constructor(props) {
        super(props);

        this.state = {
            project: props.project,
            showProjectForm: false,
            showProjectFormDeleteDialog: false,
        };
    }

      /** Handles onChange events of the underlying ExpansionPanel */
    expansionPanelStateChanged = () => {
        this.props.onExpandedStateChange(this.props.project);
    }

    editProjectButtonClick = (event) => {
        event.stopPropagation();
        this.setState({
            showProjectForm:true
        });
    }

    projectFormClosed = (project) => {
        if(project) {
            this.setState({
                project:project,
                showProjectForm: false
            });
        }
    }

    deleteProjectButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
            showProjectFormDeleteDialog : true
        });
    }

    /** Handles the onClose event of the ProjectDeleteDialog */
    deleteProjectDialogClosed = (project) => {
    // if project is not null, delete it
        if (project) {
            this.props.onProjectDeleted(project);
        }

    // Don´t show the dialog
        this.setState({
            showProjectDeleteDialog: false
        });
    }


    render() {
        const { classes, expandedState } = this.props;
        const { project, showProjectForm, showProjectDeleteDialog} = this.state;

        return (
            <div>
              <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id={`project${project.getID()}projectpanel-header`}
                >
                  <Grid container spacing={1} justify='flex-start' alignItems='center'>
                    <Grid item>
                      <Typography variant='body1' className={classes.heading}>{project.getName()}, {project.getOwner()}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <ButtonGroup variant='text' size='small'>
                        <Button color='primary' onClick={this.editProjectButtonClicked}>
                          edit
                        </Button>
                        <Button color='secondary' onClick={this.deleteProjectButtonClicked}>
                          delete
                        </Button>
                      </ButtonGroup>
                    </Grid>
                    <Grid item xs />
                    <Grid item>
                      <Typography variant='body2' color={'textSecondary'}>List of Participations</Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
              </Accordion>
              <ProjectForm show={showProjectForm} project={project} onClose={this.projectFormClosed} />
              <ProjectDeleteDialog show={showProjectDeleteDialog} project={project} onClose={this.deleteProjectDialogClosed} />
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
    }
});

/** PropTypes */
ProjectListEntry.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** The ProjectBO to be rendered */
    project: PropTypes.object.isRequired,
    /** The state of this ProjectListEntry. If true the customer is shown with its participations */
    expandedState: PropTypes.bool.isRequired,
    /** The handler responsible for handle expanded state changes (exanding/collapsing) of this ProjectListEntry
     *
     * Signature: onExpandedStateChange(ProjectBO project)
     */
    onExpandedStateChange: PropTypes.func.isRequired,
    /**
     *  Event Handler function which is called after a sucessfull delete of this project.
     *
     * Signature: onProjectDelete(ProjectBO project)
     */
    onProjectDeleted: PropTypes.func.isRequired
  }
  
  export default withStyles(styles)(ProjectListEntry);