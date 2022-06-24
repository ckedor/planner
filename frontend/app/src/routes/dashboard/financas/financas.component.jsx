import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const Financas = () => {
    return (
        <Fragment>
            <div>Navbar de finanças</div>
            <Outlet />
        </Fragment>
    );
};

export default Financas;