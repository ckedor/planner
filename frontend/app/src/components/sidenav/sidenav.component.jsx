import { Box, Drawer, List, ListItem, ListItemText } from "@mui/material"
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link } from "react-router-dom";
import './sidenav.scss'

const SideNav = ({width, items}) =>{

    let currentPath = window.location.pathname
    if (currentPath.slice(-1) === '/'){
      currentPath = currentPath.slice(0, -1)
    }

    return (
      <Drawer
        variant="permanent"
        sx={{
          width: width,
          containerStyle:{height: 'calc(100% - 50px)', top: 50},
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: width, boxSizing: 'border-box' },
        }}
      >
      <Box sx={{ overflow: 'auto', marginTop: '48px'}}>
        <List>
          {items.map((item, index) => (
            <ListItem key={item.name} selected={item.link===currentPath} disablePadding button component={Link} to={item.link}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default SideNav