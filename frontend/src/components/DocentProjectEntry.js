import React from 'react';
import { withStyles, Typography, Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import ProjectDetailsDialog from './dialogs/ProjectDetailsDialog';
import DocentParticipantsList from './dialogs/DocentParticipantsList';
  
/**
* DocentProjectEntry liefert den Input für die DocentView. Dies sind die Projekt des Dozenten
Gibt die Teilnehmerliste und die Projektinformationen (State: Neue, genehmigt und deren Namen)
Im Projektdetails werden nähere Informationen zu den jeweiligen Projekten dargestellt.
Dies sind angaben zum Projektnamen, Projekttyp, Anzahl ECTS, Anzahl SWS, sowie eine Kurzbeschreibung
*/
class DocentProjectEntry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            projectNBO: props.project,
            openDialogInfo: false,
            openParticipantsList: false
        };
    }

  /**
   * Handling beim öffnen der ParticipansList
   */
    openParticipantsList = () => {
        this.setState({
            openParticipantsList: true
        });
    }
  /**
   * Handling beim schließen der ParticipansList
   */
    closeParticipantsList = () => {
        this.setState({
            openParticipantsList: false
        });
    }
  /**
   * Handlig beim öffnen des Dialogs
   */
    openDialogInfo = () => {
        this.setState({
            openDialogInfo: true})
    }

    /**
   * Handling beim schließen des Dialogs 
   */
    closeDialogInfo = () => {
        this.setState({
            openDialogInfo: false})
    }

  /**
   * Rendern der Componente mit den Inhalten des Projectdialogs und der DocentparticipantsList und 
   * dem zugehörigem Button
   */
    render() {
        const { classes } = this.props;
        const { projectNBO, openParticipantsList, openDialogInfo } = this.state;
        return (
            <div className={classes.root}>
                <Grid container spacing={1} justify='space-between' alignItems='center'>  
                    <Grid style={{marginBottom: 10, marginTop: 10}}> 
                        <React.Fragment>
                            <ProjectDetailsDialog
                            openInfo={openDialogInfo}
                            onCloseProp={this.closeDialogInfo}
                            project={projectNBO}
                            />
                            <IconButton aria-label='expand' size='small' justify='flex-start' onClick={this.openDialogInfo}>
                                <InfoIcon/>
                            </IconButton>
                        </React.Fragment>
                    </Grid>
                    <Grid style={{marginBottom: 10, marginTop: 10}}> 
                        <Typography className={classes.heading}>
                            <b>{projectNBO.getName() }</b> 
                        </Typography>
                        <Typography>
                            Projektstatus: {projectNBO.getState()} 
                        </Typography>
                    </Grid>
                    <Grid>
                        <React.Fragment>
                            <DocentParticipantsList
                            openList={openParticipantsList}
                            onClose={this.closeParticipantsList}
                            project={projectNBO}
                            currentUserEmail={this.props.currentUserEmail}
                            />
                            <Button style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#697bdb'}}
                            onClick={this.openParticipantsList}>
                                Teilnehmerliste
                            </Button>
                        </React.Fragment>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
/**
* Styling der Component
*/
const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    }
});

export default withStyles(styles)(DocentProjectEntry);