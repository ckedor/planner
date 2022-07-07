import { Box, Drawer, List, ListItem, ListItemText, Toolbar } from "@mui/material"
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link } from "react-router-dom";
const SideNav = ({width, items}) =>{


    let currentPath = window.location.pathname
    if (currentPath.slice(-1) === '/'){
      currentPath = currentPath.slice(0, -1)
      console.log(currentPath)
    }

    return (
        <Drawer
        variant="permanent"
        sx={{
          width: width,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: width, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
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