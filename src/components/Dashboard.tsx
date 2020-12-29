import React from 'react';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import KanbanList from "./KanbanList";

const useStyles = makeStyles((theme) => ({
    root: {
        border: 'solid',
        borderRadius: 1,
    },
}));


const Dashboard: React.FC = () => {
    
    const classes = useStyles();

    return (
        <Grid container>
            <KanbanList/>
            <KanbanList/>
            <KanbanList/>
            <KanbanList/>
        </Grid>
    );
}

export default Dashboard;