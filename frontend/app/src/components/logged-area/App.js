import { Component } from 'react'
import { Outlet } from "react-router-dom";
import LoginRequired from "./components/login_required/login_required.component"
import NavbarComponent from './components/navbar/navbar.component';

class App extends Component {

  constructor(){
    super();

    this.state = {
      token: ''
    }

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout(){
    this.setState({token:undefined})
  }

  render(){
    const { handleLogout } = this;
    return (
      <div>
        <LoginRequired></LoginRequired>
        <NavbarComponent 
          handleLogout={handleLogout}
          loggedIn={true} />
        
        <Outlet />
      </div>
    )
  }
}

export default App;
