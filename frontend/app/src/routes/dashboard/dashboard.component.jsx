import { Navigate, Outlet } from 'react-router-dom'
import { Fragment, useContext} from 'react'
import NavbarComponent from '../../components/navbar/navbar.component'
import AuthContext from '../../context/auth.context'
import './dashboard.scss'

const Dashboard = () => {
    let {user} = useContext(AuthContext)
    return (
        user ? (
            <Fragment> 
                <div className="background-color">
                    <NavbarComponent />
                    <Outlet />
                </div>
            </Fragment>) : 
            <Navigate to='/login' replace />)
}

export default Dashboard