import { AppBar, IconButton, Toolbar} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Profile from '../dialogs/Profile';


class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {classes, currentUser} = this.props;
    return (
      <div className={classes.root}>
        <AppBar style={{marginBottom: 10, marginTop: 10, color: 'white', backgroundColor: '#3f51b5'}} position="static">
          <Toolbar>
          <IconButton  style={{color: 'white'}} component={RouterLink} to={`/about`}>
            <GraphicEqIcon />
            </IconButton>
            <IconButton edge="false" color="inherit" aria-label="menu" component={RouterLink} to={`/login`}>
              <div>&nbsp;Promato</div>
            </IconButton>
            <Profile align='right' currentUser={currentUser}/>
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