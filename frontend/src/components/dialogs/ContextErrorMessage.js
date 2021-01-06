import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import AutorenewIcon from '@material-ui/icons/Autorenew';

/**
 * Sobald im System ein Error entsteht, wird diese ContextErrorMessage ausgegeben.
 * Dadurch weiß der Benutzer, welcher Fehler entstanden ist.
 */

class ContextErrorMessage extends Component {
    #standardText = "Das hätte nicht passieren sollen, sorry!";

    render() {
        const { classes, error, contextErrorMsg, onReload } = this.props;

        return (
            (error) ?
              <Alert severity='error' className={classes.root}>
                <div>
                  {this.#standardText}
                </div>
                <AlertTitle>
                  {contextErrorMsg}
                </AlertTitle>
                <div className={classes.margins}>
                  Error message (for debugging only) is:
                </div>
                <div>
                  {error.message}
                </div>
                {
                  onReload ?
                    <div className={classes.margins}>
                      <Button variant='contained' color='primary' startIcon={<AutorenewIcon />} onClick={onReload}>
                        Reload
                  </Button>
                    </div>
                    : null
                }
              </Alert>
              : null
          );
        }
}

// Komponenten-spezifische Styles
const styles = theme => ({
    margins: {
      marginTop: theme.spacing(2)
    }
  });

// PropTypes
ContextErrorMessage.propTypes = {
    classes: PropTypes.object.isRequired,
    error: PropTypes.object,
    contextErrorMsg: PropTypes.string,
    onReload: PropTypes.func
  }
  
export default withStyles(styles)(ContextErrorMessage);