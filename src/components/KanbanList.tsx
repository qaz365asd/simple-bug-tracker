import React, { useCallback, useRef, useState } from 'react';
import { Grid, List } from '@material-ui/core/'
import KanbanItem from './KanbanItem'
import { makeStyles } from '@material-ui/core/styles';
import { ItemTypes } from './ItemTypes';
import { useDrop } from 'react-dnd';
import { XYCoord } from 'dnd-core';

const useStyles = makeStyles((theme) => ({
    root: {
        border: 'solid',
        backgroundColor: '#d9d9d9',
        margin: '2px',
        padding: '2px',
    }
}));

type Data = {
    category: string;
    id: string;
    title: string;
    description: string;
    index: number;
}

type KanbanListProps = {
    listTitle: string;
    items: { category: string, index: number, id: string, title: string, description: string }[];
    dragSortableCategory: Function;
    setData: React.Dispatch<React.SetStateAction<Map<string, Data[]>>>
    data: Map<string, Data[]>
}

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, setInput: React.Dispatch<React.SetStateAction<{
    title: string;
    description: string;
}>>) => {
    if (event.target.name === "title") {
        setInput((prevState) => ({ ...prevState, title: event.target.value }));
    } else {
        setInput((prevState) => ({ ...prevState, description: event.target.value }));
    }
}

const KanbanList: React.FC<KanbanListProps> = ({ listTitle, items, dragSortableCategory, setData, data }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState({ title: "", description: "" });
    const classes = useStyles();

    const [, drop] = useDrop({
        accept: ItemTypes.KANBANITEM,
        hover: (item, monitor) => {
            if (items.length === 0) {
                let dragIndex = monitor.getItem().index;
                let dragCategory = monitor.getItem().category;
                let targetCategory = listTitle;
                dragSortableCategory(dragIndex, dragCategory, 0, targetCategory)
                monitor.getItem().category = targetCategory;
                monitor.getItem().index = 0;
            }
        }
    })

    const createCard = () => {
        //TODO: Createcard id is incorrect and should be fixed later
        const newData = new Map(data);
        const newArray = newData.get(listTitle);
        if (newArray !== undefined) {
            newArray.push({
                category: listTitle,
                index: newArray.length,
                id: "5",
                title: input.title,
                description: input.description,
            })
            setInput({title: "", description: ""})
        }
        console.log(newData);
        setData(newData);
    }

    const dragSortableList = useCallback((dragIndex: number, targetIndex: number, currDragDivBound: DOMRect, offSet: XYCoord) => {

        //TODO: Consider making drag and drop more sophisicated: 1. Items push up and down accordingly respective to the elements (50% of width) 
        const newData = new Map(data);

        const oldArray = newData.get(listTitle);
        const newArray = newData.get(listTitle);
        const itemHeight = currDragDivBound.height;

        if (newArray !== undefined && oldArray !== undefined) {
            if (dragIndex === targetIndex) {
                return data;
            } else {
                const prevItem = oldArray[targetIndex];
                const newItem = oldArray[dragIndex];
                newArray.splice(targetIndex, 1, { ...newItem, index: targetIndex });
                newArray.splice(dragIndex, 1, { ...prevItem, index: dragIndex });
                setData(newData);
            }
        }
    }, [data])

    drop(ref)

    return (
        <Grid item xs={3}>
            <div ref={ref} id={listTitle} className={classes.root}>
                <h1>{listTitle}</h1>
                <List>
                    {items.map(({ category, id, title, description, index }) => <KanbanItem category={category} id={id} title={title} description={description} index={index} dragSortableList={dragSortableList} dragSortableCategory={dragSortableCategory} />)}
                </List>
                <label>
                    Title:
                <br />
                    <input name="title" type="text" value={input.title} onChange={(event) => handleInputChange(event, setInput)} />
                </label>
                <label>
                    Description:
                <br />
                    <input name="description" type="text" value={input.description} onChange={(event) => handleInputChange(event, setInput)} />
                </label>
                <button type="button" onClick={createCard}>Create a new card!</button>
            </div>
        </Grid>
    );

}

export default KanbanList