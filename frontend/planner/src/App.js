import { Component } from 'react'
import LoginComponent from './components/login/login.component'

class App extends Component {

  constructor(){
    super();

    this.state = {
      token: ''
    }

    this.handleToken = this.handleToken.bind(this)
  }

  handleToken(token){
    this.setState({token})
  }

  render(){
    var token = localStorage.getItem("token")
    const { handleToken } = this;

    if (!token){
      return (
        <LoginComponent 
          handleToken={handleToken}
        />
      )
    } else {
      return (
        <p>Página Principal</p>
      )
    }
  }
}

export default App;
