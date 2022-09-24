import React, { useContext } from 'react';
import NavbarComponent from '../components/navbar/navbar.component';
import SideNav from '../components/sidenav/sidenav.component';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TimelineIcon from '@mui/icons-material/Timeline';
import SavingsIcon from '@mui/icons-material/Savings';
import { AuthContext } from '../context/AuthContext';
import Router from 'next/router'
import Login from '../pages/login';

function DashboardFinancasLayout ({ children }:{ children:any }, ) {

    const financasMenuItems = [{name: 'Gastos', link: '/dashboard/financas/gastos', icon: <AttachMoneyIcon />},
                             {name: 'Evolução Gastos', link: '/dashboard/financas/evolucao_gastos', icon: <TimelineIcon />},
                             {name: 'Carteira', link: '/dashboard/financas/carteira', icon: <SavingsIcon />},
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