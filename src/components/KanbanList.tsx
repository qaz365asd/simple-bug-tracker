import React, { Children } from 'react';
import { Grid, List } from '@material-ui/core/'
import KanbanItem from './KanbanItem'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        border: 'solid',
        backgroundColor: 'grey',
        margin: '2px',
        padding: '2px',
        height: '100vh',
    }
}));

type Data = {
    category: string;
    id: string;
    title: string;
    description: string;
}

type KanbanListProps = {
    listTitle: string;
    items: { id: string, title: string, description: string }[];
    dropFunction: Function;
    setData: React.Dispatch<React.SetStateAction<Data[]>>
    data: Data[]
}

const dragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
}

const KanbanList: React.FC<KanbanListProps> = ({ listTitle, items, dropFunction, setData, data}) => {
    const classes = useStyles();
    return (
        <Grid item xs={3}>
            <div id={listTitle} className={classes.root} onDrop={(event) => dropFunction(event, setData, data)} onDragOver={(event) => dragOver(event)}>
            <h1>{listTitle}</h1>
            <List>
                {items.map(({ id, title, description }) => <KanbanItem id={id} title={title} description={description} dropFunction={dropFunction} />)}
            </List>
            </div>
        </Grid>
    );
}

export default KanbanList