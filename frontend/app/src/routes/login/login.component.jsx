import { Fragment, useContext } from "react"
import { Navigate } from "react-router-dom";
import LoginForm from "../../components/login-form/login-form.component"
import NavbarComponent from "../../components/navbar/navbar.component"
import AuthContext from '../../context/auth.context';

const Login = () => {

    const {user, logout} = useContext(AuthContext)

    if (user) {
        return (
            <Navigate to="/" />
        )
    }

    return (
        <Fragment>
            <NavbarComponent />
            <LoginForm/>
        </Fragment>
    )  
}

export default Login