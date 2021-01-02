import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        border: 'solid',
        backgroundColor: 'blue',
        margin: '2px',
        padding: '2px',
    }
}));

type KanbanItemProps = {
    id: string;
    title: string;
    description: string;
    dropFunction: Function;
}

const dragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", (event.target as HTMLDivElement).id);
}

const KanbanItem: React.FC<KanbanItemProps> = ({ id, title, description, dropFunction}) => {

    const classes = useStyles();

    return (
        <div
            id={id}
            className={classes.root}
            draggable="true"
            onDragStart={(event) => dragStart(event)}>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}
export default KanbanItem;