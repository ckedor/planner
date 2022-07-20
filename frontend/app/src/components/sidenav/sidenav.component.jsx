import { Box, Drawer, List, ListItem, ListItemText } from "@mui/material"
import ListItemIcon from '@mui/material/ListItemIcon';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './sidenav.scss'

const SideNav = ({width, items}) =>{

    const [currentPath, setCurrentPath] = useState(window.location.pathname)

    useEffect( () =>{
      let currentPath = window.location.pathname
      if (currentPath.slice(-1) === '/'){
        currentPath = currentPath.slice(0, -1)
      }
      setCurrentPath(currentPath)
    }, []);

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
            <ListItem 
              className="sidenav-list-item" 
              key={item.name} 
              selected={item.link===currentPath} 
              disablePadding 
              button 
              component={Link} 
              to={item.link} 
              onClick={(event) => setCurrentPath(item.link)
              }>
                <ListItemIcon className="sidenav-list-icon">
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