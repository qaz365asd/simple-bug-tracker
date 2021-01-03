import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import KanbanList from "./KanbanList";
import KanbanItem from "./KanbanItem";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'

/*
const tempLists = ["todo", "backlog"]
const tempData = [{ category: "todo", id: "1", title: "title1", description: "des1" }, { category: "todo", id: "2", title: "title2", description: "des2" }, { category: "backlog", id: "3", title: "backlogttl1", description: "backlogdes1" }];
*/

const tempData = new Map([
    ["todo", [{ category: "todo", id: "1", title: "title1", description: "des1" }, { category: "todo", id: "2", title: "title2", description: "des2" }]],
    ["backlog", [{ category: "backlog", id: "3", title: "backlogttl1", description: "backlogdes1" }]]
])

const useStyles = makeStyles((theme) => ({
    root: {
        border: 'solid',
        borderRadius: 1,
    },
}));

type Data = {
    category: string;
    id: string;
    title: string;
    description: string;
}

const drop = (setData: React.Dispatch<React.SetStateAction<Map<string, Data[]>>>, data: Map<string, Data[]>, dragId: string, dragCategory: string, targetCategory: string) => {
    //TODO: Consider making drag and drop more sophisicated: 1. elements disappear on dragStart; 2. div box changes size accordingly; 3. able to rearrange element orders accordingly
    const newData = new Map(data);
    const oldData = dataProcesser(data.get(dragCategory)).find(data => data.id === dragId);
    if (oldData !== undefined && data.has(targetCategory)) {
        const newArrayInOldCategory = dataProcesser(data.get(dragCategory)).filter(item => item.id !== dragId);
        newData.set(dragCategory, newArrayInOldCategory);
        const newArrayInNewCategory = [...dataProcesser(newData.get(targetCategory)), {
            category: targetCategory,
            id: oldData.id,
            title: oldData.title,
            description: oldData.description
        }]
        newData.set(targetCategory, newArrayInNewCategory);
        setData(newData);
    } else {
        return data;
    }
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

    return (
        <DndProvider backend={HTML5Backend}>
        <Grid container>
            {mapToArray(data).map(list => <KanbanList listTitle={list.key} items={list.value} dropFunction={drop} setData={setData} data={data} />)}
            <button type="button">Create a new list!</button>
        </Grid>
        </DndProvider>
    );
};

export default Dashboard;