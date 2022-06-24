import { Navigate, Outlet } from 'react-router-dom'
import { Fragment, useContext} from 'react'
import NavbarComponent from '../../components/navbar/navbar.component'
import AuthContext from '../../context/auth.context'

const Dashboard = () => {
    let {user} = useContext(AuthContext)
    return (
        user ? (
            <Fragment> 
                <NavbarComponent />
                <Outlet />
            </Fragment>) : 
            <Navigate to='/login' replace />)
}

export default Dashboard