import { Paper } from '@material-ui/core';
import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI'
import PersonNBO from '../api/PersonNBO';
import InfoIcon from '@material-ui/icons/Info';
import AdminViewEntry from './AdminViewEntry'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { withStyles, Button, List, ListItem, ListItemSecondaryAction, Typography, Input, Grid, InputAdornment } from '@material-ui/core';
import AdminSwitchDocentEntry from './AdminSwitchDocentEntry'

class AdminSwitchDocentView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      docents: [],
      filteredDocents: [],
      docentFilter: '',
    }
  }

  getPersonsByRole = () => {
    ProjectAdminAPI.getAPI().getPersonsByRole(2).then(docentBOs =>
      this.setState({
        docents: docentBOs,
        filteredDocents: [...docentBOs],
      })
    );
  }

  componentDidMount() {
    this.getPersonsByRole();
  }

  filterDocents = event => {
    const searchterm = event.target.value.toLowerCase();
    this.setState({
      filteredDocents: this.state.docents.filter(docents => {
        let docentNameContainsValue = docents.getName().toLowerCase().includes(searchterm);
        return docentNameContainsValue
      }),
      docentFilter: searchterm
    })
  }

  clearDocentFilter = () => {
    this.setState({
      filteredDocents: [...this.state.docents],
      docentFilter: ''
    })
  }

  render() {
    const { docents, docentFilter, filteredDocents } = this.state;
    return (
      <div>
        <Paper style={{ paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15 }} elevation={0}>
          <Grid container spacing={1} justify='flex-start' alignItems='center'>
            <Button style={{ width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10 }} variant="contained">
              Alle Dozenten
            </Button>
          </Grid>
          <Grid style={{ width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10 }}>
            <TextField
              autoFocus type='text'
              value={docentFilter}
              onChange={this.filterDocents}
              InputProps={{
                endAdornment: <InputAdornment position='end'>
                  <IconButton onClick={this.clearDocentFilter}>
                    <HighlightOffIcon />
                  </IconButton>
                </InputAdornment>
              }}
            />
          </Grid>
          <Grid style={{ width: '100%', paddingBottom: 10, paddingLeft: 10, marginTop: 10 }}>
            <Typography>
              Hier können Sie den Dozenten auswählen:
            </Typography>
            {
              docents.length > 0 ?
                filteredDocents.map(docents =>
                  <AdminSwitchDocentEntry  key={docents.getId()} docents={docents} />)

                :
                "Test"
            }
          </Grid>
        </Paper>
      </div>
    )



  }



}

export default AdminSwitchDocentView;