import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../../../components/sidenav/sidenav.component";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Financas = () => {

    const sideNavbarWidth = 200
    const sideNavbarItems = [{name: 'Gastos', link: 'dashboard/financas/gastos', icon: <AttachMoneyIcon />}]

    console.log(sideNavbarItems)
    return (
        <Fragment>
            <SideNav width={sideNavbarWidth} items={sideNavbarItems}/>
            <div style={{ paddingTop: '70px', paddingLeft: sideNavbarWidth}}>
                <Outlet />
            </div>
            
        </Fragment>
    );
};

export default Financas;