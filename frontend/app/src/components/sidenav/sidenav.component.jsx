import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material"
import ListItemIcon from '@mui/material/ListItemIcon';

const SideNav = ({width, items}) =>{

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
              <ListItem key={item.name} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                   {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
        )
}

export default SideNav