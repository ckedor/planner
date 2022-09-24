import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import styles from './login-form.module.scss';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { signIn } = useContext(AuthContext)

    const handleUsername = (event:any) => {
        setUsername(event.target.value)
    }

    const handlePassword = (event:any) => {
        setPassword(event.target.value)
    }

    async function handleSignIn(event:any) {
        event.preventDefault();
        await signIn( {username:username, password:password})
    }

    const wrongCredentialsError = false

    return(
        <div className="container">
            <div className={styles.login_wrapper}>
                <div className="row justify-content-center">
                    <div className="col-2">
                        <h2 className={styles.login_title}>Login</h2>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className={styles.form_wrapper + " col-3"}>
                        <Form onSubmit={handleSignIn}>
                            <div className={"row " + styles.input_wrapper}>
                                <div className="col-12">
                                    <label>Name</label>  
                                    <input className={styles.input_field} type="text" value={username} onChange={handleUsername} />
                                </div>
                            </div>
                            <div className={"row "  + styles.input_wrapper}>
                                <div className="col-12">
                                    <label>Password</label>
                                    <input className={styles.input_field} type="password" value={password} onChange={handlePassword} />
                                    { wrongCredentialsError ? <div className={styles.password_error_message}>Senha incorreta</div>: null }
                                </div>
                            </div>
                            <div className={"row " +  styles.button_wrapper}>
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