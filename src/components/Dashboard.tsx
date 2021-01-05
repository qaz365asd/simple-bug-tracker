import React, { useState, useCallback } from 'react';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import KanbanList from "./KanbanList";
import KanbanItem from "./KanbanItem";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'

const tempData = new Map([
    ["todo", [{ category: "todo", index: 0, id: "1", title: "title1", description: "des1" }, { category: "todo", index: 1, id: "2", title: "title2", description: "des2" }, { category: "todo", index: 2, id: "4", title: "title3", description: "des3" }]],
    ["backlog", [{ category: "backlog", index: 0, id: "3", title: "backlogttl1", description: "backlogdes1" }]]
])

const useStyles = makeStyles((theme) => ({
    root: {
        border: 'solid',
        borderRadius: 1,
    },
}));

type Data = {
    category: string;
    index: number;
    id: string;
    title: string;
    description: string;
}

const dataProcesser = (list: Data[] | undefined) => {
    if (list === undefined) {
        return []
    } else {
        return list;
    }
}

const mapToArray = (map: Map<string, Data[]>) => {
    const newArray = [];
    for (let [key, value] of map) {
        newArray.push({ key, value })
    }
    return newArray
}

const createCard = (title: string, description: string) => {

}

const createList = (listTitle: string) => {

}

const Dashboard: React.FC = () => {
    //const [lists, setLists] = useState(tempLists);
    const [data, setData] = useState(tempData);
    const classes = useStyles();

    const dragSortableCategory = useCallback((dragIndex: number, dragCategory: string, targetIndex: number, targetCategory: string) => {

        const newData = new Map(data);
        const dragCategoryArray = newData.get(dragCategory);
        const targetCategoryArray = newData.get(targetCategory);
        if (dragCategoryArray !== undefined && targetCategoryArray !== undefined) {
            const dragItem = dragCategoryArray[dragIndex]
            dragCategoryArray.splice(dragIndex, 1);
            for (let i = dragIndex; i < dragCategoryArray.length; i++){
                dragCategoryArray.splice(i, 1, {...dragCategoryArray[i], index: dragCategoryArray[i].index - 1})
            }
            for (let i = targetIndex; i < targetCategoryArray.length; i++){
                targetCategoryArray.splice(i, 1, {...targetCategoryArray[i], index: i + 1})
            }
            targetCategoryArray.splice(targetIndex, 0, {...dragItem, category: targetCategory, index: targetIndex});
            setData(newData);
        } else {
            return data;
        }

    }, [data])

    return (
        <DndProvider backend={HTML5Backend}>
            <Grid container>
                {mapToArray(data).map(list => <KanbanList listTitle={list.key} items={list.value} dragSortableCategory={dragSortableCategory} setData={setData} data={data} />)}
                <button type="button">Create a new list!</button>
            </Grid>
        </DndProvider>
    );
};

export default Dashboard;