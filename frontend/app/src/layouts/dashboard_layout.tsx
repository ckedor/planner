import React, { useContext } from 'react';
import NavbarComponent from '../components/navbar/navbar.component';
import SideNav from '../components/sidenav/sidenav.component';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TimelineIcon from '@mui/icons-material/Timeline';
import SavingsIcon from '@mui/icons-material/Savings';
import { AuthContext } from '../context/AuthContext';
import Login from '../pages/login';
import HouseIcon from '@mui/icons-material/House';

function DashboardFinancasLayout ({ children }:{ children:any }, ) {

    const financasMenuItems = [{name: 'Gastos', link: '/dashboard/financas/gastos', icon: <AttachMoneyIcon />},
                             {name: 'Evolução Gastos', link: '/dashboard/financas/evolucao-gastos', icon: <TimelineIcon />},
                             {name: 'Contas da Casa', link: '/dashboard/financas/contas_casa', icon: <HouseIcon />},
                            ]
    
    const {isAuthenticated} = useContext(AuthContext)
                         
    return (
        isAuthenticated ? (
            <> 
            <NavbarComponent></NavbarComponent>
            <SideNav items={financasMenuItems}></SideNav>
            <div style={{ paddingTop: '60px', paddingLeft: '200px'}}>     
                {children}
            </div>
            </>
        ) : 
        <Login />
    );
};

export default DashboardFinancasLayout;