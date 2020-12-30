import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, LinearProgress } from '@material-ui/core';


class LoadingProgress extends Component {

  /** Rendert die Komponenten */
  render() {
    const { classes, show } = this.props;

    return (
      show ?
        <div className={classes.root}>
          <LinearProgress color='secondary' />
        </div>
        : null
    );
  }
}

/** Spezifische styles der Komponenten */
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
  }
});

/** PropTypes */
LoadingProgress.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Wenn bool true, dann ist der Ladeprozess gerendert*/
  show: PropTypes.bool.isRequired,
}

export default withStyles(styles)(LoadingProgress);
