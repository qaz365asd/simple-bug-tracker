import React from 'react';
import {Grid, List} from '@material-ui/core/'
import KanbanItem from './KanbanItem'

type Props = {

}

const KanbanList: React.FC<Props> = () => {
    return (
        <Grid item xs={3}>
            <h1>Kanban List Title here</h1>
            <List>
                <KanbanItem />
                <KanbanItem />
            </List>
        </Grid>
    );
}

export default KanbanList