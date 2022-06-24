import { Fragment } from "react"
import LoginForm from "../../components/login-form/login-form.component"
import NavbarComponent from "../../components/navbar/navbar.component"

const Login = () => {
    console.log("Login route")
    return (
        <Fragment>
            <NavbarComponent />
            <LoginForm/>
        </Fragment>
    )  
}

export default Login