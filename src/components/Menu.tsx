import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const Menu: React.FC = () => {
    //TODO implement some sort of profile on top of the list
    return (
        <List>
            <ListItem button>
                <ListItemText primary='Overview' />
            </ListItem>
            <ListItem button>
                <ListItemText primary='Personal' />
            </ListItem>
            <ListItem button>
                <ListItemText primary='Schedule' />
            </ListItem>
            <ListItem button>
                <ListItemText primary='Settings' />
            </ListItem>
        </List>
    );
}

export default Menu;