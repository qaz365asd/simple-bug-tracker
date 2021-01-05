import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ItemTypes } from './ItemTypes';
import { useDrag, useDrop } from 'react-dnd';
import { XYCoord } from 'dnd-core'
import { EnumType } from 'typescript';

const useStyles = makeStyles((theme) => ({
    root: {
        border: 'solid',
        borderRadius: '10px',
        backgroundColor: '#f2f2f2',
        margin: '10px',
        padding: '2px',
    }
}));

type KanbanItemProps = {
    category: string;
    id: string;
    title: string;
    description: string;
    index: number;
    dragSortableList: Function;
    dragSortableCategory: Function;
}

const KanbanItem: React.FC<KanbanItemProps> = ({ id, category, title, description, index, dragSortableList, dragSortableCategory }) => {

    const ref = useRef<HTMLDivElement>(null);
    const classes = useStyles();
    //TODO: The dragging within list can be buggy when opacity is in place
    const [{ isDragging }, drag] = useDrag({
        item: { id: id, index: index, category: category, type: ItemTypes.KANBANITEM },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    })

    const [, drop] = useDrop({
        accept: ItemTypes.KANBANITEM,
        hover: (item, monitor) => {
            
            const currDragDivBound = ref.current?.getBoundingClientRect();
            const offSet = monitor.getClientOffset();
            console.log(currDragDivBound)
            console.log(offSet);

            if (monitor.getItem().category === category && offSet !== null && currDragDivBound !== undefined) {
                const dragIndex = monitor.getItem().index;
                const targetIndex = index;
                dragSortableList(dragIndex, targetIndex, currDragDivBound, offSet);
                monitor.getItem().index = targetIndex;
            } else {
                const dragIndex = monitor.getItem().index;
                const dragCategory = monitor.getItem().category;
                const targetIndex = index;
                const targetCategory = category;
                dragSortableCategory(dragIndex, dragCategory, targetIndex, targetCategory);
                monitor.getItem().category = targetCategory;
                monitor.getItem().index = targetIndex;
            }
        }
    })

    const opacity = isDragging ? 1 : 1;

    drag(drop(ref))

    return (
        <div
            style = {{opacity}}
            ref={ref}
            className={classes.root}>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}
export default KanbanItem;