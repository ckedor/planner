import styles from './navbar.module.scss'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';
import { MdLogout, MdPerson } from "react-icons/md/";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../../public/logo.svg'
import Image from 'next/image';
import Link from 'next/link';

const NavbarComponent = () => {

    const { username, signOut } = useContext(AuthContext)

    return (
        <Navbar fixed="top" bg="dark py-2" variant="dark" className={"navbar " + styles.navbar}>
            <Navbar.Brand href="/dashboard" className={styles.navbar_brand}>
                <div className={"d-inline-block align-top " + styles.navbar_brand_img} >
                    <Image src={logo} width="26" height="26"/>{' '}
                </div>
            PLANNER
            </Navbar.Brand>
            <Navbar.Collapse>
                {username &&
                <Nav className="me-auto">
                    <Link href="/dashboard/financas">
                        <a className="nav-link">Finanças</a>
                    </Link>
                </Nav>
                }
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <Nav
                    className={"my-2 my-lg-0 " + styles.navbar_logout}
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                {username &&
                <>
                    <Navbar.Text className={styles.navbar_user}>
                        <MdPerson className={styles.navbar_user_icon} size={20}/>
                        {username}
                    </Navbar.Text>
                    <Button variant="link" 
                        className={styles.navbar_logout_button} 
                        style={{ boxShadow: 'none'}} 
                        onClick={signOut}>
                        Logout  <MdLogout className={styles.navbar_logout_icon}/>
                    </Button>
                </>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}


export default NavbarComponent