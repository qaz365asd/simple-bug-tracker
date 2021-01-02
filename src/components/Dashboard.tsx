import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import KanbanList from "./KanbanList";
import KanbanItem from "./KanbanItem";

const tempLists = ["todo", "backlog"]
const tempData = [{ category: "todo", id: "1", title: "title1", description: "des1" }, { category: "todo", id: "2", title: "title2", description: "des2" }, { category: "backlog", id: "3", title: "backlogttl1", description: "backlogdes1" }];

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

const drop = (event: React.DragEvent<HTMLDivElement>, setData: React.Dispatch<React.SetStateAction<Data[]>>, data: Data[]) => {
    //TODO: Consider making drag and drop more sophisicated: 1. elements disappear on dragStart; 2. div box changes size accordingly; 3. able to rearrange element orders accordingly
    event.preventDefault();
    const dataDropped = event.dataTransfer.getData("text"); //Returns id of element dragged and dropped
    const newCategory = (event.target as HTMLDivElement).id; //Returns id of the list being dropped to
    const oldData = data.find(data => data.id === dataDropped);
    const newArray = data.filter(item => item.id !== dataDropped)
    console.log(newArray)
    if (oldData !== undefined && tempLists.includes(newCategory)) {
        console.log([...newArray, {
            category: newCategory,
            id: oldData.id,
            title: oldData.title,
            description: oldData.description
        }])
        setData([...newArray, {
            category: newCategory,
            id: oldData.id,
            title: oldData.title,
            description: oldData.description
        }]);
    } else {
        return data;
    }
}

const Dashboard: React.FC = () => {
    const [lists, setLists] = useState(tempLists);
    const [data, setData] = useState(tempData);
    const classes = useStyles();

    //TODO: Implementation of a more time efficent rendering of KanbanItems; currently O(n^2)
    return (
        <Grid container>
            {lists.map(list => <KanbanList listTitle={list} items={data.filter(({ category }) =>
                list === category)} dropFunction={drop} setData={setData} data={data} />)}
        </Grid>
    );
};

export default Dashboard;