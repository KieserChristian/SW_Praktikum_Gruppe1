import React from 'react';
import ProjectAdminAPI from '../api/ProjectAdminAPI';
import { withRouter } from 'react-router-dom';
import { Button, Grid, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';

class AdminSwitchView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div >
                <Paper style={{ paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15 }} elevation={0}>
                    <Grid Container spacing={2}>
                        <Grid item xs={12} sm={12} style={{ paddingTop: 10, paddingBottom: 10, }} >

                            <Link to='/admin/projektübersicht'>
                                <Button style={{ width: '25%', paddingBottom: 10, paddingCenter: 10, marginTop: 10, position: 'relative', left: '25%', color: 'white', backgroundColor: '#3f51b5' }} variant="contained"> <AccountBoxOutlinedIcon /> Dozent-Operationen</Button>
                            </Link>
                            <Link to='/admin/nutzerübersicht'>
                                <Button style={{ width: '25%', paddingBottom: 10, paddingCenter: 10, marginTop: 10, position: 'relative', left: '25%', color: 'white', backgroundColor: '#3f51b5' }} variant="contained">Student-Operationen <SchoolOutlinedIcon /> </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        width: '50%',

    }
});

export default withRouter(withStyles(styles)(AdminSwitchView));

