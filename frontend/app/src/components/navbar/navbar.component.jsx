import Navbar from 'react-bootstrap/Navbar'
import logo from '../../logo.svg';
import './navbar.scss'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';
import { MdLogout, MdPerson } from "react-icons/md/";
import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth.context';

const NavbarComponent = () => {

    const {user, logout} = useContext(AuthContext)

    return (
        <Navbar bg="dark py-2" variant="dark">
            <Navbar.Brand href="/dashboard" className='navbar-brand'>
                <img alt="" src={logo} width="26" height="26" className="d-inline-block align-top"/>{' '}
            PLANNER
            </Navbar.Brand>
            <Navbar.Collapse>
                <Nav className="me-auto">
                    <Link to="/dashboard/financas" className="nav-link">Finanças</Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <Nav
                    className="my-2 my-lg-0 navbar-logout"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                {user &&
                <Fragment>
                    <Navbar.Text className="navbar-user">
                        <MdPerson className="navbar-user-icon" size={20}/>
                        {user.username}
                    </Navbar.Text>
                    <Button variant="link" 
                        className="navbar-logout-button" 
                        style={{ boxShadow: 'none'}} 
                        onClick={logout}>
                        Logout  <MdLogout className="navbar-logout-icon"/>
                    </Button>
                </Fragment>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}


export default NavbarComponent