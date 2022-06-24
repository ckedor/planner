import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './login-form.scss'
import { useState, useContext } from 'react';
import AuthContext from '../../context/auth.context';

const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        login(event, username, password)
    }

    const { login, wrongCredentialsError } = useContext(AuthContext)

    return(
        <div className="container">
            <div className="login-wrapper">
                <div className="row justify-content-center">
                    <div className="col-2">
                        <h2 className="login-title">Login</h2>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-3 form-wrapper">
                        <Form onSubmit={handleSubmit}>
                            <div className="row input-wrapper">
                                <div className="col-12">
                                    <label>Name</label>  
                                    <input className="input-field" type="text" value={username} onChange={handleUsername} />
                                </div>
                            </div>
                            <div className="row input-wrapper">
                                <div className="col-12">
                                    <label>Password</label>
                                    <input className="input-field" type="password" value={password} onChange={handlePassword} />
                                    { wrongCredentialsError ? <div className="password-error-message">Senha incorreta</div>: null }
                                </div>
                            </div>
                            <div className="row button-wrapper">
                                <Button className="btn-info" variant="dark" type="submit" value="Submit" >
                                    Login
                                </Button>
                            </div>
                        </Form>
                    </div>       
                </div>
            </div>
        </div>
    )
}

export default LoginForm