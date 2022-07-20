import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../../../components/sidenav/sidenav.component";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TimelineIcon from '@mui/icons-material/Timeline';
import SavingsIcon from '@mui/icons-material/Savings';

const Financas = () => {

    const sideNavbarWidth = 200
    const sideNavbarItems = [{name: 'Gastos', link: '/dashboard/financas', icon: <AttachMoneyIcon />},
                             {name: 'Evolução Patrimônio', link: '/dashboard/financas/evolucao_patrimonio', icon: <TimelineIcon />},
                             {name: 'Carteira', link: '/', icon: <SavingsIcon />},
                            ]

    return (
        <Fragment>
            <SideNav width={sideNavbarWidth} items={sideNavbarItems}/>
            <div style={{ paddingTop: '60px', paddingLeft: sideNavbarWidth}}>
                <Outlet />
            </div>
        </Fragment>
    );
};

export default Financas;