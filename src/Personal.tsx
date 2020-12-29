import React from 'react';
import Grid from '@material-ui/core/Grid';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '90vh',
    },
}));

const Personal: React.FC = () => {

    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={2}>
                <Menu />
            </Grid>
            <Grid item xs={10}>
                <Dashboard />
            </Grid>
        </Grid>
    );
}

export default Personal;