import styles from './sidenav.module.scss'
import { Box, Drawer, List, ListItem, ListItemText } from "@mui/material"
import ListItemIcon from '@mui/material/ListItemIcon';
import {useRouter} from 'next/router';
import { useState } from 'react';

const SideNav = ({items}:{items: Array<any>}) => {
    const router = useRouter()
    const [currentPath, setCurrentPath] = useState(router.pathname)
    const sidenavWidth = 200

    function navigate(link:string) {
      setCurrentPath(link)
      router.push(link)
    }

    return (
      <Drawer
        variant="permanent"
        sx={{
          width: sidenavWidth,
          containerStyle:{height: 'calc(100% - 50px)', top: 50},
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: sidenavWidth, boxSizing: 'border-box' },
        }}
      >
      <Box sx={{ overflow: 'auto', marginTop: '48px'}}>
        <List>
          {items.map((item, index) => (
            <ListItem 
              className={styles.sidenav_list_item} 
              key={item.name} 
              selected={item.link===currentPath} 
              disablePadding 
              button 
              onClick={(event) => navigate(item.link)
              }>
                <ListItemIcon className={styles.sidenav_list_icon}>
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