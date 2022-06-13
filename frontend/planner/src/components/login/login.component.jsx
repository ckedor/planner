import { Component } from "react";

class LoginComponent extends Component {

    constructor(){
        super();

        this.state = {
            username: '',
            password: ''
        }
    }

    handleUsername = (event) => {
        this.setState({username: event.target.value})
    }

    handlePassword = (event) => {
        this.setState({password: event.target.value})
    }

    handleSubmit = (event) => {
        var url = 'http://127.0.01:8000/auth/';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.username, password: this.state.password})
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('token', data.token)
                this.props.handleToken(data.token)
            }
            );
        event.preventDefault();
    }

    render(){

        const { handleUsername } = this;
        const { handlePassword } = this;
        const { handleSubmit } = this;
        
        const {username, password} = this.state;
        return(
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={username} onChange={handleUsername} />
                    <input type="password" value={password} onChange={handlePassword} />
                </label>
                <input type="submit" value="Submit" />
            </form>       
        )
    }

}

export default LoginComponent