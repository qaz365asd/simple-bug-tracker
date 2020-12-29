import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        border: 'solid',
        backgroundColor: 'grey',
        margin: '2px',
        padding: '2px',
    }
}));

type Props = {

}

const KanbanItem: React.FC<Props> = () => {

    const classes = useStyles();

    return (
    <div className={classes.root}>
        <h2>Card Title Here</h2>
        <p>card description here</p>
    </div>
    );
}

export default KanbanItem;