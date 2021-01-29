import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';


class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <AppBar style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#3f51b5'}} position="static">
          <Toolbar>
            <IconButton edge="false"  color="inherit" aria-label="menu" component={RouterLink} to={`/login`}>
              <GraphicEqIcon />
              <div>&nbsp;Promato</div>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
})


export default withStyles(styles)(Header);