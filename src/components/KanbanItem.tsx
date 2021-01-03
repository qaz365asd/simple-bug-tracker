import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ItemTypes } from './ItemTypes';
import { useDrag } from 'react-dnd';

const useStyles = makeStyles((theme) => ({
    root: {
        border: 'solid',
        borderRadius: '10px',
        backgroundColor: '#f2f2f2',
        margin: '2px',
        padding: '2px',
    }
}));

type KanbanItemProps = {
    category: string;
    id: string;
    title: string;
    description: string;
}

const KanbanItem: React.FC<KanbanItemProps> = ({ id, category, title, description}) => {

    const classes = useStyles();

    const [{ isDragging }, drag] = useDrag({
        item: { id: id, category: category, type: ItemTypes.CARD },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    })

    const opacity = isDragging ? 0.3 : 1;

    return (
        <div
            ref={drag}
            style={{ opacity }}
            className={classes.root}>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}
export default KanbanItem;