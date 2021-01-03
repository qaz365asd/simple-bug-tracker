import React, { Children } from 'react';
import { Grid, List } from '@material-ui/core/'
import KanbanItem from './KanbanItem'
import { makeStyles } from '@material-ui/core/styles';
import { ItemTypes } from './ItemTypes';
import { useDrop } from 'react-dnd';

const useStyles = makeStyles((theme) => ({
    root: {
        border: 'solid',
        backgroundColor: '#d9d9d9',
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
    items: { category: string, id: string, title: string, description: string }[];
    dropFunction: Function;
    setData: React.Dispatch<React.SetStateAction<Map<string, Data[]>>>
    data: Map<string, Data[]>
}

const KanbanList: React.FC<KanbanListProps> = ({ listTitle, items, dropFunction, setData, data }) => {
    const classes = useStyles();

    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop: (item, monitor) => dropFunction(setData, data, monitor.getItem().id, monitor.getItem().category, listTitle),
    })

    return (
        <Grid item xs={3}>
            <div ref={drop} id={listTitle} className={classes.root}>
                <h1>{listTitle}</h1>
                <List>
                    {items.map(({ category, id, title, description }) => <KanbanItem category={category} id={id} title={title} description={description} />)}
                </List>
                <button type="button">Create a new card!</button>
            </div>
        </Grid>
    );

}

export default KanbanList